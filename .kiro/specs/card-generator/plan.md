# Implementation Plan: Refatoração Visual do Gerador de Cartões

**Date**: 2026-09-25 | **Spec**: [spec.md](./spec.md)

## Summary

Refatorar a camada CSS da interface existente para oferecer uma apresentação mais profissional, atraente e responsiva, sem alterar o fluxo funcional de criação, pré-visualização, persistência ou exportação de cartões. A implementação centraliza tokens visuais, melhora espaçamentos e controles, reforça os estados interativos e reorganiza o layout para viewports desktop, tablet e mobile.

## Technical Context

**Language/Version**: HTML5, CSS3 e JavaScript existente  
**Primary Dependencies**: Nenhuma dependência obrigatória; fontes remotas existentes devem ter fallback local  
**Storage**: LocalStorage existente, sem alteração  
**Testing**: Testes estruturais em `tests/structure.test.js` e inspeção manual em viewports de 320 px, 768 px e 1280 px  
**Target Platform**: Navegadores modernos em desktop, tablet e celular  
**Performance Goals**: A página deve manter carregamento visual leve; sombras, gradientes e transições devem ser moderados  
**Constraints**: Preservar a estrutura HTML, os seletores usados pelo JavaScript e o comportamento funcional existente; não introduzir framework ou backend

## Constitution Check

- **Preservação do comportamento existente**: PASS — a mudança será limitada à apresentação e aos estados visuais.
- **Acessibilidade e clareza**: PASS — foco visível, contraste, redução de movimento e fallback tipográfico fazem parte do plano.
- **Simplicidade arquitetural**: PASS — será utilizado CSS existente, sem dependências adicionais.
- **Responsividade**: PASS — o plano valida as larguras de 320 px, 768 px e 1280 px.

## Applied Guidelines

- **CSS responsivo progressivo**: manter layout fluido com grid/flex, `minmax`, `clamp` e breakpoints objetivos.
- **Design tokens**: centralizar cores, espaçamentos, raios e sombras em custom properties para evitar valores inconsistentes.
- **Acessibilidade visual**: não comunicar estado apenas por cor; manter foco, contraste e estados de interação perceptíveis.
- **Reduced motion**: limitar transições e transformações quando `prefers-reduced-motion` estiver ativo.

## Implementation Steps

### Step 1: [Cross-cutting] Consolidar tokens e fundação visual
- **Requirements**: REQ-002, REQ-003, REQ-004, REQ-005
- **Design inputs**: Paleta moderna, tipografia limpa, sombras leves e tokens reutilizáveis definidos em [spec.md](./spec.md).
- **Description**: Refatorar o bloco `:root` de `styles/styles.css` para definir tokens de cor, tipografia, espaçamento, raios e elevação. Ajustar o fundo geral, a tipografia base e os fallbacks sem modificar nomes de classes ou IDs consumidos pela interface.

### Step 2: [Cross-cutting] Refinar cabeçalho, painéis e espaçamento
- **Requirements**: REQ-001, REQ-005
- **Design inputs**: Hierarquia visual entre cabeçalho e painéis; acabamento com bordas e sombras leves.
- **Description**: Melhorar ritmo vertical, largura máxima, padding, bordas, raios e hierarquia de `site-header`, `.layout`, `.panel`, `h1` e `h2`, garantindo que formulário, preview e lista continuem claramente agrupados.

### Step 3: [Cross-cutting] Melhorar campos, botões e estados interativos
- **Requirements**: REQ-006, REQ-007, REQ-014
- **Design inputs**: Estados de foco, hover, desabilitado, erro e sucesso verificáveis.
- **Description**: Refinar `input`, `textarea`, `select`, `button`, `#save-card` e `.secondary-button`, incluindo área de toque, transições discretas, foco visível e diferenciação de estados sem depender apenas de cor. Preservar os seletores existentes para o JavaScript.

### Step 4: [US1] [Cross-cutting] Reequilibrar o layout da pré-visualização e dos cartões salvos
- **Requirements**: REQ-001, REQ-005, REQ-011
- **Design inputs**: Fluxo de criação, pré-visualização dinâmica e lista de cartões já existentes.
- **Description**: Ajustar `.card-preview`, seus elementos internos e `.saved-card-item` para melhorar proporção, legibilidade, contraste, quebra de texto e relação visual entre conteúdo e ações, preservando os temas e layouts funcionais existentes.

### Step 5: [US2] [Cross-cutting] Aplicar responsividade por viewport
- **Requirements**: REQ-008, REQ-009, REQ-010
- **Design inputs**: Viewports-alvo de 320 px, 768 px e 1280 px.
- **Description**: Reorganizar media queries para evitar overflow horizontal, definir transição de três colunas para duas colunas e depois uma coluna, preservar espaçamento e garantir que campos, botões e ações permaneçam acessíveis em telas estreitas.

### Step 6: [US3] [Cross-cutting] Tratar conteúdo longo, fallback e movimento reduzido
- **Requirements**: REQ-011, REQ-012, REQ-013
- **Design inputs**: Casos-limite de texto longo, falha de fonte remota e preferência por menos movimento.
- **Description**: Garantir `overflow-wrap` e dimensionamento seguro no cartão e na lista, declarar fallbacks tipográficos robustos e adicionar `@media (prefers-reduced-motion: reduce)` para remover transformações e reduzir transições sem ocultar estados.

### Step 7: [Cross-cutting] Validar visualmente e estruturalmente
- **Requirements**: REQ-003, REQ-006, REQ-008, REQ-014
- **Design inputs**: Critérios de sucesso e checklist de requisitos.
- **Description**: Executar os testes estruturais existentes e realizar inspeção manual em 320 px, 768 px e 1280 px, verificando contraste dos elementos essenciais, foco por teclado, ausência de overflow horizontal, legibilidade dos cartões e preservação dos painéis.

