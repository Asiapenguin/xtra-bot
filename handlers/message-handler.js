import CommandHandler from "./command-handler";
import { COMMAND_PREFIX } from "../commands";

export default class MessageHandler {
  constructor(client) {
    this.client = client;
  }

  handle(message) { 
    if (message.author.bot) return;
    if (message.content.indexOf(COMMAND_PREFIX) !== 0) return;
    
    const author = message.author;
    const channel = message.channel;

    const args = message.content
      .slice(COMMAND_PREFIX.length)
      .trim()
      .split(/ +/g);
    const command = args.shift().toLowerCase();

    let commandHandler = new CommandHandler(command, args, channel, author, this.client);
    commandHandler.handle();
  }
}
