import type { Config } from "prettier";

const config = {
  arrowParens: "always",
  jsxSingleQuote: false,
  plugins: ["prettier-plugin-tailwindcss", "prettier-plugin-packagejson"],
  printWidth: 80,
  quoteProps: "consistent",
  semi: true,
  singleQuote: false,
  tailwindStylesheet: "./src/styles/global.css",
  trailingComma: "all",
} satisfies Config;

export default config;
