import { Command } from 'discord-akairo';
import { Message, MessageEmbed } from 'discord.js';
const fs = require('fs')

export default class UwUify extends Command {
    constructor() {
        super('uwuify', {
            aliases: ['uwuify', 'uwu'],
            description: {
                content: 'Make messages unbearable',
                usage: 'uwuify <text>',
                examples: [
                    'uwuify Hello, World!',
                    'uwu Hello, World!'
                ]
            },
            ratelimit: 0,
            args: [
                {
                    id: 'text',
                    type: 'string',
                    match: 'rest'
                }
            ]
        });
    }

    public exec(message: Message, { text }: { text: string }): Promise<Message> {
        function UwUify(str: string) {
            return str
                .replace(/@/g, '')
                .replace(/(?:r|l)/g, 'w')
                .replace(/(?:R|L)/g, 'W')
                .replace(/th([aeiou])/g, 'd$1')
                .replace(/Th([aeiou])/g, 'D$1')
                .replace(/TH([AEIOU])/g, 'D$1')
                .replace(/th([AEIOU])/g, 'd$1')
                .replace(/n([aeiou])/g, 'ny$1')
                .replace(/N([aeiou])/g, 'Ny$1')
                .replace(/N([AEIOU])/g, 'NY$1')
                .replace(/n([AEIOU])/g, 'nY$1')
                .replace(/([a-z])o([a-z])/g, '$1owo$2')
                .replace(/([A-Z])o([a-z])/g, '$1owo$2')
                .replace(/([A-Z])O([A-Z])/g, '$1OWO$2')
                .replace(/([a-z])O([A-Z])/g, '$1OWO$2')
                .replace(/ove/g, 'uv')
        }

        const temp_uwuized_message = UwUify(text)

        if (temp_uwuized_message.length > 2000) {
            fs.writeFile('./files/uwuify.txt', UwUify(text), (err) => {
                if (err) throw new Error(err)
            })

            return message.util.send(
                'Your string was too long, so I made a file containing your uwu-ified text for you!', {
                    files: [
                        {
                            attachment: 'C:\\Users\\Administrator\\Documents\\Github\\AntiBot\\src\\files\\uwuify.txt'
                        }
                    ]
                }
            )
        }

        const embed = new MessageEmbed()
            .setTitle('UwU-ified Message')
            .setDescription(`${UwUify(text)}`)
            .setFooter(`Wequested by ${message.author.username}`, message.author.displayAvatarURL())
            .setTimestamp()
        return message.util.send(embed)

    }
}