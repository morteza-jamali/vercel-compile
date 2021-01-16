import { NextApiResponse } from "next";
import { isCompileAPIResponse } from "../api/typescript/index.d";
import { IAPIResponse } from "../typings/api";

export interface IResponseOptions {
  now_response: NextApiResponse;
  content: any;
  code?: number;
  type?: number;
}

export const response_type = {
  ERROR: 1,
  SUCCESS: 0,
};

let params_default: IResponseOptions = {
  now_response: undefined,
  content: undefined,
  code: 200,
  type: response_type.SUCCESS,
};

export function response(params: IResponseOptions) {
  params = { ...params_default, ...params };

  switch (typeof params.content) {
    case "string":
      params.now_response.setHeader("Content-Type", "text/html");
      break;
    case "object":
      params.content = JSON.stringify(
        validateResponseObject(params.content, params.type)
      );
      params.now_response.setHeader("Content-Type", "application/json");
      break;
  }

  params.now_response.statusCode = params.code;
  params.now_response.end(params.content);
}

const validateResponseObject = (response: any, type: number): IAPIResponse => {
  Object.keys(response_type).forEach((key) => {
    if (response_type[key] === type) {
      response.type = key;
    }
  });

  if (isCompileAPIResponse(response)) {
    response["result"] = response.outputText;
    delete response.outputText;
  }

  return response;
};
