export interface IStringBasedCompile {
  source_code: string;
}

export interface ICompileAPIResult {
  outputText: string;
}

export interface ITSRequestBody extends IStringBasedCompile {
  source_code: string;
  options?: string;
}

export function isStringBasedCompile(
  request: ITSRequestBody | any
): request is ITSRequestBody {
  return (request as ITSRequestBody).source_code !== undefined;
}

export function isCompileAPIResponse(
  response: ICompileAPIResult | any
): response is ICompileAPIResult {
  return (response as ICompileAPIResult).outputText !== undefined;
}

export function isTSCompilerRequest(
  request: ITSReqBody | any
): request is ITSReqBody {
  return (request as ITSReqBody).source_code !== undefined;
}
