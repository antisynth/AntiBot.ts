import { Message, MessageEmbed } from 'discord.js';
import { Command } from 'discord-akairo';

const dateFormat = require('dateformat')
const date = new Date()
dateFormat(date, 'dddd, mmmm dS, yyyy, h:MM:ss TT')

export default class ServerInfo extends Command {
    constructor() {
        super('serverinfo', {
            aliases: ['server', 'serverinfo', 'server-info'],
            description: {
                content: 'Shows you information about the server the command is run in',
                usage: 'serverinfo',
                examples: [
                    'serverinfo',
                    'server',
                    'server-info'
                ]
            },
            ratelimit: 1
        });
    }

    public exec(message: Message): Promise<Message> {
        const millis = date.getTime() - message.guild.createdAt.getTime()
        const days = millis / 1000 / 60 / 60 / 24

        let verification_level: string = message.guild.verificationLevel
        if (verification_level === 'NONE') verification_level = 'None, no restrictions'
        if (verification_level === 'LOW') verification_level = 'Low, needs a verified email'
        if (verification_level === 'MEDIUM') verification_level = 'Medium, have to be registered on Discord for 5 minutes before joining'
        if (verification_level === 'HIGH') verification_level = 'High, must be in the server for 10 minutes'
        if (verification_level === 'VERY_HIGH') verification_level = 'Highest, must have a verified phone on their Discord'
        const owner = message.guild.owner.user
        const roles = message.guild.roles.cache.size
        const server_icon = message.guild.iconURL()

        const embed = new MessageEmbed()
            .setTitle(`All about "${message.guild.name}"`)
            .setThumbnail(server_icon)
            .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
            .setDescription(server_icon)
            .addField('Server ID', message.guild.id, true)
            .addField('Owner', owner.tag || 'Error while trying to fetch the server owner', true)
            .addField('Owner ID', owner.id || 'Error while trying to fetch the server owner\'s ID', true)
            .addField('Created at', `${dateFormat(message.guild.createdAt)}`, true)
            .addField('Days since creation', `${days.toFixed(0)}`, true)
            .addField('Region', `${message.guild.region}`, true)
            .addField('Verification level', `${verification_level}`, true)
            .addField('Total text channel count', `${message.guild.channels.cache.filter(m => m.type === 'text').size}`, true)
            .addField('Total voice channel count', `${message.guild.channels.cache.filter(m => m.type === 'voice').size}`, true)
            .addField('Member count', `${message.guild.memberCount}`, true)
            .addField('Role count (excluding @everyone)', `${roles - 1}`, true)
        return message.util.send(embed)
    }
}