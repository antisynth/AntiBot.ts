import { Command } from 'discord-akairo'
import { Message, MessageEmbed } from 'discord.js'

export default class Exec extends Command {
    constructor() {
        super('exec', {
            aliases: ['exec', 'eval'],
            description: {
                content: 'Make bot run any code you input',
                usage: 'eval <code>',
                examples: [
                    'exec console.log(\'xD\')',
                    'eval console.log(\'e\')'
                ]
            },
            ratelimit: 0,
            args: [
                {
                    id: 'code',
                    type: 'string',
                    match: 'rest'
                }
            ]
        })
    }

    public exec(message: Message, { code, }: { code: string }) {
        if (message.member.id === '461340349680582667') {
            try {
                const codeRegex = new RegExp(/```[a-z]*/g)
                const messageRegex = new RegExp(/message\.(channel|util)\.send/g)
                const consoleRegex = new RegExp(/console\.*[log]*\(*('|")*[a-z]*('|")*\)*/g)
                const whileRegex = new RegExp(
                    /while *\([a-z]+\) *{* *\n*\n*\t*[a-z]*\.*[a-z]*\(*('|")*[a-z]*('|")*\)*\n* *}*/gi
                )

                if (whileRegex.test(code)) {
                    return message.util.send('That seems like a bad idea.')
                } else if (codeRegex.test(code)) {
                    code = code.replace(/```[a-z]*/g, '')
                } else if (consoleRegex.test(code)) {
                    const result = eval(code)
                    result
                    return message.util.send('Logged to console')
                } else if (messageRegex.test(code)) {
                        const result = eval(code)
                        return result
                } else {
                    const result = eval(code)
                    const embed = new MessageEmbed()
                    .setTitle('Exec')
                    .setDescription(result)
                    .setTimestamp()

                    return message.util.send('', { embed: embed })
                    .catch(err => {
                        return message.util.send(err)
                    })
                }
            } catch (err) {
                return message.util.send(err)
            }
        } else {
            return
        }
    }
}