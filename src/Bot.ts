import { token, owners, prefix } from './Config';
import BotClient from "./client/BotClient";
import { Message } from 'discord.js'

export const client: BotClient = new BotClient({ token, owners });
console.clear();
client.start();