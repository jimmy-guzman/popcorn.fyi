import type { Config } from "tailwindcss";

import typography from "@tailwindcss/typography";
import daisyui from "daisyui";

const config = {
  daisyui: {
    prefix: "dsy-",
    themes: ["night"],
  },
  plugins: [typography, daisyui],
  theme: {
    extend: {},
  },
} satisfies Omit<Config, "content">;

export default config;
