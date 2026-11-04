import type {Locale} from './content';

export const presentation = {
  en: {
    greeting: "HI, I'M",
    heroFocus: 'From responsive interfaces to reliable APIs, I build web products that make complex work simpler.',
    heroStackLabel: 'My everyday stack',
    ribbon: ['FULL-STACK ENGINEERING', 'FAST INTERFACES', 'RELIABLE APIs', 'USEFUL PRODUCTS'],
    secondaryRibbon: ['TYPESCRIPT', 'REACT & NEXT.JS', 'NODE.JS & NESTJS', 'POSTGRESQL & MONGODB'],
    system: 'CONNECTED END TO END',
    systemTitle: 'One product. Every layer.',
    systemDescription: 'Interfaces, APIs and data, built to work together.',
    education: 'University of Fortaleza',
    degree: 'B.Sc. in Computer Science',
    graduation: 'June 2025',
    languages: ['Portuguese', 'English'],
  },
  pt: {
    greeting: 'OLÁ, EU SOU',
    heroFocus: 'De interfaces responsivas a APIs confiáveis, desenvolvo produtos web que simplificam o trabalho.',
    heroStackLabel: 'Minha stack no dia a dia',
    ribbon: ['ENGENHARIA FULL STACK', 'INTERFACES RÁPIDAS', 'APIs CONFIÁVEIS', 'PRODUTOS ÚTEIS'],
    secondaryRibbon: ['TYPESCRIPT', 'REACT & NEXT.JS', 'NODE.JS & NESTJS', 'POSTGRESQL & MONGODB'],
    system: 'CONECTADO DE PONTA A PONTA',
    systemTitle: 'Um produto. Cada camada.',
    systemDescription: 'Interfaces, APIs e dados, construídos para trabalhar juntos.',
    education: 'Universidade de Fortaleza',
    degree: 'Bacharelado em Ciência da Computação',
    graduation: 'Junho de 2025',
    languages: ['Português', 'Inglês'],
  },
} as const satisfies Record<Locale, {
  greeting: string; ribbon: readonly string[]; secondaryRibbon: readonly string[];
  heroFocus: string; heroStackLabel: string;
  system: string; systemTitle: string; systemDescription: string; education: string; degree: string; graduation: string;
  languages: readonly string[];
}>;
