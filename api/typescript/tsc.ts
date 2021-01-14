import * as tsc from "typescript";
import config from "./config";

const _config: any = config(tsc);

export function compileByString(source: string, options: any = {}) {
  return tsc.transpileModule(source, _config(options));
}
