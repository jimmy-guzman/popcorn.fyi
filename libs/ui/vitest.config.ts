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
      reporter: ["text", "json"],
    },
    environment: "happy-dom",
    globals: true,
    passWithNoTests: true,
    setupFiles: "./src/testing/setup.ts",
  },
});
