# Changelog


<br>


## v1.4.1

### Fixes
- Small fixes in extension metadata


## v1.4

### New
- *Unspace* feature to strip spaces between function calls and parentheses
  - This displays `func_call ()` as `func_call()`, but leaves `if ()`, `while ()`, etc. untouched.
  - This feature is **disabled by default** – opt in by enabling `supcodeVisuals.features.unspace`.


<br>


## v1.3.4

### New
- Handle escapes inside strings
  - `'don\'t do it'` terminates correctly after `it`, not `don\`


## v1.3.3

### New
- Handle JS/TS `` `template strings` ``


## v1.3.2

### Fixes
- Skip adding end-of-file debug decoration unless file ends in newline


## v1.3.1

### Fixes
- Make string contexts mutually exclusive
  - This means stuff like `"don't"` no longer corrupts the context


## v1.3

### New
- Improve DualShift handling
  - Correctly ignore edge cases like `^\t*` for `/** */` documentation comments
- Improve string context handling
  - kebab-casify and DualShift correctly deactivate inside strings

### Fixes
- Use `ch` instead of `em` for DualShift spacing to ensure half-spaces are accurate across fonts
- Improve kebab-casify handling
  - Correctly ignore edge cases like `__dunder__`, `__leading`, `[_enclosed_]`


<br>


## v1.2.1

### Fixes
- Disable DualShift at start of lines


## v1.2

### New
- Allow configuring which languages to enable extension for
- Allow enabling/disabling extension features

### Fixes
- Visuals are now disabled in comments


<br>


## v1.1

### New
- Add DualShift


<br>


## v1.0

Initial release!
