import Axios from "axios";

import {
  FREE_COMPANY_NAME,
  FREE_COMPANY_SERVER,
} from "../../constants/constants";
import LodestoneScraperService from "../../services/lodestone-scraper.service";
import MessageEmbedService from "../../services/message-embed.service";
import UrlService from "../../services/url.service";

export const FC_DESCRIPTION = `\`!fc <name?>\`: the bot will use Lodestone's data and post about <<Xtra>> if free company \`name\` is not given`;
export const FC_COMMAND = "fc";

export const fc = async (channel, args) => {
  let url = `${UrlService.getBaseUrl()}/lodestone/freecompany/?q=${FREE_COMPANY_NAME.replace(
    " ",
    "+"
  )}&worldname=${FREE_COMPANY_SERVER}`;

  if (args.length !== 0) {
    let freeCompanyNameSearch = args.join("+");
    url = `${UrlService.getBaseUrl()}/lodestone/freecompany/?q=${freeCompanyNameSearch}&worldname=${FREE_COMPANY_SERVER}`;
  }

  let html = await (await Axios.get(url)).data;
  let fcInformation = LodestoneScraperService.getFreeCompanyInformation(html);

  let embedFreeCompanyMessage = MessageEmbedService.getFreeCompanyInformationMessage(
    fcInformation
  );
  return channel.send(embedFreeCompanyMessage);
};
