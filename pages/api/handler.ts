import API from "./api";
import { IAPIRequest, IPageRequest } from "../../typings/api";
import { NextApiRequest, NextApiResponse } from "next";

const isAPIRequest = (
  request: IAPIRequest | IPageRequest
): request is IAPIRequest => {
  return (
    (request as IAPIRequest).tool !== undefined &&
    (request as IAPIRequest).lang !== undefined
  );
};

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
  let response: any;

  if (isAPIRequest(req.query)) {
    try {
      response = await callAPI(req);
    } catch (error) {
      console.log(error);
    }

    res.setHeader("Content-Type", "application/json");
  } else {
    res.setHeader("Content-Type", "text/html");
    response = "<div>gfdgdfg</div>";
  }

  res.statusCode = 200;
  res.end(response);
};

export default handler;
