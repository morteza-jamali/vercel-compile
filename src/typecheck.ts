import { ITSReqBody, IAPIRequest, IPageRequest } from "../typings/api";

export function isTSCompilerRequest(
  request: ITSReqBody | any
): request is ITSReqBody {
  return (request as ITSReqBody).source_code !== undefined;
}

export function isAPIRequest(
  request: IAPIRequest | IPageRequest
): request is IAPIRequest {
  return (
    (request as IAPIRequest).tool !== undefined &&
    (request as IAPIRequest).lang !== undefined
  );
}
