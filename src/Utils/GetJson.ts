import { HttpRequest, HttpResponse } from "uWebSockets.js";

type TPromiseObjectNull = Promise<{ [key: string]: any } | null>;

const parseBody = (res: HttpResponse): TPromiseObjectNull =>
  new Promise((resolve, reject) => {
    let buffer: Buffer;

    res.onData((ab, isLast) => {
      const chunk = Buffer.from(ab);

      if (isLast) {
        const toParse = buffer ? Buffer.concat([buffer, chunk]) : chunk;
        try {
          const resolveValue = JSON.parse(toParse as unknown as string);
          resolve(resolveValue);
        } catch {
          reject(null);
        }
      } else {
        const concatValue = buffer ? [buffer, chunk] : [chunk];
        buffer = Buffer.concat(concatValue);
      }
    });

    res.onAborted(() => reject(null));
  });

interface JsonResult {
  data: any;
  error: number;
}

const getJson = async (req: HttpRequest, res: HttpResponse) => {
  const result: JsonResult = {
    data: null,
    error: 0,
  };

  if (req.getHeader("content-type") !== "application/json") {
    result.error = 2;
  }

  if (req.getMethod() !== "post" && req.getMethod() !== "put" && req.getMethod() !== "patch") {
    result.error = 3;
  }

  try {
    if (result.error === 0) {
      result.data = await parseBody(res);
    }
  } catch {
    result.error = 1;
  }

  return result;
};

export default getJson;
