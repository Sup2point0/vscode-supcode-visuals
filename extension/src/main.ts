import * as vs from "vscode";

import { decorate } from "./decorate";
import { update_config, affects_config } from "./config";


let CONFIG = update_config();


export function activate(ctx: vs.ExtensionContext)
{
	console.log("supcode visuals are live!");

	vs.window.onDidChangeTextEditorSelection(fire);

	vs.workspace.onDidChangeConfiguration(e => {
		if (affects_config(e)) {
			CONFIG = update_config();
			fire();
		}
	});
}

function fire()
{
	let editor = vs.window.activeTextEditor;
	if (editor == undefined) return;

	let langs = CONFIG.langs;
	let lang = editor.document.languageId;

	if (langs.enabled.length > 0) {
		if (!langs.enabled.includes(lang)) {
			return;
		}
	}

	if (langs.ignored.includes(lang)) {
		return;
	}

	decorate(editor, lang, CONFIG);
}


export function deactivate()
{
	console.log("supcode visuals now disabled.");
}
