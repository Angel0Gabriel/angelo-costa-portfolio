import type {Metadata} from 'next';
import {NextIntlClientProvider} from 'next-intl';
import {setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {content,isLocale,locales} from '@/data/content';
import {siteUrl} from '@/lib/site';
import '../globals.css';
import '../refinement.css';
import {MotionProvider} from '@/components/interactions';
export function generateStaticParams(){return locales.map(locale=>({locale}));}
export const dynamicParams = false;
export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata>{
 const {locale}=await params;if(!isLocale(locale)) notFound();const c=content[locale];
 return {metadataBase:new URL(siteUrl),title:`Angelo Costa | ${c.role}`,description:c.description,alternates:{canonical:`/${locale}`,languages:{en:'/en','pt-BR':'/pt','x-default':'/en'}},openGraph:{title:`Angelo Costa | ${c.role}`,description:c.description,url:`/${locale}`,siteName:'Angelo Costa',locale:locale==='pt'?'pt_BR':'en_US',alternateLocale:locale==='pt'?'en_US':'pt_BR',type:'website',images:[{url:`/${locale}/opengraph-image`,width:1200,height:630,alt:`Angelo Costa | ${c.role}`}]},twitter:{card:'summary_large_image',title:`Angelo Costa | ${c.role}`,description:c.description,images:[`/${locale}/opengraph-image`]}};
}
export default async function Layout({children,params}:{children:React.ReactNode;params:Promise<{locale:string}>}){
 const {locale}=await params;if(!isLocale(locale))notFound();setRequestLocale(locale);
 return <html lang={locale==='pt'?'pt-BR':'en'} data-motion="on"><body><NextIntlClientProvider locale={locale} messages={content[locale].ui}><MotionProvider>{children}</MotionProvider></NextIntlClientProvider></body></html>;
}
