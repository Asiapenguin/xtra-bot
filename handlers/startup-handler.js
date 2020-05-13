export default class StartupHandler {
  constructor(client) {
    this.client = client;
  }

  handle() {
    const users = this.client.users.cache.filter(user => user.bot == false)
    const channels = this.client.channels.cache.filter(channel => channel.type !== 'category');
    console.log(`Started, ${users.size} users and ${channels.size} channels`);
  }
}