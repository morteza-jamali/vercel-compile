import API from "./api";
import { URLError } from "../../src/Error";
import { response, response_type } from "../../src/response";
import { isAPIRequest } from "../../src/typecheck";
import { NextApiRequest, NextApiResponse } from "next";

const callAPI = async (req: NextApiRequest) => {
  let result: any;

  await import(`../../api/${req.query.lang}/${req.query.tool}.ts`)
    .then((module: any) => {
      result = module.default(req);
    })
    .catch(() => {
      throw new URLError(`${req.query.tool}/${req.query.lang}`);
    });

  return result;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (isAPIRequest(req.query)) {
    try {
      response({ now_response: res, content: await callAPI(req) });
    } catch (error) {
      if (error instanceof URLError) {
        response({
          now_response: res,
          content: { message: error.message },
          type: response_type.ERROR,
        });
      } else {
        // Log error to hosted application
      }
    }
  } else {
    response({ now_response: res, content: "<div>This is for test</div>" });
  }
};

export default handler;
