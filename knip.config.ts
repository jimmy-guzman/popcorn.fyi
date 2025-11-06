import type { KnipConfig } from "knip";

export default {
  ignore: ["src/routeTree.gen.ts"],
  ignoreDependencies: [
    "gitzy",
    "@iconify-json/*",
    "babel-plugin-react-compiler",
  ],
} satisfies KnipConfig;
