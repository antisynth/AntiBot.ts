import { Command } from 'discord-akairo';
import fs from 'fs';
import { Message, MessageEmbed } from 'discord.js';
const random_puppy = require('random-puppy');
const thisSession = require('../files/db.json')

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

    public async exec(message: Message) {
        const subreddits = ["meme", "me_irl", "photoshopbattles", "crappyoffbrands", "PerfectTiming", "BrandNewSentence"]
        const random = subreddits[Math.floor(Math.random() * subreddits.length)]
        let image = await random_puppy(random)
        
        const loadingEmbed = new MessageEmbed()
            .setTitle('Loading...')
            .setTimestamp()

        const dislikeEmbed = new MessageEmbed()
            .setTitle('I won\'t show you this image again, sorry you hated it!')
            .setTimestamp()

        const msg = await message.channel.send('', { embed: loadingEmbed })

        setTimeout(async () => {
            if (thisSession.hasOwnProperty(image)) {
                while (thisSession.hasOwnProperty(image)) {
                    image = await random_puppy(random)
                }
            } else {
                const embed = new MessageEmbed()
                .setTitle(`From /r/${random}`)
                .setImage(image)
                .setURL(`http://reddit.com/${random}`)
                .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
                .setTimestamp()
                msg.edit('', { embed: embed });
            }
            ["👍", "👎"].forEach(async el => msg.react(el));
            // const filter = (reaction, user) => ["👍", "👎"].includes(reaction.emoji.name) && user.id === message.author.id; 
            // const response = await msg.awaitReactions(filter, { max: 1, time: 30 });
            // const reaction = response.first();
            this.client.on('messageReactionAdd', async (reaction) => {
                if (reaction.emoji.name === '👎') {
                    if (reaction.count >= 5) {
                        msg.edit('', { embed: dislikeEmbed })
                        msg.reactions.removeAll()
                        const fsPromises = fs.promises
                        const data = JSON.parse(await fsPromises.readFile('./files/db.json', 'utf8'))
                        data[image] = true
                        await fsPromises.writeFile('./files/db.json', JSON.stringify(data, null, 2))
                    }
                }
            })
        }, 1000)

    }
}