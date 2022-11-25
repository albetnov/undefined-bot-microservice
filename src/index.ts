import { Server } from "socket.io";
import { App } from "uWebSockets.js";
import pino from "pino";
import JsonResponse from "./Utils/JsonResponse";
import env from "./Utils/env";
import apis from "./Routes/api";
import { config } from "dotenv";
config();

export const logger = pino();

const app = App();
const io = new Server();

io.attachApp(app);

io.on("connection", (socket) => {
  logger.info("Client connection established");

  socket.conn.once("upgrade", () => {
    logger.info("upgraded transport", socket.conn.transport.name);
  });

  apis.forEach((item) => {
    app[item.apiType](item.url, (res, req) => item.handler({ socket, req, res, io }));
  });
});

app.get("/api/checkUser", (res, req) => {
  return new JsonResponse(res).send({
    count: io.engine.clientsCount,
  });
});

app.listen(env.getInt("PORT", 3001), (token) => {
  if (!token) {
    logger.warn("port already in use");
  }
  logger.info("Listening in port " + env.getInt("PORT", 3001));
});
