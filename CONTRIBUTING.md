# Contributing
## Commands
### Adding a new command
All of the bot's commands are seperate JavaScript files found in AntiBot/commands/. The file can be called whatever as long as you define
`aliases: []` in the file to the actual name of the command, but it's definitely a lot easier if the file's name is the name of the command.
#### When you make a new file
There's some stuff you have to do to actually make a command before you add any command aliases or code to run or anything.
* `import { Command } from 'discord-akairo'` - You need to import Command because that's what the command classes inherit to run.
* `import { Message } from 'discord.js'` - Import this so the bot can send and read messages.
* `export default class CommandName extends Command` - Class you need for the command to run at all.
* Make your constructor and super - You need this for command aliases and description and stuff. How you'd do this is:
	```ts
	constructor() {
		super('commandname', {
			// refer to required/optional variables
		})
	}
	```
	When that's done, there's only one more thing to do for this section.
* Make your exec function - This is what you use for the code that runs when the command is executed. It needs to be public and needs one parameter, message. See:
	```ts
	public exec(message: Message): Promise<Message> {}
	```
	The promise isn't actually necessary. Just know if you're not gonna make a message promise, you need to remove the colon.
	Once all of that's done, you can add command aliases and description, then you can actually start adding your command code.
#### Required variables
* `aliases` - What you'll input to run the command. It's a string[], so you can add multiple command names.
* `description: {
	  content: '',
	  usage: '',
	  examples: []
   }` - So, in content, you're gonna want to put what the command does. In usage, you're gonna enter any arguments needed. If you're not using args, just make it
   		the command's name; and in examples, you're gonna enter examples of how the command is used (duh), and make sure you include all aliases. Then that's that.
* `ratelimit` - How many times you can do the command in a short time without making the bot stop working for you for a second.
#### Optional variables
* `args: [
	 {
	 	id: '',
		type: '',
		match: '',
		default:
	 }
  ]` - In id, you're gonna put in what you're gonna refer to the argument as later in your code. In type, you're gonna enter the type of the argument.
  	   Refer to [ArgumentType in the docs](https://discord-akairo.github.io/#/docs/main/master/typedef/ArgumentType) for more info on that. Next, with match, you wanna
	   input the method to match arguments from text. Refer to [ArgumentMatch in the docs](https://discord-akairo.github.io/#/docs/main/master/typedef/ArgumentMatch) for more info on that.
	   And in default, enter what's gonna happen if the user doesn't input args. This is optional btw. Enter some parameters if you need them.
#### Example command
```ts
import { Command } from 'discord-akairo';
import { Message } from 'discord.js';

export default class Say extends Command {
	constructor() {
		super('say', {
			aliases: ['say'],
			description: {
				content: 'Make bot repeat whatever you input',
				usage: 'say <text>'
				examples: [
					'say Hello, World!'
				]
			},
			ratelimit: 3,
			args: [
				{
					id: 'text',
					type: 'string',
					match: 'rest'
				}
			]
		});
	}
	
	public exec(message: Message, { text }: { text: string }) {
		message.delete();
		message.util.send(text); // oh yeah btw you use message.util.send, not message.channel.send
	}
}
```
## Creating issues
### Format
Command syntax
What the command does
Why should this be added
Examples

#### Command syntax
Show me what the valid command syntax looks like by entering the command name, followed by any arguments the command needs.
An example of this would be:
"!say text"
Don't surround your arguments with <>, because markdown is weird and just deletes anything inside of those.

#### What the command does
Make sure your description of what the command does is at least somewhat detailed.
An example of this would be:
"The user can input whatever they want after !say, and then the bot will delete the message when the command is executed and repeats what the user inputted in another message."

#### Why should this be added
Tell me what purpose your issue serves. Why is it a good addition to the bot? Is it useful (if it's a fun command ignore this)?
An example of this would be:
"This command serves the purpose of funny screenshots. It is a good addition to the bot because if someone is bored and wants to laugh, they can make the bot say funny stuff and entertain them. It's not useful, but that's fine because this is a fun command."

#### Examples
If your issue isn't about adding a new command, you can probably ignore this.
Else, add some text (or images) demonstrating how this command works in practice.
An example of this would be:
"Example of the say command:
!say Hello, World!
Command message gets deleted.
Bot: Hello, World!". Once that's done, **Congrats! You've just made an issue that I'll consider!**

# Fin
