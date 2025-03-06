import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: {
      globals: globals.node, // Set the environment to Node.js
      ecmaVersion: "latest", // Use the latest ECMAScript features
    },
    // rules: {
    //   "no-unused-vars": "warn", // Warn about unused variables
    //   "no-console": "off", // Allow console statements (useful for logging in Node.js)
    //   "semi": ["error", "always"], // Enforce semicolons
    //   "quotes": ["error", "double"], // Enforce double quotes
    //   "eqeqeq": ["error", "always"], // Require strict equality (`===` and `!==`)
    //   "curly": ["warn", "none"], // Require curly braces for all control statements
    //   "no-var": "error", // Disallow `var` in favor of `let` and `const`
    //   "prefer-const": "error", // Suggest `const` if a variable is not reassigned
    //   // "arrow-body-style": ["error", "as-needed"], // Enforce concise arrow function syntax where possible
    //   // "no-trailing-spaces": "error", // Disallow trailing spaces
    // },
    ignores:["env","node_modules","dockerfile","dockerignore","gitignore","eslintrc","eslintignore"],
    
  },
  pluginJs.configs.recommended,
];
