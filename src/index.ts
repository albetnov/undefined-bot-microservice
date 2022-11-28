import pino from "pino";
import env from "./Utils/env";
import apis from "./Routes/api";
import { config } from "dotenv";
import Kernel from "./Middlewares/Kernel";
import fastify from "fastify";
import fastifyIO from "fastify-socket.io";
config();
import cors from "@fastify/cors";

export const logger = pino();

const server = fastify();
server.register(fastifyIO);
server.register(cors);

apis.forEach((item) => {
  server[item.apiType](item.url, (req, res) => {
    item.routeHandler()({ req, res, io: server.io });
  });
});

server.get("/api/checkUser", () => {
  return { count: server.io.engine.clientsCount };
});

server.ready().then(() => {
  Kernel.forEach((item) => {
    server.io.use((socket, next) => item({ socket, next }));
  });

  server.io.on("connection", (socket) => {
    logger.info("[Connection]: Client connection established");

    socket.conn.once("upgrade", () => {
      logger.info("[Connection]: upgraded transport", socket.conn.transport.name);
    });
  });
});

server.listen({
  port: env.getInt("PORT", 3000),
});
logger.info("Listening on port: 3000");
