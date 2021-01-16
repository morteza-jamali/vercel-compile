import API from "./api";
import { response, response_type } from "../../src/response";
import { isAPIRequest } from "../../src/typecheck";
import { NextApiRequest, NextApiResponse } from "next";

const callAPI = async (req: NextApiRequest, res: NextApiResponse) => {
  let result: any;

  await import(`../../api/${req.query.lang}/${req.query.tool}.ts`)
    .then((module: any) => {
      result = module.default(req);
    })
    .catch((error: any) => {
      response({
        now_response: res,
        content: { result: error.message },
        type: response_type.ERROR,
      });
    });

  return result;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (isAPIRequest(req.query)) {
    try {
      response({ now_response: res, content: await callAPI(req, res) });
    } catch (error) {
      console.log(error);
    }
  } else {
    response({ now_response: res, content: "<div>This is for test</div>" });
  }
};

export default handler;
