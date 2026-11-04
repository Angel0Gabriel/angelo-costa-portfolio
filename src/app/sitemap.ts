import type {MetadataRoute} from 'next';
import {siteUrl} from '@/lib/site';
export default function sitemap():MetadataRoute.Sitemap{return ['en','pt'].map(locale=>({url:`${siteUrl}/${locale}`,alternates:{languages:{en:`${siteUrl}/en`,'pt-BR':`${siteUrl}/pt`}},changeFrequency:'monthly',priority:1}));}
