import "@popcorn.fyi/tailwind/tailwind.css";

import type { DocsContextProps } from "@storybook/blocks";
import type { Preview } from "@storybook/react";

import { withThemeByDataAttribute } from "@storybook/addon-themes";
import { DocsContainer } from "@storybook/blocks";
import { themes } from "@storybook/theming";
import { createElement } from "react";

const preview = {
  decorators: [
    withThemeByDataAttribute({
      attributeName: "data-theme",
      defaultTheme: "dark",
      parentSelector: "html",
      themes: {
        dark: "night",
        light: "fantasy",
      },
    }),
  ],
  parameters: {
    backgrounds: { disable: true },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      canvas: {
        className: "!bg-base-100",
      },
      container: (props: {
        context: DocsContextProps & {
          store: { userGlobals: { globals: { theme: string | undefined } } };
        };
      }) => {
        const rootElement = document.querySelector("html");
        const theme =
          props.context.store.userGlobals.globals.theme === "dark"
            ? themes.dark
            : themes.light;

        if (rootElement) {
          rootElement.dataset.theme =
            props.context.store.userGlobals.globals.theme;
        }

        return createElement(DocsContainer, { ...props, theme });
      },
    },

    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Preview;

export default preview;
