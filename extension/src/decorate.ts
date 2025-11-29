import * as vs from "vscode";


const decorations: Record<string, vs.TextEditorDecorationType> = {
  kebab_case: vs.window.createTextEditorDecorationType({
    before: {
      contentText: "-",
    },
    opacity: "0",
    letterSpacing: "-1em",
  }),
  dual_shift: vs.window.createTextEditorDecorationType({
    /* not sure why this isn't exactly 0.5em, but 0.3 seems to give perfect spacing, sooo... */
    letterSpacing: "-0.3em",
  })
};


export function decorate(editor: vs.TextEditor): void
{
  let selected_lines = new Set(
    editor.selections.flatMap(s => [s.start.line, s.end.line])
  );

  let source = editor.document.getText();
  if (source === "") return;

  let ranges: Record<string, vs.DecorationOptions[]> = {
    kebab_case: [],
    dual_shift: [],
  }

  let i = 0;
  let line_index = 0;
  let char_index = 0;

  let char_prev = undefined;
  let char = undefined;
  let char_next = source.at(0);

  let ctx = [];
  let paren_count = 0;

  while (true)
  {
    char_prev = char;
    char = char_next;
    char_next = source.at(i+1);

    if (char === undefined) break;

    switch (char)
    {
      case "\n":
        line_index++;
        char_index = -1;
        break;
      
      case "_":
        if (
             ctx.at(-1)?.includes("string")
          || selected_lines.has(line_index)
          || char_prev === "_"
          || char_next === "_"
        ) break;

        ranges.kebab_case.push({ range: new vs.Range(
          new vs.Position(line_index, char_index +0),
          new vs.Position(line_index, char_index +1),
        )});
        break;
      
      case "|":
      case "=":
        if (
          selected_lines.has(line_index)
          || ctx.at(-1) !== "function"
          || char_prev !== " "
          || char_next !== " "
        ) break;

        ranges.dual_shift.push({ range: new vs.Range(
          new vs.Position(line_index, char_index -1),
          new vs.Position(line_index, char_index +0),
        )});
        ranges.dual_shift.push({ range: new vs.Range(
          new vs.Position(line_index, char_index +0),
          new vs.Position(line_index, char_index +1),
        )});
        break;
      
      case "(":
        ctx.push("function");
        paren_count++;
        break;
      
      case ")":
        paren_count--;
        ctx.pop();
        break;
      
      case "{":
        ctx.push("block");
        break;

      case "}":
        ctx.pop();
        break;
      
      case '"':
        if (char_prev === "\\") break;

        if (ctx.at(-1) === 'string(")') {
          ctx.pop();
          if (char_prev === '"' && char_next === '"') {
            ctx.push('string(")-long');
          }
        }
        else if (ctx.at(-1) === 'string(")-long') {
          if (char_prev === '"' && char_next === '"') {
            ctx.pop();
          }
        }
        else {
          ctx.push('string(")');
        }
        break;
      
      /* yes, gotta repeat this for alternate string delimiters, separately... */
      case "'":
        if (char_prev === "\\") break;

        if (ctx.at(-1) === "string(')") {
          ctx.pop();
          if (char_prev === "'" && char_next === "'") {
            ctx.push("string(')-long");
          }
        }
        else if (ctx.at(-1) === "string(')-long") {
          if (char_prev === "'" && char_next === "'") {
            ctx.pop();
          }
        }
        else {
          ctx.push("string(')");
        }
        break;
    }

    i++;
    char_index++;
  }

  editor.setDecorations(decorations.kebab_case, ranges.kebab_case);
  editor.setDecorations(decorations.dual_shift, ranges.dual_shift);
}
