require('dotenv').config();
import Discord from 'discord.js';
import config from './config.json';

const client = new Discord.Client();
import { embedRulesMessage } from './constants/rules/rules';

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
  M
})

client.on('guildMemberAdd', member => {
  member.send(embedRulesMessage)
})

client.login(process.env.BOT_TOKEN);