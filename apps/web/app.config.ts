import { defineConfig } from "@tanstack/start/config";
import tsConfigPaths from "vite-tsconfig-paths";

import environment from "./environment";

export default defineConfig({
  server: {
    // @ts-expect-error TODO: verify as `CompatibilityDateSpec`
    compatibilityDate: environment.COMPATIBILITY_DATE,
    preset: "vercel",
  },
  vite: {
    plugins: [tsConfigPaths()],
  },
});
