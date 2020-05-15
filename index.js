require("dotenv").config();
require("./database/redis");
import cron from "node-cron";

import Discord from "discord.js";
const client = new Discord.Client();
import MessageEmbedService from "./services/message-embed.service";
import MessageHandler from "./handlers/message-handler";
import StartupHandler from "./handlers/startup-handler";
import { runLatestLodestonePosts } from "./jobs/latest-lodestone-posts/latest-lodestone-posts";

const messageHandler = new MessageHandler(client);
const startupHandler = new StartupHandler(client);

client.on("ready", () => {
  // At every 0th, 6th, 12th, 18th hour schedule
  cron.schedule("0 0,6,12,18 * * *", () => runLatestLodestonePosts(client))
  return startupHandler.handle();
});

client.on("message", (message) => {
  return messageHandler.handle(message);
});

client.on("guildMemberAdd", (member) => {
  // TODO: Make handler
  let rulesMessageEmbed = MessageEmbedService.getRulesMessage();
  member.send(rulesMessageEmbed);
  member.send("Please change your nickname to your in-game name to help us identify each other!");
  return;
});

client.login(process.env.BOT_TOKEN);

export const getClient = () => { return client; }