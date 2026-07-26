import type { KnipConfig } from "knip";

export default {
  ignoreDependencies: ["gitzy", "@iconify-json/simple-icons"],
  entry: ["src/integrations/**/gen/**/index.ts"],
  ignore: ["**/*.gen.ts", "src/components/ui/**", ".agents/**"],
} satisfies KnipConfig;
