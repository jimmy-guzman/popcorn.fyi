import { defineConfig } from "@tanstack/react-start/config";
import { getTsconfig } from "get-tsconfig";
import tsConfigPaths from "vite-tsconfig-paths";

import { environment } from "./environment";

const tsconfig = getTsconfig();

export default defineConfig({
  server: {
    // @ts-expect-error TODO: verify as `CompatibilityDateSpec`
    compatibilityDate: environment.COMPATIBILITY_DATE,
    esbuild: {
      options: {
        target: tsconfig?.config.compilerOptions?.target,
      },
    },
    preset: "vercel",
  },
  tsr: {
    autoCodeSplitting: true,
  },
  vite: {
    build: {
      target: tsconfig?.config.compilerOptions?.target,
    },
    optimizeDeps: {
      esbuildOptions: {
        target: tsconfig?.config.compilerOptions?.target,
      },
    },
    plugins: [tsConfigPaths()],
  },
});
