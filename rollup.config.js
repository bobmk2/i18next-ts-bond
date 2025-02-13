import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";

export default [
  {
    input: "src/cli/index.ts",
    output: {
      dir: "dist",
      format: "esm",
      entryFileNames: "cli.js",
      sourcemap: true,
    },
    plugins: [
      resolve(),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.json",
      }),
    ],
  },
  {
    input: "src/vite-plugin/index.ts",
    output: {
      dir: "dist",
      format: "esm",
      entryFileNames: "vite-plugin.js",
      sourcemap: true,
    },
    plugins: [
      resolve(),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.json",
      }),
    ],
  },
];
