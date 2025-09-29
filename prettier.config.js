const config = {
  arrowParens: "always",
  jsxSingleQuote: false,
  overrides: [
    {
      files: ["pnpm-lock.yaml", "CHANGELOG.md", "*.gen.*"],
      options: {
        rangeEnd: 0,
      },
    },
    {
      files: "*.astro",
      options: {
        astroAllowShorthand: true,
        parser: "astro",
      },
    },
  ],
  plugins: [
    "prettier-plugin-astro",
    "prettier-plugin-tailwindcss",
    "prettier-plugin-packagejson",
  ],
  printWidth: 80,
  quoteProps: "consistent",
  semi: true,
  singleQuote: false,
  tailwindStylesheet: "./src/styles/global.css",
  trailingComma: "all",
};

export default config;
