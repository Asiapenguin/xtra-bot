import MessageEmbedService from "../../services/message-embed.service";

export const COMMANDS_DESCRIPTION = `\`!commands\`: the bot will post all the commands available to use`;
export const COMMANDS_COMMAND = "commands";

export const commands = (channel) => {
  let commandsMessageEmbed = MessageEmbedService.getCommandsMessage();
  return channel.send(commandsMessageEmbed);
}