import { embedRulesMessage } from "../constants/messages/rules";

export default class CommandHandler {
  constructor() {}

  handle(command, message) {
    const author = message.author;
    const channel = message.channel;

    switch (command) {
      case "ping":
        this.ping(author);
        break;
      case "rules":
        this.rules(author, channel);
      default:
        break;
    }
  }

  ping(author) {
    author.send("pong");
  }

  rules(author, channel) {
    // author.send(embedRulesMessage);
    channel.send(embedRulesMessage);
  }
}
