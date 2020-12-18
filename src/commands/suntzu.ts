const Canvas = require('canvas')
import { Message, MessageAttachment } from 'discord.js';
const path = require('path')
import { Command } from 'discord-akairo';

export default class SunTzu extends Command {
    constructor() {
        super('suntzu', {
            aliases: ['suntzu'],
            description: {
                content: 'Make a fake sun tzu quote',
                usage: 'suntzu <text>',
                examples: [
                    'suntzu This command\'s not gonna work.'
                ]
            },
            ratelimit: 0,
            args: [
                {
                    id: 'text',
                    type: 'string',
                    match: 'rest'
                },
                {
                    id: 'quotes',
                    type: 'string',
                    match: 'option',
                    flag: '-QUOTES=',
                    default: 'TRUE'
                }
            ]
        });
    }

    public async exec(message: Message, { text, quotes }: { text: string[], quotes: string }): Promise<Message> {
        if (!text) return message.util.send('Error! Make sure you\'re entering text to display.')
        
        const canvas = Canvas.createCanvas(801, 447)
        const ctx = canvas.getContext('2d')
        
        const background = await Canvas.loadImage(
            path.join(__dirname, '../files/wallpaper.jpg')
        )
        let x = 0
        let y = 0
        ctx.drawImage(background, x, y)

        ctx.fillStyle = '#ffffff'
        ctx.font = '30px sans-serif'
        x = canvas.width / 2 - ctx.measureText(text).width / 2
        if (text.length > 30) {
            text = [...text]
            text[31] = text[31] + '\n'
        }
        if (text.length > 60) {
            text = [...text]
            text[61] = text[61] + '\n'
        }
        if (text.length > 90) {
            text = [...text]
            text[91] = text[91] + '\n'
        }
        if (text.length > 120) {
            text = [...text]
            text[121] = text[121] + '\n'
        }
        if (text.length > 150) {
            text = [...text]
            text[151] = text[151] + '\n'
        }
        if (text.length > 180) {
            text = [...text]
            text[181] = text[181] + '\n'
        }
        if (text.length > 210) {
            text = [...text]
            text[211] = text[211] + '\n'
        }
        if (text.length > 240) {
            text = [...text]
            text[241] = text[241] + '\n'
        }
        if (text.length > 270) {
            text = [...text]
            text[271] = text[271] + '\n'
        }
        if (text.length > 300) {
            text = [...text]
            text[301] = text[301] + '\n'
        }
        let newText = Array.prototype.join.call(text, "")
        if (quotes == "TRUE") { 
            let finalText = `"${newText}"` 
            ctx.fillText(finalText, 250, 50 + 90)
        } else if (quotes == "FALSE") {
            let finalText = `${newText}`
            ctx.fillText(finalText, 250, 50 + 90)
        }
        //if (text.includes('undefined')) text.replace('undefined', ' ')
        ctx.font = '35px sans-serif'
        ctx.fillText('- Sun Tzu, The Art of War', 250, 300 + 20)

        const attachment = new MessageAttachment(canvas.toBuffer())
        return message.util.send(
            '',
            attachment
            )
    }
}