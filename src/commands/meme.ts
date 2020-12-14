import { Command } from 'discord-akairo';
import { Message, MessageEmbed } from 'discord.js';
const random_puppy = require('random-puppy');

export default class Meme extends Command {
    constructor() {
        super('meme', {
            aliases: ['meme', 'cringe'],
            description: {
                content: 'Get a random meme from reddit',
                usage: 'meme',
                examples: [
                    'meme',
                    'cringe'
                ]
            },
            ratelimit: 0
        });
    }

    public async exec(message: Message): Promise<Message> {
        const subreddits = ["meme", "me_irl", "photoshopbattles", "crappyoffbrands", "PerfectTiming", "BrandNewSentence"]
        const random = subreddits[Math.floor(Math.random() * subreddits.length)]
        const image = await random_puppy(random)
        
        const embed = new MessageEmbed()
            .setTitle(`From /r/${random}`)
            .setImage(image)
            .setURL(`http://reddit.com/${random}`)
            .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
        return message.util.send(embed)
    }
}