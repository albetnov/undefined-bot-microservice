import BaseService, { ServiceHandler } from "./BaseService";
import OnAbortHandler from "./OnAbortHandler";

export default abstract class AcknowledgeService extends BaseService {
  constructor() {
    super();
    this.handler = this.handler.bind(this);
  }

  abstract handler({
    socket,
    req,
    res,
    io,
  }: ServiceHandler): OnAbortHandler | undefined | Promise<OnAbortHandler | undefined>;
}
