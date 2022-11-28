import { Server, Socket } from "socket.io";
import { HttpRequest, HttpResponse } from "uWebSockets.js";
import { ApiType } from "../Utils/ApiType";

export interface ServiceHandler {
  req: HttpRequest;
  res: HttpResponse;
  socket: Socket;
  io: Server;
}

export interface SuccessResponse {
  success: boolean;
}

export default abstract class BaseService {
  abstract apiType: ApiType;
  abstract url: string;
  abstract handler({ socket, req, res, io }: ServiceHandler): void;
}
