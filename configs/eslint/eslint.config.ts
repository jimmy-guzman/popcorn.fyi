import eslintConfig from "@jimmy.codes/eslint-config";

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
  ],
});
