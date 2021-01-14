import { NextApiRequest } from "next";
import { isTSCompilerRequest } from "../../src/typecheck";
import { isStringBasedCompile } from "./index.d";
import { compileByString } from "./tsc";

export default function compile(request: NextApiRequest) {
  if (isTSCompilerRequest(request.body)) {
    if (isStringBasedCompile(request.body)) {
      return compileByString(request.body.source_code, request.body.options);
    }
  }
}
