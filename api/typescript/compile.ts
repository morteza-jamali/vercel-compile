import { NextApiRequest } from "next";

export default function compile(req: NextApiRequest) {
  return JSON.stringify({ name: "typescript compiler" });
}
