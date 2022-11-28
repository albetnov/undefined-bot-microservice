import { HttpResponse } from "uWebSockets.js";

interface HttpHeaders {
  name: string;
  value: string;
}

export default class JsonResponse {
  private res: HttpResponse;
  private headers: HttpHeaders[] = [];
  private status = "200 OK";

  constructor(res: HttpResponse) {
    this.res = res;
    this.addHeaders = this.addHeaders.bind(this);
    this.setStatus = this.setStatus.bind(this);
    this.send = this.send.bind(this);
    this.addHeaders("Access-Control-Allow-Origin", "*");
    this.addHeaders("Content-Type", "application/json");
  }

  addHeaders(name: string, value: string) {
    this.headers.push({ name, value });
    return this;
  }

  setStatus(status: string) {
    this.status = status;
    return this;
  }

  send(body: object) {
    const res = this.res.writeStatus(this.status);
    this.headers.forEach((item) => {
      res.writeHeader(item.name, item.value);
    });
    return res.end(JSON.stringify(body));
  }
}
