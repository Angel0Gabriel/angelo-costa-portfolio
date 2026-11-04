'use client';
import {createContext,useContext,useEffect,useRef,useState,useSyncExternalStore} from 'react';
import {useTranslations} from 'next-intl';
import {useRouter} from 'next/navigation';
import {motion,useInView,useAnimate,useScroll,useSpring,useMotionTemplate,stagger} from 'motion/react';
import {Copy,Check,Menu,X,Pause,Play} from 'lucide-react';
import {profile,type Locale} from '@/data/content';
import {presentation} from '@/data/presentation';
import {SectionNavigation,sectionNavigationEvent} from './section-navigation';
const sections=['about','experience','work','stack','contact'] as const;
const MotionPreference=createContext({reduced:false,toggle:()=>{}});
const motionStorageKey='angelo-motion';
const motionChangeEvent='angelo-motion-change';
function readSavedMotion():boolean|null{
 try{const value=window.localStorage.getItem(motionStorageKey);return value==='on'?false:value==='off'?true:null;}catch{return null;}
}
function subscribeToSavedMotion(callback:()=>void){
 const onStorage=(event:StorageEvent)=>{if(event.key===motionStorageKey||event.key===null)callback();};
 window.addEventListener('storage',onStorage);window.addEventListener(motionChangeEvent,callback);
 return()=>{window.removeEventListener('storage',onStorage);window.removeEventListener(motionChangeEvent,callback);};
}
export function MotionProvider({children}:{children:React.ReactNode}){
 const savedReduced=useSyncExternalStore(subscribeToSavedMotion,readSavedMotion,()=>null);
 const [override,setOverride]=useState<boolean|null>(null);const reduced=override??savedReduced??false;
 useEffect(()=>{document.documentElement.dataset.motion=reduced?'off':'on';},[reduced]);
 function toggle(){
  const nextReduced=!reduced;
  try{window.localStorage.setItem(motionStorageKey,nextReduced?'off':'on');setOverride(null);window.dispatchEvent(new Event(motionChangeEvent));}
  catch{setOverride(nextReduced);}
 }
 return <MotionPreference.Provider value={{reduced,toggle}}><SectionNavigation reduced={reduced}/>{children}</MotionPreference.Provider>;
}
export function Header({locale}:{locale:Locale}){
 const router=useRouter();
 const motionPreference=useContext(MotionPreference);
 const t=useTranslations();const dialog=useRef<HTMLDialogElement>(null);const trigger=useRef<HTMLButtonElement>(null);const focusTarget=useRef<string|null>(null);const [open,setOpen]=useState(false);
 const [activeSection,setActiveSection]=useState<string>('');
 useEffect(()=>{
  const update=()=>{
   const destination=document.documentElement.dataset.scrollingTo;
   if(destination){setActiveSection(sections.includes(destination as typeof sections[number])?destination:'');return;}
   const active=sections.filter(id=>(document.getElementById(id)?.getBoundingClientRect().top??Infinity)<=window.innerHeight*0.35).at(-1);
   setActiveSection(active??'');
  };
  const observer=new IntersectionObserver(update,{rootMargin:'-10% 0px -60% 0px',threshold:0});
  for(const id of ['top',...sections]){const element=document.getElementById(id);if(element)observer.observe(element);}
  window.addEventListener(sectionNavigationEvent,update);
  update();return()=>{observer.disconnect();window.removeEventListener(sectionNavigationEvent,update);};
 },[locale]);
 function close(){dialog.current?.close();}
 function onClose(){setOpen(false);if(focusTarget.current){document.getElementById(focusTarget.current)?.focus({preventScroll:true});focusTarget.current=null;}else trigger.current?.focus();}
 function changeLanguage(event:React.MouseEvent<HTMLAnchorElement>,target:Locale){
  event.preventDefault();let hash=window.location.hash;
  const current=sections.filter(id=>(document.getElementById(id)?.getBoundingClientRect().top??Infinity)<160).at(-1);
  const destination=document.documentElement.dataset.scrollingTo;
  if(destination||current)hash=`#${destination||current}`;
  router.push(`/${target}${hash}`);
 }
 const languages=<><button className="motion-toggle" onClick={motionPreference.toggle} aria-pressed={!motionPreference.reduced} aria-label={locale==='en'?'Enable animations':'Ativar animações'} title={locale==='en'?'Toggle animations':'Ativar ou pausar animações'}>{motionPreference.reduced?<Play size={13}/>:<Pause size={13}/>}<span>{locale==='en'?'Motion':'Animações'}</span></button><div className="languages" aria-label={t('language')}>{(['en','pt'] as const).map((lang,i)=><span key={lang}>{i>0&&<span className="language-divider" aria-hidden="true">/</span>}<a href={`/${lang}`} hrefLang={lang==='pt'?'pt-BR':'en'} lang={lang==='pt'?'pt-BR':'en'} aria-label={lang==='en'?'English':'Português brasileiro'} aria-current={locale===lang?'page':undefined} onClick={e=>changeLanguage(e,lang)}>{lang.toUpperCase()}</a></span>)}</div></>;
 return <header className="header"><div className="header-inner"><a className="brand" href={`/${locale}#top`} aria-label="Angelo Costa"><span className="monogram">AC<span>.</span></span><span className="brand-name">angelo costa</span></a><nav className="desktop-nav" aria-label={t('navigation')}>{sections.map(id=><a key={id} href={`#${id}`} aria-current={activeSection===id?'location':undefined}>{activeSection===id&&<motion.span className="nav-indicator" layoutId="active-navigation" aria-hidden="true" transition={{duration:motionPreference.reduced?0:0.45,ease:[0.22,1,0.36,1]}}/>}<span className="nav-label">{t(id)}</span></a>)}</nav><div className="header-actions">{languages}<button ref={trigger} className="icon-button mobile-toggle" aria-label={t('menu')} aria-haspopup="dialog" aria-expanded={open} aria-controls="mobile-navigation" onClick={()=>{dialog.current?.showModal();setOpen(true);}}><Menu size={22}/></button></div></div><dialog id="mobile-navigation" ref={dialog} className="mobile-menu" aria-label={t('navigation')} onClose={onClose} onClick={e=>{if(e.target===e.currentTarget)close();}}><div className="mobile-panel"><button className="icon-button menu-close" onClick={close} aria-label={t('close')} autoFocus><X/></button><nav>{sections.map((id,i)=><a key={id} href={`#${id}`} onClick={()=>{focusTarget.current=id;close();}}><span>0{i+1}</span>{t(id)}</a>)}</nav></div></dialog></header>;
}
export function CopyEmail(){const t=useTranslations();const [status,setStatus]=useState<'idle'|'success'|'error'>('idle');useEffect(()=>{if(status==='idle')return;const timer=setTimeout(()=>setStatus('idle'),4000);return()=>clearTimeout(timer);},[status]);
 return <div className="copy-wrap"><button className="button secondary" data-status={status} onClick={async()=>{try{await navigator.clipboard.writeText(profile.email);setStatus('success');}catch{setStatus('error');}}}>{status==='success'?<Check size={16}/>:<Copy size={16}/>} {t(status==='success'?'copied':'copy')}</button><span className="copy-status" role="status" aria-live="polite">{status==='error'?t('copyError'):status==='success'?t('copied'):''}</span></div>;
}
export function Reveal({children,className='',hero=false,delay=0}:{children:React.ReactNode;className?:string;hero?:boolean;delay?:number}){
 const {reduced:reduce}=useContext(MotionPreference);
 const [scope,animate]=useAnimate();const visible=useInView(scope,{once:true,amount:0.08});
 useEffect(()=>{
  if(!visible)return;
  if(reduce){animate(scope.current,{opacity:1,y:0},{duration:0});return;}
  const animation=animate(scope.current,{opacity:[0.6,1],y:[hero?18:14,0]},{duration:0.85,delay,ease:[0.16,1,0.3,1]});
  return()=>{animation.stop();};
 },[visible,reduce,animate,scope,hero,delay]);
 return <div ref={scope} className={className}>{children}</div>;
}
export function ScrollProgress(){const {scrollYProgress}=useScroll();const smooth=useSpring(scrollYProgress,{stiffness:110,damping:30});const {reduced:reduce}=useContext(MotionPreference);return <motion.div aria-hidden="true" className="scroll-progress" style={{scaleX:reduce?scrollYProgress:smooth}}/>;}
export function Spotlight({children,className=''}:{children:React.ReactNode;className?:string}){
 const {reduced}=useContext(MotionPreference);
 const x=useSpring(0,{stiffness:120,damping:25,mass:0.5});
 const y=useSpring(0,{stiffness:120,damping:25,mass:0.5});
 const opacity=useSpring(0,{stiffness:100,damping:25});
 const background=useMotionTemplate`radial-gradient(400px circle at ${x}px ${y}px, rgba(167,139,250,.14), transparent 65%)`;
 useEffect(()=>{if(reduced)opacity.set(0);},[reduced,opacity]);
 return <div className={`spotlight ${className}`} onPointerMove={event=>{
  if(event.pointerType!=='mouse'||reduced||!window.matchMedia('(hover: hover) and (pointer: fine)').matches)return;
  const bounds=event.currentTarget.getBoundingClientRect();x.set(event.clientX-bounds.left);y.set(event.clientY-bounds.top);opacity.set(1);
 }} onPointerLeave={()=>opacity.set(0)}><motion.span aria-hidden="true" className="spotlight-glow" style={{background,opacity}}/>{children}</div>;
}
export function HeroName(){
 const {reduced}=useContext(MotionPreference);
 const [scope,animate]=useAnimate();
 useEffect(()=>{
  const animation=reduced
   ?animate('[data-letter]',{opacity:1,y:0},{duration:0})
   :animate('[data-letter]',{opacity:[0,1],y:[34,0]},{duration:1,delay:stagger(0.045),ease:[0.16,1,0.3,1]});
  return()=>animation.stop();
 },[reduced,animate]);
 return <h1 ref={scope} id="hero-title" aria-label="Angelo Costa"><span className="name-word" aria-hidden="true">{Array.from('Angelo').map((letter,i)=><span data-letter key={i}>{letter}</span>)}</span>{' '}<span className="name-word name-surname" aria-hidden="true">{Array.from('Costa.').map((letter,i)=><span data-letter key={i}>{letter}</span>)}</span></h1>;
}
export function SkillRibbon({locale}:{locale:Locale}){
 const [paused,setPaused]=useState(false);
 const copy=presentation[locale];
 return <div className={`ribbon-stage ${paused?'paused':''}`}>
  {[copy.ribbon,copy.secondaryRibbon].map((words,index)=><div className={`skill-ribbon ribbon-${index===0?'primary':'secondary'} ${paused?'paused':''}`} key={index}>
   <div className={index===0?'ribbon-track':'ribbon-track-back'}>{[0,1].map(repeat=><div className="ribbon-group" key={repeat} aria-hidden={repeat===1?true:undefined}>{[...words,...words].map((word,i)=><span key={i} aria-hidden={i>=words.length?true:undefined}>{word}<i aria-hidden="true">✦</i></span>)}</div>)}</div>
  </div>)}
  <button className="ribbon-toggle" onClick={()=>setPaused(!paused)} aria-label={locale==='en'?(paused?'Play technology ribbon':'Pause technology ribbon'):(paused?'Reproduzir faixa de tecnologias':'Pausar faixa de tecnologias')}>{paused?<Play size={15}/>:<Pause size={15}/>}</button>
 </div>;
}
