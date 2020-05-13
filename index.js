require('dotenv').config();
import Discord from 'discord.js';

const client = new Discord.Client();
import { embedRulesMessage } from './constants/rules/rules';
import MessageHandler from './handlers/message-handler';
const messageHandler = new MessageHandler();

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
  messageHandler.handle(message);
})

client.on('guildMemberAdd', member => {
  member.send(embedRulesMessage);
})

client.login(process.env.BOT_TOKEN);