import { FREE_COMPANY_NAME, FREE_COMPANY_SERVER } from "../constants/constants";
import LodestoneScraperService from "../services/lodestone-scraper.service";
import MessageEmbedService from "../services/message-embed.service";
import UrlService from "../services/url.service";
import Axios from "axios";

export default class CommandHandler {
  constructor(command, args, channel, author, client) {
    this.command = command;
    this.args = args;
    this.channel = channel;
    this.author = author;
    this.client = client;
  }

  handle() {
    switch (this.command) {
      case "ping":
        this.ping(this.author);
        break;
      case "rules":
        this.rules(this.channel);
        break;
      case "fc":
        this.fc(this.channel, this.args);
        break;
      default:
        break;
    }
  }

  ping(author) {
    author.send("pong");
  }

  rules(channel) {
    let rulesMessageEmbed = MessageEmbedService.getRulesMessage();
    channel.send(rulesMessageEmbed);
  }

  async fc(channel, args) {
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

    let embedFreeCompanyMessage = MessageEmbedService.getFreeCompanyInformationMessage(fcInformation);
    channel.send(embedFreeCompanyMessage)
  }
}
