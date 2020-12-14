import { Command } from 'discord-akairo';
import { Message, GuildMember, MessageEmbed } from 'discord.js';

export default class Gayrate extends Command {
    constructor() {
        super('gayrate', {
            aliases: ['gayrate', 'howgay'],
            description: {
                content: 'Random generate how gay someone is',
                usage: 'gayrate <user>',
                examples: [
                    'gayrate @antisynth#6968',
                    'gayrate antisynth',
                    'howgay antisynth'
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

        const how_gay = getRandomInt(101);
        let bar_image_link = undefined;

        if (how_gay <= 25) bar_image_link = 'https://i.imgur.com/nzrVinK.png'
        if (how_gay >= 26) bar_image_link = 'https://i.imgur.com/cxJNZDp.png'
        if (how_gay >= 51) bar_image_link = 'https://i.imgur.com/duuo51O.png'
        if (how_gay >= 76) bar_image_link = 'https://i.imgur.com/Ap72UXu.png'

        let emoji = undefined

        if (how_gay >= 50) emoji = ':rainbow_flag:'
        if (how_gay <= 50) emoji = ':thumbsdown:'
        if (how_gay == 100) emoji = ':rainbow_flag: SUPER GAY'
        
        const embed = new MessageEmbed()
            .setAuthor(`How gay is ${user.user.username}?`, user.user.displayAvatarURL())
            .setDescription(`${user.user.username} is ${how_gay}% gay! ${emoji}`)
            .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
            .setImage(bar_image_link)
        return message.util.send(embed)
    }
}