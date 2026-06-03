import tsParser from "@typescript-eslint/parser";
import boundaries from "eslint-plugin-boundaries";

const packagePublicApiPatterns = [
  {
    group: ["@ast/web/*", "@ast/primitives/*", "@ast/icons/assets/*"],
    message: "Consume monorepo packages through their public API. SVG icon subpath exports are allowed."
  }
];

export default [
  {
    ignores: ["**/.turbo/**", "**/node_modules/**", "**/storybook-static/**"]
  },
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        },
        sourceType: "module"
      }
    },
    plugins: {
      boundaries
    },
    settings: {
      "boundaries/elements": [
        {
          mode: "folder",
          pattern: "packages/web/src/ui/*",
          type: "web-component"
        },
        {
          pattern: "packages/*/src/index.ts",
          type: "package-public-api"
        },
        {
          pattern: "packages/icons/index.ts",
          type: "package-public-api"
        }
      ]
    },
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: packagePublicApiPatterns
        }
      ]
    }
  },
  {
    files: ["packages/web/src/ui/*/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            ...packagePublicApiPatterns,
            {
              group: ["../*", "../../*"],
              message: "Web components must not import internals from other components. Use the @ast/web public API."
            }
          ]
        }
      ]
    }
  }
];
