# Design System Architecture PoC

## Objetivo

Esta PoC tem como objetivo validar uma proposta arquitetural para um Design System utilizando Monorepo, React, TypeScript e Storybook.

A estrutura segue os princípios do Feature-Sliced Design (FSD) em sua camada mais abstrata, utilizando apenas `shared/ui` para organizar componentes reutilizáveis e independentes de domínio.

A proposta utiliza uma separação em camadas para garantir que fundações visuais (`tokens` e `icons`) permaneçam independentes da implementação dos componentes (`ui`) e da documentação (`docs`).

O foco não está na construção de uma biblioteca completa ou pronta para produção, mas em avaliar como organizar fundações visuais, assets, componentes e documentação de forma desacoplada.

Os principais pontos avaliados são:

* Separação clara de responsabilidades.
* Dependências unidirecionais entre pacotes.
* Tokens reutilizáveis entre diferentes plataformas.
* Componentes desacoplados da fundação visual.
* Storybook como consumidor e documentação do sistema.

---

## Estrutura

```text
apps/
└── docs/

packages/
├── tokens/
├── icons/
└── ui/
```

A proposta divide o Design System em três camadas:

```text
Foundation
├── tokens
└── icons

Presentation
└── ui

Consumer
└── docs
```

Cada camada possui uma responsabilidade específica e evita depender das camadas superiores.

---

## Fluxo de Dependências

```text
docs
 └── ui
      ├── tokens
      └── icons
```

Regras da arquitetura:

* `ui` pode consumir `tokens` e `icons`.
* `docs` pode consumir qualquer pacote.
* `tokens` não depende de `ui`.
* `icons` não depende de `ui`.

O objetivo é manter a fundação do Design System desacoplada da implementação dos componentes.

---

## Tokens

`@ast/tokens` representa a fundação visual do Design System.

Os tokens são definidos em TypeScript e funcionam como fonte única de verdade para valores de design, como cores e espaçamentos.

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

A primeira ideia foi utilizar SCSS e CSS Variables, mas isso acabaria limitando o consumo dos tokens a soluções mais voltadas para web.

Ao utilizar TypeScript como fonte de verdade, os mesmos valores podem ser consumidos por diferentes plataformas sem depender de navegador ou de uma tecnologia específica de estilização.

### Exemplo de Consumo

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

O consumo permanece praticamente o mesmo porque os tokens não possuem dependência de plataforma.

---

## Icons

`@ast/icons` é responsável por catalogar os assets visuais do Design System.

O pacote mantém os SVGs como arquivos puros e expõe um catálogo tipado dos ícones disponíveis.

```ts
export const iconNames = [
  "arrow-right",
  "close",
  "search",
] as const;
```

### Por que SVGs puros?

O objetivo é manter a fundação independente da tecnologia utilizada para renderização.

O pacote define quais ícones existem, mas não como eles devem ser renderizados.

Essa responsabilidade fica com a aplicação consumidora.

### Exemplo de Consumo

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

A forma de carregamento e renderização depende da plataforma e das ferramentas utilizadas pela aplicação consumidora.

O papel de `@ast/icons` é apenas distribuir os assets e manter um catálogo centralizado dos ícones disponíveis.

---

## UI

`@ast/ui` é a camada responsável pelos componentes React do Design System.

É o único pacote da PoC que possui conhecimento sobre React e consome os pacotes de fundação (`tokens` e `icons`).

Isso permite que a fundação evolua de forma independente da implementação dos componentes.

### Organização

A estrutura segue uma aplicação simplificada do Feature-Sliced Design.

```text
shared/
└── ui/
    ├── button/
    └── icon-button/
```

Como a PoC não possui domínio, regras de negócio ou features, apenas a camada `shared/ui` foi utilizada.

Cada componente mantém seus artefatos co-localizados:

```text
button/
├── button.tsx
├── button.css
├── button.stories.tsx
└── index.ts
```

Essa abordagem facilita navegação, manutenção e ownership dos componentes.

---

## Docs

`apps/docs` é uma aplicação Storybook responsável pela documentação visual do Design System.

Ela consome os pacotes do monorepo e demonstra visualmente:

* Tokens.
* Ícones.
* Componentes.

### Por que Storybook?

O Storybook permite validar visualmente a arquitetura proposta sem a necessidade de criar uma aplicação consumidora específica.

Além disso, ajuda a demonstrar:

* O consumo dos tokens.
* O consumo dos assets.
* O comportamento dos componentes.

### Responsabilidade

O Storybook não faz parte da fundação do Design System.

Ele atua apenas como consumidor e ferramenta de documentação.

Por esse motivo:

* As stories de componentes ficam próximas dos componentes.
* As stories de foundations ficam em `apps/docs`.

Isso evita que os pacotes de fundação passem a depender conceitualmente de React ou Storybook.

---

## Vantagens da Abordagem

* Separação clara de responsabilidades.
* Dependências previsíveis entre pacotes.
* Fundação reutilizável entre plataformas.
* Componentes desacoplados da fundação visual.
* Estrutura simples de compreender.
* Organização baseada em co-location.
* APIs públicas explícitas.

---

## Fora de Escopo

Esta PoC não pretende validar:

* Publicação de pacotes.
* Estratégias de versionamento.
* CI/CD.
* Governança do Design System.
* Compatibilidade completa entre plataformas.
* Geração automática de tokens.
* Style Dictionary.
* Estratégias avançadas de build.
* Testes automatizados.

Esses tópicos são importantes em um Design System real, mas não fazem parte do objetivo desta validação.

---

## Executando o Projeto

Instalar dependências:

```bash
yarn install
```

Executar Storybook:

```bash
yarn storybook
```

Validar o build:

```bash
yarn build
```
