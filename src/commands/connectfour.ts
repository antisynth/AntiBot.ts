import { Command } from 'discord-akairo';
import { Message, MessageEmbed, GuildMember } from 'discord.js';

export default class Connect4 extends Command {
    constructor() {
        super('connectfour', {
            aliases: ['connectfour', 'connect4', 'c4'],
            description: {
                content: 'Play connect four against another user with reactions',
                usage: 'connectfour <opponent>',
                examples: [
                    'connectfour @antisynth#6968',
                    'connect4 antisynth',
                    'c4 antisynth'
                ]
            },
            ratelimit: 0,
            args: [
                {
                    id: 'user',
                    type: 'member',
                    match: 'rest'
                }
            ]
        });
    }

    public async exec(message: Message, { user }: { user: GuildMember }): Promise<Message> {
        let challenger = message.member;
        let opponent = user;

        if (!opponent) return message.channel.send("Please mention someone you would like to play against.");
        if (opponent.id === challenger.id) return message.channel.send('You can\'t play against yourself.')
        if (opponent.user.bot === true) return message.channel.send('You can\'t play against a bot.')

        const question = await message.channel.send(`${opponent}, would you like to play connect four against ${challenger}?`);

        ["✅", "❌"].forEach(async el => question.react(el));
        
        const filter = (reaction, user) => ["✅", "❌"].includes(reaction.emoji.name) && user.id === opponent.id; 

        const response = await question.awaitReactions(filter, { max: 1 });

        const reaction = response.first();

        if (reaction.emoji.name === "❌") return question.edit("Connect four game cancelled");
        else {

            await message.delete();
            await question.delete();

            const board = [
                ["⚪", "⚪", "⚪", "⚪", "⚪", "⚪", "⚪"],
                ["⚪", "⚪", "⚪", "⚪", "⚪", "⚪", "⚪"],
                ["⚪", "⚪", "⚪", "⚪", "⚪", "⚪", "⚪"],
                ["⚪", "⚪", "⚪", "⚪", "⚪", "⚪", "⚪"],
                ["⚪", "⚪", "⚪", "⚪", "⚪", "⚪", "⚪"],
                ["⚪", "⚪", "⚪", "⚪", "⚪", "⚪", "⚪"],
            ];

            const renderBoard = (board) => {
                let tempString = "";
                for (const boardSection of board) {
                    tempString += `${boardSection.join("")}\n`;
                }

                tempString = tempString.concat("1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣7️⃣");

                return tempString;
            }

            let player = 0;

            const gameData = [
                { member: challenger, playerColor: "🔴" },
                { member: opponent, playerColor: "🟡" }
            ];

            const initialState = renderBoard(board);

            const initial = new MessageEmbed()
                .setTitle(`${gameData[player].member.user.username}'s turn`)
                .setDescription(initialState);
            
            const gameMessage = await message.channel.send(initial);

            ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣"].forEach(async el => gameMessage.react(el));

            const gameFilter = (reaction, user) => ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣"].includes(reaction.emoji.name) && (user.id === opponent.id || user.id === challenger.id);

            const gameCollector = gameMessage.createReactionCollector(gameFilter);

            const checkFour = (a, b, c, d) => (a === b) && (b === c) && (c === d) && (a !== "⚪");

            const horizontalCheck = () => {
                for (let i = 0; i < 6; i++) {
                    for (let j = 0; j < 4; j++) {
                        if (checkFour(board[i][j], board[i][j + 1], board[i][j + 2], board[i][j + 3])) return [
                            board[i][j], board[i][j + 1], board[i][j + 2], board[i][j + 3]
                        ];
                    }
                }
            }

            const verticalCheck = () => {
                for (let j = 0; j < 7; j++) {
                    for (let i = 0; i < 3; i++) {
                        if (checkFour(board[i][j], board[i + 1][j], board[i + 2][j], board[i + 3][j])) return [
                            board[i][j], board[i + 1][j], board[i + 2][j], board[i + 3][j]
                        ];
                    }
                }
            }

            const diagonal1 = () => {
                for (let col = 0; col < 4; col++) {
                    for (let row = 0; row < 3; row++) {
                        if (checkFour(board[row][col], board[row + 1][col + 1], board[row + 2][col + 2], board[row + 3][col + 3])) return [
                            board[row][col], board[row + 1][col + 1], board[row + 2], board[col + 2], board[row + 3][col + 3]
                        ]
                    }
                }
            }

            const diagonal2 = () => {
                for (let col = 0; col < 4; col++) {
                    for (let row = 5; row > 2; row--) {
                        if (checkFour(board[row][col], board[row - 1][col + 1], board[row - 2][col + 2], board[row - 3][col + 3])) return [
                            board[row][col], board[row - 1][col + 1], board[row - 2][col + 2], board[row - 3][col + 3]
                        ]
                    }
                }
            }

            const tieCheck = () => {
                let count = 0;
                for (const el of board) {
                    for (const string of el) {
                        if (string !== "⚪") count++;
                    }
                }
                if (count === 42) return true;
                else return false;
            }

            const checks = [horizontalCheck, verticalCheck, diagonal1, diagonal2];

            gameCollector.on("collect", (reaction, user) => {

                if (user.id === gameData[player].member.id) {

                    reaction.users.remove(gameData[player].member.id)
                    const openSpaces = [];


                    switch (reaction.emoji.name) {

                        case "1️⃣":

                            for (let i = 5; i > -1; i--) {
                                if (board[i][0] === "⚪") openSpaces.push({ i, j: 0 });
                            }
                            if (openSpaces.length === 0) return message.channel.send(`${gameData[player].member}, that column is already full. Choose a differnt one.`);
                            else board[openSpaces[0].i][openSpaces[0].j] = gameData[player].playerColor;

                        break;
                        case "2️⃣":
                            
                            for (let i = 5; i > -1; i--) {
                                if (board[i][1] === "⚪") openSpaces.push({ i, j: 1 });
                            }
                            if (openSpaces.length === 0) return message.channel.send(`${gameData[player].member}, that column is already full. Choose a different one.`);
                            else board[openSpaces[0].i][openSpaces[0].j] = gameData[player].playerColor;

                        break;
                        case "3️⃣":
                            for (let i = 5; i > -1; i--) {
                                if (board[i][2] === "⚪") openSpaces.push({ i, j: 2 });
                            }
                            if (openSpaces.length === 0) return message.channel.send(`${gameData[player].member}, that column is already full. Choose a different one.`);
                            else board[openSpaces[0].i][openSpaces[0].j] = gameData[player].playerColor;
                        break;
                        case "4️⃣":
                            for (let i = 5; i > -1; i--) {
                                if (board[i][3] === "⚪") openSpaces.push({ i, j: 3 });
                            }
                            if (openSpaces.length === 0) return message.channel.send(`${gameData[player].member}, that column is already full. Choose a different one.`);
                            else board[openSpaces[0].i][openSpaces[0].j] = gameData[player].playerColor;
                        break;
                        case "5️⃣":
                            for (let i = 5; i > -1; i--) {
                                if (board[i][4] === "⚪") openSpaces.push({ i, j: 4 });
                            }
                            if (openSpaces.length === 0) return message.channel.send(`${gameData[player].member}, that column is already full. Choose a different one.`);
                            else board[openSpaces[0].i][openSpaces[0].j] = gameData[player].playerColor;
                        break;
                        case "6️⃣":
                            for (let i = 5; i > -1; i--) {
                                if (board[i][5] === "⚪") openSpaces.push({ i, j: 5 });
                            }
                            if (openSpaces.length === 0) return message.channel.send(`${gameData[player].member}, that column is already full. Choose a different one.`);
                            else board[openSpaces[0].i][openSpaces[0].j] = gameData[player].playerColor;
                        break;
                        case "7️⃣":
                            for (let i = 5; i > -1; i--) {
                                if (board[i][6] === "⚪") openSpaces.push({ i, j: 6 });
                            }
                            if (openSpaces.length === 0) return message.channel.send(`${gameData[player].member}, that column is already full. Choose a differnt one.`);
                            else board[openSpaces[0].i][openSpaces[0].j] = gameData[player].playerColor;
                        break;

                    }

                    if (tieCheck()) {

                        const TieEmbed = new MessageEmbed()
                            .setDescription(renderBoard(board))
                        gameCollector.stop("Tie Game");
                        return gameMessage.edit(`It was a tie game!`, { embed: TieEmbed });

                    }

                    for (const func of checks) {

                        const data = func();
                        if (data) {

                            const WinEmbed = new MessageEmbed()
                                .setDescription(renderBoard(board))
                            gameCollector.stop(`${gameData[player].member.id} won`);
                            return gameMessage.edit(`${gameData[player].member} has won the game!`, { embed: WinEmbed });

                        }

                    }

                    player = (player + 1) % 2;

                    const newEmbed = new MessageEmbed()
                        .setTitle(`${gameData[player].member.user.username}'s turn`)
                        .setDescription(renderBoard(board))
                    gameMessage.edit("", { embed: newEmbed });

                }

            });


        }

    }
}