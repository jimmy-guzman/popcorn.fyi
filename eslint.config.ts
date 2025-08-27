import { defineConfig } from "@jimmy.codes/eslint-config";
import { GLOB_TSX } from "@jimmy.codes/eslint-config/globs";
import pluginRouter from "@tanstack/eslint-plugin-router";
import arrowReturnStyle from "eslint-plugin-arrow-return-style";

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
    {
      plugins: {
        "arrow-return-style": arrowReturnStyle,
      },
      rules: {
        "arrow-body-style": "off",
        "arrow-return-style/arrow-return-style": "error",
        "arrow-return-style/no-export-default-arrow": "error",
      },
    },
    ...pluginRouter.configs["flat/recommended"],
  ],
});
