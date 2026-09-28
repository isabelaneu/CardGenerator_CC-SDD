# Especificação de Feature: Identidade Visual Profissional do Gerador de Cartões

> Governado por: `./constitution.md` (quando disponível)

**Feature Branch**: `visual-design-card-generator`  
**Criado em**: 2026-09-25  
**Status**: Draft  
**Entrada**: “Adicionar requisitos de design visual profissional para a interface do gerador de cartões, incluindo paleta de cores moderna, tipografia limpa, sombras leves e responsividade.”

## Scope Baseline

- **Método de descoberta**: inspeção da estrutura existente do `card-generator`, incluindo `index.html`, `styles/styles.css` e `tests/structure.test.js`, além dos requisitos e design já registrados para o gerador.
- **Total de itens descobertos**: 3 superfícies diretamente relacionadas à interface e validação estrutural.
- **Itens em escopo**: 3 (estrutura semântica da interface, camada visual CSS e critérios verificáveis de responsividade/acessibilidade).
- **Fora de escopo**: novas funções de negócio, autenticação, armazenamento, exportação, alteração do modelo de dados ou mudança do fluxo de criação/edição de cartões.

## User Scenarios & Testing

### User Story 1 - Criar um cartão em uma interface visualmente clara (Priority: P1)

Como profissional que precisa criar um cartão digital, quero identificar rapidamente formulário, pré-visualização e cartões salvos, para concluir a tarefa sem esforço visual desnecessário.

**Por que esta prioridade**: a hierarquia visual é essencial para o fluxo principal e deve beneficiar qualquer usuário antes de melhorias cosméticas secundárias.

**Teste independente**: abrir a interface em uma viewport desktop, confirmar a diferenciação visual dos três painéis e preencher o formulário sem perder a localização do estado de pré-visualização.

**Acceptance Scenarios**:

1. **Dado** que a página foi aberta em uma viewport de pelo menos 1024 px, **quando** o usuário observa a tela, **então** o cabeçalho, o formulário, a pré-visualização e os cartões salvos apresentam hierarquia visual consistente, com títulos, espaçamentos e agrupamentos distinguíveis.
2. **Dado** que o usuário navega pelos campos, **quando** posiciona o foco em um controle, **então** o foco fica claramente visível sem depender apenas da cor.

### User Story 2 - Perceber uma identidade visual moderna e consistente (Priority: P1)

Como usuário, quero uma paleta contemporânea, tipografia legível e acabamento visual equilibrado, para confiar no resultado profissional do cartão gerado.

**Por que esta prioridade**: a percepção de qualidade da interface influencia diretamente a confiança no cartão final e no produto.

**Teste independente**: comparar a tela com a lista de tokens visuais desta especificação e verificar cores, fontes, contraste, bordas e sombras nos elementos principais.

**Acceptance Scenarios**:

1. **Dado** que a interface está carregada, **quando** o usuário percorre cabeçalho, painéis, controles e botões, **então** os elementos usam uma paleta compartilhada, sem combinações arbitrárias ou estilos conflitantes.
2. **Dado** que o usuário visualiza um painel ou botão, **quando** observa sua superfície, **então** a profundidade é indicada por bordas e sombras suaves, sem sombras pesadas que prejudiquem a leitura.
3. **Dado** que o usuário lê títulos, rótulos e valores do cartão, **quando** compara os níveis tipográficos, **então** títulos, texto auxiliar e conteúdo têm pesos e tamanhos distinguíveis e legíveis.

### User Story 3 - Usar o gerador em diferentes tamanhos de tela (Priority: P1)

Como usuário em computador, tablet ou celular, quero que a interface se adapte ao espaço disponível, para criar e revisar cartões sem rolagem horizontal ou controles difíceis de tocar.

**Por que esta prioridade**: o gerador é uma experiência web e deve permanecer utilizável em dispositivos comuns, inclusive em telas estreitas.

**Teste independente**: executar a interface em viewports de 320 px, 768 px e 1280 px, redimensionar a janela e verificar layout, legibilidade e interação.

**Acceptance Scenarios**:

1. **Dado** que a viewport tem 320 px de largura, **quando** a página é exibida, **então** não há rolagem horizontal, o formulário usa uma coluna e os controles permanecem totalmente visíveis.
2. **Dado** que a viewport tem entre 768 px e 1023 px, **quando** a página é exibida, **então** os painéis se reorganizam sem sobreposição e a pré-visualização continua identificável.
3. **Dado** que a viewport tem pelo menos 1024 px, **quando** a página é exibida, **então** o layout aproveita o espaço disponível sem esticar excessivamente campos ou cartão.
4. **Dado** que o usuário toca em um botão ou campo em tela estreita, **quando** interage com o controle, **então** a área de toque é confortável e o texto não fica cortado.

### Edge Cases

- Quando uma viewport é muito estreita, textos longos de nome, e-mail ou links sociais devem quebrar dentro do cartão sem causar overflow.
- Quando o navegador não carrega a fonte externa, a interface deve usar uma família de fallback limpa e manter a hierarquia legível.
- Quando o usuário ativa alto contraste ou prefere menos movimento, a interface deve continuar compreensível; efeitos decorativos e transformações não podem ser necessários para entender o estado.
- Quando um controle está desabilitado, seu estado deve ser distinguível por aparência e cursor, preservando contraste suficiente para a informação contextual.

## Requirements

### Functional Requirements

