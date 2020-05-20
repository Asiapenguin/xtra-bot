import * as Commands from "../commands";

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
      case "ping":
        Commands.ping(this.author);
        break;
      case "help":
        Commands.help(this.channel, this.args);
        break;
      case "commands":
        Commands.commands(this.channel);
        break;
      case "rules":
        Commands.rules(this.channel);
        break;
      case "fc":
        Commands.fc(this.channel, this.args);
        break;
      case "worldstatus":
        Commands.worldstatus(this.channel, this.args);
        break;
      default:
        Commands.unrecognized(this.command, this.channel);
        break;
    }
  }
}
