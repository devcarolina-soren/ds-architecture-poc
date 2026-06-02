# Design System Architecture PoC

Portuguese version: [README.pt.md](./README.pt.md)

## Goal

This PoC aims to validate an architectural proposal for a Design System using Monorepo, React, TypeScript, and Storybook.

The structure follows Feature-Sliced Design (FSD) principles at its most abstract layer, using only `shared/ui` to organize reusable, domain-independent components.

The proposal uses layered separation to ensure visual foundations (`tokens` and `icons`) remain independent from component implementation (`ui`) and documentation (`docs`).

The focus is not on building a complete or production-ready library, but on evaluating how to organize visual foundations, assets, components, and documentation in a decoupled way.

The main points evaluated are:

* Clear separation of responsibilities.
* Unidirectional dependencies between packages.
* Reusable tokens across different platforms.
* Components decoupled from the visual foundation.
* Storybook as a consumer and documentation layer for the system.

---

## Structure

```text
apps/
└── docs/

packages/
├── tokens/
├── icons/
└── ui/
```

The proposal divides the Design System into three layers:

```text
Foundation
├── tokens
└── icons

Presentation
└── ui

Consumer
└── docs
```

Each layer has a specific responsibility and avoids depending on higher-level layers.

---

## Dependency Flow

```text
docs
 └── ui
      ├── tokens
      └── icons
```

Architecture rules:

* `ui` can consume `tokens` and `icons`.
* `docs` can consume any package.
* `tokens` does not depend on `ui`.
* `icons` does not depend on `ui`.

The goal is to keep the Design System foundation decoupled from component implementation.

---

## Tokens

`@ast/tokens` represents the visual foundation of the Design System.

Tokens are defined in TypeScript and act as the single source of truth for design values such as colors and spacing.

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

The first idea was to use SCSS and CSS Variables, but that would limit token consumption to more web-oriented solutions.

By using TypeScript as the source of truth, the same values can be consumed by different platforms without depending on the browser or on a specific styling technology.

### Consumption Example

Web:

```ts
import { colors, spacing } from "@ast/tokens";

const style = {
  backgroundColor: colors.primary,
  padding: spacing.md,
};
```

React Native:

```ts
import { StyleSheet } from "react-native";
import { colors, spacing } from "@ast/tokens";

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    padding: spacing.md,
  },
});
```

Consumption remains almost the same because the tokens have no platform dependency.

---

## Icons

`@ast/icons` is responsible for cataloging the visual assets of the Design System.

The package keeps SVGs as plain files and exposes a typed catalog of the available icons.

```ts
export const iconNames = [
  "arrow-right",
  "close",
  "search",
] as const;
```

### Why plain SVGs?

The goal is to keep the foundation independent from the technology used for rendering.

The package defines which icons exist, but not how they should be rendered.

That responsibility belongs to the consuming application.

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

The loading and rendering strategy depends on the platform and the tools used by the consuming application.

The role of `@ast/icons` is only to distribute the assets and keep a centralized catalog of the available icons.

---

## UI

`@ast/ui` is the layer responsible for the React components of the Design System.

It is the only package in the PoC that knows about React and consumes the foundation packages (`tokens` and `icons`).

This allows the foundation to evolve independently from component implementation.

### Organization

The structure follows a simplified application of Feature-Sliced Design.

```text
shared/
└── ui/
    ├── button/
    └── icon-button/
```

Since the PoC has no domain, business rules, or features, only the `shared/ui` layer was used.

Each component keeps its artifacts co-located:

```text
button/
├── button.tsx
├── button.css
├── button.stories.tsx
└── index.ts
```

This approach improves navigation, maintenance, and component ownership.

---

## Docs

`apps/docs` is a Storybook application responsible for the visual documentation of the Design System.

It consumes the monorepo packages and visually demonstrates:

* Tokens.
* Icons.
* Components.

### Why Storybook?

Storybook allows the proposed architecture to be visually validated without creating a dedicated consuming application.

It also helps demonstrate:

* Token consumption.
* Asset consumption.
* Component behavior.

### Responsibility

Storybook is not part of the Design System foundation.

It acts only as a consumer and documentation tool.

For this reason:

* Component stories stay close to the components.
* Foundation stories stay in `apps/docs`.

This prevents foundation packages from conceptually depending on React or Storybook.

---

## Benefits Of This Approach

* Clear separation of responsibilities.
* Predictable dependencies between packages.
* Foundation reusable across platforms.
* Components decoupled from the visual foundation.
* Easy-to-understand structure.
* Co-location-based organization.
* Explicit public APIs.

---

## Out Of Scope

This PoC does not validate:

* Package publishing.
* Versioning strategies.
* CI/CD.
* Design System governance.
* Full cross-platform compatibility.
* Automatic token generation.
* Style Dictionary.
* Advanced build strategies.
* Automated tests.

These topics are important in a real Design System, but they are not part of this validation goal.

---

## Running The Project

Install dependencies:

```bash
yarn install
```

Run Storybook:

```bash
yarn storybook
```

Validate the build:

```bash
yarn build
```
