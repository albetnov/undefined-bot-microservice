import { ApiType } from "../Utils/ApiType";
import getJson from "../Utils/getJson";
import JsonResponse from "../Utils/JsonResponse";
import BaseService, { ServiceHandler } from "./BaseService";

export default class RefreshCacheService extends BaseService {
  url: string = "/refreshCache";
  apiType = ApiType.POST;

  async handler({ req, res, socket }: ServiceHandler) {
    socket.emit("refreshCache", await getJson(res));
    new JsonResponse(res).send({ message: "ok!" });
  }
}
