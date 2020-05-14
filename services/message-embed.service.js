import Discord from "discord.js";
import UrlService from "./url.service";

export default class MessageEmbedService {
  constructor() {}

  static getRulesMessage() {
    return new Discord.MessageEmbed()
      .setColor("#0099ff")
      .setTitle("some title")
      .setURL("https://discord.js.org/")
      .setDescription("some description");
  }

  static getFreeCompanyInformationMessage(information) {
    if (Object.keys(information).indexOf("error") > -1)
      return new Discord.MessageEmbed()
        .setColor("#D00000")
        .setDescription(information.error);

    return new Discord.MessageEmbed()
      .setColor("#00db0e")
      .setTitle(information.name)
      .setThumbnail(information.crest)
      .setDescription(
        `With ${information.grandCompany} on ${information.server}`
      )
      .setURL(UrlService.getBaseUrl() + information.link)
      .addFields(
        {
          name: "Members",
          value: information.members,
          inline: true,
        },
        {
          name: "Housing",
          value: information.housing,
          inline: true,
        }
      )
      .addFields(
        {
          name: "Active",
          value: information.active,
          inline: true,
        },
        {
          name: "Recruitment",
          value: information.recruitment,
          inline: true,
        }
      );
  }
}
