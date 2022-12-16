import { ApiType } from "../Utils/ApiType";
import PostBuilder from "../Utils/PostBuilder";
import BaseService, { ServiceHandler } from "./BaseService";

export default class CastRules extends BaseService {
  url = "/castRules";
  apiType = ApiType.GET;

  async handler({ req, res, io }: ServiceHandler) {
    new PostBuilder(req, res, io, this.url).setName("CastRules").build();
  }
}
