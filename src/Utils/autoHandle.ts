import { HttpResponse } from "uWebSockets.js";
import FailedBodyParse from "./FailedBodyParse";
import HeaderError from "./HeaderError";
import MethodError from "./MethodError";

export default function autoHandle(error: number, res: HttpResponse) {
  if (error === 1) {
    new FailedBodyParse(res);
    return true;
  }

  if (error === 2) {
    new HeaderError(res);
    return true;
  }

  if (error === 3) {
    new MethodError(res);
    return true;
  }

  return false;
}
