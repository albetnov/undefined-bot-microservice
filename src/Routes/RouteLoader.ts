import BaseService from "../Services/BaseService";

export default function RouteLoader(service: new () => BaseService) {
  const instance = new service();

  return {
    apiType: instance.apiType,
    url: "/api" + instance.url,
    handler: instance.handler,
  };
}
