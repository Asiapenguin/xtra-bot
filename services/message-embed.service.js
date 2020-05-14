import Discord from "discord.js";
import UrlService from "./url.service";
import { getClient } from "../index";

export default class MessageEmbedService {
  constructor() {
    this.client = getClient();
  }

  static getRulesMessage() {
    return new Discord.MessageEmbed()
      .setColor("#0099ff")
      .setAuthor("Here is a list of rules to abide to")
      .setTitle("Welcome to <<Xtra>> Discord")
      .setURL("https://discord.js.org/")
      .setDescription(
        "Violations of these rules can result in kicking and banning both in game and on Discord."
      )
      .addFields(
        {
          name: "Rule 1",
          value:
            "Be nice and respectful to everyone. No racial slurs. Talk properly.",
        },
        {
          name: "Rule 2",
          value:
            "No creeping, no bullying far more than simple jokes. If you haven't got anything nice to say, don't say it.",
        },
        {
          name: "Rule 3",
          value:
            "Try to be courteous to the moderators, not sharing the same opinion doesn't mean you should be rude.",
        },
        {
          name: "Rule 4",
          value: "a",
        },
        {
          name: "Rule 5",
          value: "a",
        },
        {
          name: "Rule 6",
          value: "a",
        },
        {
          name: "Rule 7",
          value: "a",
        },
        {
          name: "Rule 8",
          value: "a",
        },
        {
          name: "Rule 9",
          value: "a",
        },
        {
          name: "Rule 10",
          value: "a",
        }
      );
  }

  static getFreeCompanyInformationMessage(information) {
    if (Object.keys(information).indexOf("error") > -1)
      return new Discord.MessageEmbed()
        .setColor("#D00000")
        .setDescription("❌ " + information.error)
        .setFooter("🦥: You wasted my time 😪");

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
      )
      .setFooter("Fetched by 🦥");
  }
}
