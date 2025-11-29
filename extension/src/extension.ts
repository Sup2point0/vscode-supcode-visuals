import * as vs from "vscode";

import { decorate } from "./decorate";


export function activate(ctx: vs.ExtensionContext)
{
	console.log("kebab-caser is live!");

  vs.window.onDidChangeTextEditorSelection(e => {
    if (vs.window.activeTextEditor) {
      decorate(vs.window.activeTextEditor);
    }
  });
}

export function deactivate()
{
  console.log("kebab-caser disabled.");
}
