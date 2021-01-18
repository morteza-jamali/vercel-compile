export class URLError extends Error {
  constructor(url: string) {
    super(`${url} service does not exist`);
    this.name = "URLError";
  }
}

export class SyntaxError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SyntaxError";
  }
}
