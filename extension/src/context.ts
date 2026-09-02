export enum Ctx {
	DEACTIVATE_DUALSHIFT = "DEACTIVATE-DUALSHIFT",
	COMMENT              = "COMMENT",
	STRING_DOUBLE        = "STRING-DOUBLE",
	STRING_SINGLE        = "STRING-SINGLE",
	STRING_DOUBLE_MULTI  = "STRING-DOUBLE-MULTI",
	STRING_SINGLE_MULTI  = "STRING-SINGLE-MULTI",
	FUNCTION             = "FUNCTION",
	BLOCK                = "BLOCK",
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
		return this.#stack.join(" › ");
	}

	is_string(): boolean
	{
		let ctx = this.top;
		if (ctx == undefined) return false;
		
		return (
				ctx === Ctx.STRING_DOUBLE
			|| ctx === Ctx.STRING_DOUBLE_MULTI
			|| ctx === Ctx.STRING_SINGLE
			|| ctx === Ctx.STRING_SINGLE_MULTI
		);
	}
}
