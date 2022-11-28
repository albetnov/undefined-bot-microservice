import { ApiType } from "../Utils/ApiType";
import BaseService, { ServiceHandler } from "./BaseService";

interface ChannelListResponse {
  list: object[];
  status: string;
}

export default class ChannelListService extends BaseService {
  url: string = "/channelList";
  apiType = ApiType.GET;

  handler({ res, io }: ServiceHandler) {
    io.timeout(5000).emit("ChannelList", (err: any, response: ChannelListResponse[]) => {
      if (err) {
        res.status(500).send({
          error: "Cannot fetch haiya cibai",
        });
      } else {
        res.send({ list: response[0].list || "dunno anjg" });
      }
    });
  }
}
