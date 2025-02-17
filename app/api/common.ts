import { NextRequest } from "next/server";

const OPENAI_URL = "api.openai.com";
const DEFAULT_PROTOCOL = "https";
const PROTOCOL = process.env.PROTOCOL ?? DEFAULT_PROTOCOL;
const BASE_URL = process.env.BASE_URL ?? OPENAI_URL;

export async function requestOpenai(req: NextRequest) {
  const apiKey = req.headers.get("token");
  const openaiPath = req.headers.get("path");

  let baseUrl = BASE_URL;

  if (!baseUrl.startsWith("http")) {
    baseUrl = `${PROTOCOL}://${baseUrl}`;
  }

  console.log("[Proxy] ", openaiPath);
  console.log("[Base Url]", baseUrl);

  let customHeaders = {
    "Content-Type": "application/json",
    Authorization: "",
  };
  if (apiKey !== undefined && apiKey !== "" && apiKey !== null) {
    customHeaders.Authorization = `Bearer ${apiKey}`;
  }
  return fetch(`${baseUrl}/${openaiPath}`, {
    headers: customHeaders,
    method: req.method,
    body: req.body,
  });
}
