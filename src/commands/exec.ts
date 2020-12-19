import { freetypeVersion } from 'canvas'
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

    public exec(message: Message, { code }: { code: string }) {
        try {
            if (!code) return message.util.send('Enter some code for me to run.')
            
            const codeRegex = new RegExp(/```[a-z]*/g)
            const messageRegex = new RegExp(/message\.(channel|util)\.send\(('|")*[a-z]*('|")*\)/g)
            const consoleRegex = new RegExp(/console\.*[log]*\(*('|")*[a-z]*('|")*\)*/g)
            const whileRegex = new RegExp(
                /while *\(\(*!*[a-z]+ *!*=*\|* * *!*[a-z]*\) *=* *\(*\d* * *>* * *\d* *\|* *\d* *!*=* _*\)* *{* *\n*\n*\t*[a-z]*\.*[a-z]*\(*('|")*[a-z]*('|")*\)*;*\n* *}*/gi
            )
            const importRegex = new RegExp(
                /import *({* *[a-z]*-*\d* *}*|[a-z]*) *from *('|"|`)[a-z]*\d*.*('|"|`)/gi
            )
            const abuseRegex = new RegExp(
                /[a-zA-Z]*\.*(kick|ban|setNickname|send|setPermissions|create|updateOverwrite|overwritePermissions|delete|lockPermissions|new Permissions)\(\)/g
            )
            const intervalTimeoutRegex = new RegExp(
                /(setTimeout|setInterval)\(*/g
            )
            const count = (
                code.match(/message\.(channel|util)\.send\(('|"|`)*[a-z]*('|"|`)*\)/g) || code.match(/console\.*[log]*\(*('|"|`)*[a-z]*('|"|`)*\)/g) || []
            ).length

            if (count > 6) return

            if (code.includes('for')) {
                return
            }

            if (codeRegex.test(code)) {
                code = code.replace(/```[a-z]*/g, '')
            } if (intervalTimeoutRegex.test(code)) {
                return 
            } if (importRegex.test(code)) {
                return
            } if (abuseRegex.test(code)) {
                return
            } if (whileRegex.test(code)) {
                return
            } if (consoleRegex.test(code)) {
                function replaceAll(str: string, find: string, replace: string) {
                    var escapedFind=find.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
                    return str.replace(new RegExp(escapedFind, 'g'), replace);
                }

                if (code.includes('\'')) {
                    code = replaceAll(code, 'console.log(\'', '')
                    code = replaceAll(code, '\')', '')
                    const embed = new MessageEmbed()
                    .setTitle('Exec')
                    .setDescription(code)
                    .setTimestamp()
                    message.channel.send(' ', { embed: embed })
                    setTimeout(() => {
                        return message.channel.send('Script execution timed out')
                    }, 100)
                } else if (code.includes('"')) {
                    code = replaceAll(code, 'console.log("', '')
                    code = replaceAll(code, '")', '')
                    const embed = new MessageEmbed()
                    .setTitle('Exec')
                    .setDescription(code)
                    .setTimestamp()
                    message.channel.send(' ', { embed: embed })
                    setTimeout(() => {
                        return message.channel.send('Script execution timed out')
                    }, 100)
                } else {
                    const embed = new MessageEmbed()
                    .setTitle('Exec')
                    .setDescription(eval(code))
                    .setTimestamp()
                    message.channel.send(' ', { embed: embed })
                    setTimeout(() => {
                        return message.channel.send('Script execution timed out')
                    }, 100)
                }
            } if (messageRegex.test(code)) {
                const result = eval(code)
                result
                setTimeout(() => {
                    return message.channel.send('Script execution timed out')
                }, 100)
            } else {
                const result = eval(code)
                const embed = new MessageEmbed()
                .setTitle('Exec')
                .setDescription(result)
                .setTimestamp()

                message.channel.send(embed)
                .catch(() => {
                    return
                })
                setTimeout(() => {
                    return message.channel.send('Script execution timed out')
                }, 100)
            }
        } catch (err) {
            return message.channel.send(err)
        }
    }
}