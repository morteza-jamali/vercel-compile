import { URLError } from "../../src/Error";
import { extendResponse } from "../../src/response";
import { isAPIRequest } from "../../src/typecheck";
import type { NextApiRequest, NextApiResponse } from "next";
import { INextApiResponse } from "../../typings/api";

const callAPI = async (request: NextApiRequest, response: INextApiResponse) => {
  await import(`../../api/${request.query.lang}/${request.query.tool}.ts`)
    .then((module: any) => {
      module.default(request, response);
    })
    .catch(() => {
      throw new URLError(`${request.query.tool}/${request.query.lang}`);
    });
};

const handler = async (request: NextApiRequest, _response: NextApiResponse) => {
  let response: INextApiResponse = _response as INextApiResponse;

  extendResponse(response);

  if (isAPIRequest(request.query)) {
    try {
      await callAPI(request, response);
    } catch (error) {
      if (error instanceof URLError) {
        response.returnResult({
          content: error.message,
          type: response.type.ERROR,
        });
      } else {
        // Log error to hosted application
      }
    }
  } else {
    response.returnResult({ content: "<div>This is for test</div>" });
  }
};

export default handler;
