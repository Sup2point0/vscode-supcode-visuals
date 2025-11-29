import * as vs from "vscode";


const decoration = vs.window.createTextEditorDecorationType({
  before: {
    contentText: "-",
  },
  opacity: "0",
  letterSpacing: "-1em",
});


export function decorate(editor: vs.TextEditor): void
{
  let source = editor.document.getText();
  let ranges: vs.DecorationOptions[] = [];



  for (let [i, line] of source.split("\n").entries())
  {
    let chars = line.split("");

    let indices =
      chars
      .map((c, i) => c === "_" ? i : null)
      .filter(i => i !== null);
    
    for (let idx of indices)
    {
      ranges.push(
        {
          range: new vs.Range(
            new vs.Position(i, idx),
            new vs.Position(i, idx +1),
          )
        }
      );
    }
  }

  editor.setDecorations(decoration, ranges);
}
