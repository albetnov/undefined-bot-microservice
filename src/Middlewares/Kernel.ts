import { Socket } from "socket.io";
import { ExtendedError } from "socket.io/dist/namespace";
import Auth from "./Auth";

export interface MiddlewareFn {
  socket: Socket;
  next: (err?: ExtendedError) => void;
}

export default [Auth];
