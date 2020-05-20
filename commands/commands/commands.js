import MessageEmbedService from "../../services/message-embed.service";

export const COMMANDS_COMMAND = "commands";
export const COMMANDS_DESCRIPTION = `\`!${COMMANDS_COMMAND}\`: the bot will post all the commands available to use`;

export const commands = (channel) => {
  let commandsMessageEmbed = MessageEmbedService.getCommandsMessage();
  return channel.send(commandsMessageEmbed);
}