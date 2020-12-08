import { Command } from "discord-akairo";
import { Message, MessageEmbed } from "discord.js";

export default class _8ball extends Command {
    public constructor() {
        super('8ball', {
            aliases: ['8ball'],
            description: {
                content: 'Magically predict the answer to a question',
                usage: '8ball <question>',
                examples: [
                    '8ball is this command gonna work?'
                ]
            },
            ratelimit: 3,
            args: [
                {
                    id: 'question',
                    type: 'string',
                    match: 'rest'
                }
            ]
        });
    }

    public exec(message: Message, { question }: { question: string }): Promise<Message> {
        if (question == null) return message.util.send('Please specify a question for me to answer.')
        const message_author_avatar = message.author.avatarURL()
        const magic_8ball_image = 'https://i.imgur.com/PzMDC81.png'

        const responses = [
            "It is certain.",
            "It is decidedly so.",
            "Without a doubt.",
            "Yes - definitely.",
            "You may rely on it.",
            "As I see it, yes.",
            "Most likely.",
            "Outlook good.",
            "Yes.",
            "Signs point to yes.",
            "Reply hazy, try again.",
            "Ask again later.",
            "Better not tell you now.",
            "Cannot predict now.",
            "Concentrate and ask again.",
            "Don't count on it.",
            "My reply is no.",
            "My sources say no.",
            "Outlook not so good.",
            "Very doubtful.",
        ]
        let random_index = responses[Math.floor(Math.random()*(responses.length)-1)]

        if (random_index == 'undefined') {
            random_index = 'Yes.'
        }

        const embed = new MessageEmbed()
            .setTitle('Magic 8ball')
            .setDescription(`Question: ${question}\nAnswer: ${random_index}`)
            .setImage(magic_8ball_image)
            .setFooter(`Requested by ${message.author.username}`, message_author_avatar)

        return message.util.send(embed)
    }
}