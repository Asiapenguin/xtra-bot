import * as Commands from "../commands";
import { PING_COMMAND, HELP_COMMAND, COMMANDS_COMMAND, RULES_COMMAND, FC_COMMAND, WORLDSTATUS_COMMAND } from "../commands";

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
      case PING_COMMAND:
        Commands.ping(this.author);
        break;
      case HELP_COMMAND:
        Commands.help(this.channel, this.args);
        break;
      case COMMANDS_COMMAND:
        Commands.commands(this.channel);
        break;
      case RULES_COMMAND:
        Commands.rules(this.channel);
        break;
      case FC_COMMAND:
        Commands.fc(this.channel, this.args);
        break;
      case WORLDSTATUS_COMMAND:
        Commands.worldstatus(this.channel, this.args);
        break;
      default:
        Commands.unrecognized(this.command, this.channel);
        break;
    }
  }
}
