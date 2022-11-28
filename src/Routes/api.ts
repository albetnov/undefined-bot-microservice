import ChannelListService from "../Services/ChannelListService";
import RefreshCacheService from "../Services/RefreshCacheService";
import SendEmbed from "../Services/SendEmbed";
import SendMessage from "../Services/SendMessage";
import RouteLoader, { RouteHandler } from "./RouteLoader";

const apis: RouteHandler[] = [
  RouteLoader(RefreshCacheService),
  RouteLoader(ChannelListService),
  RouteLoader(SendMessage),
  RouteLoader(SendEmbed),
];

export default apis;
