# supcode Visuals for Visual Studio Code

A VSCode extension providing [supcode](https://github.com/Sup2point0/supcode)’s text rendering features.

- *kebab-casify*: Display `snake_case` identifiers as `kebab-case`
- *DualShift*: Display spaces around infix operators as half-width spaces
- *Unspace*: Display `func_call ()` as `func_call()` for legacy codebases

These changes are *purely visual*, leaving the underlying source code intact. It just makes the reading experience smoother!

When you interact with a visually modified line, the visual effects vanish, allowing you to still edit the raw source code as usual.[^unspace]

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

*DualShift* takes a compromise between the two by keeping the spaces, but making each of them exactly *half* as wide. This means you still get a small amount of visual separation, while maintaining monospaced text.

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
