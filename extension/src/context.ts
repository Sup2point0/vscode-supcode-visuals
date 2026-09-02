export enum Ctx {
	COMMENT        = "Comment",
	STRING_DOUBLE  = `"String"`,
	STRING_1       = `'String'`,
	STRING_2_MULTI = `"""String"""`,
	STRING_1_MULTI = `'''String'''`,
	FUNCTION       = "Function()",
	BLOCK          = "Block",
}


export class ContextStack
{
	#stack: Ctx[];

	constructor(...stack: Ctx[])
	{
		this.#stack = stack;
	}

	get top(): Ctx | undefined {
		return this.#stack.at(-1);
	}

	push(ctx: Ctx)
	{
		this.#stack.push(ctx);
	}

	/** Pop `ctx` if it is the currently active context, returning `true` if so. */
	try_pop(ctx: Ctx): boolean
	{
		if (this.top === ctx) {
			this.#stack.pop();
			return true;
		} else {
			return false;
		}
	}

	/** If `ctx` is in the context stack, backtrack until it is popped, returning `true` if so. */
	force_pop(ctx: Ctx): boolean
	{
		let idx = this.#stack.lastIndexOf(ctx);
		if (idx === -1) return false;

		this.#stack.splice(idx);
		return true;
	}

	/** Pop `ctx` if it is the current context, else push it onto the stack. */
	pop_or_push(ctx: Ctx): void
	{
		this.try_pop(ctx) || this.push(ctx);
	}

	show(): string
	{
		return this.#stack.map(ctx => `\`${ctx}\``).join(" › ");
	}

	is_string(): boolean
	{
		let ctx = this.top;
		if (ctx == undefined) return false;
		
		return (
				ctx === Ctx.STRING_DOUBLE
			|| ctx === Ctx.STRING_2_MULTI
			|| ctx === Ctx.STRING_1
			|| ctx === Ctx.STRING_1_MULTI
		);
	}
}
