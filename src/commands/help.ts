import { Command } from 'discord-akairo';
import { Message, MessageEmbed } from 'discord.js';
import { stripIndents } from 'common-tags';
import pagination from 'discord.js-pagination'
import { prefix } from '../Config'

export default class Help extends Command {
    constructor() {
        super('help', {
            aliases: ['help'],
            description: {
                content: 'View how to use all commands',
                usage: 'help <command>',
                examples: [
                    'help ping'
                ]
            },
            ratelimit: 0,
            args: [
                {
                    id: 'command',
                    type: 'commandAlias',
                    default: null
                }
            ]
        });
    }

    public exec(message: Message, { command }: { command: Command }): Promise<Message> {
        if (command) {
            return message.util.send(new MessageEmbed()
            .setAuthor(`Help with ${command}`, this.client.user.displayAvatarURL())
            .setDescription(stripIndents`
                **Aliases:**
                ${command.aliases.join().replace(/,/g, ', ') || "Unknown"}
                **Description:**
                ${command.description.content || "Unknown"}
                **Usage:**
                ${command.description.usage || "Unknown"}
                **Examples:**
                ${command.description.examples ? command.description.examples.map(e => `\`${e}\``).join('\n') : "Unknown"}
            `)
            .setTimestamp()
            .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL()
            )
            )
        } else {
            const util = new MessageEmbed()
            .setTitle('Utility')
            .setDescription(`Use ${prefix}help <command> to get info on it`)
            .addField(`${prefix}**avatar**`, '_ _', true)
            .addField(`${prefix}**help**`, '_ _', true)
            .addField(`${prefix}**id**`, '_ _', true)
            .addField(`${prefix}**ping**`, '_ _', true)
            .addField(`${prefix}**serverinfo**`, '_ _', true)
            .addField(`${prefix}**userinfo**`, '_ _', true)
            .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
            .setTimestamp()

            const fun = new MessageEmbed()
            .setTitle('Fun')
            .setDescription(`Use ${prefix}help <command> to get info on it`)
            .addFields(
                {
                    name: `${prefix}**8ball**`,
                    value: '_ _',
                    inline: true
                },
                {
                    name: `${prefix}**clickbait**`,
                    value: '_ _',
                    inline: true
                },
                {
                    name: `${prefix}**coinflip**`,
                    value: '_ _',
                    inline: true
                },
                {
                    name: `${prefix}**connectfour**`,
                    value: '_ _',
                    inline: true
                },
                {
                    name: `${prefix}**gayrate**`,
                    value: '_ _',
                    inline: true
                },
                {
                    name: `${prefix}**meme**`,
                    value: '_ _',
                    inline: true
                },
                {
                    name: `${prefix}**rate**`,
                    value: '_ _',
                    inline: true
                },
                {
                    name: `${prefix}**snake**`,
                    value: '_ _',
                    inline: true
                },
                {
                    name: `${prefix}**suntzu**`,
                    value: '_ _',
                    inline: true
                },
                {
                    name: `${prefix}**uwuify**`,
                    value: '_ _',
                    inline: true
                }
            )
            .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
            .setTimestamp()

            const pages = [
                util,
                fun
            ]

            const emojiList = ['⬅️', '➡️']

            const timeout = '30000'

            pagination(message, pages, emojiList, timeout)
        }

/*         const embed = new MessageEmbed()
            .setAuthor(`Help with ${this.client.user.username}`, this.client.user.displayAvatarURL())
            .setFooter(`${this.client.commandHandler.prefix}help <command> for more help with a certain command`)

        for (const category of this.handler.categories.values()) {
            if (['default'].includes(category.id)) continue

            embed.addField(category.id, category
                    .filter(cmd => cmd.aliases.length > 0)
                    .map(cmd => `**\`${cmd}\`**`)
                    .join(', ') || 'No commands here'
                )
        }

        return message.util.send(embed); */
    }
}