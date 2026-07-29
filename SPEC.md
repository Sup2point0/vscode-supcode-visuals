# Specification

This document describes how supcode visuals *should* work, not how it currently works.


## General

supcode visuals is language-agnostic. Of course, there are many differences between languages; those with exotic syntax like Haskell will inevitably be glitchier. supcode visuals are not recommended for those languages!


## kebab-casify

### Functionality
Transforms `_` underscores in identifiers into `-` hyphens.

The following code:

```ts
function activate_extension(extension_config: ExtensionConfig)
{
  var resolved_config = resolve_config(extension_config, DEFAULT_CONFIG);
}
```

Displays as:

```ts
function activate-extension(extension-config: ExtensionConfig)
{
  var resolved-config = resolve-config(extension-config, DEFAULT-CONFIG);
}
```

### Applies
kebab-casify applies to all lexical identifiers, such as:

- Variables
- Constants
- Functions
- Function parameters
- Class fields

It remains active in comments and documentation (since these often refer to identifiers in the code).

It also applies to:

- Number literals
  - `1_000_000` becomes `1-000-000`

### Ignores
kebab-casify does not apply:

- Inside string literals
  - These contain raw text which should not be modified
- To a lone underscore(s)
  - `var _ =`, `var __ =`, etc. are left untouched
  - An underscore-only variable is a conventional throwaway or wildcard
- To leading underscores
  - `_private_identifier` becomes `_private-identifier`
  - `__mangled_identifier` becomes `__mangled-identifier`
  - The leading underscore is a conventional indication of privacy
- To trailing underscores
  - `_private_method_()` becomes `_private-method_()`
  - `__very_private_method__()` becomes `__very-private-method__()`


## DualShift

> [!Note]
> Half-spaces cannot be rendered in monospace, so take `x=1` to mean `x = 1` with half-spaces.

### Functionality
Transforms spaces around infix operators into half-width spaces.

### Applies
Common targets for DualShift include:

- Function parameters
  - `call(x = 1, y = 2)` becomes `call(x=1, y=2)`
  - `call(x: int = 1)` becomes `call(x: int=1)`
- Operators
  - `x + y` becomes `x+y`
  - `x + y * 2` becomes `x+y*2`

### Ignores
DualShift does not apply:

- To multi-character infix operators
  - `x == y`, `x && y`, `x << y`, etc. are left untouched
- Inside comments
- To `=` used for non-parameter assignment
  - `var x = 1` is left untouched
  - `let { x = 1 } = ...` is left untouched
- At the start of a line
  - The following is left untouched:

```
  x
+ y
+ z
```