- **REQ-001**: A interface MUST apresentar uma hierarquia visual consistente entre cabeçalho, painel de dados, painel de pré-visualização e lista de cartões salvos, preservando os agrupamentos e a ordem do fluxo existente.
- **REQ-002**: A interface MUST usar uma paleta de cores moderna e centralizada em tokens reutilizáveis, contendo pelo menos cores distintas para fundo, superfície, texto principal, texto secundário, borda, ação primária, ação secundária, sucesso e erro.
- **REQ-003**: A paleta MUST manter contraste suficiente para texto e controles essenciais, visando no mínimo 4,5:1 para texto normal e 3:1 para texto grande ou componentes gráficos relevantes.
- **REQ-004**: A interface MUST usar tipografia limpa e consistente, com no máximo duas famílias tipográficas, fallback local equivalente e escala tipográfica que diferencie título, subtítulo, rótulo, texto de campo e conteúdo da pré-visualização.
- **REQ-005**: Painéis, campos, botões e cartão pré-visualizado MUST usar bordas, raios e sombras leves de forma consistente; nenhuma sombra pode ser necessária para distinguir texto ou estado funcional.
- **REQ-006**: O estado de foco MUST ser visível em todos os campos, seletores e botões interativos, combinando indicador de foco e mudança de borda ou superfície sem depender somente de cor.
- **REQ-007**: A interface MUST manter os estados de hover, foco, desabilitado, erro e sucesso visualmente distinguíveis e compatíveis com a paleta definida.
- **REQ-008**: A interface MUST ser responsiva em viewports de 320 px a 1440 px, sem rolagem horizontal causada pelo layout, mantendo formulário, pré-visualização, lista e ações acessíveis.
- **REQ-009**: Em viewports estreitas, os painéis MUST reorganizar-se em uma coluna, com controles ocupando largura disponível, espaçamento preservado e área de toque mínima de aproximadamente 44 por 44 px para ações.
- **REQ-010**: Em viewports intermediárias, o layout MUST reorganizar os painéis sem sobreposição, truncamento de conteúdo ou perda da relação visual entre formulário e pré-visualização.
- **REQ-011**: A pré-visualização MUST preservar a legibilidade de nome, cargo, e-mail e links sociais em todos os temas e larguras suportadas, permitindo quebra de textos longos.
- **REQ-012**: A interface MUST respeitar `prefers-reduced-motion`, reduzindo ou removendo transições e transformações decorativas sem alterar o resultado funcional.
- **REQ-013**: A interface MUST continuar utilizável quando a fonte remota falhar, aplicando fallbacks tipográficos sem mudança estrutural significativa.
- **REQ-014**: Os requisitos visuais MUST ser verificáveis por inspeção em viewports de 320 px, 768 px e 1280 px e por testes automatizados que confirmem a presença dos elementos estruturais e da folha de estilos.

### Key Entities

- **Token visual**: valor reutilizável que representa cor, tipografia, espaçamento, raio ou sombra da interface.
- **Painel da interface**: agrupamento visual do formulário, da pré-visualização ou da lista de cartões salvos.
- **Estado interativo**: condição visual de um controle, como padrão, foco, hover, desabilitado, erro ou sucesso.
- **Viewport responsiva**: largura disponível na qual o layout deve preservar legibilidade, acesso e ausência de overflow horizontal.

## Assumptions

- O escopo visual complementa os requisitos existentes do gerador e não altera o comportamento de criação, atualização, persistência ou exportação.
- A interface continua sendo uma página estática sem introdução obrigatória de framework ou serviço de backend.
- A paleta pode manter o caráter atual de destaque roxo/índigo, desde que seja normalizada em tokens e combinada com neutros acessíveis.
- A fonte externa é aprimoramento opcional; a experiência não pode depender da sua disponibilidade.
- Os breakpoints exatos podem seguir o comportamento existente, desde que os limites de 320 px, 768 px e 1280 px sejam atendidos.

## Success Criteria

### Measurable Outcomes

- **SC-001**: Em testes manuais nas viewports de 320 px, 768 px e 1280 px, 100% dos painéis e ações principais permanecem visíveis ou alcançáveis sem rolagem horizontal.
- **SC-002**: 100% dos campos e botões interativos exibem um estado de foco identificável durante navegação por teclado.
- **SC-003**: 100% das combinações de texto e superfície usadas nos elementos essenciais atendem ao contraste mínimo definido nesta especificação.
- **SC-004**: Pelo menos 90% dos usuários de teste conseguem localizar formulário, pré-visualização e lista de cartões em até 10 segundos, sem orientação externa.
- **SC-005**: Pelo menos 90% dos usuários de teste conseguem concluir o preenchimento do cartão sem confundir o painel de edição com a pré-visualização.
- **SC-006**: Em uma avaliação subjetiva com pelo menos cinco usuários, a maioria classifica a interface como profissional, legível e consistente, com nota média mínima de 4 em uma escala de 1 a 5.
- **SC-007**: A desativação de movimento reduz efeitos animados sem remover informação, estados ou capacidade de concluir o fluxo principal.

## Requirements Quality Checklist

- [x] Todos os requisitos usam o formato `REQ-XXX`.
- [x] Os IDs são únicos e sequenciais.
- [x] Cada requisito é independente e verificável.
- [x] Os cenários de aceitação usam Given-When-Then.
- [x] O escopo visual está separado do escopo funcional existente.
- [x] Há critérios de contraste, responsividade, foco e fallback.
- [x] Os critérios de sucesso incluem métricas quantitativas e qualitativas.
- [x] Não há decisões críticas pendentes que exijam esclarecimento do usuário.
