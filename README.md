# supcode Visuals for Visual Studio Code

<div align="center">

[Changelog](CHANGELOG.md)&ensp;·&ensp;[Spec](SPEC.md)&ensp;·&ensp;[Marketplace](https://marketplace.visualstudio.com/items?itemName=sup2point0.vscode-supcode-visuals)

</div>

A VSCode extension that renders your source code more nicely, in line with [supcode](https://github.com/Sup2point0/supcode).

- *kebab-casify*: Display `snake_case` identifiers as `kebab-case`
- *DualShift*: Display spaces around infix operators as half-width spaces
- *Unspace*: Display `func_call ()` as `func_call()` for legacy codebases

These changes are *purely visual*, so the underlying source code is left completely intact. All it does is make the reading experience smoother!

When you interact with a visually modified line the visual effects will vanish, allowing you to still edit the raw source code as usual.[^unspace]

[^unspace]: Except for *Unspace*, because you probably aren’t touching the legacy source code so don’t care about what the raw text is.


<br>


## Features

### kebab-casify
Imho `kebab-case` is the most readable and efficient casing convention of them all. Why suffer reading `longStringsOfUltraCondensedText` or `ugly_underscores_below_the_baseline` when you could revel in the glorious `easily-readable-text` and `Abstract-Strategy-Factory-Instance-Provider`?

*kebab-casify* displays all your `snake_case` identifiers as `kebab-case`.

> I know it’s weird. Trust me, you get used to it, and it’s amazing.

### DualShift
In Python the convention is to not include spaces around `=` in keyword arguments to functions:

```py
def func(arg, kwarg=None, jwarg=False):
    pass
```

I personally find this extremely ugly. But guess what, if you add type hints, then all of a sudden spaces are a great idea again!

```py
def func(arg, kwarg: str = None, jwarg: bool = False):
    pass
```

That inconsistency kills me. It’s even worse if you only annotate some of the parameters; then you get a mix...

```py
def func(arg, kwarg: str = None, jwarg=False):
    pass
```

*DualShift* takes a compromise between the two by keeping the spaces, but making each of them exactly *half* as wide. This means you still get a small amount of helpful visual separation. And since 2 half-spaces make a full space, your text stays monospaced.

### Unspace
You might encounter ugly code written like this when working with legacy codebases:

```c
void func () {}

func ();
```

*Unspace* hides the space in your editor, so you see normie code:

```c
void func() {}

func()
```

It will also correctly ignore keyword constructs; these are left alone:

```c
while (cond1) {
    if (cond2) {}
}
```


<br>


## Extension Settings

- `supcodeVisuals.features.kebab-Casify`: Enable/disable *kebab-casify*.
- `supcodeVisuals.features.dualShift`: Enable/disable *DualShift*.
- `supcodeVisuals.features.unspace`: Enable/disable *Unspace*.
- `supcodeVisuals.languages.enabled`: Opt-in to enable supcode visuals for only these languages.
- `supcodeVisuals.languages.ignored`: Opt-out to disable supcode visuals for these languages.

`.enabled` is applied first if provided, then `.ignored`.


<br>


## FAQ

### Why?
I have very particular preferences when it comes to editing code ^v^

### Why?
Reading unreadable code makes me uncomfortable, and it takes a lot of mental fortitude to ignore it.

I made this extension for myself, so ofc I’m not expecting you to agree with my personal preferences!

### Isn't this cursed?
Haha, just a little, at first. Then you get used to it, and it's just wonderful!

Why not give it a shot and see for yourself? ;)

### What languages are supported?
supcode Visuals aims to be language-agnostic, since identifiers and operators tend to be broadly similar across languages.

It works best with languages like Python, TypeScript, Rust since they have very ‘basic’ syntax; for funkier languages like Haskell it might break down.

### The visuals broke after a certain point in the file!
The extension uses a quick-and-dirty naive parser to track contexts in the code, so that the visuals aren’t applied in places like string literals.

This context tracking isn’t perfect, so sometimes a (usually string) context will never be terminated, hence locking all the visuals.

I’m always working to make the context tracking more reliable. I know currently `/* */` comments and `'lifetimes` aren’t handled properly!


<br>
