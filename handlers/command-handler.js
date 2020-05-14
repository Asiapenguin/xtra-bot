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
      case "help":
        this.help(this.channel, this.args);
        break;
      case "commands":
        this.commands(this.channel);
        break;
      case "rules":
        this.rules(this.channel);
        break;
      case "fc":
        this.fc(this.channel, this.args);
        break;
      default:
        this.unrecognized(this.command, this.channel);
        break;
    }
  }

  unrecognized(command, channel) {
    return channel.send(`I don't know how to use \`${command}\``);
  }

  help(channel, args) {
    if (args.length == 0) {
      return channel.send(`Correct usage of this command is: \`!help <command>\` You can use the command \`!commands\` to list all available commands`);
    }

    let message = "";
    switch(args[0]) {
      case "ping":
        message = `\`!ping\`: the bot will message you directly with \`pong\``;
        break;
      case "rules":
        message = `\`!rules\`: the bot will post the rules of the server`
        break;
      case "fc":
        message = `\`!fc <name?>\`: the bot will use Lodestone's data and post about <<Xtra>> if free company \`name\` is not given`
        break;
      case "commands":
        message = `\`!commands\`: the bot will post all the commands available to use`
        break;
      case "help":
        message = `\`!help <command>\`: the bot will post usage instructions for the \`command\` given`
        break;
      default:
        message = "Unknown command"
        break;
    }

    return channel.send(message);
  }

  commands(channel) {
    let commandsMessageEmbed = MessageEmbedService.getCommandsMessage();
    return channel.send(commandsMessageEmbed);
  }

  ping(author) {
    return author.send("pong");
  }

  rules(channel) {
    let rulesMessageEmbed = MessageEmbedService.getRulesMessage();
    return channel.send(rulesMessageEmbed);
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
    return channel.send(embedFreeCompanyMessage)
  }
}
