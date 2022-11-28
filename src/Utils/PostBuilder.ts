import { Server } from "socket.io";
import { HttpRequest, HttpResponse } from "uWebSockets.js";
import { SuccessResponse } from "../Services/BaseService";
import OnAbortHandler from "../Services/OnAbortHandler";
import autoHandle from "./autoHandle";
import getJson from "./GetJson";
import JsonResponse from "./JsonResponse";

export default class PostBuilder {
  private req: HttpRequest;
  private res: HttpResponse;
  private io: Server;
  private name: string = "";
  private errMsg: string =
    "Failed to get response. Bot didn't respond. Or took longer than 5000ms.";
  private timeout: number = 5000;
  private url: string;

  constructor(req: HttpRequest, res: HttpResponse, io: Server, url: string) {
    this.req = req;
    this.res = res;
    this.io = io;
    this.url = url;
  }

  getRequest() {
    return this.req;
  }

  getResponse() {
    return this.res;
  }

  getServer() {
    return this.io;
  }

  getUrl() {
    return this.url;
  }

  setName(value: string) {
    this.name = value;
    return this;
  }

  setErrorMsg(msg: string) {
    this.errMsg = msg;
    return this;
  }

  setTimeout(timeout: number) {
    this.timeout = timeout;
    return this;
  }

  async build() {
    if (this.name === "") {
      throw Error("Invalid name provided");
    }

    const json = await getJson(this.req, this.res);

    if (autoHandle(json.error, this.res)) {
      return;
    }

    const onAbortHandler = new OnAbortHandler(this.res, this.url);

    const promise = () =>
      new Promise((resolve, reject) => {
        this.io
          .timeout(this.timeout)
          .emit(this.name, json.data, (err: any, response: SuccessResponse[]) => {
            if (err) {
              resolve(
                new JsonResponse(this.res).setStatus("500").send({
                  error: this.errMsg,
                })
              );
            } else {
              resolve(new JsonResponse(this.res).send({ success: response[0].success || false }));
            }
          });
      });

    promise().then(() => {
      onAbortHandler.checkRequest(this.res);
    });

    return onAbortHandler;
  }
}
