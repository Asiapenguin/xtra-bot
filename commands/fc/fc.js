import Axios from "axios";

import {
  FREE_COMPANY_NAME,
  FREE_COMPANY_SERVER,
} from "../../constants/constants";
import LodestoneScraperService from "../../services/lodestone-scraper.service";
import MessageEmbedService from "../../services/message-embed.service";
import UrlService from "../../services/url.service";

export const FC_COMMAND = "fc";
export const FC_DESCRIPTION = `\`!${FC_COMMAND} <name?>\`: the bot will use Lodestone's data and post about <<Xtra>> if free company \`name\` is not given`;

export const fc = async (channel, args) => {
  let url = UrlService.getFreeCompanySearchUrl(FREE_COMPANY_NAME, FREE_COMPANY_SERVER);

  if (args.length !== 0) {
    let freeCompanyNameSearch = args.join("+");
    url = UrlService.getFreeCompanySearchUrl(freeCompanyNameSearch, FREE_COMPANY_SERVER);
  }

  let html = await (await Axios.get(url)).data;
  let fcInformation = LodestoneScraperService.getFreeCompanyInformation(html);

  let embedFreeCompanyMessage = MessageEmbedService.getFreeCompanyInformationMessage(
    fcInformation
  );
  return channel.send(embedFreeCompanyMessage);
};
