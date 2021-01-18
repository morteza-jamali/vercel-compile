import { NextApiRequest, NextApiResponse } from "next";

export interface IPageRequestURL {}

export interface IAPIRequestURL {
  tool: string;
  lang: string;
}

export interface IAPIResultJSON {
  result: string;
  type: "ERROR" | "SUCCESS";
}

export interface IAPIResponseParams {
  content: string;
  response?: NextApiResponse;
  code?: number;
  type?: 0 | 1;
}

export interface INextApiResponse extends NextApiResponse {
  returnResult(params: IAPIResponseParams): void;
  type: {
    ERROR: 1;
    SUCCESS: 0;
  };
}
