import type { KnipConfig } from "knip";

export default {
  ignoreDependencies: ["gitzy", "@iconify-json/*"],
  entry: ["src/server.ts", "src/integrations/**/gen/**/index.ts"],
  ignore: ["**/*.gen.ts"],
} satisfies KnipConfig;
