'use client';

import {useEffect} from 'react';

export const sectionNavigationEvent='angelo-section-navigation';

/** Animate explicit anchor clicks only; wheel, touch and keyboard scrolling stay native. */
export function SectionNavigation({reduced}:{reduced:boolean}){
 useEffect(()=>{
  let frame=0;
  const root=document.documentElement;
  const notify=()=>window.dispatchEvent(new Event(sectionNavigationEvent));
  const cancel=()=>{
   cancelAnimationFrame(frame);frame=0;
   if(root.dataset.scrollingTo){delete root.dataset.scrollingTo;notify();}
  };
  const focus=(target:HTMLElement)=>{
   if(!target.hasAttribute('tabindex')){
    target.setAttribute('tabindex','-1');
    target.addEventListener('blur',()=>target.removeAttribute('tabindex'),{once:true});
   }
   target.focus({preventScroll:true});
  };
  const click=(event:MouseEvent)=>{
   const anchor=event.target instanceof Element?event.target.closest<HTMLAnchorElement>('a[href]'):null;
   if(!anchor||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey||anchor.hasAttribute('download')||anchor.target==='_blank')return;
   const url=new URL(anchor.href,window.location.href);
   if(url.origin!==window.location.origin||url.pathname!==window.location.pathname||url.search!==window.location.search){cancel();return;}
   if(event.defaultPrevented||!url.hash)return;
   let id:string;try{id=decodeURIComponent(url.hash.slice(1));}catch{return;}
   const target=document.getElementById(id);if(!target)return;
   event.preventDefault();cancel();
   if(window.location.hash!==url.hash)window.history.pushState(null,'',url.hash);
   const offset=(document.querySelector('header')?.getBoundingClientRect().height??80)+20;
   const start=window.scrollY;
   const end=Math.max(0,Math.min(start+target.getBoundingClientRect().top-offset,root.scrollHeight-window.innerHeight));
   const distance=end-start;
   if(reduced||id==='main'||Math.abs(distance)<2){window.scrollTo({top:end,behavior:'instant'});focus(target);notify();return;}
   root.dataset.scrollingTo=id;notify();
   const duration=Math.min(1400,Math.max(750,650+Math.abs(distance)*0.12));
   const started=performance.now();
   const tick=(now:number)=>{
    const progress=Math.min(1,(now-started)/duration);
    const eased=(1-Math.cos(Math.PI*progress))/2;
    window.scrollTo({top:start+distance*eased,behavior:'instant'});
    if(progress<1){frame=requestAnimationFrame(tick);}
    else{frame=0;delete root.dataset.scrollingTo;focus(target);notify();}
   };
   frame=requestAnimationFrame(tick);
  };
  const keydown=(event:KeyboardEvent)=>{
   if(['ArrowUp','ArrowDown','PageUp','PageDown','Home','End',' ','Escape','Tab'].includes(event.key))cancel();
  };
  document.addEventListener('click',click);
  window.addEventListener('wheel',cancel,{passive:true});
  window.addEventListener('touchstart',cancel,{passive:true});
  window.addEventListener('keydown',keydown);
  window.addEventListener('popstate',cancel);
  return()=>{
   cancel();document.removeEventListener('click',click);
   window.removeEventListener('wheel',cancel);window.removeEventListener('touchstart',cancel);
   window.removeEventListener('keydown',keydown);window.removeEventListener('popstate',cancel);
  };
 },[reduced]);
 return null;
}
