import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

import packageJson from "./package.json";

export default {
  plugins: [
    resolve(),
    commonjs(),
    typescript({
      tsconfig: "./tsconfig.json",
      declaration: false,
    }),
  ],
  output: [
    {
      file: packageJson.main,
      format: "cjs",
    },
  ],
  input: "src/index.ts",
};
