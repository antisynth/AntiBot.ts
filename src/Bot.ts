import { token, owners, prefix } from './Config';
import BotClient from "./client/BotClient";
import { Message } from 'discord.js'

const client: BotClient = new BotClient({ token, owners });

client.on('message', (message: Message) => {
    if (message.content === `<@!${client.user.id}>` || message.content === `<@${client.user.id}>`) {
        return message.channel.send(`My prefix is "${prefix}"!`)
    }
})

console.clear();
client.start();