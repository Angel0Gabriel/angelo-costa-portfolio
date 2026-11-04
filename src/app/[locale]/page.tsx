import {notFound} from 'next/navigation';
import {setRequestLocale} from 'next-intl/server';
import {ArrowUpRight,ArrowDown,ArrowRight,Download,Github,Linkedin,MapPin,Mail} from 'lucide-react';
import {existsSync} from 'node:fs';
import path from 'node:path';
import {content,isLocale,profile} from '@/data/content';
import {Header,CopyEmail,Reveal,ScrollProgress,SkillRibbon,HeroName} from '@/components/interactions';
import {HeroNetwork} from '@/components/visuals';
import {ExperienceTimeline} from '@/components/experience';
import {TechStack} from '@/components/stack';
import {presentation} from '@/data/presentation';
import {About} from '@/components/about';
import {SelectedWork} from '@/components/selected-work';
import {TechIcon} from '@/components/tech-icon';
export default async function Page({params}:{params:Promise<{locale:string}>}){
 const {locale}=await params;if(!isLocale(locale))notFound();setRequestLocale(locale);const c=content[locale];
 const resume=`/resume/angelo-costa-${locale}.pdf`;const hasResume=existsSync(path.join(process.cwd(),'public',resume));
 const resumeLink=hasResume?<a className="text-link" href={resume} download><Download size={15}/>{c.resume}<span className="mono">PDF ↗</span></a>:null;
 return <><a className="skip-link" href="#main">{c.skip}</a><Header locale={locale}/><ScrollProgress/><main id="main">
 <section id="top" className="hero hero-centered" aria-labelledby="hero-title">
 <HeroNetwork/><div className="hero-glow"/>
 <div className="hero-copy shell"><Reveal hero><p className="eyebrow hero-greeting">{presentation[locale].greeting}</p></Reveal><HeroName/>
 <Reveal hero delay={0.15}><p className="hero-role">{c.role}</p><p className="hero-intro">{presentation[locale].heroFocus}</p><ul className="hero-stack" aria-label={presentation[locale].heroStackLabel}>{[{icon:"TypeScript",label:"TypeScript"},{icon:"React",label:"React / Next.js"},{icon:"Node.js",label:"Node.js / NestJS"}].map(tech=><li key={tech.icon}><TechIcon name={tech.icon}/><span>{tech.label}</span></li>)}</ul></Reveal>
 <Reveal hero delay={0.25}><div className="hero-buttons"><a className="button primary" href="#work">{c.viewWork}<ArrowUpRight size={18}/></a><a className="button secondary" href="#contact">{c.getInTouch}<ArrowRight size={18}/></a></div><div className="hero-links">{resumeLink}<span className="vertical-rule"/><a href={profile.github} aria-label="GitHub"><Github size={19}/></a><a href={profile.linkedin} aria-label="LinkedIn"><Linkedin size={19}/></a></div></Reveal></div>
 <div className="hero-bottom shell"><span><MapPin size={14}/>{c.location}<span className="timezone">UTC -03:00</span></span><a href="#about">{c.scroll}<ArrowDown size={15}/></a></div></section>
 <SkillRibbon locale={locale}/>
 <section id="about" tabIndex={-1} className="shell section about-section" aria-labelledby="about-title"><Reveal className="section-heading"><div><p className="eyebrow">01 / {c.ui.about}</p><h2 id="about-title">{c.aboutTitle}</h2></div><span className="section-marker" aria-hidden="true">&lt;about /&gt;</span></Reveal><About locale={locale}/></section>
 <section id="experience" tabIndex={-1} className="shell section" aria-labelledby="experience-title"><Reveal><p className="eyebrow">02 / {c.ui.experience}</p><h2 id="experience-title">{c.experienceTitle}</h2></Reveal><ExperienceTimeline locale={locale}/></section>
 <section id="work" tabIndex={-1} className="shell section" aria-labelledby="work-title"><Reveal className="section-heading"><div><p className="eyebrow">03 / {c.ui.work}</p><h2 id="work-title">{c.workTitle}</h2></div><p>{c.workIntro}</p></Reveal><SelectedWork locale={locale}/></section>
 <section id="stack" tabIndex={-1} className="shell section" aria-labelledby="stack-title"><Reveal className="section-heading"><div><p className="eyebrow">04 / {c.ui.stack}</p><h2 id="stack-title">{c.stackTitle}</h2></div><p>{c.stackIntro}</p></Reveal><TechStack locale={locale}/></section>
 <section id="contact" tabIndex={-1} className="contact section" aria-labelledby="contact-title"><Reveal className="shell contact-inner"><p className="eyebrow">05 / {c.ui.contact}</p><h2 id="contact-title">{c.contactTitle}<span className="contact-star" aria-hidden="true">✳</span></h2><p className="contact-intro">{c.contactIntro}</p><a className="email-link" href={`mailto:${profile.email}`}>{profile.email}<ArrowUpRight/></a><CopyEmail/><div className="contact-links"><a href={profile.github}><Github size={18}/>GitHub<ArrowUpRight size={14}/></a><a href={profile.linkedin}><Linkedin size={18}/>LinkedIn<ArrowUpRight size={14}/></a><a href={`mailto:${profile.email}`}><Mail size={18}/>E-mail<ArrowUpRight size={14}/></a>{resumeLink}</div></Reveal></section>
 </main><footer className="shell footer"><a className="monogram" href="#top" aria-label={locale==='pt'?'Voltar ao início':'Back to top'}>AC<span>.</span></a><p>© {new Date().getFullYear()} Angelo Costa <span>· {c.footer}</span></p><a href="#top" aria-label={locale==='pt'?'Voltar ao início':'Back to top'}><ArrowUpRight size={22}/></a></footer></>;
}
