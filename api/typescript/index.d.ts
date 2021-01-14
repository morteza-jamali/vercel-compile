export interface IStringBasedCompile {
  source_code: string;
}

export interface ICompileAPIResult {
  outputText: string;
}

export function isStringBasedCompile(
  request: IStringBasedCompile | any
): request is IStringBasedCompile {
  return (request as IStringBasedCompile).source_code !== undefined;
}

export function isCompileAPIResponse(
  response: ICompileAPIResult | any
): response is ICompileAPIResult {
  return (response as ICompileAPIResult).outputText !== undefined;
}
