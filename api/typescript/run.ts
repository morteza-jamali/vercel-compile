import { NextApiRequest } from "next";
import { isTSCompilerRequest } from "../../src/typecheck";
import { isStringBasedCompile } from "./index.d";
import { compileByString } from "./tsc";

export default function run(request: NextApiRequest) {
  let source: string;

  if (isTSCompilerRequest(request.body)) {
    if (isStringBasedCompile(request.body)) {
      try {
        let compiled = compileByString(
          request.body.source_code,
          request.body.options
        );
        source = new Map(Object.entries(compiled)).get("outputText");

        return {
          result: evalute(source),
        };
      } catch (error) {
        console.log(error);
      }
    }
  }
}

const evalute = (source: string) => {
  console.log(source);
  
  try {
    return eval(source);
  } catch (error) {
    console.log(error);
  }
};
