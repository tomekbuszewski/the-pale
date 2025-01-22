import js from "@eslint/js";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";
import tseslint from "typescript-eslint";
import importPlugin from "eslint-plugin-import";

export default tseslint.config(
  { ignores: ["dist", ".react-router", ".storybook"] },
  {
    settings: {
      react: { version: "18.3" },
      "import/resolver": {
        typescript: {},
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx", ".mjs"],
        },
      },
    },
    extends: [
      js.configs.recommended,
      importPlugin.flatConfigs.recommended,
      ...tseslint.configs.recommendedTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
    ],
    files: ["**/*.{ts,tsx,mjs}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        project: ["./tsconfig.json"],
        tsconfigRootDir: "./",
      },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "import/no-unresolved": [
        "error",
        { ignore: [".css", "@react-router/dev"] },
      ],
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/only-throw-error": [
        "error",
        {
          allow: ["Redirect", "Response"],
          allowThrowingAny: false,
          allowThrowingUnknown: false,
        },
      ],
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            ["^react", "^@?\\w"],
            ["^@?\\w.*\\u0000$"],
            ["^[^.].*\\u0000$", "^\\..*\\u0000$"],
            ["^\\u0000"],
            ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
            ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
            ["^.+\\.s?css$"],
            ["^(@)(/.*|$)"],
          ],
        },
      ],
      "simple-import-sort/exports": "error",
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
      "react/prop-types": "off",
    },
  }
);
