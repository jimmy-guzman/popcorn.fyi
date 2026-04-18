import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { configDefaults } from "vitest/config";

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    devtools(),
    tailwindcss(),
    tanstackStart(),
    nitro(),
    react(),
    babel({
      presets: [reactCompilerPreset()],
    }),
  ],
  test: {
    coverage: {
      reporter: ["text", "json"],
    },
    environment: "happy-dom",
    exclude: [...configDefaults.exclude, "e2e/*"],
    globals: true,
    setupFiles: "./src/testing/setup.tsx",
  },
});
