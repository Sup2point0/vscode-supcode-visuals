# Changelog


<br>


## v1.3.0

### Fixes
- Use `ch` instead of `em` for DualShift spacing to ensure half-spaces are accurate across fonts
- Improve kebab-casify handling
  - Correctly ignore edge cases like `__dunder__`, `__leading`, `[_enclosed_]`
- Improve DualShift handling
  - Correctly ignore edge cases like `^\t*` for `/** */` documentation comments
- Improve string context handling
  - kebab-casify and DualShift correctly deactivate inside strings


<br>


## v1.2.1

### Fixes
- Disable DualShift at start of lines


## v1.2.0

### New
- Allow configuring which languages to enable extension for
- Allow enabling/disabling extension features

### Fixes
- Visuals are now disabled in comments


<br>


## v1.1.0

### New
- Add DualShift


<br>


## v1.0.0

Initial release!
