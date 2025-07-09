import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { configDefaults } from "vitest/config";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [
      tailwindcss(),
      tanstackStart({
        customViteReactPlugin: true,
        target: env.SERVER_PRESET ?? "vercel",
      }),
      react({
        babel: {
          plugins: [["babel-plugin-react-compiler"]],
        },
      }),
      tsconfigPaths(),
    ],
    test: {
      coverage: {
        exclude: [
          ...(configDefaults.coverage.exclude ?? []),
          "playwright-report/**",
          "{playwright,knip}.config.*",
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
