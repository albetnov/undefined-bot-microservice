import ChannelListService from "../Services/ChannelListService";
import RefreshCacheService from "../Services/RefreshCacheService";
import RouteLoader, { RouteHandler } from "./RouteLoader";

const apis: RouteHandler[] = [RouteLoader(RefreshCacheService), RouteLoader(ChannelListService)];

export default apis;
