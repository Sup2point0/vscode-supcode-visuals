type Lookaround = [
	string | null,
	string,
	string | null
];

export const COMMENT_STYLES: Record<string, Lookaround> = {
	SLASH: [null, "/", "/"],
	HASH:  [null, "#", null]
};

export const COMMENT_SINGLE: Record<string, Lookaround> = {
	c:          COMMENT_STYLES.SLASH,
	cpp:        COMMENT_STYLES.SLASH,
	csharp:     COMMENT_STYLES.SLASH,
	css:        COMMENT_STYLES.SLASH,
	haskell:    [null, "-", "-"],
	ignore:     COMMENT_STYLES.HASH,
	javascript: COMMENT_STYLES.SLASH,
	typescript: COMMENT_STYLES.SLASH,
	python:     COMMENT_STYLES.HASH,
	ruby:       COMMENT_STYLES.HASH,
	rust:       COMMENT_STYLES.SLASH,
	scss:       COMMENT_STYLES.SLASH,
	yaml:       COMMENT_STYLES.HASH,
};
