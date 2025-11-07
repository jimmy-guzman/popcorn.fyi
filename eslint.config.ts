import { defineConfig } from "@jimmy.codes/eslint-config";
import { GLOB_TSX } from "@jimmy.codes/eslint-config/globs";
import pluginRouter from "@tanstack/eslint-plugin-router";

export default defineConfig({
  overrides: [
    {
      files: [GLOB_TSX],
      rules: {
        "jsx-a11y/label-has-associated-control": [
          2,
          {
            controlComponents: ["Input", "Select"],
            depth: 3,
          },
        ],
      },
    },
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
});
