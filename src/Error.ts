export class URLError extends Error {
  constructor(url: string) {
    super(`${url} service does not exist`);
    this.name = "URLError";
  }
}
