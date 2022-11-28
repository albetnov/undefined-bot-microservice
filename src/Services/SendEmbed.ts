import { ApiType } from "../Utils/ApiType";
import PostBuilder from "../Utils/PostBuilder";
import BaseService, { ServiceHandler } from "./BaseService";

export default class SendEmbed extends BaseService {
  url = "/sendEmbed";
  apiType = ApiType.POST;

  async handler({ req, res, io }: ServiceHandler) {
    new PostBuilder(req, res, io, this.url).setName("SendEmbed").build();
  }
}
