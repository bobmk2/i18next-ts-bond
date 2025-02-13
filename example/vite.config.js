import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import checker from "vite-plugin-checker";
import i18nextTsBondVitePlugin from "../src/vite-plugin";

export default defineConfig({
  plugins: [
    react(),
    checker({
      typescript: true,
      eslint: {
        useFlatConfig: true,
        lintCommand: 'eslint "./src/**/*.{ts,tsx}"',
      },
    }),
    i18nextTsBondVitePlugin({
      localesDir: "./src/locales",
      outputFile: "./src/i18nKey.ts",
      languages: ["ja", "en"],
    }),
  ],
  publicDir: "public",
  build: {
    outDir: "build",
  },
});
