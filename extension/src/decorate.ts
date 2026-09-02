import * as vs from "vscode";

import { Ctx, ContextStack } from "./context";
import * as constants from "./constants";
import type { Config, Feature } from "./config";


const decorations: Record<Feature, vs.TextEditorDecorationType> =
{
	kebab_case: vs.window.createTextEditorDecorationType({
		before: { contentText: "-" },
		opacity: "0",
		letterSpacing: "-1ch",
	}),
	dual_shift: vs.window.createTextEditorDecorationType({
		letterSpacing: "-0.5ch",
	}),
};

/**
 * Apply kebab-casify and DualShift to `editor`.
 */
export function decorate(editor: vs.TextEditor, lang: string, config: Config): void
{
	let source = editor.document.getText();
	if (source === "") return;
	
	let selected_lines = new Set(
		editor.selections.flatMap(s => [s.start.line, s.end.line])
	);

	let ranges = find_ranges(source, selected_lines, lang, config);

	for (let key of Object.keys(decorations)) {
		editor.setDecorations(decorations[key as Feature], ranges[key as Feature]);
	}
}

/**
 * Find the (start, stop) ranges in `source` to apply supcode visuals, leaving `ignored_lines` untouched.
 */
export function find_ranges(
	source: string,
	ignored_lines: Set<number>,
	lang: string,
	config: Config,
): {
	kebab_case: vs.Range[],
	dual_shift: vs.Range[],
}
{
	const comment_single = constants.COMMENT_SINGLE[lang] ?? [null, null, null];

	let ranges: Record<Feature, vs.Range[]> = {
		kebab_case: [],
		dual_shift: [],
	}

	let ctx = new ContextStack();

	/* NOTE: DualShift uses this to avoid applying at the start of a line */
	let current_line_started = false;

	let idx_line = 0;
	let idx_char = 0;

	for (let i = 0; i < source.length - 1; i++)
	{
		let char_prev = source.at(i - 1);
		let char      = source.at(i);
		let char_next = source.at(i + 1);

		if (char === "\n") {
			idx_line++;
			idx_char = 0;
			current_line_started = false;
			ctx.force_pop(Ctx.COMMENT);
			continue;
		}
		
		if (ctx.top === Ctx.COMMENT) continue;

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
			
			// kebab-casify
			case "_":
				if (
						!config.features.kebab_case
					|| ctx.is_string()
					|| ignored_lines.has(idx_line)
				) break;

				if (
						/[a-zA-Z0-9]/.test(char_prev ?? "")
					&& /[a-zA-Z0-9]/.test(char_next ?? "")
				)
				{
					ranges.kebab_case.push(new vs.Range(
						new vs.Position(idx_line, idx_char + 0),
						new vs.Position(idx_line, idx_char + 1),
					));
				}
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
					|| !current_line_started
					|| ignored_lines.has(idx_line)
					|| char_prev !== " "
					|| char_next !== " "
				) break;

				ranges.dual_shift.push(new vs.Range(
					new vs.Position(idx_line, idx_char - 1),
					new vs.Position(idx_line, idx_char + 0),
				));
				ranges.dual_shift.push(new vs.Range(
					new vs.Position(idx_line, idx_char + 0),
					new vs.Position(idx_line, idx_char + 1),
				));
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
						ctx.push(Ctx.STRING_2_MULTI);
					}
				}
				else if (ctx.top === Ctx.STRING_2_MULTI) {
					if (char_prev === '"' && char_next === '"') {
						ctx.try_pop(Ctx.STRING_2_MULTI);
					}
				}
				else {
					ctx.push(Ctx.STRING_DOUBLE);
				}
				break;
			
			/* yes, gotta repeat this for alternate string delimiters, separately... */
			case "'":
				if (char_prev === "\\") break;

				if (ctx.try_pop(Ctx.STRING_1)) {
					if (char_prev === "'" && char_next === "'") {
						ctx.push(Ctx.STRING_1_MULTI);
					}
				}
				else if (ctx.top === Ctx.STRING_1_MULTI) {
					if (char_prev === "'" && char_next === "'") {
						ctx.try_pop(Ctx.STRING_1_MULTI);
					}
				}
				else {
					ctx.push(Ctx.STRING_1);
				}
				break;
		}

		if (!/\s/.test(char ?? "")) {
			current_line_started = true;
		}

		idx_char++;
	}

	return ranges;
}
