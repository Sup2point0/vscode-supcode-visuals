type Lookaround = [
  string | null,
  string,
  string | null
];

const COMMENT_STYLES: Record<string, Lookaround> = {
  SLASH: [null, "/", "/"],
  HASH:  [null, "#", null]
};

export const COMMENT_SINGLE: Record<string, Lookaround> = {
  c:       COMMENT_STYLES.SLASH,
  haskell: [null, "-", "-"],
  javascript: COMMENT_STYLES.SLASH,
    typescript: COMMENT_STYLES.SLASH,
  python:  COMMENT_STYLES.HASH,
  ruby:    COMMENT_STYLES.HASH,
  rust:    COMMENT_STYLES.SLASH,
};

export enum Context {
  COMMENT             = 1 << 0,
  STRING_DOUBLE       = 1 << 1,
  STRING_SINGLE       = 1 << 2,
  STRING_DOUBLE_MULTI = 1 << 3,
  STRING_SINGLE_MULTI = 1 << 4,
  FUNCTION            = 1 << 5,
  BLOCK               = 1 << 6,
}

const DISPLAY = {
  [Context.COMMENT]:             "COMMENT",
  [Context.STRING_DOUBLE]:       "STRING-DOUBLE",
  [Context.STRING_SINGLE]:       "STRING-SINGLE",
  [Context.STRING_DOUBLE_MULTI]: "STRING-DOUBLE-MULTI",
  [Context.STRING_SINGLE_MULTI]: "STRING-SINGLE-MULTI",
  [Context.FUNCTION]:            "FUNCTION",
  [Context.BLOCK]:               "BLOCK",
};


export class ContextStack
{
  stack: Context[];

  constructor(...stack: Context[])
  {
    this.stack = stack;
  }

  get current(): Context | undefined {
    return this.stack.at(-1);
  }

  push(ctx: Context)
  {
    this.stack.push(ctx);
  }

  try_pop(ctx: Context): boolean
  {
    if (this.current === ctx) {
      this.stack.pop();
      return true;
    }
    else {
      return false;
    }
  }

  show(): string
  {
    return this.stack.map(ctx => DISPLAY[ctx]).join(" › ");
  }

  is_string(): boolean {
    if (this.current) {
      return (
        this.current & (
            Context.STRING_DOUBLE
          | Context.STRING_DOUBLE_MULTI
          | Context.STRING_SINGLE
          | Context.STRING_SINGLE_MULTI
        )
      ) !== 0
    }
    else {
      return false;
    }
  }
}
