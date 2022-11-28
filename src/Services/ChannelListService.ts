import { HttpResponse } from "uWebSockets.js";
import { logger } from "..";
import { ApiType } from "../Utils/ApiType";
import JsonResponse from "../Utils/JsonResponse";
import BaseService, { ServiceHandler } from "./BaseService";

interface ChannelListResponse {
  list: object[];
  status: string;
}

export default class ChannelListService extends BaseService {
  url: string = "/channelList";
  apiType = ApiType.GET;

  handler({ req, res, io, socket }: ServiceHandler) {
    function onAbortedOrFinishedResponse(res: HttpResponse) {
      if (res.id === -1) {
        logger.warn("[Async Service]: Warning: Same Response ID detected.");
      }

      /* Mark this response already accounted for */
      res.id = -1;
    }

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
      onAbortedOrFinishedResponse(res);
    });

    res.onAborted(() => {
      onAbortedOrFinishedResponse(res);
    });
  }
}
