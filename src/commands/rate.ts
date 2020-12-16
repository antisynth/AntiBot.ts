import { Command } from 'discord-akairo';
import { Message, MessageEmbed, GuildMember } from 'discord.js';
import { promises } from 'fs';

export default class Rate extends Command {
    constructor() {
        super('rate', {
            aliases: ['rate'],
            description: {
                content: 'Rate a user out of 5 stars',
                usage: 'rate <user>',
                examples: [
                    'rate @antisynth#6968',
                    'rate antisynth'
                ]
            },
            ratelimit: 0,
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
        function getRandomInt(max: number) {
            return Math.floor(Math.random() * Math.floor(max))
        }

        const rating = getRandomInt(6)
        let set_emojis = undefined
        if (rating === 0) set_emojis = ''
        if (rating === 1) set_emojis = ':star:'
        if (rating === 2) set_emojis = ':star: :star:'
        if (rating === 3) set_emojis = ':star: :star: :star:'
        if (rating === 4) set_emojis = ':star: :star: :star: :star:'
        if (rating === 5) set_emojis = ':star: :star: :star: :star: :star:'

        const embed = new MessageEmbed()
            .setAuthor(`${user.user.username}'s rating`, user.user.displayAvatarURL())
            .setDescription(`I rate ${user.user.username} ${rating}/5 stars\n\n${set_emojis}`)
            .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
            .setTimestamp()
        return message.util.send(embed)
    }
}