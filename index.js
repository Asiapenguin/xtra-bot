require("dotenv").config();
import Discord from "discord.js";
const client = new Discord.Client();
import MessageEmbedService from "./services/message-embed.service";
import MessageHandler from "./handlers/message-handler";
import StartupHandler from "./handlers/startup-handler";

const messageHandler = new MessageHandler(client);
const startupHandler = new StartupHandler(client);

client.on("ready", () => {
  startupHandler.handle();
});

client.on("message", (message) => {
  messageHandler.handle(message);
});

client.on("guildMemberAdd", (member) => {
  let rulesMessageEmbed = MessageEmbedService.getRulesMessage();
  member.send(rulesMessageEmbed);
});

client.login(process.env.BOT_TOKEN);

export const getClient = () => { return client; }