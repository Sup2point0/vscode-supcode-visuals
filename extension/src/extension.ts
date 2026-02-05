import * as vs from "vscode";

import { decorate } from "./decorate";
import { update_config, affects_config } from "./config";


let CONFIG = update_config();


export function activate(ctx: vs.ExtensionContext)
{
	console.log("supcode visuals are live!");

  vs.window.onDidChangeTextEditorSelection(e => {
    let editor = vs.window.activeTextEditor;
    let langs  = CONFIG.langs;

    if (editor) {
      let lang = editor.document.languageId;

      if (langs.enabled.at(0) !== undefined) {
        if (!langs.enabled.includes(lang)) {
          return;
        }
      }

      if (langs.ignored.includes(lang)) {
        return;
      }

      decorate(editor, CONFIG);
    }
  });

  vs.workspace.onDidChangeConfiguration(e => {
    if (affects_config(e)) {
      CONFIG = update_config();
    }
  });
}

export function deactivate()
{
  console.log("supcode visuals now disabled.");
}
