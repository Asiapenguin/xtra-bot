import UrlService from "../../services/url.service";
import Axios from "axios";
import LodestoneScraperService from "../../services/lodestone-scraper.service";
import MessageEmbedService from "../../services/message-embed.service";

export const WORLDSTATUS_COMMAND = "worldstatus";
export const WORLDSTATUS_DESCRIPTION = `\`!${WORLDSTATUS_COMMAND}\`: the bot will use Lodestone's data and query for world statuses. If no arguments are given, it will query Siren's status. This command only works with NA data center worlds.`;

export const worldstatus = async (channel, args) => {
  if (args.length !== 0) {
    if (args.length !== 1)
      return channel.send(
        `Wrong number of arguments. Please use \`!help ${WORLDSTATUS_COMMAND}\` if you are stuck.`
      );
  }

  let worldToQuery = args[0] ? args[0] : "Siren";

  let url = UrlService.getLodestoneWorldStatusUrl();

  let html = await (await Axios.get(url)).data;
  let worldStatusInformation = LodestoneScraperService.getWorldStatus(html, worldToQuery);

  let embedWorldStatusMessage = MessageEmbedService.getWorldStatusMessage(worldStatusInformation);

  return channel.send(embedWorldStatusMessage);
};
