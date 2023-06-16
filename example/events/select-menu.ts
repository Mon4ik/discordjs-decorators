import {SlashCommand, SelectMenu} from "../..";
import {
	ActionRowBuilder,
	ChatInputCommandInteraction,
	SelectMenuBuilder, SelectMenuInteraction,
	SelectMenuOptionBuilder,
	StringSelectMenuBuilder, StringSelectMenuOptionBuilder
} from "discord.js";

export class SelectMenuHandling {
	@SlashCommand.Name("selectmenu")
	@SlashCommand.Description("Sends select menu")
	async selectMenuCommand(interaction: ChatInputCommandInteraction) {
		const selectMenu = new StringSelectMenuBuilder()
			.setCustomId("select-menu")
			.setPlaceholder("Placeholder")
			.addOptions(
				new StringSelectMenuOptionBuilder()
					.setLabel("Default option")
					.setValue("default1")
					.setDefault(true),

				new StringSelectMenuOptionBuilder()
					.setLabel("w/ description")
					.setDescription("Simple description for that option")
					.setValue("default2"),

				new StringSelectMenuOptionBuilder()
					.setLabel("Just option")
					.setValue("default3"),

				new StringSelectMenuOptionBuilder()
					.setLabel("Beans")
					.setValue("beans")
			)

		const row = new ActionRowBuilder<SelectMenuBuilder>()
			.addComponents(selectMenu)

		await interaction.reply({
			content: "Hello world!",
			components: [row]
		})
	}

	@SelectMenu("select-menu")
	async onSelectMenu(interaction: SelectMenuInteraction) {
		await interaction.reply({
			content: interaction.values[0].startsWith("default") ? "Default output" : "beans",
			ephemeral: true
		})
	}
}