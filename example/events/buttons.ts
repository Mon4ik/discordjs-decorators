import {Button, SlashCommand} from "../..";
import {
	ActionRowBuilder,
	ButtonBuilder, ButtonInteraction,
	ButtonStyle,
	ChatInputCommandInteraction,
	SlashCommandBuilder
} from "discord.js";

export class Buttons {
	@SlashCommand.Name("buttons")
	@SlashCommand.Description("Sends pong")
	async testCommand2(interaction: ChatInputCommandInteraction) {
		const button = new ButtonBuilder()
			.setCustomId("testButton")
			.setLabel("Button makes test")
			.setStyle(ButtonStyle.Primary)

		const actionRow = new ActionRowBuilder<ButtonBuilder>()
			.addComponents(button)

		await interaction.reply({
			content: "pong",
			ephemeral: true,
			components: [actionRow]
		})
	}

	// Button handling
	@Button("testButton")
	async testButton(interaction: ButtonInteraction) {
		await interaction.reply({
			content: "test",
			ephemeral: true
		})
	}
}