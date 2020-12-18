import { Command } from 'discord-akairo'
import { Message } from 'discord.js'
import axios from 'axios'

export default class Docs extends Command {
    constructor() {
        super('docs', {
            aliases: ['docs', 'documentation'],
            description: {
                content: 'Search and display discord.js documentation',
                usage: 'docs <document>',
                examples: [
                    'docs Message'
                ]
            },
            ratelimit: 0,
            args: [
                {
                    id: 'doc',
                    type: 'string',
                    match: 'rest'
                }
            ]
        })
    }

    public exec(message: Message, { doc }: { doc: string }) {
        const uri = `https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(doc)}`

        axios.get(uri).then((embed) => {
            const { data } = embed

            if (data && !data.error) {
                message.util.send('', { embed: data })
            } else {
                message.util.send('Could not find that documentation')
            }
        }).catch((err) => {
            console.error(err)
        })
    }
}