import type { KnipConfig } from "knip";

export default {
  compilers: {
    css: (text: string) => {
      return [...text.matchAll(/@(?:import|plugin)\s+["']([^"']+)["']/g)]
        .map(([_, dep]) => `import "${dep}";`)
        .join("\n");
    },
  },
  entry: ["src/router.tsx", "src/routes/**/*.tsx"],
  ignore: ["src/routeTree.gen.ts", "prettier.config.js"],
  ignoreDependencies: [
    "gitzy",
    "@iconify-json/*",
    "babel-plugin-react-compiler",
  ],
  project: "**/*.{ts,tsx,css}",
} satisfies KnipConfig;
