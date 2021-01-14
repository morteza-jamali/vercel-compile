import { NextApiResponse } from "next";
import { isCompileAPIResponse } from "../api/typescript/index.d";
import { IAPIResponse } from "../typings/api";

export default function response(
  now_response: NextApiResponse,
  content: any,
  code: number = 200
) {
  switch (typeof content) {
    case "string":
      now_response.setHeader("Content-Type", "text/html");
      break;
    case "object":
      content = JSON.stringify(validateResponseObject(content));
      now_response.setHeader("Content-Type", "application/json");
      break;
  }

  now_response.statusCode = code;
  now_response.end(content);
}

const validateResponseObject = (response: any): IAPIResponse => {
  if (isCompileAPIResponse(response)) {
    response["result"] = response.outputText;
    delete response.outputText;
  }

  return response;
};
