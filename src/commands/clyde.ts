import { Command } from 'discord-akairo'
import { Message } from 'discord.js'
import axios from 'axios'

export default class Clyde extends Command {
    constructor() {
        super('clyde', {
            aliases: ['clyde', 'fakeclyde'],
            description: {
                content: 'Make clyde say anything',
                usage: 'clyde <text>',
                examples: [
                    'clyde cringe',
                    'fakeclyde pog'
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
        })
    }

    public exec(message: Message, { text }: { text: string }) {
        if (!text) return message.util.send('Please provide some text')
        
        const regex = new RegExp(/<@!*\d{18}>/g)
        if (regex.test(text)) {
            const newtext = text.replace(/<@!*/g, '')
            const newnewtext = newtext.replace(/>/g, '')
            const newnewnewtext = newnewtext.replace(
                /[^\d{18}]/g, ''
            )
            let userinputted = message.guild.members.cache.get(newnewnewtext)

            let userinputtednick = userinputted.nickname
            if (userinputtednick == null) {
                userinputtednick = userinputted.user.username
            }

            text = text.replace(/<@!*\d{18}>/g, userinputtednick)
        }

        axios
        .get(`https://nekobot.xyz/api/imagegen?type=clyde&text=${text}`)
        .then((res) => {
            message.util.send('', {
                files: [
                    {
                        attachment: res.data.message
                    }
                ]
            })
        })
    }
}