import { Command } from 'discord-akairo';
import { Message, MessageEmbed, GuildMember } from 'discord.js';
const moment = require('moment')

export default class UserInfo extends Command {
    constructor() {
        super('userinfo', {
            aliases: ['user', 'userinfo', 'user-info'],
            description: {
                content: 'Get information about a user',
                usage: 'userinfo <user>',
                examples: [
                    'user @antisynth#6968',
                    'userinfo antisynth',
                    'user-info antisynth'
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
        let nick = user.displayName
        if (nick === user.user.username) nick = 'No nickname'
        const embed = new MessageEmbed()
        .setTitle(`User info for ${user.user.username}`)
        .setDescription(`<@${user.user.id}>`)
        .setThumbnail(user.user.displayAvatarURL())
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
        .addFields(
            {
                name: 'Tag',
                value: user.user.tag,
                inline: true,
            },
            {
                name: 'ID',
                value: user.user.id,
                inline: true,
            },
            {
                name: 'Joined server',
                value: moment(user.joinedAt).format('LLLL'),
                inline: false,
            },
            {
                name: 'Joined Discord',
                value: moment(user.user.createdAt).format('LLLL'),
                inline: true,
            },
            {
                name: 'Human?',
                value: user.user.bot ? 'No, they\'re a program.' : 'Yes, they\'re a human. (Maybe.)',
                inline: true,
            },
            {
                name: 'Nickname',
                value: nick,
                inline: true,
            }
        )
        .setTimestamp()
        return message.util.send(embed)
    }
}