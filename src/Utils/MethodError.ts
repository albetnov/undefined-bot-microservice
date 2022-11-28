import { HttpResponse } from "uWebSockets.js";
import JsonResponse from "./JsonResponse";

export default class MethodError {
  constructor(res: HttpResponse) {
    return new JsonResponse(res).setStatus("400").send({ error: "Either POST or PUT or PATCH." });
  }
}
