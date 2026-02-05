import * as vs from "vscode";

import { decorate } from "./decorate";


const CONFIG_NAME            = "supcodeVisuals"
const CONFIG_FEAT_KEBAB_CASE = "features.kebab-Casify";
const CONFIG_FEAT_DUAL_SHIFT = "features.dualShift";
const CONFIG_LANGS_ENABLED   = "languages.enabled";
const CONFIG_LANGS_IGNORED   = "languages.ignored";

let CONFIG = update_config();


export interface Config
{
  langs: {
    enabled: string[];
    ignored: string[];
  };
  features: {
    kebab_case: boolean;
    dual_shift: boolean;
  };
}


export function activate(ctx: vs.ExtensionContext)
{
	console.log("supcode visuals are live!");

  vs.window.onDidChangeTextEditorSelection(e => {
    let editor = vs.window.activeTextEditor;
    let langs  = CONFIG.langs;

    if (editor) {
      let lang = editor.document.languageId;
      console.log("langs.enabled =", langs.enabled);
      console.log("langs.ignored =", langs.ignored);

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
    if (
        e.affectsConfiguration(`${CONFIG_NAME}.features`)
      || e.affectsConfiguration(`${CONFIG_NAME}.languages`)
    ) {
      CONFIG = update_config();
    }
  });
}

export function deactivate()
{
  console.log("supcode visuals now disabled.");
}


function update_config(): Config
{
  let config = vs.workspace.getConfiguration(CONFIG_NAME);
  console.log("config =", config);

  return {
    langs: {
      enabled: config.get(CONFIG_LANGS_ENABLED) ?? ["default"],
      ignored: config.get(CONFIG_LANGS_IGNORED) ?? ["default"],
    },
    features: {
      kebab_case: config.get(CONFIG_FEAT_KEBAB_CASE) ?? true,
      dual_shift: config.get(CONFIG_FEAT_DUAL_SHIFT) ?? true,
    }
  };
}
