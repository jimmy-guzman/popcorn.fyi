import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { nitroV2Plugin } from "@tanstack/nitro-v2-vite-plugin";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import { configDefaults } from "vitest/config";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    resolve: {
      tsconfigPaths: true,
    },
    plugins: [
      devtools(),
      tailwindcss(),
      tanstackStart(),
      nitroV2Plugin({
        compatibilityDate: "2025-10-09",
        preset: env.SERVER_PRESET,
      }),
      react(),
      babel({
        presets: [reactCompilerPreset()],
      }),
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
      setupFiles: "./src/testing/setup.tsx",
    },
  };
});
