import { HttpResponse } from "uWebSockets.js";
import JsonResponse from "./JsonResponse";

export default class HeaderError {
  constructor(res: HttpResponse) {
    return new JsonResponse(res)
      .setStatus("400")
      .send({
        error: "Not Providing correct headers.",
        expected: "Content-Type: application/json",
      });
  }
}
