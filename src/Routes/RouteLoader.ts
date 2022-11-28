import { logger } from "..";
import BaseService, { ServiceHandler } from "../Services/BaseService";

export interface RouteHandler extends Omit<BaseService, "handler"> {
  routeHandler: () => (params: ServiceHandler) => void;
}

export default function RouteLoader(service: new () => BaseService): RouteHandler {
  const instance = new service();

  return {
    apiType: instance.apiType,
    url: "/api" + instance.url,
    routeHandler() {
      logger.info(`[WS REST]: Executing /api${instance.url}`);
      return instance.handler;
    },
  };
}
