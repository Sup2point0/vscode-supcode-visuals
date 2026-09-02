# supcode Visuals for Visual Studio Code

A VSCode extension providing [supcode](https://github.com/Sup2point0/supcode)’s text rendering features.

- *kebab-casify*: Display identifiers as `kebab-case`
- *DualShift*: Display spaces around infix operators as half-width

The changes are *purely visual* – it leaves the underlying source code intact. It just makes the editing experience smoother!

When you interact with a visually modified line, the visual effects vanish, allowing you to still edit the raw source code as normal.


<br>


## Features

### kebab-casify
Imho `kebab-case` is the most readable and efficient casing convention of them all. Why suffer reading `longStringsOfUltraCondensedText` or `ugly_underscores_below_the_baseline` when you revel in the glorious `long-strings-of-easily-readable-text` and `Abstract-Strategy-Factory-Instance-Provider`?

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

*DualShift* takes a compromise between the two by keeping the spaces, but making each of them exactly *half* as wide. This means you still get a small amount of visual separation, while maintaining the monospaced property.


<br>


## FAQ

### Why?
Hey, I have very particular preferences when it comes to editing code ^v^

I made this extension for myself, so ofc I’m not expecting you to agree with my personal preferences!

### Why?
Reading unreadable code makes me uncomfortable, and it takes a lot of fortitude to ignore it.

### Isn't this cursed?
Haha, a little at first. You get used to it. And then it's just wonderful.
