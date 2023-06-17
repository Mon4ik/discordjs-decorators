import * as _ from "lodash";

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