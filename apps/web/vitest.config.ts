import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { configDefaults } from "vitest/config";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    coverage: {
      exclude: [
        ...(configDefaults.coverage.exclude ?? []),
        "playwright-report/**",
        "storybook-static/**",
        ".storybook/**",
        "**/*.stories.*",
        "{postcss,playwright,app}.config.*",
        "playwright.setup.*",
        "**/*.gen.*",
      ],
      reporter: ["text", "json"],
    },
    environment: "happy-dom",
    exclude: [...configDefaults.exclude, "e2e/*"],
    globals: true,
    passWithNoTests: true,
    setupFiles: "./src/testing/setup.tsx",
  },
});
