# Changelog

## Unreleased

## 4.0.3 - 2022-05-09

### Changed

-   [Patch] Upgrade dependencies to prepare for Node 16

## 4.0.2 - 2022-04-07

### Changed

-   [Patch] Use Dart Sass instead of Sass for compilation.

## 4.0.1 - 2020-07-14

### Fixed

-   [Patch] Upgrade Thumbprint Tokens to latest version. This pulls in small color tweaks to improve accessibility.

## 4.0.0 - 2019-11-21

### Removed

-   [Major] Remove `.tp-input-wrap`, `.tp-input-wrap--flip`, `.tp-form-fields`, and `.tp-form-field__item` classes. `.tp-input-wrap` is replaced by `.tp-checkbox-wrap` and `.tp-radio-wrap`. (#559)

## 3.1.0 - 2019-11-21

### Added

-   [Minor] Add checkbox and radio wrap classes that will replace `tp-input-wrap`.

### Changed

-   [Minor] Add input placeholder text color code to `input.scss` and `textarea.scss`. These styles are duplicated in `form.scss` but that file will soon be removed. (#559)

## 3.0.0 - 2019-11-20

### Removed

-   [Major] Remove all Block List, Fieldset, Image, and Table CSS classes. This affects `.tp-img`, `.tp-fieldset`, `.tp-block-list*`, and `.tp-table*` classes. (#544)

## 2.0.8 - 2019-10-17

### Changed

-   [Patch] Update version of the Thumbprint Tokens dependency.

## 2.0.7 - 2019-09-17

### Changed

-   [Patch] Upgrade `p-map`, a `devDependency`. This does not affect the outputted code.
-   [Patch] Update version of the Thumbprint Tokens dependency.

## 2.0.6 - 2019-09-03

### Changed

-   [Patch] Upgrade `node-sass-tilde-importer`, a `devDependency`. This does not affect the outputted code.
-   [Patch] Upgrade `fs-extra`, a `devDependency`. This does not affect the outputted code.

## 2.0.5 - 2019-08-21

### Changed

-   [Patch] Update version of the Thumbprint Tokens dependency.

## 2.0.4 - 2019-07-31

### Changed

-   [Patch] Update version of the Thumbprint Tokens dependency.

## 2.0.3 - 2019-07-15

### Changed

-   [Patch] Update version of the Thumbprint Tokens dependency.

## 2.0.2 - 2019-07-01

### Changed

-   [Patch] Update version of the Thumbprint Tokens dependency.

## 2.0.1 - 2019-06-20

### Changed

-   [Patch] Fix border color of disabled `Button` with "caution" theme. (#325)

## 2.0.0 - 2019-06-18

### Changed

-   [Major] Update the "secondary" style of `Button` to the new design. Existing uses of `tp-button--secondary` should be updated to use `tp-button--tertiary`. (#89)

## 1.0.6 - 2019-06-11

### Changed

-   [Patch] Make `Textarea` text black when there is an error but component is focused. (#298)

## 1.0.5 - 2019-06-03

### Changed

-   [Patch] Update version of the Thumbprint Tokens dependency.

## 1.0.4 - 2019-05-28

### Changed

-   [Patch] Update version of the Thumbprint Tokens dependency.

## 1.0.3 - 2019-05-24

### Changed

-   [Patch] Update some token names that were renamed. This doesn't affect the outputted code.

## 1.0.2 - 2019-05-17

### Changed

-   [Patch] Remove references to deprecated tokens.

## 1.0.1 - 2019-05-15

### Changed

-   [Patch] Update version of the Thumbprint Tokens dependency. This doesn't affect the outputted code.

## 1.0.0 - 2019-04-08

### Changed

-   [Patch] Replace `$tp-spacer__unit` in `textarea.scss` with hardcoded pixel value.

### Removed

-   [Major] Remove `function.scss` that contained the `tp-spacer` function which used a unit of `8` to output a pixel value. To upgrade, first replace any instances of `tp-spacer(*)` that have an equivalent [space token](https://thumbprint.design/tokens/scss/#section-space). Then replace any remaining instances with a hardcoded pixel value. For example, `tp-spacer(1)` would be `$tp-space__2`, `tp-spacer(1.5)` would be `12px` as it has no equivalent space token.

## 0.3.1 - 2019-04-02

### Changed

-   [Patch] Update version of dependencies. This doesn't affect the outputted code.

## 0.3.0 - 2019-03-28

### Changed

-   [Patch] Convert all `tp-spacer` instances to `tp-space__*` or hardcoded values. (#159)

### Added

-   [Minor] Add `tertiary` theme that is the same as our `secondary` style. `secondary` will soon be redesigned to have blue text. Consumers should replace `tp-button--secondary` with `tp-button--tertiary` to avoid and visual changes. (#89)

## 0.2.0 - 2019-03-25

### Changed

-   [Patch] Replace deprecated `tp-font__text` tokens with new values. (#171)
-   [Minor] Change `tp-alert--warning` background color to `$tp-color__yellow-200` and text color to `$tp-color__yellow-600` for better readability.

## 0.1.3 - 2019-03-11

### Changed

-   [Patch] Update version of dependencies. This doesn't affect the outputted code.

## 0.1.2 - 2019-02-20

### Changed

-   [Patch] Replaced Sass placeholder and `@extend` with class. (#107)
-   [Patch] Use a red border in the `caution` button focus state. (#116)

### Deprecated

-   [Patch] Indicate that the "wrap snap" class and mixin are deprecated. (#17)

## 0.1.1 - 2019-02-08

### Changed

-   [Patch] Change name of the CSS dist from `css.css` to `components.css`.
-   [Patch] Use tilde imports in Node Sass with `node-sass-tilde-importer`.

## 0.1.0 - 2019-02-07

### Added

-   [Minor] Created package for Thumbprint SCSS. (#38)
