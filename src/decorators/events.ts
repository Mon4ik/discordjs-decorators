import * as _ from "lodash"

import {ContextMenuCommandType, SlashCommandBuilder} from "@discordjs/builders";
import {
	ButtonInteraction,
	ContextMenuCommandBuilder,
	Events, SelectMenuInteraction,
	SlashCommandAttachmentOption, SlashCommandBooleanOption, SlashCommandChannelOption,
	SlashCommandStringOption,
	SlashCommandUserOption,
} from "discord.js";
import {ApplicationCommandType} from "discord-api-types/v10"
import {
	AutocompleteSymbol,
	ButtonSymbol,
	ContextMenuSymbol,
	EventSymbol,
	SelectMenuSymbol,
	SlashCommandSymbol
} from "../utils";
import {SlashCommandFactory} from "./factories";

export type ValueOrValidator<T> = T | ((value: T) => boolean)
export type ValueOrValidatorDiff<T, V> = T | ((value: V) => boolean)
type Builder<T> = (builder: T) => T

export function SlashCommand(builder?: SlashCommandBuilder): any {
	return (target, key) => {
		Reflect.defineMetadata(
			'methods',
			_.defaultsDeep(Reflect.getMetadata("methods", target), {
				[key]: {
					type: SlashCommandSymbol,
					builder: builder ?? new SlashCommandBuilder()
				}
			}),
			target
		)
	}
}

SlashCommand.Name = function (name: string) {
	return SlashCommandFactory<SlashCommandBuilder>((builder) => builder.setName(name))
}

SlashCommand.Description = function (name: string) {
	return SlashCommandFactory<SlashCommandBuilder>((builder) => builder.setDescription(name))
}

SlashCommand.StringOption = function (opt: Builder<SlashCommandStringOption>) {
	return SlashCommandFactory<SlashCommandBuilder>((builder) => builder.addStringOption(opt))
}

SlashCommand.UserOption = function (opt: Builder<SlashCommandUserOption>) {
	return SlashCommandFactory<SlashCommandBuilder>((builder) => builder.addUserOption(opt))
}

SlashCommand.AttachmentOption = function (opt: Builder<SlashCommandAttachmentOption>) {
	return SlashCommandFactory<SlashCommandBuilder>((builder) => builder.addAttachmentOption(opt))
}

SlashCommand.BooleanOption = function (opt: Builder<SlashCommandBooleanOption>) {
	return SlashCommandFactory<SlashCommandBuilder>((builder) => builder.addBooleanOption(opt))
}

SlashCommand.ChannelOption = function (opt: Builder<SlashCommandChannelOption>) {
	return SlashCommandFactory<SlashCommandBuilder>((builder) => builder.addChannelOption(opt))
}


export function ContextMenu(name: string, type: ContextMenuCommandType): PropertyDecorator {
	return (target, key) => {
		Reflect.defineMetadata(
			'methods',
			_.defaultsDeep(Reflect.getMetadata("methods", target), {
				[key]: {
					type: ContextMenuSymbol,
					builder: new ContextMenuCommandBuilder()
						.setName(name)
						.setType(type)
				}
			}),
			target
		)
	}
}

export function Autocomplete(commandName: string): PropertyDecorator {
	return (target, key) => {
		Reflect.defineMetadata(
			'methods',
			_.defaultsDeep(Reflect.getMetadata("methods", target), {
				[key]: {type: AutocompleteSymbol, commandName}
			}),
			target
		)
	}
}

export function Button(customId: ValueOrValidatorDiff<string, ButtonInteraction>): PropertyDecorator {
	return (target, key) => {
		Reflect.defineMetadata(
			'methods',
			_.defaultsDeep(Reflect.getMetadata("methods", target), {
				[key]: {type: ButtonSymbol, customId}
			}),
			target
		)
	}
}

export function SelectMenu(customId: ValueOrValidatorDiff<string, SelectMenuInteraction>): PropertyDecorator {
	return (target, key) => {
		Reflect.defineMetadata(
			'methods',
			_.defaultsDeep(Reflect.getMetadata("methods", target), {
				[key]: {type: SelectMenuSymbol, customId}
			}),
			target
		)
	}
}

export function Event(name: string, once: boolean = false): PropertyDecorator {
	return (target, key) => {
		Reflect.defineMetadata(
			'methods',
			_.defaultsDeep(Reflect.getMetadata("methods", target), {
				[key]: {type: EventSymbol, name, once}
			}),
			target
		)
	}
}

export function Catch<T>(onerror: (error: any, ctx: T) => void) {
	return (target, key) => {
		Reflect.defineMetadata(
			'methods',
			_.defaultsDeep(Reflect.getMetadata("methods", target) ?? {}, {
				[key]: {
					onerror
				}
			}),
			target
		)
	}
}