import { ApiType } from "../Utils/ApiType";
import PostBuilder from "../Utils/PostBuilder";
import AcknowledgeService from "./AcknowledgeService";
import { ServiceHandler } from "./BaseService";

export default class RefreshCacheService extends AcknowledgeService {
  url: string = "/refreshCache";
  apiType = ApiType.POST;

  async handler({ req, res, io }: ServiceHandler) {
    return new PostBuilder(req, res, io, this.url).setName("RefreshCache").build();
  }
}
