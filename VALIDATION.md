# Verificação

## Hierarquia e apresentação profissional: 31/10/2026

Hero com cargo mais visível, proposta de valor EN/PT e ícones de TypeScript, React e Node.js junto aos nomes da stack. Estudos de caso extraídos para `selected-work.tsx` e enriquecidos com passos técnicos tipados, usando apenas as contribuições já documentadas. Métricas preservadas; os parágrafos da experiência deixam de repetir os números apresentados em destaque.

Stack complementar sem duplicar as oito tecnologias principais, remoção de setas em cards sem ação, hover discreto, feedback de sucesso/erro na cópia do e-mail e expansão nativa de experiências com transição de altura. Conteúdo, teclado e funcionamento sem suporte à transição preservados.

Lint, typecheck e build aprovados. Dez testes Playwright passaram, incluindo a nova verificação de expansão/recolhimento graduais. Capturas em 360/768/1440 px para EN/PT; hero e estudos de caso inspecionados visualmente. Na primeira execução concorrente, a troca de idioma em desktop excedeu o prazo durante a compilação de desenvolvimento; a verificação isolada e a suíte completa seguinte passaram. Sem pontuação Lighthouse presumida e sem deploy.

## Motion e navegação suave: 31/10/2026

Motion ativado por padrão conforme solicitado pelo autor, inclusive sob preferência de movimento reduzido do sistema. Uma escolha explícita de desligar continua persistida. Esse comportamento substitui o padrão descrito nas etapas históricas abaixo.

Navegação por âncoras com aceleração/desaceleração, compensação do cabeçalho, foco no destino e atualização do histórico. Roda, toque e teclas interrompem a animação. Indicador ativo do menu com transição compartilhada, abertura/fechamento do menu mobile suavizados e entrada dos cards mais discreta.

Lint, typecheck e build de produção aprovados. Dez testes Playwright passaram contra o servidor de desenvolvimento, incluindo o novo teste de deslocamento gradual, interrupção, histórico, foco e navegação imediata com Motion desligado. Sem medição de Lighthouse ou deploy.

## Refinamento do card Sobre e dos hovers

Texto EN/PT reescrito para apresentar escopo full stack, stack principal e experiência em Docato/DD Solutions. Sem menção a desenvolvimento de MCP no card Sobre.

Cards da referência `awrs.me/en` inspecionados no navegador, inclusive estilos computados: iluminação radial no ponteiro e transições de borda/sombra/transformação. Aplicados ao projeto com springs para o ponteiro, fade de saída, entrada escalonada sem blur, deslocamentos menores e transições de 450–700 ms. Corrigido o conflito entre a preferência de movimento reduzido e a ativação explícita do usuário. Em modo reduzido, os cards não saltam ao passar o mouse.

Lint, TypeScript e build aprovados. Sete testes passaram contra `npm start`, incluindo hover real, fade da iluminação, opt-in sob movimento reduzido, teclado, idiomas e responsividade. Captura do card revisada em `test-results/about-card.png` (artefato local de teste, ignorado pelo Git).

## Reformulação visual — resultado mais recente

Referência principal: `https://awrs.me/en`, examinada visualmente. Hero com nome em destaque, navegação em cápsula, faixa animada com pausa, composição em blocos na seção Sobre, oito cards principais de tecnologias com ícones locais, cards secundários e timeline profissional ampliada.

Contexto, áreas de contribuição, métricas e detalhes expansíveis foram adicionados em EN/PT sem ampliar as responsabilidades dos currículos. O valor de R$ 1,6 bilhão foi atribuído à plataforma Docato.

Animações de entrada, fluxo no diagrama e iluminação por ponteiro implementadas. A preferência do sistema é respeitada por padrão e acompanhada em tempo real. O controle “Motion / Animações” permite escolha explícita durante a visita. Corrigida a atualização da preferência após mudança com a página aberta.

Build final, lint e TypeScript aprovados. Seis testes Playwright passaram contra o servidor de produção local (`npm start`), incluindo os novos testes de cards, expansão por teclado, pausa da faixa, mudança dinâmica da preferência de movimento e ativação manual. Larguras 360/768/1440 px verificadas em EN/PT. O teste inicial contra o servidor de desenvolvimento frio antecipou cliques antes de carregar a interatividade; a validação final foi feita no build de produção.

Servidor local na porta 3000. Desktop e mobile inspecionados, com revisão dos cards e da timeline. Sem deploy. Lighthouse não medido.

Os registros abaixo documentam as etapas anteriores.

## Concluído

- Leitura integral dos dois currículos com pypdf; datas, formação, idiomas e resultados conferidos.
- Novos currículos fornecidos pelo autor copiados integralmente da raiz para `public/resume/`. Os dois links por idioma foram conferidos; ambos os downloads retornaram HTTP 200 com bytes idênticos aos novos arquivos. SHA-256:
  - EN: `AC01D6FA689F4C5CC0D7072DEC6AA03FA39E6A328201F6A1311EB7FE379D68F4`
  - PT: `7AB17C52F1CF3731F3EC70804D414CE9DE1C897ECA5CAF63392234D4AA080992`
