import BaseService from "../Services/BaseService";
import RefreshCacheService from "../Services/RefreshCacheService";
import RouteLoader from "./RouteLoader";

const apis: BaseService[] = [RouteLoader(RefreshCacheService)];

export default apis;
