import { HttpResponse } from "uWebSockets.js";
import { logger } from "..";

export default class OnAbortHandler {
  private url: string;
  private res: HttpResponse;

  constructor(res: HttpResponse, url: string) {
    this.res = res;
    this.url = url;
    res.onAborted(() => {});
  }

  checkRequest(res: HttpResponse) {
    if (res.id === -1) {
      logger.warn(`[AsyncService:${this.url}] Error: Same request has been made.`);
    }

    res.id = -1;
  }

  response(callback: () => void) {
    callback();
    this.checkRequest(this.res);
  }
}
