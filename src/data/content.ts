export const locales = ["en", "pt"] as const;
export type Locale = (typeof locales)[number];
export const isLocale = (value: unknown): value is Locale =>
  value === "en" || value === "pt";
export const profile = {
  name: "Angelo Costa",
  email: "angelobielmoreira@hotmail.com",
  github: "https://github.com/Angel0Gabriel",
  linkedin: "https://www.linkedin.com/in/angelocostadev/",
};
export const primaryStack = [
  "TypeScript",
  "JavaScript",
  "React",
  "Next.js",
  "Node.js",
  "NestJS",
  "PostgreSQL",
  "MongoDB",
];
export const stack = [
  [
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Tailwind CSS",
    "Shadcn/UI",
    "Zustand",
  ],
  ["Node.js", "NestJS", "REST APIs", "JWT/RBAC", "Swagger"],
  ["PostgreSQL", "MongoDB", "Prisma", "Mongoose"],
  [
    "Git",
    "Docker",
    "Firebase",
    "Vercel",
    "Python",
    "Playwright",
    "LLM workflows",
    "MCP servers",
  ],
];
type Experience = {
  company: string;
  role: string;
  date: string;
  context: string;
  points: string[];
};
type CaseStudy = {
  title: string;
  company: string;
  problem: string;
  contribution: string;
  approach: {title: string; text: string}[];
  tech: string[];
  metric: string;
  result: string;
  visual: "flow" | "city" | "image";
};
type Copy = {
  ui: {
    about: string;
    experience: string;
    work: string;
    stack: string;
    contact: string;
    menu: string;
    close: string;
    copy: string;
    copied: string;
    copyError: string;
    language: string;
    navigation: string;
  };
  description: string;
  role: string;
  eyebrow: string;
  headline: [string, string];
  intro: string;
  value: string;
  viewWork: string;
  getInTouch: string;
  resume: string;
  location: string;
  scroll: string;
  aboutTitle: string;
  aboutParagraphs: string[];
  education: string;
  languages: string;
  experienceTitle: string;
  workTitle: string;
  workIntro: string;
  professional: string;
  conceptual: string;
  problem: string;
  contribution: string;
  result: string;
  cases: CaseStudy[];
  approachLabel: string;
  experiences: Experience[];
  stackTitle: string;
  stackIntro: string;
  stackNames: string[];
  toolsNames: Record<string, string>;
  contactTitle: string;
  contactIntro: string;
  explore: string;
  footer: string;
  skip: string;
  diagram: string;
  diagramLabels: [string, string, string];
};
export const content: Record<Locale, Copy> = {
  en: {
    ui: {
      about: "About",
      experience: "Experience",
      work: "Work",
      stack: "Stack",
      contact: "Contact",
      menu: "Open menu",
      close: "Close menu",
      copy: "Copy email",
      copied: "Email copied",
      copyError: "Unable to copy. Select the address to copy it manually.",
      language: "Select language",
      navigation: "Main navigation",
    },
    description:
      "Angelo Costa, Full-Stack Software Engineer in Fortaleza, Brazil. Fast interfaces, reliable APIs, Legal Ops automation and AI integrations with TypeScript, React and Node.js.",
    role: "Full-Stack Software Engineer",
    eyebrow: "FROM INTERFACE TO INFRASTRUCTURE",
    headline: ["Complex problems.", "Useful products."],
    intro:
      "I’m Angelo Costa, a full-stack engineer based in Brazil. I turn complex requirements into useful products with React, Next.js, Node.js, and TypeScript.",
    value:
      "Fast interfaces. Reliable APIs. Automation that makes work simpler.",
    viewWork: "View my work",
    getInTouch: "Get in touch",
    resume: "Download résumé",
    location: "Fortaleza, Brazil",
    scroll: "Explore the details",
    aboutTitle: "The whole picture.\nThe small details.",
    aboutParagraphs: [
      "I build full-stack web products with TypeScript, React, Next.js, Node.js, and NestJS, connecting responsive interfaces to reliable APIs and PostgreSQL or MongoDB databases.",
      "At Docato and DD Solutions, my work has spanned legal operations and urban analytics: improving loading performance, building reusable components, and automating repetitive work. I focus on understanding the problem, writing maintainable code, and making everyday workflows simpler.",
    ],
    education:
      "B.Sc. in Computer Science, University of Fortaleza, June 2025.",
    languages: "Portuguese / English",
    experienceTitle: "Experience, with impact.",
    workTitle: "Engineering in practice.",
    workIntro:
      "Selected contributions to professional products. Real challenges, focused engineering, documented results.",
    professional: "Professional contribution",
    conceptual: "Conceptual representation · not a product screenshot",
    problem: "The challenge",
    contribution: "My contribution",
    result: "Documented result",
    approachLabel: "The engineering behind it",
    experiences: [
      {
        company: "Docato",
        role: "Full-Stack Software Engineer",
        date: "Apr 2025 to Present",
        context: "Full-stack development for Legal Ops automation.",
        points: [
          "Developed Next.js and NestJS solutions and REST APIs with JWT and role-based access control.",
          "Built a reusable design system with Shadcn/UI and Tailwind CSS and worked on frontend loading performance.",
          "Worked on reporting performance with Prisma and PostgreSQL, alongside the product’s full-stack features.",
          "Integrated LLM workflows and developed MCP servers to automate repetitive engineering tasks.",
        ],
      },
      {
        company: "DD Solutions",
        role: "Front-end Software Engineer",
        date: "Oct 2021 to Mar 2025",
        context: "Analytics interfaces for urban and geospatial data.",
        points: [
          "Contributed to modernizing Grafana dashboards with React and TypeScript for urban analytics.",
          "Developed automation for image annotation within urban and geospatial data workflows.",
          "Improved data access performance by optimizing legacy SQL queries.",
          "Built reusable, typed React components, integrated REST APIs, and worked on deployments with Firebase and Vercel.",
        ],
      },
    ],
    cases: [
      {
        title: "Legal Ops Automation",
        company: "Docato",
        problem:
          "Complex legal operations required reliable workflows, responsive interfaces, and efficient reporting over large datasets.",
        contribution:
          "I worked across the Next.js interface, NestJS APIs and PostgreSQL reporting layer to improve everyday Legal Ops workflows.",
        approach: [
          {title: "Load the interface in smaller parts", text: "Applied lazy loading and code splitting to reduce loading latency, alongside reusable components built with Shadcn/UI and Tailwind CSS."},
          {title: "Improve reporting and control access", text: "Optimized Prisma and PostgreSQL queries, reducing report generation time by 40%. Developed REST APIs with JWT authentication and role-based access control."},
        ],
        tech: ["TypeScript", "Next.js", "NestJS", "PostgreSQL", "Prisma"],
        metric: "45%",
        result: "less loading latency through lazy loading and code splitting.",
        visual: "flow",
      },
      {
        title: "Smart City Analytics",
        company: "DD Solutions",
        problem:
          "Grafana dashboards needed a custom interface for exploring large urban datasets.",
        contribution:
          "I contributed to the dashboard migration, building typed React components and connecting the interface to REST APIs.",
        approach: [
          {title: "Build a reusable interface", text: "Contributed to moving Grafana dashboards to React and TypeScript, with reusable components for the analytical interface."},
          {title: "Connect and retrieve the data", text: "Integrated REST APIs and optimized legacy SQL queries, improving data retrieval performance by 25%."},
        ],
        tech: ["React", "TypeScript", "REST APIs", "SQL"],
        metric: "40%",
        result: "less loading time after the dashboard migration.",
        visual: "city",
      },
      {
        title: "Image Annotation Workflow",
        company: "DD Solutions",
        problem:
          "Manual analysis of urban and geospatial imagery was time-consuming.",
        contribution:
          "I developed an automated image annotation workflow as part of my work at DD Solutions.",
        approach: [
          {title: "Automate a repetitive step", text: "Built an annotation workflow for urban and geospatial imagery, streamlining the processing of urban data coordinates."},
          {title: "Reduce the manual workload", text: "The workflow reduced the time spent on manual image analysis. This was a professional contribution within DD Solutions."},
        ],
        tech: ["Image annotation", "Workflow automation", "Geospatial data"],
        metric: "60%",
        result: "less time spent on manual image analysis.",
        visual: "image",
      },
    ],
    stackTitle: "The right tools.\nConnected end to end.",
    stackIntro:
      "My core stack, followed by the tools I use to build, integrate, and ship.",
    stackNames: ["Frontend", "Backend", "Data", "Tools & Automation"],
    toolsNames: {},
    contactTitle: "Let’s build\nsomething useful.",
    contactIntro:
      "Have a product challenge or an engineering opportunity in mind? Let’s start a conversation.",
    explore: "Explore my GitHub",
    footer: "Built with care, from Fortaleza.",
    skip: "Skip to content",
    diagram:
      "Conceptual diagram connecting a user interface, an API, and a database.",
    diagramLabels: ["Interface", "API layer", "Data"],
  },
  pt: {
    ui: {
      about: "Sobre",
      experience: "Experiência",
      work: "Projetos",
      stack: "Stack",
      contact: "Contato",
      menu: "Abrir menu",
      close: "Fechar menu",
      copy: "Copiar e-mail",
      copied: "E-mail copiado",
      copyError:
        "Não foi possível copiar. Selecione o endereço para copiá-lo manualmente.",
      language: "Selecionar idioma",
      navigation: "Navegação principal",
    },
    description:
      "Angelo Costa, engenheiro de software full stack em Fortaleza. Interfaces rápidas, APIs confiáveis, automação jurídica e integrações de IA com TypeScript, React e Node.js.",
    role: "Engenheiro de Software Full Stack",
    eyebrow: "DA INTERFACE À INFRAESTRUTURA",
    headline: ["Problemas complexos.", "Produtos úteis."],
    intro:
      "Sou Angelo Costa, engenheiro full stack de Fortaleza. Transformo requisitos complexos em produtos úteis com React, Next.js, Node.js e TypeScript.",
    value:
      "Interfaces rápidas. APIs confiáveis. Automação que simplifica o trabalho.",
    viewWork: "Conheça meu trabalho",
    getInTouch: "Entre em contato",
    resume: "Baixar currículo",
    location: "Fortaleza, Brasil",
    scroll: "Explore os detalhes",
    aboutTitle: "Visão do todo.\nCuidado nos detalhes.",
    aboutParagraphs: [
      "Desenvolvo produtos web de ponta a ponta com TypeScript, React, Next.js, Node.js e NestJS, conectando interfaces responsivas a APIs confiáveis e bancos de dados PostgreSQL ou MongoDB.",
      "Na Docato e na DD Solutions, atuei com operações jurídicas e análise de dados urbanos: melhorando a performance de carregamento, criando componentes reutilizáveis e automatizando tarefas repetitivas. Meu foco é entender o problema, escrever código fácil de manter e simplificar o trabalho de quem usa o produto.",
    ],
    education:
      "Bacharelado em Ciência da Computação, Universidade de Fortaleza, junho de 2025.",
    languages: "Português / Inglês",
    experienceTitle: "Experiência com impacto.",
    workTitle: "Engenharia na prática.",
    workIntro:
      "Contribuições selecionadas em produtos profissionais. Desafios reais, engenharia focada e resultados documentados.",
    professional: "Contribuição profissional",
    conceptual: "Representação conceitual · não é uma captura do produto",
    problem: "O desafio",
    contribution: "Minha contribuição",
    result: "Resultado documentado",
    approachLabel: "A engenharia por trás",
    experiences: [
      {
        company: "Docato",
        role: "Desenvolvedor Full Stack",
        date: "Abr 2025 até o momento",
        context:
          "Desenvolvimento full stack para automação de operações jurídicas.",
        points: [
          "Desenvolvi soluções com Next.js e NestJS e APIs REST com JWT e controle de acesso por papéis (RBAC).",
          "Criei um design system reutilizável com Shadcn/UI e Tailwind CSS e trabalhei na performance de carregamento da interface.",
          "Atuei na performance dos relatórios com Prisma e PostgreSQL, junto ao desenvolvimento de funcionalidades full stack.",
          "Integrei fluxos de LLM e desenvolvi servidores MCP para automatizar tarefas repetitivas de engenharia.",
        ],
      },
      {
        company: "DD Solutions",
        role: "Desenvolvedor Front-end",
        date: "Out 2021 a Mar 2025",
        context: "Interfaces analíticas para dados urbanos e geoespaciais.",
        points: [
          "Contribuí para a modernização de dashboards Grafana com React e TypeScript para análise de dados urbanos.",
          "Desenvolvi automações de anotação de imagens em fluxos de dados urbanos e geoespaciais.",
          "Melhorei a performance de acesso aos dados por meio da otimização de consultas SQL legadas.",
          "Desenvolvi componentes React reutilizáveis e tipados, integrei APIs REST e trabalhei em deploys com Firebase e Vercel.",
        ],
      },
    ],
    cases: [
      {
        title: "Automação de Legal Ops",
        company: "Docato",
        problem:
          "Operações jurídicas complexas exigiam fluxos confiáveis, interfaces ágeis e relatórios eficientes sobre grandes bases de dados.",
        contribution:
          "Atuei na interface em Next.js, nas APIs em NestJS e nos relatórios com PostgreSQL para melhorar os fluxos de operações jurídicas.",
        approach: [
          {title: "Carregar a interface em partes menores", text: "Apliquei lazy loading e code splitting para reduzir a latência de carregamento, junto a componentes reutilizáveis com Shadcn/UI e Tailwind CSS."},
          {title: "Agilizar relatórios e controlar o acesso", text: "Otimizei consultas com Prisma e PostgreSQL, reduzindo o tempo dos relatórios em 40%. Desenvolvi APIs REST com autenticação JWT e controle de acesso por papéis."},
        ],
        tech: ["TypeScript", "Next.js", "NestJS", "PostgreSQL", "Prisma"],
        metric: "45%",
        result:
          "menos latência de carregamento com lazy loading e code splitting.",
        visual: "flow",
      },
      {
        title: "Análise de Dados Urbanos",
        company: "DD Solutions",
        problem:
          "Dashboards Grafana precisavam de uma interface própria para explorar grandes volumes de dados urbanos.",
        contribution:
          "Contribuí para a migração dos dashboards, criando componentes React tipados e conectando a interface a APIs REST.",
        approach: [
          {title: "Construir uma interface reutilizável", text: "Contribuí para a migração de dashboards Grafana para React e TypeScript, com componentes reutilizáveis para a interface analítica."},
          {title: "Integrar e recuperar os dados", text: "Integrei APIs REST e otimizei consultas SQL legadas, melhorando a recuperação de dados em 25%."},
        ],
        tech: ["React", "TypeScript", "APIs REST", "SQL"],
        metric: "40%",
        result: "menos tempo de carregamento após a migração dos dashboards.",
        visual: "city",
      },
      {
        title: "Fluxo de Anotação de Imagens",
        company: "DD Solutions",
        problem:
          "A análise manual de imagens urbanas e geoespaciais consumia muito tempo.",
        contribution:
          "Desenvolvi um fluxo automatizado de anotação de imagens como parte da minha atuação na DD Solutions.",
        approach: [
          {title: "Automatizar uma etapa repetitiva", text: "Construí um fluxo de anotação para imagens urbanas e geoespaciais, agilizando o processamento de coordenadas de dados urbanos."},
          {title: "Diminuir o trabalho manual", text: "O fluxo reduziu o tempo dedicado à análise manual de imagens. Foi uma contribuição profissional dentro da DD Solutions."},
        ],
        tech: [
          "Anotação de imagens",
          "Automação de fluxos",
          "Dados geoespaciais",
        ],
        metric: "60%",
        result: "menos tempo gasto com análise manual de imagens.",
        visual: "image",
      },
    ],
    stackTitle: "As ferramentas certas.\nConectadas de ponta a ponta.",
    stackIntro:
      "Minha stack principal e as ferramentas que uso para desenvolver, integrar e entregar.",
    stackNames: ["Frontend", "Backend", "Dados", "Ferramentas e automação"],
    toolsNames: {
      "LLM workflows": "Fluxos de LLM",
      "MCP servers": "Servidores MCP",
      "REST APIs": "APIs REST",
    },
    contactTitle: "Vamos construir\nalgo útil.",
    contactIntro:
      "Tem um desafio de produto ou uma oportunidade em engenharia? Vamos conversar.",
    explore: "Explore meu GitHub",
    footer: "Feito com cuidado, em Fortaleza.",
    skip: "Pular para o conteúdo",
    diagram:
      "Diagrama conceitual conectando uma interface, uma API e um banco de dados.",
    diagramLabels: ["Interface", "Camada de API", "Dados"],
  },
};
