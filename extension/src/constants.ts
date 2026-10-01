type Lookaround = [
	string | null,
	string,
	string | null
];
interface OpenClose {
	open: Lookaround
	close: Lookaround
}

export const COMMENT_SINGLE_STYLES: Record<string, Lookaround> = {
	SLASH: [null, "/", "/"],
	HASH:  [null, "#", null],
};
export const COMMENT_MULTI_STYLES: Record<string, OpenClose> = {
	STAR: { open: [null, "/", "*"], close: [null, "*", "/"] },
};

export const COMMENT_SINGLE: Record<string, Lookaround> = {
	c:          COMMENT_SINGLE_STYLES.SLASH,
	cpp:        COMMENT_SINGLE_STYLES.SLASH,
	csharp:     COMMENT_SINGLE_STYLES.SLASH,
	css:        COMMENT_SINGLE_STYLES.SLASH,
	haskell:    [null, "-", "-"],
	ignore:     COMMENT_SINGLE_STYLES.HASH,
	javascript: COMMENT_SINGLE_STYLES.SLASH,
	typescript: COMMENT_SINGLE_STYLES.SLASH,
	python:     COMMENT_SINGLE_STYLES.HASH,
	ruby:       COMMENT_SINGLE_STYLES.HASH,
	rust:       COMMENT_SINGLE_STYLES.SLASH,
	scss:       COMMENT_SINGLE_STYLES.SLASH,
	yaml:       COMMENT_SINGLE_STYLES.HASH,
};
export const COMMENT_MULTI: Record<string, OpenClose> = {
	c:          COMMENT_MULTI_STYLES.STAR,
	javascript: COMMENT_MULTI_STYLES.STAR,
	typescript: COMMENT_MULTI_STYLES.STAR,
};

export const KEYWORDS = [
	"do",
	"for",
	"if",
	"switch",
	"while",
];
export const KEYWORD_LOOKBEHIND = Math.max(...KEYWORDS.map(keyword => keyword.length));
