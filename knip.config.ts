import type { KnipConfig } from "knip";

export default {
  ignoreDependencies: ["gitzy", "@iconify-json/*"],
  entry: ["src/server.ts"],
} satisfies KnipConfig;