- Análise sintática de 13 arquivos TS/TSX via `transpileModule`, sem diagnósticos, usando uma instalação local existente do TypeScript 5.4.5, em modo somente leitura.
- Checagem semântica estrita isolada de `src/data/content.ts`, sem erros. Isso **não substitui** o typecheck completo com as dependências do projeto.
- Contraste calculado para texto principal `#fafafa` sobre `#09090b`: 19,06:1; secundário `#a1a1aa` sobre `#111115`: 7,35:1; destaque `#a78bfa` sobre `#09090b`: 7,31:1.
- O botão primário foi escurecido para `#7c3aed`, pois branco sobre o roxo inicial `#8b5cf6` resultou em apenas 4,23:1. Isso não constitui uma auditoria WCAG completa.
- Revisão do código: rotas localizadas, mensagens tipadas, PDFs condicionais à existência do arquivo, diálogo modal nativo, foco após fechar menu, Escape nativo, skip link, âncoras reais, movimento reduzido, metadados por idioma e ausência de formulário fictício.

## Histórico do bloqueio inicial (resolvido na retomada)

`npm install` falhou com `EACCES` ao acessar `https://registry.npmjs.org/`. Uma tentativa com cache dentro da pasta do projeto e sem retries confirmou o bloqueio. Não foi possível obter todas as dependências exigidas a partir das instalações/cache locais. Não se substituiu Next.js ou next-intl por implementações simuladas.

Comandos solicitados foram executados:

| Comando | Resultado |
| --- | --- |
| `npm run lint` | Não iniciou: `eslint` não instalado |
| `npm run typecheck` | Não iniciou: `tsc` não instalado no projeto |
| `npm run build` | Não iniciou: `next` não instalado |
| `npm run dev` | Não iniciou: `next` não instalado |

Não há servidor rodando, build aprovado, lockfile gerado nem validação visual/funcional em navegador. Nenhum resultado Lighthouse é alegado. Os testes Playwright foram escritos, mas ainda não executados. As versões declaradas precisam ser resolvidas pelo npm e validadas em conjunto.

## Resultado da retomada

As dependências ficaram disponíveis e a instalação concluiu. O lockfile registra Next.js 16.4.3 e next-intl 4.14.9. Os bloqueios e resultados negativos acima pertencem à primeira tentativa e foram superados.

Correções realizadas:

- ESLint ignora o cache local de ferramentas; configuração PostCSS e navegação interna corrigidas, sem avisos.
- Alias `next-intl/config` configurado em Turbopack e Webpack para manter next-intl sem carregar seu compilador de extração de mensagens, que não é utilizado e falhava ao acessar o cache nativo SWC. Nenhuma permissão do sistema foi alterada.
- Grid do hero corrigido com `minmax(0, 1fr)`: eliminado o overflow detectado em 360 px.
- Opção `PLAYWRIGHT_CHANNEL` adicionada para utilizar Chrome instalado nos testes.

Verificações finais:

| Verificação | Resultado |
| --- | --- |
| `npm run lint` | Aprovado, sem avisos |
| `npm run typecheck` | Aprovado |
| `npm run build` | Aprovado; `/en` e `/pt` pré-renderizados |
| `npm run dev` | Rodando em http://localhost:3000 |
| Playwright com Chrome | 9 testes aprovados contra o servidor de desenvolvimento |
| `/en`, `/pt` e Open Graph de ambos | HTTP 200; imagens PNG válidas na resposta |

Os testes executados cobrem overflow em 360/768/1440 px nos dois idiomas, redirecionamento, troca de idioma com seção, menu/Escape/foco, clipboard, PDFs localizados, movimento reduzido, canonical, hreflang, sitemap, robots, locale inválido e erros do navegador. Desktop inspecionado visualmente e aberto no Chrome. Lighthouse não foi medido.

## Comandos para reproduzir

1. `npm install`.
2. `npm run lint` e `npm run typecheck`.
3. `npm run build`.
4. `npx playwright install chromium` e `npm run test:e2e`.
5. Inspecionar visualmente `/en` e `/pt` a 360, 768 e 1440 px; testar teclado, downloads e clipboard.
6. Definir `SITE_URL` com o domínio real antes de gerar o build de produção.

Nenhum deploy ou publicação foi realizado.

## Refinamento visual com base em awrs.me

Hero centralizado com entrada escalonada do nome e conexões SVG, duas faixas diagonais com pausa compartilhada, indicação da seção ativa na navegação, bento com globo conceitual e uma grade de estudos com um caso principal. Conteúdo profissional, idiomas sem níveis e PDFs novos preservados.

Lint, typecheck, build e os nove testes Playwright aprovados. Capturas do hero, Sobre e Projetos verificadas em 360, 768 e 1440 px, armazenadas em `test-results/`. Os testes verificam também o nome completamente visível, a indicação da seção ativa e a pausa das duas faixas. O controle da aba pessoal do Chrome estava desativado nesta sessão; a revisão utilizou capturas do navegador de testes. Lighthouse não medido.
