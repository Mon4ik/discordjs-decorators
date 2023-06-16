import {globSync} from "glob"
import * as path from "path";

export function importGlob(pattern: string) {
	return globSync(path.join(path.dirname(require.main.filename), pattern)).map((fn) => import(fn))
}