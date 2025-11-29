# supcode Visuals for Visual Studio Code

A VSCode extension providing [supcode](https://github.com/Sup2point0/supcode)’s text rendering features.

- Display all identifiers as `kebab-case` (while leaving source code intact)
- *DualShift*


<br>


## Features

### kebab-casify
Imho `kebab-case` is the most readable and efficient casing convention of them all. Why suffer reading `longStringsOf UltraCondensedText` or `identifiers_with no_separation`.

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


## Why?

I made this extension for myself, so ofc I’m not expecting you to agree with my personal preferences!
