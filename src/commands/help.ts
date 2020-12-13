import { Command } from 'discord-akairo';
import { Message, MessageEmbed } from 'discord.js';
import { stripIndents } from 'common-tags';

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
            ratelimit: 1,
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
            )
        } else {
            return message.util.send(new MessageEmbed()
            .setTitle('Commands')
            .setDescription(stripIndents`
                **8ball
                avatar
                clickbait
                coinflip
                connectfour
                gayrate
                help
                id
                meme
                ping
                rate
                serverinfo
                snake
                suntzu
                userinfo
                uwuify**
            `)
            .setFooter('Use !help <command> to get more info about it')
            )
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