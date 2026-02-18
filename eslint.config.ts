import { defineConfig } from "@jimmy.codes/eslint-config";
import pluginRouter from "@tanstack/eslint-plugin-router";

export default defineConfig({
  overrides: [
    {
      rules: {
        "perfectionist/sort-objects": [
          "error",
          {
            type: "natural",
            useConfigurationIf: {
              declarationMatchesPattern: {
                flags: "i",
                pattern: "^(?!.*Route).*$",
              },
            },
          },
          {
            type: "unsorted",
          },
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
      "react-refresh/only-export-components": [
        "error",
        {
          extraHOCs: [
            "createFileRoute",
            "createLazyFileRoute",
            "createRootRoute",
            "createRootRouteWithContext",
            "createLink",
            "createRoute",
            "createLazyRoute",
          ],
        },
      ],
    },
  },
  vitest: {
    globals: "implicit",
  },
});
