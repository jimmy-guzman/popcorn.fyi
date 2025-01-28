import { dirname, join } from "node:path";

import type { StorybookConfig } from "@storybook/react-vite";

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string) {
  // eslint-disable-next-line unicorn/prefer-module -- TODO
  return dirname(require.resolve(join(value, "package.json")));
}

const config = {
  addons: [
    getAbsolutePath("@storybook/addon-essentials"),
    getAbsolutePath("@storybook/addon-themes"),
    getAbsolutePath("@storybook/addon-a11y"),
  ],
  framework: {
    name: getAbsolutePath("@storybook/react-vite"),
    options: {},
  },
  stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  typescript: {
    reactDocgen: "react-docgen-typescript",
  },
} satisfies StorybookConfig;

export default config;
