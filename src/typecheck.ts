import { IAPIRequestURL, IPageRequestURL } from "../typings/api";

export function isAPIRequest(
  request: IAPIRequestURL | IPageRequestURL
): request is IAPIRequestURL {
  return (
    (request as IAPIRequestURL).tool !== undefined &&
    (request as IAPIRequestURL).lang !== undefined
  );
}
