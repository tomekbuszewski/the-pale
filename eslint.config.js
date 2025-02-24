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
      react: { version: "19.0" },
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
      "import/no-unresolved": ["error"],
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/only-throw-error": [
        "error",
        {
          allowThrowingAny: false,
          allowThrowingUnknown: false,
        },
      ],
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            ["^react", "^(?!@ui)@?\\w"],
            ["^@ui"],
            ["^\\./", "^\\.\\./"],
            ["^.+\\.s?css$"],
          ],
        },
      ],
      "simple-import-sort/exports": "error",
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
      "react/prop-types": "off",
    },
  },
);
