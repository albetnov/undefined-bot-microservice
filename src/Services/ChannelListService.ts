import { ApiType } from "../Utils/ApiType";
import JsonResponse from "../Utils/JsonResponse";
import AcknowledgeService from "./AcknowledgeService";
import { ServiceHandler } from "./BaseService";
import OnAbortHandler from "./OnAbortHandler";

interface ChannelListResponse {
  list: object[];
  status: string;
}

export default class ChannelListService extends AcknowledgeService {
  url: string = "/channelList";
  apiType = ApiType.GET;

  handler({ res, io }: ServiceHandler) {
    const onAbort = new OnAbortHandler(res, this.url);

    const promise = () => {
      return new Promise((resolve, reject) => {
        io.timeout(5000).emit("ChannelList", (err: any, response: ChannelListResponse[]) => {
          if (err) {
            resolve(
              new JsonResponse(res).setStatus("500").send({
                error:
                  "Failed to fetch channel list. Bot didn't respond. Or took longer than 5000ms.",
              })
            );
          } else {
            resolve(new JsonResponse(res).send({ list: response[0].list }));
          }
        });
      });
    };

    promise().then(() => {
      onAbort.checkRequest(res);
    });

    return onAbort;
  }
}
