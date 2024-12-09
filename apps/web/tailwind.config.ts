import type { Config } from "tailwindcss";

import { addDynamicIconSelectors } from "@iconify/tailwind";
import popcornFyi from "@popcorn.fyi/tailwind";

const config = {
  content: ["./app/**/*.{ts,tsx}"],
  plugins: [addDynamicIconSelectors()],
  presets: [popcornFyi],
} satisfies Config;

export default config;
