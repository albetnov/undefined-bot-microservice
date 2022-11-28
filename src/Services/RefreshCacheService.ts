import { ApiType } from "../Utils/ApiType";
import autoHandle from "../Utils/autoHandle";
import getJson from "../Utils/GetJson";
import JsonResponse from "../Utils/JsonResponse";
import AcknowledgeService from "./AcknowledgeService";
import { ServiceHandler, SuccessResponse } from "./BaseService";
import OnAbortHandler from "./OnAbortHandler";

export default class RefreshCacheService extends AcknowledgeService {
  url: string = "/refreshCache";
  apiType = ApiType.POST;

  async handler({ req, res, io }: ServiceHandler) {
    const json = await getJson(req, res);

    if (autoHandle(json.error, res)) {
      return;
    }

    const onAbortHandler = new OnAbortHandler(res, this.url);

    const promise = () =>
      new Promise((resolve, reject) => {
        io.timeout(5000).emit(
          "RefreshCache",
          json.data,
          (err: any, response: SuccessResponse[]) => {
            if (err) {
              resolve(
                new JsonResponse(res).setStatus("500").send({
                  error: "Failed to get response. Bot didn't respond. Or took longer than 5000ms.",
                })
              );
            } else {
              resolve(new JsonResponse(res).send({ success: response[0].success }));
            }
          }
        );
      });

    promise().then(() => {
      onAbortHandler.checkRequest(res);
    });

    return onAbortHandler;
  }
}
