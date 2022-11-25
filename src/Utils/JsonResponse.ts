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
    const res = this.res.writeStatus(this.status).writeHeader("Content-Type", "application/json");
    this.headers.forEach((item) => {
      res.writeHeader(item.name, item.value);
    });
    return res.end(JSON.stringify(body));
  }
}
