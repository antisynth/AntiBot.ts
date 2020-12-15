import { Command } from 'discord-akairo';
import { MessageEmbed } from 'discord.js';
import { Message } from 'discord.js';

export default class Coinflip extends Command {
    constructor() {
        super('coinflip', {
            aliases: ['coinflip', 'flipcoin'],
            description: {
                content: 'Flip a coin and randomly get heads or tails',
                usage: 'coinflip',
                examples: [
                    'coinflip'
                ]
            },
            ratelimit: 0
        });
    }

    public exec(message: Message) {
        message.util.send('Flipping...').then((result) => {
            setTimeout(function() {
                const headsOrTails = Math.random() > 0.5 ? "Heads!" : "Tails!"
                let img

                if (headsOrTails === "Heads!") img = 'https://imgur.com/lf7HeGJ.png'
                else if (headsOrTails === "Tails!") img = 'https://imgur.com/np4AIjH.png'

                const embed = new MessageEmbed()
                .setTitle(headsOrTails)
                .setImage(img)

                result.edit('', { embed: embed })
            }, 1000)
        })
    }
}