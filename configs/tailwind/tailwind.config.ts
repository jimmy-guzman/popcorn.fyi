import type { Config } from "tailwindcss";

import { addDynamicIconSelectors } from "@iconify/tailwind";
import typography from "@tailwindcss/typography";
import daisyui from "daisyui";

import { theme } from "./theme";

const config = {
  daisyui: {
    logs: false,
    prefix: "dsy-",
    themes: [theme.dark, theme.light],
  },
  plugins: [typography, daisyui, addDynamicIconSelectors()],
  theme: {
    extend: {},
  },
} satisfies Omit<Config, "content">;

export default config;
