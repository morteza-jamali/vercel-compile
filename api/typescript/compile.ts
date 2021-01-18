import { NextApiRequest } from "next";
import { INextApiResponse } from "../../typings/api";
import { isStringBasedCompile, isTSCompilerRequest } from "./index.d";
import { compileByString } from "./tsc";
import { SyntaxError } from "../../src/Error";

export default function compile(
  request: NextApiRequest,
  response: INextApiResponse
) {
  if (isTSCompilerRequest(request.body)) {
    if (isStringBasedCompile(request.body)) {
      let content: string;

      try {
        content = compileByString(
          request.body.source_code,
          request.body.options
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
