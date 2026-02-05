import * as vs from "vscode";


const CONFIG_NAME            = "supcodeVisuals"
const CONFIG_FEAT_KEBAB_CASE = "features.kebab-Casify";
const CONFIG_FEAT_DUAL_SHIFT = "features.dualShift";
const CONFIG_LANGS_ENABLED   = "languages.enabled";
const CONFIG_LANGS_IGNORED   = "languages.ignored";


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


export function update_config(): Config
{
  let config = vs.workspace.getConfiguration(CONFIG_NAME);

  return {
    langs: {
      enabled: config.get(CONFIG_LANGS_ENABLED) ?? [],
      ignored: config.get(CONFIG_LANGS_IGNORED) ?? ["default"],
    },
    features: {
      kebab_case: config.get(CONFIG_FEAT_KEBAB_CASE) ?? true,
      dual_shift: config.get(CONFIG_FEAT_DUAL_SHIFT) ?? true,
    }
  };
}


export function affects_config(e: vs.ConfigurationChangeEvent): boolean
{
  return (
    e.affectsConfiguration(`${CONFIG_NAME}.features`)
    || e.affectsConfiguration(`${CONFIG_NAME}.languages`)
  );
}
