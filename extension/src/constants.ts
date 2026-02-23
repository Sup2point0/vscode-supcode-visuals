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
