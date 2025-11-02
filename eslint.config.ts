// eslint.config.ts

import { dirname } from "path";
import { fileURLToPath } from "url";
import globals from "globals";

// Core ESLint configs
import eslintJs from "@eslint/js";
import eslintTs from "typescript-eslint";

// Next.js plugin (flat config compatible)
import nextPlugin from "@next/eslint-plugin-next";

// Plugins
import reactHooksPlugin from "eslint-plugin-react-hooks";
import importPlugin from "eslint-plugin-import";
import unusedImportsPlugin from "eslint-plugin-unused-imports";
import reactPlugin from "eslint-plugin-react";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const eslintConfig = [
  /* =====================================================
     ✅ Base ESLint Configurations
  ====================================================== */
  eslintJs.configs.recommended,
  ...eslintTs.configs.recommended,
  nextPlugin.configs["core-web-vitals"],

  /* =====================================================
     ✅ Ignore patterns
  ====================================================== */
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },

  /* =====================================================
     ✅ Plugins, Language options, Settings, and Rules
  ====================================================== */
  {
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
      import: importPlugin,
      "unused-imports": unusedImportsPlugin,
    },

    settings: {
      react: { version: "detect" },
      "import/resolver": {
        typescript: {
          project: "./tsconfig.json",
        },
      },
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },

    rules: {
      /* =====================
         🟣 TypeScript Rules
      ====================== */
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-require-imports": "warn",
      "@typescript-eslint/no-unnecessary-type-constraint": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-shadow": "error",
      "@typescript-eslint/consistent-type-imports": "warn",

      /* =====================
         🟢 React Rules
      ====================== */
      "react/prop-types": "off",
      "react/no-unknown-property": "off",
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
      "react/no-children-prop": "off",
      "react/no-danger": "error",
      "react/jsx-boolean-value": "error",
      "react/self-closing-comp": "error",
      "react/jsx-no-useless-fragment": ["warn", { allowExpressions: true }],
      "react/jsx-curly-brace-presence": [
        "error",
        { props: "never", children: "never" },
      ],

      /* =====================
         🧩 React Hooks Rules
      ====================== */
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      /* =====================
         ⚙️ General Rules
      ====================== */
      "no-unused-vars": "off", // handled by TS rule
      "no-console": "off",
      "no-case-declarations": "off",
      curly: "error",
      eqeqeq: "warn",
      "consistent-return": "error",
      "no-constant-condition": "warn",
      "default-case": ["error", { commentPattern: "^no default$" }],
      "default-case-last": "error",

      /* =====================
         🎨 Color / Syntax Restrictions
      ====================== */
      "no-restricted-syntax": [
        "error",
        {
          selector: "Literal[value=/#[0-9a-fA-F]{3,8}/]",
          message:
            "No hard-coded hex colors; use Tailwind classes or CSS variables",
        },
        {
          selector: "Literal[value=/rgba\\(/]",
          message:
            "No hard-coded rgba colors; use Tailwind classes or CSS variables",
        },
        {
          selector: "Literal[value=/hsl\\(/]",
          message:
            "No hard-coded hsl colors; use Tailwind classes or CSS variables",
        },
        {
          selector: "TemplateLiteral[quasis.0.value.raw=/#[0-9a-fA-F]{3,8}/]",
          message:
            "No hard-coded hex colors in template literals; use Tailwind classes or CSS variables",
        },
      ],

      /* =====================
         🚫 Restricted Imports
      ====================== */
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["../../../*"],
              message:
                "Relative imports should not go up more than 2 levels. Use absolute imports with @/ instead.",
            },
          ],
        },
      ],

      /* =====================
         🧹 Unused Imports Cleanup
      ====================== */
      "unused-imports/no-unused-imports": "warn",
    },
  },
];

export default eslintConfig;
