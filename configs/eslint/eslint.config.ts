import eslintConfig from "@jimmy.codes/eslint-config";
import pluginRouter from "@tanstack/eslint-plugin-router";

export default eslintConfig({
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
});
