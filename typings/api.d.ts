export interface IAPIRequest {
  tool: string;
  lang: string;
}

export interface IAPIResponse {
  result: string;
}

export interface ITSReqBody {
  source_code: string;
  options?: string;
}

export interface IPageRequest {}
