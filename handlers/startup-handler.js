export default class StartupHandler {
  constructor(client) {
    this.client = client;
  }

  handle() {
    this.client.user.setPresence({ game: { name: "pretending to be hardworking", type: "PLAYING" }, status: "idle" })
    const users = this.client.users.cache.filter((user) => user.bot == false);
    const channels = this.client.channels.cache.filter(
      (channel) => channel.type !== "category"
    );
    console.log(`Started, ${users.size} users and ${channels.size} channels`);
  }
}
