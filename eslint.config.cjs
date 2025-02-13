/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable no-undef */
const globals = require("globals");
const pluginJs = require("@eslint/js");
const tseslint = require("typescript-eslint");

/** @type {import('eslint').Linter.Config[]} */
module.exports = [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: ["dist/", "example/build/"],
  },
];
