# supcode Visuals for VSCode

supcode’s syntactic features for other languages.

- *kebab-casify*: Display identifiers as `kebab-case`
- *DualShift*: Display spaces around infix operators as half-width spaces

These changes are *purely visual*, leaving the underlying source code intact. It just makes the reading experience smoother!

When you interact with a visually modified line, the visual effects vanish, allowing you to still edit the raw source code as usual.


<br>


## Features

### kebab-casify
Imho `kebab-case` is the most readable and efficient casing convention of them all. Why suffer reading `longStringsOfUltraCondensedText` or `ugly_underscores_below_the_baseline` when you could revel in the glorious `easily-readable-text` and `Abstract-Strategy-Factory-Instance-Provider`?

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


<br>


## Extension Settings

- `supcodeVisuals.features.kebab-Casify`: Enable/disable kebab-casify.
- `supcodeVisuals.features.dualShift`: Enable/disable DualShift.
- `supcodeVisuals.languages.enabled`: Opt-in to enable supcode visuals for only these languages.
- `supcodeVisuals.languages.ignored`: Opt-out to disable supcode visuals for these languages.

`.enabled` is applied first if provided, then `.ignored`.
