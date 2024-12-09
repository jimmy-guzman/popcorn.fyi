import type { Config } from "tailwindcss";

import popcornFyi from "@popcorn.fyi/tailwind";

const config = {
  content: ["./app/**/*.{ts,tsx}"],
  presets: [popcornFyi],
} satisfies Config;

export default config;
