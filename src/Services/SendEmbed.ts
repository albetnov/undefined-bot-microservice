import { ApiType } from "../Utils/ApiType";
import PostBuilder from "../Utils/PostBuilder";
import AcknowledgeService from "./AcknowledgeService";
import { ServiceHandler } from "./BaseService";

export default class SendEmbed extends AcknowledgeService {
  url = "/sendEmbed";
  apiType = ApiType.POST;

  async handler({ req, res, io }: ServiceHandler) {
    return new PostBuilder(req, res, io, this.url).setName("SendEmbed").build();
  }
}
