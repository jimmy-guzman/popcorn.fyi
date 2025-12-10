import { defineConfig } from "@jimmy.codes/eslint-config";
import pluginRouter from "@tanstack/eslint-plugin-router";

export default defineConfig({
  overrides: [
    {
      rules: {
        "perfectionist/sort-objects": [
          "error",
          { ignorePattern: ["Route"], type: "natural" },
        ],
      },
    },
    ...pluginRouter.configs["flat/recommended"],
  ],
  react: {
    overrides: {
      "jsx-a11y/label-has-associated-control": [
        2,
        {
          controlComponents: ["Input", "Select"],
          depth: 3,
        },
      ],
    },
  },
  vitest: {
    globals: "implicit",
  },
});
