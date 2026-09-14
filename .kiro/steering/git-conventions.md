# Git Conventions

## Estratégia de Branches

- Nunca desenvolver diretamente na branch `main`.
- Para cada funcionalidade ou especificação, criar e trabalhar em uma nova branch com o padrão `feature/<nome-da-feature>` ou `task/<numero-da-task>`.
- Ao concluir a especificação ou tarefa, a branch deve ser integrada à `main` por meio de Pull Request ou Merge.

## Padrão de Commit (Conventional Commits)

Toda mensagem de commit deve seguir o padrão:

```text
<tipo>(<escopo>): <descrição curta>
```

fazendo referência à tarefa ou spec quando aplicável.

### Tipos aceitos

- `docs`: alterações de especificação, steering, README ou documentação SDD.
- `feat`: inclusão de nova funcionalidade ou implementação de task.
- `fix`: correção de bugs.
- `style`: formatação visual ou CSS sem alteração de regra de negócio.
- `refactor`: refatoração de código sem alterar comportamento.

### Exemplos válidos

```text
docs(spec): adiciona requisitos da feature de formulario
feat(card-form): implementa validacao de email (Task #1.2)
fix(storage): corrige erro ao carregar lista de cartoes
```

## Regras de Versionamento e Integração

- Cada branch deve representar uma funcionalidade, tarefa ou correção isolada.
- Alterações de documentação, especificação e steering devem usar o tipo `docs`.
- Implementações de funcionalidade devem usar `feat`.
- Correções de comportamento devem usar `fix`.
- Alterações somente visuais de CSS sem mudança de regra de negócio devem usar `style`.
- Refatorações sem alteração de comportamento devem usar `refactor`.

---
_Focus on repository workflow expectations, not implementation details._
