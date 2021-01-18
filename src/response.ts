import {
  INextApiResponse,
  IAPIResponseParams,
  IAPIResultJSON,
} from "../typings/api";

export const extendResponse = (response: INextApiResponse) => {
  response.type = {
    ERROR: 1,
    SUCCESS: 0,
  };

  response.returnResult = (params: IAPIResponseParams) => {
    params = { ...params_default, ...params };
    params.content = JSON.stringify({
      result: params.content,
      type: Object.keys(response.type).find(
        (key) => response.type[key] === params.type
      ),
    } as IAPIResultJSON);
    params.response.statusCode = params.code;
    params.response.setHeader("Content-Type", "application/json");
    params.response.end(params.content);
  };

  let params_default: IAPIResponseParams = {
    response,
    content: "",
    code: 200,
    type: response.type.SUCCESS,
  };
};
