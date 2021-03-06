import Discord from "discord.js";
import { getClient } from "../index";
import {
  COMMAND_PREFIX,
  COMMANDS_COMMAND,
  COMMANDS_DESCRIPTION,
  FC_COMMAND,
  FC_DESCRIPTION,
  HELP_COMMAND,
  HELP_DESCRIPTION,
  PING_COMMAND,
  PING_DESCRIPTION,
  RULES_COMMAND,
  RULES_DESCRIPTION,
  WORLDSTATUS_COMMAND,
  WORLDSTATUS_DESCRIPTION,
} from "../commands";
import {
  MAINTENANCE_EMBED_COLOR,
  TOPIC_EMBED_COLOR,
  SUCCESS_EMBED_COLOR,
  ERROR_EMBED_COLOR,
  PRIMARY_EMBED_COLOR,
  UPDATE_EMBED_COLOR,
} from "../constants/constants";

export default class MessageEmbedService {
  constructor() {
    this.client = getClient();
  }

  static getCommandsMessage() {
    return new Discord.MessageEmbed()
      .setColor(PRIMARY_EMBED_COLOR)
      .setAuthor("<<Xtra>> Discord Bot Commands")
      .setTitle("Lazy Sloth knows how to do these things at least 🦥")
      .setDescription("Below is a list of available commands")
      .addFields(
        {
          name: `**${COMMAND_PREFIX}${COMMANDS_COMMAND}**`,
          value: COMMANDS_DESCRIPTION,
        },
        {
          name: `**${COMMAND_PREFIX}${FC_COMMAND}**`,
          value: FC_DESCRIPTION,
        },
        {
          name: `**${COMMAND_PREFIX}${HELP_COMMAND}**`,
          value: HELP_DESCRIPTION,
        },
        {
          name: `**${COMMAND_PREFIX}${PING_COMMAND}**`,
          value: PING_DESCRIPTION,
        },
        {
          name: `**${COMMAND_PREFIX}${RULES_COMMAND}**`,
          value: RULES_DESCRIPTION,
        },
        {
          name: `**${COMMAND_PREFIX}${WORLDSTATUS_COMMAND}**`,
          value: WORLDSTATUS_DESCRIPTION,
        }
      )
      .setFooter("🦥: That was a lot of explaining");
  }

  static getRulesMessage() {
    return new Discord.MessageEmbed()
      .setColor(PRIMARY_EMBED_COLOR)
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
          value: "We reserve the right to include new rules and post them whenever they are added.",
        }
      );
  }

  static getFreeCompanyInformationMessage(information) {
    if (Object.keys(information).indexOf("error") > -1)
      return new Discord.MessageEmbed()
        .setColor(ERROR_EMBED_COLOR)
        .setDescription("❌ " + information.error)
        .setFooter("🦥: You wasted my time 😪");

    return new Discord.MessageEmbed()
      .setColor(SUCCESS_EMBED_COLOR)
      .setTitle(information.name)
      .setThumbnail(information.crest)
      .setDescription(`With ${information.grandCompany} on ${information.server}`)
      .setURL(information.link)
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

  static getNewTopicMessage(topic) {
    return new Discord.MessageEmbed()
      .setColor(TOPIC_EMBED_COLOR)
      .setAuthor("⭐New Topic")
      .setTitle(topic.title)
      .setURL(topic.link)
      .setImage(topic.image)
      .setFooter("Fetched by 🦥");
  }

  static getNewMaintenanceMessage(maintenance) {
    return new Discord.MessageEmbed()
      .setColor(MAINTENANCE_EMBED_COLOR)
      .setAuthor("🛠️ New Maintenance")
      .setTitle(maintenance.title)
      .setURL(maintenance.link)
      .setFooter("Fetched by 🦥");
  }

  static getNewUpdateMessage(update) {
    return new Discord.MessageEmbed()
      .setColor(UPDATE_EMBED_COLOR)
      .setAuthor("✨ New Update")
      .setTitle(update.title)
      .setURL(update.link)
      .setFooter("Fetched by 🦥");
  }
  
  static getWorldStatusMessage(worldStatus) {
    if (Object.keys(worldStatus).indexOf("error") > -1)
      return new Discord.MessageEmbed()
        .setColor(ERROR_EMBED_COLOR)
        .setDescription("❌ " + worldStatus.error)
        .setFooter("🦥: You wasted my time 😪");

    let message = new Discord.MessageEmbed();
    if (worldStatus.status === "Online") {
      return message
        .setColor(SUCCESS_EMBED_COLOR)
        .setTitle(`🟢 ${worldStatus.name}: ${worldStatus.status}`);
    } else {
      return message
        .setColor(ERROR_EMBED_COLOR)
        .setTitle(`🔴 ${worldStatus.name}: ${worldStatus.status}`);
    }
  }
}
