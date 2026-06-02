import { fileURLToPath } from "node:url";
import type { StorybookConfig } from "@storybook/react-vite";
import { mergeConfig } from "vite";

const config: StorybookConfig = {
  addons: ["@storybook/addon-essentials"],
  framework: {
    name: "@storybook/react-vite",
    options: {}
  },
  stories: ["../src/**/*.stories.tsx", "../../../packages/ui/src/**/*.stories.tsx"],
  viteFinal: (config) =>
    mergeConfig(config, {
      resolve: {
        alias: {
          "@ast/icons/arrow-right.svg": fileURLToPath(
            new URL("../../../packages/icons/assets/arrow-right.svg", import.meta.url)
          ),
          "@ast/icons/close.svg": fileURLToPath(new URL("../../../packages/icons/assets/close.svg", import.meta.url)),
          "@ast/icons/search.svg": fileURLToPath(new URL("../../../packages/icons/assets/search.svg", import.meta.url))
        }
      }
    })
};

export default config;
