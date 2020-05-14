import MessageEmbedService from "../../services/message-embed.service";

export const RULES_DESCRIPTION = `\`!rules\`: the bot will post the rules of the server`;
export const RULES_COMMAND = "rules";

export const rules = (channel) => {
  let rulesMessageEmbed = MessageEmbedService.getRulesMessage();
  return channel.send(rulesMessageEmbed);
};
