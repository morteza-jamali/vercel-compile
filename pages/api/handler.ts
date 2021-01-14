import API from "./api";
import response from "../../src/response";
import { isAPIRequest } from "../../src/typecheck";
import { NextApiRequest, NextApiResponse } from "next";

const callAPI = async (req: NextApiRequest) => {
  let result: any;

  await import(`../../api/${req.query.lang}/${req.query.tool}.ts`)
    .then((module: any) => {
      result = module.default(req);
    })
    .catch((error: any) => {
      console.log(error);
    });

  return result;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (isAPIRequest(req.query)) {
    try {
      response(res, await callAPI(req));
    } catch (error) {
      console.log(error);
    }
  } else {
    response(res, "<div>This is for test</div>");
  }
};

export default handler;
