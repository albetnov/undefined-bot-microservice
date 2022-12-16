import { FastifyReply, FastifyRequest } from "fastify";
import { Server } from "socket.io";
import { SuccessResponse } from "../Services/BaseService";

export default class PostBuilder {
  private req: FastifyRequest;
  private res: FastifyReply;
  private io: Server;
  private name: string = "";
  private errMsg: string =
    "Failed to get response. Bot didn't respond. Or took longer than 5000ms.";
  private timeout: number = 5000;
  private url: string;

  constructor(req: FastifyRequest, res: FastifyReply, io: Server, url: string) {
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

    const json = this.req.body;

    this.io.timeout(this.timeout).emit(this.name, json, (err: any, response: SuccessResponse[]) => {
      if (err) {
        this.res.status(500).send({ error: this.errMsg });
      } else {
        this.res.send({ success: response[0].success || false });
      }
    });
  }
}
