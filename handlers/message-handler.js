import CommandHandler from "./command-handler";
import config from "../config.json";

const commandHandler = new CommandHandler();

export default class MessageHandler {
  constructor(client) {
    this.client = client;
  }

  handle(message) { 
    if (message.author.bot) return;
    if (message.content.indexOf(config.prefix) !== 0) return;

    const args = message.content
      .slice(config.prefix.length)
      .trim()
      .split(/ +/g);
    const command = args.shift().toLowerCase();

    commandHandler.handle(command, message);
  }
}
