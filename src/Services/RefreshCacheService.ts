import { ApiType } from "../Utils/ApiType";
import autoHandle from "../Utils/autoHandle";
import getJson from "../Utils/GetJson";
import JsonResponse from "../Utils/JsonResponse";
import BaseService, { ServiceHandler } from "./BaseService";

export default class RefreshCacheService extends BaseService {
  url: string = "/refreshCache";
  apiType = ApiType.POST;

  async handler({ req, res, io }: ServiceHandler) {
    const json = await getJson(req, res);

    if (autoHandle(json.error, res)) {
      return;
    }

    io.emit("RefreshCache", json.data);
    new JsonResponse(res).send({ message: "ok!" });
  }
}
