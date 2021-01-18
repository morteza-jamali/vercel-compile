import * as tsc from "typescript";
import config from "./config";
import { transformSync } from "@babel/core";
import { SyntaxError } from "../../src/Error";

const _config: any = config(tsc);

export function compileByString(source: string, options: any = {}) {
  let _result: any;

  try {
    _result = transformSync(source, {
      ast: false,
      sourceMaps: false,
      filename: "compile.ts",
      presets: ["@babel/preset-typescript"],
    });
  } catch (error) {
    throw new SyntaxError(error.message);
  }

  return _result.code;
  //return tsc.transpileModule(source, _config(options));
}
