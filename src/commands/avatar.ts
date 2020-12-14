import { Command } from 'discord-akairo';
import { GuildMember } from 'discord.js';
import { Message, MessageEmbed, ImageSize } from 'discord.js';

export default class Avatar extends Command {
    constructor() {
        super('avatar', {
            aliases: ['avatar', 'getpfp'],
            description: {
                content: 'Make bot send user\'s pfp in an embed',
                usage: 'avatar <user>',
                examples: [
                    'avatar @antisynth#6968',
                    'getpfp antisynth',
                    'avatar antisynth'
                ]
            },
            ratelimit: 0,
            args: [
                {
                    id: 'user',
                    type: 'member',
                    match: 'rest',
                    default: (msg: Message) => msg.member
                },
                {
                    id: 'size',
                    type: (_: Message, str: string): null | Number => {
                        if (str && !isNaN(Number(str)) && [16, 32, 64, 128, 256, 512, 1024, 2048].includes(Number(str))) return Number(str);
                        return null;
                    },
                    match: 'option',
                    flag: ['-SIZE='],
                    default: 2048
                }
            ]
        })
    }

    public exec(message: Message, { user, size }: { user: GuildMember, size: number }): Promise<Message> {
        const embed = new MessageEmbed()
            .setTitle(`Avatar for ${user.user.username}`)
            .setImage(user.user.displayAvatarURL({ size: size as ImageSize }))
            .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
        return message.util.send(embed)
    }
}