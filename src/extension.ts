import * as vs from "vscode";

import { decorate } from "./decorate";


export function activate(context: vs.ExtensionContext)
{
	console.log("kebab-caser is live!");

  vs.workspace.onDidChangeTextDocument(e => {
    if (!vs.window.activeTextEditor) return;
    if (e.document !== vs.window.activeTextEditor.document) return;

    decorate(vs.window.activeTextEditor);
  });
}

export function deactivate()
{
  console.log("kebab-caser disabled.")
}
