import { Command } from 'discord-akairo'
import { Message, MessageEmbed } from 'discord.js'
import { prefix } from '../Config'

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
            
            let evalExec

            if (message.content.split(' ')[0] === `${prefix}exec`) evalExec = 'Exec'
            if (message.content.split(' ')[0] === `${prefix}eval`) evalExec = 'Eval'

            const codeRegex = new RegExp(/```[a-z]*/g)
            const messageRegex = new RegExp(/message\.(channel|util)\.send\(('|"|`)*[a-z]*('|"|`)*\)/g)
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
                    let escapedFind = find.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
                    return str.replace(new RegExp(escapedFind, 'g'), replace);
                }

                if (code.includes('\'')) {
                    code = replaceAll(code, 'console.log(\'', '')
                    code = replaceAll(code, '\')', '')
                    const embed = new MessageEmbed()
                    .setTitle(evalExec)
                    .setDescription(code)
                    .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
                    .setTimestamp()
                    message.channel.send(' ', { embed: embed })
                    setTimeout(() => {
                        return
                    }, 100)
                    return
                } else if (code.includes('"')) {
                    code = replaceAll(code, 'console.log("', '')
                    code = replaceAll(code, '")', '')
                    const embed = new MessageEmbed()
                    .setTitle(evalExec)
                    .setDescription(code)
                    .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
                    .setTimestamp()
                    message.channel.send(' ', { embed: embed })
                    setTimeout(() => {
                        return
                    }, 100)
                    return
                } else {
                    const embed = new MessageEmbed()
                    .setTitle(evalExec)
                    .setDescription(null)
                    .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
                    .setTimestamp()
                    message.channel.send(' ', { embed: embed })
                    setTimeout(() => {
                        return
                    }, 100)
                    return
                }
            } if (messageRegex.test(code)) {
                eval(code)
                setTimeout(() => {
                    return
                }, 100)
                return
            } else {
                const result = eval(code)
                const embed = new MessageEmbed()
                .setTitle(evalExec)
                .setDescription(result)
                .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
                .setTimestamp()

                message.channel.send(embed)
                .catch(() => {
                    return
                })
                setTimeout(() => {
                    return
                }, 100)
                return
            }
        } catch (err) {
            return message.channel.send(err)
        }
    }
}