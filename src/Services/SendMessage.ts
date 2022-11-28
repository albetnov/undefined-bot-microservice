import { ApiType } from "../Utils/ApiType";
import PostBuilder from "../Utils/PostBuilder";
import AcknowledgeService from "./AcknowledgeService";
import { ServiceHandler } from "./BaseService";

export default class SendMessage extends AcknowledgeService {
  url = "/sendMessage";
  apiType = ApiType.POST;

  async handler({ req, res, io }: ServiceHandler) {
    return new PostBuilder(req, res, io, this.url).setName("SendMessage").build();
  }
}
