import CommandHandler from "./command-handler";
import config from "../config.json";

export default class MessageHandler {
  constructor(client) {
    this.client = client;
  }

  handle(message) { 
    if (message.author.bot) return;
    if (message.content.indexOf(config.prefix) !== 0) return;
    
    const author = message.author;
    const channel = message.channel;

    const args = message.content
      .slice(config.prefix.length)
      .trim()
      .split(/ +/g);
    const command = args.shift().toLowerCase();

    let commandHandler = new CommandHandler(command, args, channel, author, this.client);
    commandHandler.handle();
  }
}
