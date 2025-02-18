import eslintConfig from "@jimmy.codes/eslint-config";
import pluginRouter from "@tanstack/eslint-plugin-router";

export default eslintConfig({
  overrides: [
    {
      files: ["**/*.?([cm])tsx"],
      rules: {
        "jsx-a11y/label-has-associated-control": [
          2,
          {
            controlComponents: ["Input", "Select"],
            depth: 3,
          },
        ],

        "perfectionist/sort-objects": [
          "error",
          { ignorePattern: ["Route"], type: "natural" },
        ],
      },
    },
    ...pluginRouter.configs["flat/recommended"],
  ],
});
