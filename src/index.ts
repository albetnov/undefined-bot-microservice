import { Server } from "socket.io";
import { App } from "uWebSockets.js";
import pino from "pino";
import JsonResponse from "./Utils/JsonResponse";

export const logger = pino();

const app = App();
const io = new Server();

io.attachApp(app);

io.on("connection", (socket) => {
  logger.info("Client connection established");

  socket.conn.once("upgrade", () => {
    logger.info("upgraded transport", socket.conn.transport.name);
  });
});

app.get("/api/checkUser", (res, req) => {
  return new JsonResponse(res).send({
    count: io.engine.clientsCount,
  });
});

app.listen(3001, (token) => {
  if (!token) {
    logger.warn("port already in use");
  }
  logger.info("Listening in port 3001");
});
