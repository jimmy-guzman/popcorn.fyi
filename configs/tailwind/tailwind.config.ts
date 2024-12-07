import type { Config } from "tailwindcss";

import typography from "@tailwindcss/typography";
import daisyui from "daisyui";

const config = {
  daisyui: {
    themes: ["coffee"],
  },
  plugins: [typography, daisyui],
  theme: {
    extend: {},
  },
} satisfies Omit<Config, "content">;

export default config;
