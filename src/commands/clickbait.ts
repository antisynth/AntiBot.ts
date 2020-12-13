import { Command } from 'discord-akairo';
import { Message } from 'discord.js';

export default class Clickbait extends Command {
    constructor() {
        super('clickbait', {
            aliases: ['clickbait', 'shitpost'],
            description: {
                content: 'Generate random clickbait title',
                usage: 'clickbait',
                examples: [
                    'clickbait',
                    'shitpost'
                ]
            },
            ratelimit: 1
        })
    }

    public exec(message: Message) {
        const gaming = '1'
        const contacting = '2'
        const challenge = '3'

        // const cap = '4'
        // const nocap = '5'

        const themeList = [gaming, contacting, challenge]
        // const yes = 'yes'
        // const no = 'no'
        // let repeat = ''
        // let generating = false
        const capsList = [true, false]

        function generateClickbait() {
            const theme = themeList[Math.floor(Math.random()*(themeList.length)-1)]
            const gaming1caps = capsList[Math.floor(Math.random()*(capsList.length))]
            const gaming2caps = capsList[Math.floor(Math.random()*(capsList.length))]
            const gaming3caps = capsList[Math.floor(Math.random()*(capsList.length))]
            const gaming4caps = capsList[Math.floor(Math.random()*(capsList.length))]

            const contact1caps = capsList[Math.floor(Math.random()*(capsList.length))]
            const contact2caps = capsList[Math.floor(Math.random()*(capsList.length))]
            const contact3caps = capsList[Math.floor(Math.random()*(capsList.length))]
            const contact4caps = capsList[Math.floor(Math.random()*(capsList.length))]

            const challenge1caps = capsList[Math.floor(Math.random()*(capsList.length))]
            const challenge2caps = capsList[Math.floor(Math.random()*(capsList.length))]
            const challenge3caps = capsList[Math.floor(Math.random()*(capsList.length))]

            if (theme === gaming) {
                let gamingList1 = ["beating", "winning against", "I got killed by", "I won with", "I won against"]
                let gamingList2 = ["the best player ever", "a famous youtuber", "the president", "an asian gamer"]
                let gamingList3 = ["in Minecraft!", "in Overwatch!", "in Call of Duty!", "in Roblox!", "in Fortnite!"]
                let gamingList4 = ["(intense)", "(ultra gamer)", "(so close)", "(omg)", "(pro)"]

                let gaming1 = gamingList1[Math.floor(Math.random()*(gamingList1.length))]
                if (gaming1caps === true) {
                    gaming1 = gaming1.toUpperCase()
                }
                let gaming2 = gamingList2[Math.floor(Math.random()*(gamingList2.length))]
                if (gaming2caps === true) {
                    gaming2 = gaming2.toUpperCase()
                }
                let gaming3 = gamingList3[Math.floor(Math.random()*(gamingList3.length))]
                if (gaming3caps === true) {
                    gaming3 = gaming3.toUpperCase()
                }
                let gaming4 = gamingList4[Math.floor(Math.random()*(gamingList4.length))]
                if (gaming4caps === true) {
                    gaming4 = gaming4.toUpperCase()
                }

                return `${gaming1} ${gaming2} ${gaming3} ${gaming4}`
            }

            if (theme === contacting) {
                let contactList1 = ["calling", "meeting", "inviting over"]
		        let contactList2 = ["Elmo", "Barney", "Santa Claus", "Pennywise", "Thanos", "Scooby Doo", "Shrek"]
		        let contactList3 = ["at 3AM!", "at midnight!", "at 1AM!", "at night!"]
		        let contactList4 = ["(scary)", "(omg he came)", "(intense)", "(cops called)", "(don't try this at home)", "(crazy)"]
                
                let contact1 = contactList1[Math.floor(Math.random()*(contactList1.length))]
                if (contact1caps === true) {
                    contact1 = contact1.toUpperCase()
                }
                let contact2 = contactList2[Math.floor(Math.random()*(contactList2.length))]
                if (contact2caps === true) {
                    contact2 = contact2.toUpperCase()
                }
                let contact3 = contactList3[Math.floor(Math.random()*(contactList3.length))]
                if (contact3caps === true) {
                    contact3 = contact3.toUpperCase()
                }
                let contact4 = contactList4[Math.floor(Math.random()*(contactList4.length))]
                if (contact4caps === true) {
                    contact4 = contact4.toUpperCase()
                }

                return `${contact1} ${contact2} ${contact3} ${contact4}`
            }

            if (theme === challenge) {
                let challengeList1 = ["buying", "selling", "eating", "stealing"]
                let challengeList2 = ["everything in the store", "all of my parent's belongings", "everything I can hold", "everything green", "everything orange", "everything blue", "everything red"]
                let challengeList3 = ["- challenge", "- super hard challenge", "- expensive challenge", "- impossible challenge"]
                
                let challenge1 = challengeList1[Math.floor(Math.random()*(challengeList1.length))]
                if (challenge1caps === true) {
                    challenge1 = challenge1.toUpperCase()
                }
                let challenge2 = challengeList2[Math.floor(Math.random()*(challengeList2.length))]
                if (challenge2caps === true) {
                    challenge2 = challenge2.toUpperCase()
                }
                let challenge3 = challengeList3[Math.floor(Math.random()*(challengeList3.length))]
                if (challenge3caps === true) {
                    challenge3 = challenge3.toUpperCase()
                }

                return `${challenge1} ${challenge2} ${challenge3}`
            }
        }

        let send = generateClickbait()

        if (send == undefined || send == 'undefined') {
            let send2 = generateClickbait()
            if (send2 == undefined || send2 == 'undefined') {
                let send3 = generateClickbait()
                if (send3 == undefined || send2 == 'undefined') {
                    let send4 = generateClickbait()
                    if (send4 == undefined || send4 == 'undefined') {
                        console.log('L')
                        return
                    } else {
                        return message.util.send(`${send4}`)
                    }
                } else {
                    return message.util.send(`${send3}`)
                }
            } else {
                return message.util.send(`${send2}`)
            }
        } else {
            return message.util.send(`${send}`)
        }
    }
}