export default class CommandHandler {
  constructor() {}

  handle(command, author) {
    switch (command) {
      case 'ping':
        this.ping(author);
        break;
      default:
        break;
    }
  }

  ping(author) {
    author.send('pong');
  }
}