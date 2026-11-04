# Angelo Costa — Portfolio

Portfólio em Next.js App Router, TypeScript estrito, Tailwind CSS 4, Motion, Lucide e next-intl. Conteúdo estático em Server Components; interatividade isolada em `src/components/interactions.tsx`. Dark mode exclusivo. Nenhum backend, autenticação ou banco de dados.

## Executar

Node.js 20.9+ e npm são necessários.

```sh
npm install
npm run dev
```

Abra http://localhost:3000/en. `/` redireciona permanentemente para `/en`; português está em `/pt`. O `package-lock.json` registra as versões instaladas. Use `npm ci` para reproduzir a instalação.

```sh
npm run lint
npm run typecheck
npm run build
npm start
```

O build deve pré-renderizar `/en` e `/pt`. Não há detecção automática do idioma do navegador. O seletor mantém o fragmento da seção e também identifica a seção visível após rolagem manual.

## Conteúdo e traduções

- `src/data/content.ts`: perfil, contatos, traduções tipadas, experiências, estudos profissionais e tecnologias. Inglês e português devem respeitar o mesmo tipo `Copy`.
- `src/data/experience.ts`: contexto das empresas, métricas e detalhes técnicos expandidos em EN/PT.
- `src/data/presentation.ts`: textos tipados do hero, faixas e cards de apresentação em EN/PT.
- `src/components/selected-work.tsx`: estudos profissionais com desafio, contribuição, tecnologias, resultado e abordagem técnica. Edite os passos em `cases[].approach` de `src/data/content.ts`, mantendo apenas fatos confirmados.
- `src/components/tech-icon.tsx`: ícones SVG locais e símbolos Lucide; não depende de CDN.
- `src/components/stack.tsx`, `about.tsx` e `experience.tsx`: cards da stack, composição da seção Sobre e timeline profissional.
- `src/i18n/request.ts`: mensagens do next-intl, usadas pelos controles interativos.
- `src/app/[locale]/page.tsx`: estrutura semântica da página.
- `src/app/globals.css`: direção visual, breakpoints, animações e movimento reduzido.
- `src/app/refinement.css`: composição centralizada, faixas cruzadas, bento, grade de projetos e ajustes responsivos inspirados na referência awrs.me.
- `src/components/visuals.tsx`: ilustrações conceituais SVG/CSS, sem imagens internas de empresas.

Os dados profissionais foram conferidos nos dois PDFs fornecidos. A descrição da migração na DD Solutions usa a atribuição conservadora “contribuiu”, pois os currículos divergem entre liderança e colaboração. As métricas pertencem às contribuições profissionais descritas. Não há projetos pessoais não verificados, depoimentos, níveis de senioridade nem alegação de disponibilidade. O valor financeiro da Docato aparece nos detalhes técnicos atribuído explicitamente à plataforma.

O controle “Motion / Animações” permite ativar ou desativar o movimento durante a visita. Por solicitação do autor, as animações iniciam ativadas, inclusive quando o sistema prefere movimento reduzido. Uma escolha explícita de desligar fica salva neste navegador e permanece após atualizar ou trocar de idioma. As duas faixas possuem um controle compartilhado de pausa. Os efeitos de ponteiro só são aplicados com mouse.

`src/components/section-navigation.tsx` controla os cliques em âncoras locais: aceleração e desaceleração suaves, compensação da altura do cabeçalho, histórico e foco no destino. Roda do mouse, toque e teclas de navegação interrompem a transição. Com Motion desligado, a navegação é imediata. A rolagem manual mantém o comportamento nativo.

## Currículos e imagens

Os novos PDFs fornecidos pelo autor foram copiados integralmente para os caminhos abaixo, preservando seu conteúdo. Os botões do hero e da seção de contato baixam a versão correspondente ao idioma:

- `public/resume/angelo-costa-en.pdf`
- `public/resume/angelo-costa-pt.pdf`

Substitua mantendo esses nomes e gere outro build. Os links são omitidos quando o arquivo correspondente não existe no momento do build. Não há telefone no HTML da página; os PDFs mantêm os contatos fornecidos pelo autor.

Para screenshots reais autorizadas, adicione arquivos em `public/images/` e utilize `next/image` com dimensões e texto alternativo traduzido. Substitua a ilustração correspondente e remova seu rótulo conceitual somente quando a imagem realmente representar o produto. Não publique código privado, imagens internas ou dados de clientes. O favicon está em `src/app/icon.svg`; o Open Graph localizado é gerado em `src/app/[locale]/opengraph-image.tsx`.

As fontes de sistema evitam downloads externos e deslocamentos por troca de fonte. Os SVGs são leves e não carregam dependências 3D.

## Domínio e deploy

