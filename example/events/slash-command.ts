import {SlashCommand} from "../..";
import {
	ChatInputCommandInteraction,
	ButtonStyle,
} from "discord.js";

export class ExampleEvent {
	// @SlashCommand in multiple lines
	@SlashCommand.Name("hello")
	@SlashCommand.Description("Sends hello world")
	@SlashCommand.StringOption((opt) =>
		opt
			.setName("additional-payload")
			.setDescription("Additional payload at the end")
	)
	async testCommand(interaction: ChatInputCommandInteraction) {
		await interaction.reply({
			content: `Hello world! ${interaction.options.getString("additional-payload")}`
		})
	}

	// Or pass builder to @SlashCommand
	// @SlashCommand(new SlashCommandBuilder()
	// 	.setName("secondcommand")
	// 	.setDescription("Sends pong"))
}