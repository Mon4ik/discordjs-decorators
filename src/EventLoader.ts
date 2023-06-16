import "core-js/es/array/at"

import {
	AutocompleteSymbol,
	ButtonSymbol,
	ContextMenuSymbol,
	EventSymbol,
	isFunction, SelectMenuSymbol,
	SlashCommandSymbol
} from "./utils";

import {Client, Events, Interaction, Routes} from "discord.js";
import {RESTPostAPIChatInputApplicationCommandsJSONBody} from "discord-api-types/v10";


export class EventLoader {
	private events: any[] = []
	private creds: any = undefined
	private isDev = false

	private info = console.info


	add(event_s: any[] | any) {
		const events = Array.isArray(event_s) ? event_s : [event_s]
		this.events.push(...events)

		return this
	}

	env(isDev: boolean, clientId: string, guildId: string) {
		this.isDev = isDev
		this.creds = {clientId, guildId}

		return this
	}

	infoFunction(func: (message: string) => void) {
		this.info = func

		return this
	}

	async load(client: Client) {
		if (!this.creds) {
			console.error("Credentials not presented. Use env(isDev: boolean, clientId: string, guildId: string) method!")
			process.exit(1)
			return
		}

		console.log(this.events)
		let events = await Promise.all(this.events)

		events = events.map((e) => {
			if (typeof e === "object") {
				return Object.entries(e).at(-1)[1]
			} else {
				return e
			}
		})

		const commands = []

		// loading
		for (const Event of events) {
			const event = new Event()

			for (const [methodName, metadata] of Object.entries<any>(Reflect.getMetadata("methods", event))) {
				switch (metadata.type) {
					case SlashCommandSymbol:
						commands.push(metadata.builder.toJSON())
						client.on(Events.InteractionCreate, this.catchingWrap((interaction: Interaction) => {
							if (!interaction.isChatInputCommand()) return
							if (interaction.commandName !== metadata.builder.name) return

							event[methodName](interaction)
						}, metadata))
						break
					case ContextMenuSymbol:
						client.on(Events.InteractionCreate, this.catchingWrap((interaction: Interaction) => {
							if (!interaction.isContextMenuCommand()) return
							if (interaction.commandName !== metadata.builder.name) return

							event[methodName](interaction)
						}, metadata))
						break
					case AutocompleteSymbol:
						client.on(Events.InteractionCreate, this.catchingWrap((interaction: Interaction) => {
							if (!interaction.isAutocomplete()) return
							if (interaction.commandName !== metadata.commandName) return

							event[methodName](interaction)
						}, metadata))
						break
					case ButtonSymbol:
						client.on(Events.InteractionCreate, this.catchingWrap((interaction: Interaction) => {
							if (!interaction.isButton()) return
							if (interaction.customId !== metadata.customId) return

							event[methodName](interaction)
						}, metadata))
						break
					case SelectMenuSymbol:
						client.on(Events.InteractionCreate, this.catchingWrap((interaction: Interaction) => {
							if (!interaction.isAnySelectMenu()) return;
							if (interaction.customId !== metadata.customId) return

							event[methodName](interaction)
						}, metadata))
						break
					case EventSymbol:
						if (metadata.once)
							client.once(metadata.name, this.catchingWrap(event[methodName], metadata))
						else
							client.on(metadata.name, this.catchingWrap(event[methodName], metadata))
						break
				}
			}
		}

		this.info(`${events.length} events loaded.`)
		await this.deployCommands(client, commands)
		this.info(`${commands.length} commands deployed${this.isDev ? ' to guild (DEV)' : ' to application (PROD)'}.`)
	}

	deployCommands(client: Client, commands: RESTPostAPIChatInputApplicationCommandsJSONBody[]) {
		commands = commands
			.map((b) => Object.assign(
				b,
				{
					options: b.options.reverse()
				}
			))

		if (this.isDev)
			return client.rest.put(
				Routes.applicationGuildCommands(this.creds.clientId, this.creds.guildId),
				{body: commands}
			)
		else
			return client.rest.put(
				Routes.applicationCommands(this.creds.clientId),
				{body: commands}
			)
	}

	catchingWrap(func: (...args) => any, metadata: any): any {
		return (...args) => {
			try {
				return func(...args)
			} catch (e) {
				if (metadata?.onerror)
					metadata?.onerror(e, ...args)
				else
					console.error(e)
			}
		}
	}

}