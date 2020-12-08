import { Command } from 'discord-akairo';
import { Message, MessageEmbed, GuildMember } from 'discord.js';

export default class id extends Command {
    constructor() {
        super('id', {
            aliases: ['id', 'getid'],
            description: {
                content: 'Get id of anybody you enter',
                usage: 'id <user>',
                examples: [
                    'id @antisynth#6968',
                    'getid antisynth',
                    'id antisynth'
                ]
            },
            ratelimit: 3,
            args: [
                {
                    id: 'user',
                    type: 'member',
                    match: 'rest',
                    default: (msg: Message) => msg.member
                }
            ]
        });
    }

    public exec(message: Message, { user }: { user: GuildMember }): Promise<Message> {
        const embed = new MessageEmbed()
            .setAuthor(`${user.user.username}'s ID`, user.user.displayAvatarURL())
            .setDescription(user.user.id)
            .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
        return message.util.send(embed)
    }
}