import globals from "globals";
import eslint from "@eslint/js";
// @see https://github.com/microsoft/vscode-eslint/issues/1543#issuecomment-1571600166
import tseslint from "./node_modules/typescript-eslint/dist/index.js";

/** @type {import('eslint').Linter.Config[]} */
export default tseslint.config(
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { languageOptions: { globals: globals.node } },
  {
    ignores: ["dist/", "example/build/"],
  },
  eslint.configs.recommended,
  tseslint.configs.recommended,
);
