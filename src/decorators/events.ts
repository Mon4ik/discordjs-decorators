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
import {GeneralFactory, SlashCommandFactory} from "./factories";

export type ValueOrValidator<T> = T | ((value: T) => boolean)
export type ValueOrValidatorDiff<T, V> = T | ((value: V) => boolean)
type Builder<T> = (builder: T) => T


export const SlashCommand = (builder: SlashCommandBuilder) => GeneralFactory(AutocompleteSymbol, {builder})

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

// other decorators:

export const ContextMenu = (name: string, type: ContextMenuCommandType) => GeneralFactory(ContextMenuSymbol, {
	builder: new ContextMenuCommandBuilder()
		.setName(name)
		.setType(type)
})
export const Autocomplete = (commandName: string) => GeneralFactory(AutocompleteSymbol, {commandName})
export const Button = (customId: ValueOrValidatorDiff<string, ButtonInteraction>) => GeneralFactory(ButtonSymbol, {customId})

export const SelectMenu = (customId: ValueOrValidatorDiff<string, SelectMenuInteraction>) => GeneralFactory(SelectMenuSymbol, {customId})
export const Event = (name: string, once: boolean = false) => GeneralFactory(EventSymbol, {name, once})