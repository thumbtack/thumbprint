# Changelog

## Unreleased

## 0.7.0 - 2019-05-09

### Added

-   [Minor] Create an `Image` component.

### Fixed

-   [Patch] Call `onOpenFinish` when the modal is immediately open as it is mounted.

## 0.6.0 - 2019-05-01

### Added

-   [Minor] Add `onMonthChange`, `daysThemeDotIndicator`, and `daysThemeStrikeout` props to the `DatePicker` component.

## 0.5.3 - 2019-04-09

### Added

-   [Minor] Add `onMouseOver` prop to the `Button` component. (#209)

## 0.5.2 - 2019-04-08

### Changed

-   [Patch] Fix `ButtonRow` so that it displays the primary call to action on top when the button row is stacked.
-   [Patch] Replace `tpSpacerUnit` with `tpSpace3` to remove dependencies on the deprecated spacer unit.
-   [Patch] Update version of the Thumbprint Tokens dependency.

## 0.5.1 - 2019-04-02

### Fixed

-   [Patch] Revert change that replaces `lazysizes` with internal image component because it was not working well within carousels.

## 0.5.0 - 2019-04-01

### Added

-   [Minor] `ModalDefaultAnimatedWrapper` now has a prop called `shouldPageScrollAboveSmall` that defaults to `true`. If `true`, the modal will be allowed to grow taller than the viewport above `small` breakpoints. If `false`, the modal height will limited by the viewport height at all breakpoints. This is a backwards compatible change since the default value remains the same as the previous behavior.

### Changed

-   [Patch] The `isSticky` prop in `ModalDefaultFooter` will now affect modals at all breakpoints. Previously, only the small breakpoint was affected. (#135)

## 0.4.0 - 2019-03-29

### Added

-   [Minor] `Select`'s `onChange` function now sends the original event as a second argument (#188)
-   [Minor] `Select` now supports `onBlur` and `onFocus` props
-   [Minor] `Textarea` now supports a `name` prop

## 0.3.0 - 2019-03-28

### Added

-   [Minor] Add `BlockList` component. (#70)

### Changed

-   [Patch] Convert all `tp-spacer` instances to `tp-space__*` or hardcoded values. (#159)
-   [Patch] Create internal image component for lazy-loading images. This removes the dependency on `lazysizes`.

## 0.2.6 - 2019-03-26

### Changed

-   [Patch] Move away from `tp-spacer` in `List` component. (#159)

## 0.2.5 - 2019-03-25

### Changed

-   [Patch] Set focus to `ModalCurtain` root instead of the first focusable element within modal (#156)
-   [Patch] Replace deprecated `tp-font__text` tokens with new values. (#171)

## 0.2.4 - 2019-03-11

### Changed

-   [Patch] Update version of dependencies. This doesn't affect the outputted code.

## 0.2.3 - 2019-02-22

### Changed

-   [Patch] `url` prop of `ServiceCard` is now required (#16)

## 0.2.2 - 2019-02-20

### Changed

-   [Patch] Use a red border in the `caution` button focus state. (#116)
-   [Patch] Support all `autocomplete` values in `Input` component. (#113)
-   [Patch] Remove `@default` annotation from JSDoc comments.
-   [Patch] Eliminate the need for the `babel-plugin-inline-react-svg` plugin. This is a behind-the-scenes change.
-   [Patch] Move around icon files for greater consistency and reusability. (#39, #41, #42)

### Fixed

-   [Patch] Fix contents div in ModalDefault with sticky ModalFooter having no height in IE11. (#115)
-   [Patch] Minimize SVGs in the `StarRating`, `ModalStandard`, and `Avatar` components.

## 0.2.1 - 2019-02-08

### Changed

-   [Patch] Fix SCSS imports by adding the file extension at the end of the imports.

## 0.2.0 - 2019-02-07

### Added

-   [Minor] Add `Title` sizes `6`, `7`, and `8`. (#70)

### Changed

-   [Patch] Use `@thumbtack/thumbprint-scss` instead of `@thumbtack/tp-ui-core-mixin` and `@thumbtack/tp-ui-core-function`. This is a behind-the-scenes change that doesn't affect the the output. (#38)

### Fixed

-   [Patch] Add `tpColorGray` to fix disabled state of label. It was not grayed out as expected. (#85)
-   [Patch] Bring back `InputRowContext` context that was accidentally removed during consolidation into one NPM package. (#8)
-   [Patch] Revert regression in `StarRating` that was introduced when running it through SVGO.

## 0.1.4 - 2019-01-30

### Changed

-   [Patch] Minimize SVG used in `StarRating` component.
-   [Patch] Use Apache License 2.0.
-   [Patch] Remove two unnecessary comments disabling eslint rules.
-   [Patch] Remove duplicated `rollup` packages in `package.json`.

## 0.1.3 - 2019-01-25

### Changed

-   [Patch] Update links to GitHub Issues/PRs so that they point to our archived repo.

## 0.1.2 - 2019-01-24

### Changed

-   [Patch] Change comments in source files to point to new documentation URLs. This does not affect consumers of Thumbprint React.
-   [Patch] Move close icon into the repo.

## 0.1.1 - 2019-01-10

### Added

-   [Patch] Move all React component source files into this package.

## 0.1.0 - 2019-01-09

### Added

-   [Minor] Created package for Thumbprint React. (#1050)
