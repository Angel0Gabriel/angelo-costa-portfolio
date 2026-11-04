import {ArrowUpRight, Github} from 'lucide-react';
import {content, profile, type Locale} from '@/data/content';
import {Reveal} from './interactions';
import {CaseVisual} from './visuals';

export function SelectedWork({locale}: {locale: Locale}) {
  const c = content[locale];
  return <>
    <div className="case-list">
      {c.cases.map((work, i) => <Reveal key={work.visual} className={i === 0 ? 'featured-case' : 'supporting-case'} delay={i * 0.06}>
        <article className="case" aria-labelledby={`case-${work.visual}`}>
          <div className="case-art">
            <div className="case-art-header"><span className="mono">0{i + 1} / {work.company.toUpperCase()}</span><span className="small-cross" aria-hidden="true">+</span></div>
            <CaseVisual kind={work.visual}/>
            <p className="conceptual">{c.conceptual}</p>
            <div className="case-result"><span className="metric">−{work.metric}</span><div><span className="eyebrow">{c.result}</span><p>{work.result}</p></div></div>
          </div>
          <div className="case-copy">
            <p className="case-category">{c.professional} <span>/ {work.company}</span></p>
            <h3 id={`case-${work.visual}`}>{work.title}</h3>
            <div className="case-story">
              <div><h4>{c.problem}</h4><p>{work.problem}</p></div>
              <div><h4>{c.contribution}</h4><p>{work.contribution}</p></div>
            </div>
            <ul className="tags">{work.tech.map(tech => <li key={tech}>{tech}</li>)}</ul>
          </div>
          <div className="case-approach">
            <h4 className="eyebrow">{c.approachLabel}</h4>
            <ol>{work.approach.map((step, index) => <li key={step.title}>
              <span className="approach-number mono" aria-hidden="true">0{index + 1}</span>
              <div><h5>{step.title}</h5><p>{step.text}</p></div>
            </li>)}</ol>
          </div>
        </article>
      </Reveal>)}
    </div>
    <a className="text-link github-explore" href={profile.github}><Github size={18}/>{c.explore}<ArrowUpRight size={18}/></a>
  </>;
}
