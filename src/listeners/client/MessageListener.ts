import { Listener } from 'discord-akairo';
import { Message } from 'discord.js';
import { client } from '../../Bot'
import { prefix, owners } from '../../Config'

export default class MessageListener extends Listener {
    public constructor() {
        super("message", {
            emitter: 'client',
            event: 'message',
            category: 'client'
        })
    }

    public exec(message: Message) {
        if (owners.includes(message.author.id)) {} else {
            owners.push(message.author.id)
        }
        if (message.content === `<@!${client.user.id}>` || message.content === `<@${client.user.id}>`) {
            return message.channel.send(`My prefix is "${prefix}"!`)
        }
    }
}