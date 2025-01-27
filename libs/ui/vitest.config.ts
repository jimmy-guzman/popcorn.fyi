import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      exclude: [
        ...(configDefaults.coverage.exclude ?? []),
        "storybook-static/**",
        ".storybook/**",
        "**/*.stories.*",
        "postcss.config.*",
      ],
    },
    environment: "happy-dom",
    globals: true,
    setupFiles: "./src/testing/setup.ts",
  },
});
