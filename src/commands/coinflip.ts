import { Command } from 'discord-akairo';
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
                result.edit(Math.random() > 0.5 ? "Heads!" : "Tails!")
            }, 1000)
        })
    }
}