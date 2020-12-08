import { Command } from "discord-akairo";
import { Message, MessageEmbed } from "discord.js";

export default class Ping extends Command {
    public constructor() {
        super('ping', {
            aliases: ['ping', 'latency'],
            description: {
                content: 'Return pong',
                usage: 'ping',
                examples: [
                    'ping'
                ]
            },
            ratelimit: 3
        });
    }

    public exec(message: Message) {
        message.util.send('Returning pong...').then(m => {
            const ping = m.createdTimestamp - message.createdTimestamp
            const message_author_avatar = message.author.avatarURL()
            const embed = new MessageEmbed()
            .setTitle('Ping')
            .setDescription(`:ping_pong: Pong!\nClient latency: ${ping}ms\nAPI latency: ${this.client.ws.ping}ms`)
            .setFooter(`Requested by ${message.author.username}`, message_author_avatar)
            
            m.edit('', { embed: embed })
        })
    }
}