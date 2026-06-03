<h1 align="center">Design System Architecture PoC</h1>

<p align="center">
  <a href="./README.md">English</a> | Português
</p>

## Objetivo

Esta PoC valida um monorepo simples usando React, TypeScript e Storybook.

A arquitetura foi inspirada em princípios do Feature-Sliced Design (FSD), principalmente organização por responsabilidades e controle de dependências entre módulos, aplicada de forma adaptada a um contexto de monorepo.

O foco não é construir uma biblioteca completa ou pronta para produção, mas organizar primitives, ícones, componentes web e documentação com limites claros entre pacotes.

Os principais pontos avaliados são:

* Separação clara de responsabilidades entre pacotes
* Dependências unidirecionais
* Primitives reutilizáveis entre diferentes aplicações
* Componentes desacoplados de primitives e ícones
* Storybook como consumidor do sistema
* Regras de lint garantindo uso apenas de APIs públicas

---

## Estrutura

```text
apps/
└── docs/

packages/
├── primitives/
├── icons/
└── web/
```

Responsabilidades:

* `@ast/primitives` expõe valores de design independentes de plataforma, como cores e espaçamentos
* `@ast/icons` mantém SVGs puros e expostos via catálogo tipado e exports públicos do pacote
* `@ast/web` expõe componentes React via API pública
* `@ast/docs` consome os pacotes via Storybook

---

## Fluxo de Dependências

```text
docs
 └── web
      ├── primitives
      └── icons
```

Regras:

* `web` pode consumir `primitives` e `icons`
* `docs` consome apenas APIs públicas dos pacotes
* `primitives` não depende de `web`
* `icons` não depende de `web`
* componentes dentro de `web` não importam internos de outros componentes

---

## Primitives

`@ast/primitives` representa a fundação visual do sistema.

São valores em TypeScript usados como base para estilos.

```ts
export const colors = {
  primary: "#2563eb",
  text: "#0f172a",
};

export const spacing = {
  sm: 8,
  md: 16,
};
```

### Por que TypeScript?

A ideia inicial foi usar SCSS e CSS Variables, mas isso deixava a base presa ao contexto web.

Com TypeScript, os mesmos valores podem ser usados em diferentes ambientes sem depender de browser ou CSS.

### Exemplo de consumo

Web:

```ts
import { colors, spacing } from "@ast/primitives";

const style = {
  backgroundColor: colors.primary,
  padding: spacing.md,
};
```

React Native:

```ts
import { StyleSheet } from "react-native";
import { colors, spacing } from "@ast/primitives";

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    padding: spacing.md,
  },
});
```

---

## Icons

`@ast/icons` centraliza os SVGs do sistema.

Os arquivos ficam em `assets/` e são expostos como catálogo tipado.

```ts
export const iconNames = [
  "arrow-right",
  "close",
  "search",
] as const;
```

### Por que SVGs puros?

O objetivo é manter os assets independentes da tecnologia de renderização.

O pacote define quais ícones existem, mas não como eles são renderizados. Essa responsabilidade fica com a aplicação consumidora.

### Exemplo de consumo

Web:

```tsx
import searchIcon from "@ast/icons/search.svg";

<img src={searchIcon} alt="Search" />
```

React Native:

```tsx
import SearchIcon from "@ast/icons/search.svg";

export function Example() {
  return <SearchIcon width={24} height={24} />;
}
```

---

## Web

`@ast/web` contém os componentes React do sistema.

É o único pacote de biblioteca com React e depende de `@ast/primitives` e `@ast/icons`.

### Estrutura

Os componentes visuais vivem em `packages/web/src/ui`:

```text
packages/web/src/
└── ui/
    ├── button/
    └── icon-button/
```

Cada componente é autocontido:

```text
ui/button/
├── button.tsx
├── button.css
├── button.stories.tsx
└── index.ts
```

### Evolução

A estrutura em `src` antecipa os segmentos esperados para o design system principal:

* `ui/`: componentes visuais (atual)
* `lib/`: hooks e utilitários compartilhados
* `api/`: integrações e serviços externos

### Consumo

```ts
import { Button, IconButton } from "@ast/web";
```

---

## Docs

`apps/docs` é o Storybook do monorepo.

Ele consome os pacotes e documenta:

* primitives
* icons
* components

### Responsabilidade

O Storybook é apenas consumidor do sistema.

* Stories de componentes ficam no `web`
* Stories de base ficam no `docs`

---

## Enforcement de Imports

O ESLint garante os limites entre pacotes com regras de import controladas.

As regras bloqueiam:

* deep imports (`@ast/web/button`)
* acesso direto a `@ast/icons/assets/*`
* imports internos entre componentes do `web`

Permitido:

* `@ast/icons/*.svg` como API pública
* imports locais dentro do componente (`./button.css`)

---

## Vantagens

* Separação clara de responsabilidades
* Dependências previsíveis entre pacotes
* Primitives reutilizáveis fora do web
* Componentes desacoplados da base visual
* Estrutura simples
* Co-location consistente
* APIs públicas explícitas

---

## Fora de Escopo

* versionamento de pacotes
* CI/CD
* publicação
* governança
* geração automática de primitives
* design tokens avançados
* testes automatizados

---

## Executando o Projeto

```bash
yarn install
yarn storybook
yarn build
yarn lint
```
