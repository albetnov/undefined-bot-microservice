import { compareSync, hashSync } from "bcrypt";
import env from "../Utils/env";
import { MiddlewareFn } from "./Kernel";

export default function Auth({ socket, next }: MiddlewareFn) {
  if (!compareSync(socket.handshake.auth.token, env.safeGet("ENCRYPTED_TOKEN"))) {
    next(new Error("Unauthenticated!"));
  } else {
    next();
  }
}
