import Discord from "discord.js";
import UrlService from "./url.service";
import { getClient } from "../index";

export default class MessageEmbedService {
  constructor() {
    this.client = getClient();
  }

  static getCommandsMessage() {
    return new Discord.MessageEmbed()
      .setColor("#0099ff")
      .setAuthor("<<Xtra>> Discord Bot Commands")
      .setTitle("Lazy Sloth knows how to do these things at least 🦥")
      .setDescription("Below is a list of available commands")
      .addFields(
        {
          name: `**!commands**`,
          value: `\`!commands\`: the bot will post all the commands available to use`
        },
        {
          name: `**!fc**`,
          value: `\`!fc <name?>\`: the bot will use Lodestone's data and post about <<Xtra>> if free company \`name\` is not given`
        },
        {
          name: `**!help**`,
          value: `\`!help <command>\`: the bot will post usage instructions for the \`command\` given`
        },
        {
          name: `**!ping**`,
          value: `\`!ping\`: the bot will message you directly with \`pong\``
        },
        {
          name: `**!rules**`,
          value: `\`!rules\`: the bot will post the rules of the server`
        },
      )
      .setFooter("🦥: That was a lot of explaining")
  }
  static getRulesMessage() {
    return new Discord.MessageEmbed()
      .setColor("#0099ff")
      .setAuthor("Here is a list of rules to abide to")
      .setTitle("Welcome to <<Xtra>> Discord")
      .setDescription(
        "Violations of these rules can result in kicking both in game and on Discord."
      )
      .addFields(
        {
          name: "**Be Kind and Courteous**",
          value:
            "We're all in this together to create a welcoming environment. Let's treat everyone with respect. Healthy debates are natural, but kindness is required. Treat others the way you would like to be treated!",
        },
        {
          name: "**Bullying, Harassment, Hate Speech**",
          value:
            "Bulying of any kind is not allowed, and degrading comments about things like race, religion, culture, sexual orientation, gender, or identity will not be tolerated. Punishment will be enforced even via DM. No bait, no provoking others, no taunting.",
        },
        {
          name: "**Moderators**",
          value:
            "Please be courteous to the moderators, not sharing the same opinion doesn't mean you are entitled to be rude.",
        },
        {
          name: "**Chat/Channel**",
          value:
            "Please use the respective channels accordingly. Do not drag personal conversations or drama elswhere in here.",
        },
        {
          name: "**No Promotions or Spam**",
          value:
            "Give more than you take to this group. Self-promotion, spam, and ireelevant links are not allowed. This incudes but not limited to pages, groups, servers.",
        },
        {
          name: "**Respect Everyone's Privacy**",
          value:
            "Being part of this group requires mutual trust. Authentic, expressive discussions make groups great, but may also be sensitive and private. What's shared in the group should stay in the group.",
        },
        {
          name: "**Further Updates to Rules**",
          value:
            "We reserve the right to include new rules and post them whenever they are added.",
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
