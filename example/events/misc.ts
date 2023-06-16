import {SlashCommand, SelectMenu, Catch} from "../..";
import {ChatInputCommandInteraction} from "discord.js";

export class SomeMisc {
	// Tip: These classes will be created **only once**


	// Error catching
	@SlashCommand.Name("error-command")
	@SlashCommand.Description("Throws error")
	@Catch(async (err, interaction: ChatInputCommandInteraction) => {
		await interaction.reply({content: "we got error :(", ephemeral: true})
		// doing smth with error
	})
	errorCommand(interaction: ChatInputCommandInteraction) {
		throw Error("Some awful error")
	}
}