## Project Structure

```text
card-generator/
├── index.html
├── script.js
├── styles/
│   └── styles.css        # refatoração visual principal
├── tests/
│   └── structure.test.js # validação estrutural existente
└── .kiro/specs/card-generator/
    ├── spec.md
    ├── plan.md
    ├── requirements-checklist.md
    └── checkpoints/
```

## Task Breakdown

### Phase 1: Foundational CSS

- [ ] T001 [Plan:1.1] Refatorar os tokens visuais em `card-generator/styles/styles.css`, centralizando paleta, tipografia, espaçamentos, raios e sombras sem remover classes ou IDs existentes.

### Phase 2: P1 — Interface visual clara

- [ ] T002 [P] [US1] [Plan:2.1] Ajustar cabeçalho, grid principal e painéis em `card-generator/styles/styles.css` para reforçar hierarquia, espaçamento e agrupamento visual.
- [ ] T003 [P] [US1] [Plan:2.2] Refinar campos, botões e estados de foco, hover, erro, sucesso e desabilitado em `card-generator/styles/styles.css`, mantendo os seletores usados por `card-generator/script.js`.
- [ ] T004 [US1] [Plan:2.3] Reequilibrar a pré-visualização e os itens de cartões salvos em `card-generator/styles/styles.css`, preservando temas, layouts e quebra de textos longos.

### Phase 3: P1 — Responsividade e acessibilidade visual

- [ ] T005 [US2] [Plan:3.1] Reorganizar os breakpoints responsivos em `card-generator/styles/styles.css` para atender 320 px, 768 px e 1280 px sem overflow horizontal ou sobreposição.
- [ ] T006 [P] [US3] [Plan:3.2] Adicionar fallback tipográfico, suporte a `prefers-reduced-motion` e regras de conteúdo longo em `card-generator/styles/styles.css`.
- [ ] T007 [US3] [Plan:4.1] Validar por teclado e viewport os estados e áreas de toque de `card-generator/index.html` e `card-generator/styles/styles.css`, sem alterar a lógica de `card-generator/script.js`.

### Phase 4: Polish and Cross-Cutting Validation

- [ ] T008 [Plan:4.1] Executar `node --test card-generator/tests/structure.test.js` e registrar a verificação manual dos estados visuais e viewports definidos em `card-generator/.kiro/specs/card-generator/spec.md`.

## Testing Strategy

- **appType**: Página HTML estática interativa.
- **Critical user journeys**:
  - Abrir a página e identificar formulário, pré-visualização e cartões salvos.
  - Preencher o formulário e acompanhar a pré-visualização sem perda de contexto.
  - Navegar por teclado e usar a interface em telas estreitas.
- **primaryValidationStack**: `node --test` para estrutura e inspeção em navegador para comportamento visual.
- **fallbackMatrix**:
  - `browser-tier`: navegador moderno → inspeção por viewport equivalente; perda de cobertura apenas para validação de interação real.
  - `contrast-tier`: ferramenta de contraste disponível → inspeção manual dos pares de cores essenciais.
- **Environment requirements**: Node.js para testes existentes e navegador moderno com ferramentas de viewport.
- **knownGaps**: o teste estrutural não mede pixels, contraste calculado ou ausência de overflow; esses pontos exigem inspeção visual ou ferramenta de acessibilidade.
- **Test data strategy**: usar valores curtos e longos para nome, cargo, e-mail e links sociais; limpar dados locais após validar o fluxo.
- **Acceptance criteria**: todos os testes estruturais passam; nenhuma viewport-alvo apresenta rolagem horizontal; foco é visível; painéis e ações permanecem utilizáveis.
- **Validation review expectations**: confirmar que a refatoração é apenas visual, não quebra os seletores do JavaScript e cobre todos os `REQ-XXX`.

## Requirement Mapping

| REQ ID | Description | Plan Items | Implementation Evidence |
|--------|-------------|------------|--------------------------|
| REQ-001 | Hierarquia visual consistente | 2.1, 2.3 | `styles/styles.css`: cabeçalho, layout e painéis |
| REQ-002 | Paleta em tokens reutilizáveis | 1.1 | `styles/styles.css`: `:root` |
| REQ-003 | Contraste mínimo nos elementos essenciais | 1.1, 4.1 | Tokens CSS e validação manual |
| REQ-004 | Tipografia limpa e hierárquica | 1.1, 3.2 | Fontes, fallbacks e escala tipográfica |
| REQ-005 | Bordas, raios e sombras leves | 1.1, 2.1, 2.3 | Painéis, controles e pré-visualização |
| REQ-006 | Foco visível | 2.2, 4.1 | Estados `:focus-visible` e navegação por teclado |
| REQ-007 | Estados interativos distinguíveis | 2.2 | Estados de controles e mensagens |
| REQ-008 | Responsividade de 320 px a 1440 px | 3.1 | Media queries e layout fluido |
| REQ-009 | Uma coluna e áreas de toque em telas estreitas | 3.1, 4.1 | Breakpoint mobile e controles |
| REQ-010 | Reorganização em viewports intermediárias | 3.1 | Breakpoint tablet |
| REQ-011 | Legibilidade e quebra na pré-visualização | 2.3, 3.2 | `.card-preview` e conteúdo longo |
| REQ-012 | Respeito a movimento reduzido | 3.2 | `prefers-reduced-motion` |
| REQ-013 | Fallback quando fonte remota falhar | 3.2 | `font-family` com fallbacks |
| REQ-014 | Verificação estrutural e por viewport | 2.2, 4.1 | `tests/structure.test.js` e checklist manual |
