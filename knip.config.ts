import type { KnipConfig } from "knip";

export default {
  ignoreDependencies: ["gitzy", "@iconify-json/simple-icons"],
  entry: ["src/server.ts", "src/integrations/**/gen/**/index.ts"],
  ignore: ["**/*.gen.ts", "src/components/ui/**"],
} satisfies KnipConfig;
