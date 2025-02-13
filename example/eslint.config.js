/* eslint-disable @typescript-eslint/no-require-imports */
const tseslint = require("typescript-eslint");
const pluginReact = require("eslint-plugin-react");
const pluginReactHooks = require("eslint-plugin-react-hooks");

/** @type {import('eslint').Linter.Config[]} */
module.exports = [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  {
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    plugins: {
      react: pluginReact,
      "react-hooks": pluginReactHooks,
    },
  },
  ...tseslint.configs.recommended,
];