Canonical, hreflang, sitemap e Open Graph usam `SITE_URL` quando configurada. Na Vercel, o projeto utiliza automaticamente `VERCEL_PROJECT_PRODUCTION_URL` com HTTPS. Localmente, o fallback é `http://localhost:3000`. Para definir uma origem específica, configure `SITE_URL` com o domínio HTTPS, sem caminho, antes do build de produção.

Na Vercel, importe o repositório e selecione Next.js. Também é possível publicar esta pasta sem Git: execute `npx vercel login` e depois `npx vercel --prod`, usando `angelo-costa-portfolio` como nome do projeto e `./` como diretório. Mantenha as configurações detectadas para Next.js. O arquivo `.vercelignore` exclui caches, arquivos temporários e PDFs da raiz; os currículos em `public/resume/` continuam incluídos. Adicione um domínio próprio no painel da Vercel e aplique os registros DNS indicados pelo provedor. Em outro host compatível com Node.js, configure `SITE_URL`, instale dependências, execute `npm run build` e sirva com `npm start` atrás de HTTPS. O redirecionamento de `/` usa a configuração do Next.js; este projeto não é um export estático sem servidor.

## Validação

```sh
npx playwright install chromium
npm run test:e2e
```

Os testes cobrem 360, 768 e 1440 px, overflow horizontal, menu/Escape/foco, troca de idioma com seção, clipboard, PDFs, movimento reduzido, persistência da escolha de animações, canonical, hreflang, sitemap, robots e erros do navegador. Para inspeção visual, abra ambos os idiomas nas três larguras e percorra todas as seções. Lighthouse deve ser medido contra `npm run build` + `npm start`; não há pontuação presumida.

### Estado das verificações neste ambiente

Lint, typecheck e build de produção aprovados. Os dez testes Playwright passaram com o Chrome instalado contra `npm run dev`. Em PowerShell, use `$env:PLAYWRIGHT_CHANNEL='chrome'; npm run test:e2e` para essa opção; sem a variável, os testes usam o Chromium do Playwright. A suíte reutiliza o servidor na porta 3000, ou inicia `npm run dev` se não houver servidor. Desktop e mobile foram inspecionados visualmente. Lighthouse não foi medido. Consulte `VALIDATION.md`.

Motion inicia ligado, salvo quando o visitante já o desligou explicitamente. Se o armazenamento estiver bloqueado, o botão continua funcionando durante a sessão do componente. A suíte verifica esse padrão, a persistência da escolha, a rolagem animada, sua interrupção, o histórico e o foco no destino.

Os cards respondem ao hover e ao foco dos links internos mesmo com Motion desligado. Nesse modo, apenas cores e bordas mudam; elevação, zoom e luz seguindo o ponteiro ficam reservados ao movimento ativado. O teste de regressão cobre os seis grupos de cards com movimento reduzido.

O hero destaca cargo, proposta de valor e stack com ícones locais. As oito tecnologias principais aparecem uma única vez na seção Stack, seguidas das ferramentas complementares. Cards informativos não têm setas de navegação. Os detalhes da experiência preservam o elemento nativo `details`, com transição progressiva de altura quando suportada e Motion ligado; navegadores antigos mantêm abertura e fechamento nativos. O teste verifica a expansão e o recolhimento graduais no Chrome.

O arquivo `.vscode/settings.json` desativa a integração automática do Console Ninja com Next.js e Webpack somente neste workspace. A versão instalada da extensão injetava código nos arquivos JavaScript servidos e truncava a resposta, causando erros de sintaxe e impedindo a hidratação. Após corrigir essa integração, reinicie o servidor e recarregue os arquivos do navegador se houver cache antigo.

O `next.config.ts` configura o alias `next-intl/config` explicitamente em Turbopack e Webpack. Isso mantém o next-intl sem carregar o compilador de extração de mensagens do plugin 4.14.9, cujo cache nativo SWC falhou pelas permissões deste Windows. O projeto não utiliza extração ou pré-compilação experimental de mensagens. Revise essa integração caso adicione essas funções futuramente.

## Referências consultadas

Composição e organização estudadas a partir de https://awrs.me/en, https://aakarsh-devhq.vercel.app/, https://www.abdulmomin.dev/, https://alisaleem252.com/ e https://lugotech.dev/. As demais referências não forneceram conteúdo legível ou estavam inacessíveis. Identidade e ilustrações próprias, sem copiar assets. O GitHub informado não retornou dados verificáveis nesta sessão; foi mantido apenas o link real do perfil.

Documentação: https://nextjs.org/docs/app/getting-started/installation e https://next-intl.dev/docs/routing/setup.

Transições nativas de detalhes: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/::details-content.
