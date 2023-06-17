# DiscordJS Decorators

DiscordJS decorators for better structure

![NPM](https://badgen.net/npm/v/@idkncc/discordjs-decorators)
![NPM](https://badgen.net/npm/dt/@idkncc/discordjs-decorators)

## Installation

1. Install DiscordJS **(not next version!)**
   ```shell
   yarn add discord.js
   ```
2. Install DiscordJS-Decorators
   ```shell
   yarn add @idkncc/discordjs-decorators
   ```
3. Add to `tsconfig.json`
   ```json
   "experimentalDecorators": true
   ```
4. Ready to use

## Simplest Example

```ts
// index.ts
import {EventLoader, importGlob} from "@idkncc/discordjs-decorators";
import {Client, Events} from "discord.js";

require("dotenv").config()

const client = new Client({intents: ["Guilds"]})

client.once(Events.ClientReady, c => {
	console.log(`Bot is ready! Logged in as ${c.user.tag}`)

	new EventLoader()
		// import whole folder
		.add(importGlob("./events/**/*.ts"))

		// constants for command registering
		.env(process.env.NODE_ENV !== "production", process.env.CLIENT_ID, process.env.GUILD_ID)

		// and finally load everything
		.load(client)
})


client.login(process.env.TOKEN)
```

```ts
// /events/event.ts
import {Events} from "discord.js"
import {Event} from "@idkncc/discordjs-decorators"

export class ExampleEventImportedOne {
	// regular event
	@Event(Events.MessageCreate)
	messageCreate(d) {
		console.log("Someone said")
	}

	// register slashcommand
	@SlashCommand.Name("warn")
	@SlashCommand.Description("Warns user")
	@SlashCommand.UserOption((opt) => opt
		.setName("user")
		.setDescription("User, who will get warned")
		.setRequired(true)
	)
	@SlashCommand.StringOption((opt) => opt
		.setName("reason")
		.setDescription("Reason to warn")
	)
	testCommand(test: ChatInputCommandInteraction) {
		// do smth
	}
}
```

Other example you can find in [`example/`](example/) folder

## TODO
- [ ] Validators **(very useful but not now :(  )**
- [ ] More decorators for `@SlashCommand`
- [ ] Middlewares
