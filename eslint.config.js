import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        NinePatch: "readonly",
      },
    },
    rules: {
      "semi": ["error", "always"],
      "quotes": ["error", "double"],
      "comma-dangle": ["error", "always-multiline"],
      "object-curly-newline": ["error", {multiline: true, consistent: true}],
      "array-element-newline": ["error", {multiline: true, minItems: 3}],
      "function-paren-newline": ["error", "consistent"],
      "arrow-body-style": ["error", "always"],
      "arrow-spacing": ["error", {"before": true, "after": true}],
      "comma-spacing": ["error", { "before": false, "after": true }],
    },
  },
  pluginJs.configs.recommended,
];
