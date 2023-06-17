import {SlashCommandBuilder} from "@discordjs/builders";
import {EventSymbol, SlashCommandSymbol} from "../utils";
import * as _ from "lodash";

export function GeneralFactory(type: Symbol, options: Record<string, any>) {
	// export function Event(name: string, once: boolean = false): PropertyDecorator {
	return (target, key) => {
		Reflect.defineMetadata(
			'methods',
			_.defaultsDeep(Reflect.getMetadata("methods", target), {
				[key]: {type, ...options}
			}),
			target
		)
	}
	// }
}

export function SlashCommandFactory<B = any>(evaluator: (builder: B) => void) {
	return (target, key) => {
		const metadataStore = Reflect.getMetadata("methods", target)?.[key]
		const metadata = metadataStore?.type ? metadataStore! : {
			type: SlashCommandSymbol,
			builder: new SlashCommandBuilder()
		}

		evaluator(metadata.builder)

		Reflect.defineMetadata(
			'methods',
			_.defaultsDeep(Reflect.getMetadata("methods", target), {
				[key]: metadata
			}),
			target
		)
	}

}