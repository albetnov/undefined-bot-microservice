import { Server } from "socket.io";
import { App } from "uWebSockets.js";
import pino from "pino";
import JsonResponse from "./Utils/JsonResponse";
import env from "./Utils/env";
import apis from "./Routes/api";
import { config } from "dotenv";
import Kernel from "./Middlewares/Kernel";
config();

export const logger = pino();

const app = App();
const io = new Server();

io.attachApp(app);

Kernel.forEach((item) => {
  io.use((socket, next) => item({ socket, next }));
});

io.on("connection", (socket) => {
  logger.info("[Connection]: Client connection established");

  socket.conn.once("upgrade", () => {
    logger.info("[Connection]: upgraded transport", socket.conn.transport.name);
  });

  apis.forEach((item) => {
    app[item.apiType](item.url, (res, req) => {
      item.routeHandler()({ req, res, socket, io });
    });
  });
});

app.get("/api/checkUser", (res, req) => {
  return new JsonResponse(res).send({
    count: io.engine.clientsCount,
  });
});

app.listen(env.getInt("PORT", 3001), (token) => {
  if (!token) {
    logger.warn("[WS Service]: port already in use");
  }
  logger.info("[WS Service]: Listening in port " + env.getInt("PORT", 3001));
});
