import { NextApiRequest } from "next";
import { isTSCompilerRequest } from "../../src/typecheck";
import { isStringBasedCompile } from "./index.d";
import { compileByString } from "./tsc";

export default function run(request: NextApiRequest) {
  let source: string;

  if (isTSCompilerRequest(request.body)) {
    if (isStringBasedCompile(request.body)) {
      source = new Map(
        Object.entries(
          compileByString(request.body.source_code, request.body.options)
        )
      ).get("outputText");

      return {
        result: evalute(source),
      };
    }
  }
}

const evalute = (source: string) => {
  return eval(source);
};
