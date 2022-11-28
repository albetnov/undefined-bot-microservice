import { FastifyReply, FastifyRequest } from "fastify";
import { Server, Socket } from "socket.io";
import { ApiType } from "../Utils/ApiType";

export interface ServiceHandler {
  req: FastifyRequest;
  res: FastifyReply;
  io: Server;
}

export interface SuccessResponse {
  success: boolean;
}

export default abstract class BaseService {
  abstract apiType: ApiType;
  abstract url: string;

  constructor() {
    this.handler = this.handler.bind(this);
  }

  abstract handler({ req, res, io }: ServiceHandler): void;
}
