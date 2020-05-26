import MessageEmbedService from "../../services/message-embed.service";

export const RULES_COMMAND = "rules";
export const RULES_DESCRIPTION = `\`!${RULES_COMMAND}\`: the bot will post the rules of the server`;

export const rules = (channel) => {
  let rulesMessageEmbed = MessageEmbedService.getRulesMessage();
  return channel.send(rulesMessageEmbed);
};
