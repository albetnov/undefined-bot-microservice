import { HttpResponse } from "uWebSockets.js";
import JsonResponse from "./JsonResponse";

export default class FailedBodyParse {
  constructor(res: HttpResponse) {
    return new JsonResponse(res)
      .setStatus("500")
      .send({ error: "Failed to parse your request. JSON body is required!" });
  }
}
