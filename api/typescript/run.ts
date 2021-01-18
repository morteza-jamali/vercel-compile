import { NextApiRequest } from "next";
import { SyntaxError } from "../../src/Error";
import { INextApiResponse } from "../../typings/api";
import { isStringBasedCompile, isTSCompilerRequest } from "./index.d";
import { compileByString } from "./tsc";

export default function run(
  request: NextApiRequest,
  response: INextApiResponse
) {
  if (isTSCompilerRequest(request.body)) {
    if (isStringBasedCompile(request.body)) {
      let content: string;

      try {
        content = eval(
          compileByString(request.body.source_code, request.body.options)
        );

        response.returnResult({ content });
      } catch (error) {
        if (error instanceof SyntaxError) {
          response.returnResult({
            content: error.message,
            type: response.type.ERROR,
          });
        }
      }
    }
  }
}
