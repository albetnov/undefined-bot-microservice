import { ApiType } from "../Utils/ApiType";
import PostBuilder from "../Utils/PostBuilder";
import BaseService, { ServiceHandler } from "./BaseService";

export default class RefreshCacheService extends BaseService {
  url: string = "/refreshCache";
  apiType = ApiType.POST;

  async handler({ req, res, io }: ServiceHandler) {
    new PostBuilder(req, res, io, this.url).setName("RefreshCache").build();
  }
}
