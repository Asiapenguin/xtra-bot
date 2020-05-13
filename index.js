require('dotenv').config();
import Discord from 'discord.js';
const client = new Discord.Client();
import { embedRulesMessage } from './constants/messages/rules';
import MessageHandler from './handlers/message-handler';
import StartupHandler from './handlers/startup-handler';

const messageHandler = new MessageHandler(client);
const startupHandler = new StartupHandler(client);

client.once('ready', () => {
  startupHandler.handle();
});

client.on('message', message => {
  messageHandler.handle(message);
})

client.on('guildMemberAdd', member => {
  member.send(embedRulesMessage);
})

client.login(process.env.BOT_TOKEN);

export const getClient = () => {
  return client;
}