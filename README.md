<h1 align="center">Design System Architecture PoC</h1>

<p align="center">
  English | <a href="./README.pt.md">Português</a>
</p>

## Goal

This PoC validates a simple monorepo using React, TypeScript, and Storybook.

The architecture was inspired by Feature-Sliced Design (FSD), mainly around responsibility-based organization and dependency control between modules, adapted to a monorepo context.

The goal is not to build a complete or production-ready library, but to organize primitives, icons, web components, and documentation with clear boundaries between packages.

The main points evaluated are:

* Clear separation of responsibilities between packages
* Unidirectional dependencies
* Reusable primitives across different applications
* Components decoupled from primitives and icons
* Storybook as a consumer of the system
* Lint rules ensuring only public APIs are used

---

## Structure

```text
apps/
└── docs/

packages/
├── primitives/
├── icons/
└── web/
```

Responsibilities:

* `@ast/primitives` exposes platform-independent design values, such as colors and spacing
* `@ast/icons` keeps SVGs as plain files exposed through a typed catalog and public package exports
* `@ast/web` exposes React components through a public API
* `@ast/docs` consumes the packages through Storybook

---

## Dependency Flow

```text
docs
 └── web
      ├── primitives
      └── icons
```

Rules:

* `web` can consume `primitives` and `icons`
* `docs` consumes only public package APIs
* `primitives` does not depend on `web`
* `icons` does not depend on `web`
* components inside `web` do not import internals from other components

---

## Primitives

`@ast/primitives` represents the visual foundation of the system.

They are TypeScript values used as a base for styles.

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

### Why TypeScript?

The initial idea was to use SCSS and CSS variables, but that kept the foundation tied to the web context.

With TypeScript, the same values can be used across different environments without depending on the browser or CSS.

### Consumption Example

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

`@ast/icons` centralizes the system SVGs.

The files live in `assets/` and are exposed through a typed catalog and public package exports.

```ts
export const iconNames = [
  "arrow-right",
  "close",
  "search",
] as const;
```

### Why plain SVGs?

The goal is to keep assets independent from rendering technology.

The package defines which icons exist, but not how they are rendered. That responsibility belongs to the consuming application.

### Consumption Example

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

`@ast/web` contains the system React components.

It is the only package in the library that uses React and depends on `@ast/primitives` and `@ast/icons`.

### Structure

Components live in `packages/web/src`:

```text
packages/web/src/
├── button/
└── icon-button/
```

Each component is self-contained:

```text
button/
├── button.tsx
├── button.css
├── button.stories.tsx
└── index.ts
```

### Consumption

```ts
import { Button, IconButton } from "@ast/web";
```

---

## Docs

`apps/docs` is the Storybook app for the monorepo.

It consumes the packages and documents:

* primitives
* icons
* components

### Responsibility

Storybook is only a consumer of the system.

* Component stories live in `web`
* Foundation stories live in `docs`

---

## Import Enforcement

ESLint enforces boundaries between packages through controlled import rules.

The rules block:

* deep imports (`@ast/web/button`)
* direct access to `@ast/icons/assets/*`
* internal imports between components inside `web`

Allowed:

* `@ast/icons/*.svg` as a public API
* local imports inside the component (`./button.css`)

---

## Benefits

* Clear separation of responsibilities
* Predictable dependencies between packages
* Reusable primitives outside web
* Components decoupled from the visual foundation
* Simple structure
* Consistent co-location
* Explicit public APIs

---

## Out of Scope

* package versioning
* CI/CD
* publishing
* governance
* automatic primitive generation
* advanced design tokens
* automated tests

---

## Running the Project

```bash
yarn install
yarn storybook
yarn build
yarn lint
```
