import * as vs from "vscode";

import { Ctx as Ctx, ContextStack } from "./context";
import * as constants from "./constants";
import type { Config } from "./config";


const decorations: Record<string, vs.TextEditorDecorationType> =
{
	kebab_case: vs.window.createTextEditorDecorationType({
		before: { contentText: "-" },
		opacity: "0",
		letterSpacing: "-1em",
	}),
	dual_shift: vs.window.createTextEditorDecorationType({
		/* not sure why this isn't exactly 0.5em, but 0.3 seems to give perfect spacing, sooo... */
		letterSpacing: "-0.3em",
	}),
};

/**
 * Apply kebab-casify and DualShift to `editor`.
 */
export function decorate(editor: vs.TextEditor, lang: string, config: Config): void
{
	let source = editor.document.getText();
	if (source === "") return;

	const comment_single = constants.COMMENT_SINGLE[lang] ?? [null, null];
	
	let selected_lines = new Set(
		editor.selections.flatMap(s => [s.start.line, s.end.line])
	);

	let ranges: Record<string, vs.DecorationOptions[]> = {
		kebab_case: [],
		dual_shift: [],
	}

	let i        = 0;
	let line_idx = 0;
	let char_idx = 0;

	let char_prev = undefined;
	let char      = undefined;
	let char_next = source.at(0);

	let ctx = new ContextStack();

	while (char_next !== undefined)
	{
		char_prev = char;
		char      = char_next;
		char_next = source.at(i+1);

		if (char === "\n") {
			line_idx++;
			char_idx = -1;
			ctx.try_pop(Ctx.COMMENT);
			ctx.try_pop(Ctx.DEACTIVATE_DUALSHIFT);
		}
		else if (ctx.top !== Ctx.COMMENT) {
			switch (char)
			{
				case comment_single[1]:
					let [prev, _, next] = comment_single;

					if (
							 (prev !== null && char_prev !== prev)
						|| (next !== null && char_next !== next)
					) break;

					ctx.push(Ctx.COMMENT);
					break;

				case " ":
					if (ctx.top === Ctx.DEACTIVATE_DUALSHIFT) break;
					if (
							char_prev === " " && char_next === " "
						|| char_prev === "\n"
					) {
						ctx.push(Ctx.DEACTIVATE_DUALSHIFT);
					}
					break;
				
				// kebab-casify
				case "_":
					if (
						!config.features.kebab_case
						|| ctx.is_string()
						|| selected_lines.has(line_idx)
						|| char_prev === "."
						|| char_prev === "_" || char_next === "_"
						|| char_prev === " " || char_next === " "
						|| char_prev === "(" || char_next === ")"
						|| char_prev === ")" || char_next === "("
					) break;

					ranges.kebab_case.push({
						range: new vs.Range(
							new vs.Position(line_idx, char_idx + 0),
							new vs.Position(line_idx, char_idx + 1),
						)
					});
					break;
				
				// DualShift
				case "=": if (ctx.top !== Ctx.FUNCTION) break;
				case "+":
				case "-":
				case "*":
				case "/":
				case "^":
					if (
						!config.features.dual_shift
						|| ctx.top === Ctx.DEACTIVATE_DUALSHIFT
						|| selected_lines.has(line_idx)
						|| char_prev !== " "
						|| char_next !== " "
					) break;

					ranges.dual_shift.push({
						range: new vs.Range(
							new vs.Position(line_idx, char_idx - 1),
							new vs.Position(line_idx, char_idx + 0),
						)
					});
					ranges.dual_shift.push({
						range: new vs.Range(
							new vs.Position(line_idx, char_idx + 0),
							new vs.Position(line_idx, char_idx + 1),
						)
					});
					break;
				
				// context tracking
				case "(": ctx.push(Ctx.FUNCTION);    break;
				case ")": ctx.try_pop(Ctx.FUNCTION); break;
				
				case "{": ctx.push(Ctx.BLOCK);    break;
				case "}": ctx.try_pop(Ctx.BLOCK); break;

				// string contexts
				case '"':
					if (char_prev === "\\") break;

					if (ctx.try_pop(Ctx.STRING_DOUBLE)) {
						if (char_prev === '"' && char_next === '"') {
							ctx.push(Ctx.STRING_DOUBLE_MULTI);
						}
					}
					else if (ctx.top === Ctx.STRING_DOUBLE_MULTI) {
						if (char_prev === '"' && char_next === '"') {
							ctx.try_pop(Ctx.STRING_DOUBLE_MULTI);
						}
					}
					else {
						ctx.push(Ctx.STRING_DOUBLE);
					}
					break;
				
				/* yes, gotta repeat this for alternate string delimiters, separately... */
				case "'":
					if (char_prev === "\\") break;

					if (ctx.try_pop(Ctx.STRING_SINGLE)) {
						if (char_prev === "'" && char_next === "'") {
							ctx.push(Ctx.STRING_SINGLE_MULTI);
						}
					}
					else if (ctx.top === Ctx.STRING_SINGLE_MULTI) {
						if (char_prev === "'" && char_next === "'") {
							ctx.try_pop(Ctx.STRING_SINGLE_MULTI);
						}
					}
					else {
						ctx.push(Ctx.STRING_SINGLE);
					}
					break;
			}

			if (char !== " ") {
				ctx.try_pop(Ctx.DEACTIVATE_DUALSHIFT);
			}
		}

		i++;
		char_idx++;
	}

	for (let key of Object.keys(decorations)) {
		editor.setDecorations(decorations[key], ranges[key]);
	}
}
