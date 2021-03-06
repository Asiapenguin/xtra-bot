import { COMMANDS_DESCRIPTION, COMMANDS_COMMAND } from "../commands/commands";
import { FC_DESCRIPTION, FC_COMMAND } from "../fc/fc";
import { PING_DESCRIPTION, PING_COMMAND } from "../ping/ping";
import { RULES_DESCRIPTION, RULES_COMMAND } from "../rules/rules";
import { WORLDSTATUS_COMMAND, WORLDSTATUS_DESCRIPTION } from "../worldstatus/worldstatus";

export const HELP_COMMAND = "help";
export const HELP_DESCRIPTION = `\`!${HELP_COMMAND} <command>\`: the bot will post usage instructions for the \`command\` given`;
export const HELP_COMMAND_ERROR = `Correct usage of this command is: \`!help <command>\` You can use the command \`!commands\` to list all available commands`;

export const help = (channel, args) => {
  if (args.length == 0) {
    return channel.send(HELP_COMMAND_ERROR);
  }

  let message = "";
  switch (args[0]) {
    case PING_COMMAND:
      message = PING_DESCRIPTION;
      break;
    case RULES_COMMAND:
      message = RULES_DESCRIPTION;
      break;
    case FC_COMMAND:
      message = FC_DESCRIPTION;
      break;
    case COMMANDS_COMMAND:
      message = COMMANDS_DESCRIPTION;
      break;
    case HELP_COMMAND:
      message = HELP_DESCRIPTION;
      break;
    case WORLDSTATUS_COMMAND:
      message = WORLDSTATUS_DESCRIPTION;
      break;
    default:
      message = "Unrecognized command";
      break;
  }

  return channel.send(message);
};
