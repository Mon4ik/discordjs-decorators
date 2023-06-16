import "reflect-metadata"

import {SlashCommandBuilder} from "@discordjs/builders";
import {ContextMenuCommandBuilder, Events} from "discord.js";

export function loadEvents() {

}

export * from "./decorators/events"
export { EventLoader } from "./EventLoader"
export { importGlob } from "./importGlob"
