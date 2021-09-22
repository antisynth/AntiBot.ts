import { Command } from 'discord-akairo'
import { Message, GuildMember, MessageAttachment } from 'discord.js'

const Canvas = require('canvas')
const path = require('path')

export default class Clown extends Command {
    constructor() {
        super('clown', {
            aliases: ['clown', 'omfgclown'],
            description: {
                content: 'Clown somebody',
                usage: 'clown <user>',
                examples: [
                    'clown antisynth',
                    'clown @antisynth#6968',
                    'omfgclown antisynth',
                    'clown antisynth -TRICKY=true'
                ]
            },
            ratelimit: 0,
            args: [
                {
                    id: 'user',
                    type: 'member',
                    match: 'rest',
                    default: (msg: Message) => msg.member
                },
                {
                    id: 'tricky',
                    type: 'string',
                    match: 'option',
                    flag: '-tricky=',
                    default: 'FALSE'
                }
            ]
        })
    }

    public async exec(message: Message, { user, tricky }: { user: GuildMember, tricky: string }): Promise<Message> {
        if (tricky.toUpperCase() === 'TRUE') {
            const canvas = Canvas.createCanvas(1206, 660)
            const ctx = canvas.getContext('2d')

            const background = await Canvas.loadImage(
                path.join(__dirname, '../files/omfgclown.jpg')
            )

            const avatar = await Canvas.loadImage(
                user.user.displayAvatarURL({ format: 'jpg' })
            )

            const foreground = await Canvas.loadImage(
                path.join(__dirname, '../files/omfgclownforeground.png')
            )

            let x = 0
            let y = 0

            ctx.drawImage(background, x, y)
            ctx.drawImage(avatar, 250, 250, 300, 300)
            ctx.drawImage(foreground, x, y)

            const attachment = new MessageAttachment(canvas.toBuffer(), 'clown.png')

            return message.util.send({ files: [attachment] })
        } else {
            const canvas = Canvas.createCanvas(683, 1024)
            const ctx = canvas.getContext('2d')

            const background = await Canvas.loadImage(
                path.join(__dirname, '../files/clown.jpg')
            )

            const avatar = await Canvas.loadImage(
                user.user.displayAvatarURL({ format: 'jpg' })
            )

            let x = 0
            let y = 0

            ctx.drawImage(background, x, y)
            ctx.drawImage(avatar, 280, 280, 250, 250)

            const attachment = new MessageAttachment(canvas.toBuffer(), 'clown.png')
            
            return message.util.send({ files: [attachment] })
        }
    }
}