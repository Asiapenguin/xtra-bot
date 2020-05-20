import UrlService from "../../services/url.service";
import Axios from "axios";
import LodestoneScraperService from "../../services/lodestone-scraper.service";
import MessageEmbedService from "../../services/message-embed.service";

// TODO: Return the current status of FREE_COMPANY_SERVER
export const SERVERSTATUS_DESCRIPTION = `\`!serverstatus\`: the bot will use Lodestone's data and query for Siren server uptime`;
export const SERVERSTATUS_COMMAND = "serverstatus";

export const serverstatus = async (channel) => {
  let url = UrlService.getLodestoneServerStatusUrl();

  let html = await (await Axios.get(url)).data;
  let serverStatusInformation = LodestoneScraperService.getServerStatus(html);

  let embedServerStatusMessage = MessageEmbedService.getServerStatusMessage(
    serverStatusInformation
  );

  return channel.send(embedServerStatusMessage);
};
