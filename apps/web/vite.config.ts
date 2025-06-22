import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { defineConfig, loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { configDefaults } from "vitest/config";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [
      tsconfigPaths(),
      tailwindcss(),
      tanstackStart({
        target: env.SERVER_PRESET ?? "vercel",
      }),
    ],
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
  };
});
