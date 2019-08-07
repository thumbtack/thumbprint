# Changelog

## Unreleased

### Fixed

-   [Major] Update `DatePicker` props validation to be more stringent. It now throws a JavaScript error for any provided `value`s that collide with the `disabledDays`, whether `before` or `after`. Previously only `before` was checked, and only when it was before the current day. For consumers who are not passing in erroneous input, these new checks will have no effect, but it may reveal existing bugs and so all consumers should be tested manually when upgrading.
-   [Patch] Restore border color of focused `Radio` input.
-   [Patch] Refactor `Carousel` component to be a SFC with Hooks.

## 7.1.0 - 2019-07-31

### Changed

-   [Minor] Add new `HorizontalRule` react component.

### Fixed

-   [Patch] Fix border colour of focused `Select` in an error state.

## 7.0.1 - 2019-07-16

### Fixed

-   [Patch] Fix bug in `DatePicker` where string dates were parsed in UTC instead of local timezone.

## 7.0.0 - 2019-07-15

### Changed

-   [Major] Rewrite `DatePicker` to be a fully controlled component. (#12)

## 6.4.2 - 2019-07-15

### Fixed

-   [Patch] Revert Datepicker breaking change that was accidentally released in 6.4.1

## 6.4.1 - 2019-07-15

### Fixed

-   [Patch] Fix bug in `use-focus-trap` that caused it to refocus every render. (#366)

## 6.4.0 - 2019-07-09

### Changed

-   [Patch] Update `ConditionalPortal` to explicitly allow and handle null contents. (#357)
-   [Patch] Update description of Avatar prop.
-   [Minor] Remove fade-in from `Image`. (#368)

## 6.3.2 - 2019-07-01

### Changed

-   [Patch] Update version of the Thumbprint Tokens dependency.

## 6.3.1 - 2019-07-01

### Added

-   [Patch] Create new hook for registering an ESC listener.
-   [Patch] Create new hook for trapping focus.
-   [Patch] Create new utility component for conditionally using portals.

### Changed

-   [Patch] Refactor ModalCurtain to be a function component and use hooks.
-   [Patch] Refactor Tooltip to use the new hooks.
-   [Patch] Refactor Popover to use the new hooks.
-   [Patch] Refactor Tooltip to be a functional component and update its tests.

### Fixed

-   [Patch] Add `muted` theme to tertiary `Button` loading state to match the button's text color. (#352)

## 6.3.0 - 2019-06-26

### Changed

-   [Patch] Simplify `<noscript>` output in `Image` component by removing `<picture>` and `srcSet` and using only `<img alt="..." src="..." />`.

### Added

-   [Minor] Add the new `Popover` component.

## 6.2.1 - 2019-06-24

### Changed

-   [Patch] Revert lazy load threshold in `Image` component from `400px` to `100px`. The larger value loads more images than desired on mobile.

## 6.2.0 - 2019-06-20

### Changed

-   [Patch] Increased lazy load threshold in `Image` component from `100px` to `400px` to bring it more in line with the default of lazy loading libraries like [lazysizes](https://github.com/aFarkas/lazysizes#js-api).

### Added

-   [Minor] Make `ServiceCardImage`, `UserAvatar`, and `EntityAvatar` forward a ref to `Image`. (#324)
-   [Minor] Add `onError` function to `Image` component so broken image icon is properly displayed.

## 6.1.0 - 2019-06-18

### Changed

-   [Patch] Use `Image` component within `Avatar`. (#69)

### Added

-   [Patch] `Image` now uses `overflow:hidden` to prevent incorrect image height prior to loading due to `alt` text. (#239)
-   [Minor] Add support for `isOnline` prop to `EntityAvatar`. (#25)
-   [Minor] Enable avatar badges at extra small size. (#318)

## 6.0.0 - 2019-06-17

### Changed

-   [Major] Only include `object-fit` CSS in `Image` when `height` is provided. That CSS was previously being added when the `containerAspectRatio` was present. `containerAspectRatio` now only adds placeholder spacing on the `<img>` which is removed `onload`.
-   [Major] Remove CSS that enforced aspect ratio in `ServiceCardImage` due to changes in `Image` component that no longer support this use case.
-   [Major] `ServiceCardImage` requires an image in the 8:5 aspect ratio to render correctly.
-   [Patch] Simplify `Image` component by remove placeholder `div` and CSS positing so the component behaves more predictably. Fixes double download bug in Edge 18.
-   [Minor] `ServiceCardImage` prop `src` added to replace `src`.
-   [Patch] `ServiceCardImage` prop `url` deprecated.

## 5.0.0 - 2019-06-13

### Removed

-   [Major] Remove `Avatar` alias for the `UserAvatar` component. Use the [`avatar-import-name` codemod](https://github.com/thumbtack/thumbprint/tree/master/packages/thumbprint-codemods/src/avatar-import-name) to migrate. (#25)

### Fixed

-   [Patch] Remove unused CSS from `ServiceCardImage`.

## 4.0.1 - 2019-06-13

### Fixed

-   [Patch] Fix incorrect PropTypes for Avatar component.

## 4.0.0 - 2019-06-12

### Added

-   [Minor] Allow custom pixel values in avatar size prop. (#25)

### Removed

-   [Major] Remove `hasUnreadNotifications` prop from `UserAvatar`. (#25)

### Changed

-   [Major] Update dimensions of `EntityAvatar` and `UserAvatar` at all sizes. (#25)

## 3.1.2 - 2019-06-11

### Fixed

-   [Patch] Make `Input` and `Textarea` placeholder red when in error mode. (#216)
-   [Patch] Fix `DatePicker` multi-selection bug in IE 11.
-   [Patch] Make `Textarea` text black when there is an error but component is focused. (#298)

## 3.1.1 - 2019-06-07

### Fixed

-   [Patch] Fix `Image` component in IE 11.

## 3.1.0 - 2019-06-06

### Added

-   [Minor] Add a new named export called `UserAvatar` that refers to the same component as the old `Avatar`. This is the preferred name going forward. The default `Avatar` export will be removed in a future breaking change. (#25)

## 3.0.0 - 2019-06-06

### Added

-   [Major] Add new `secondary` theme `Button` and `ThemedLink` style. This style now has blue text. Consumers should replace old `theme="secondary"` with `theme="tertiary"` to avoid and visual changes. (#89)
-   [Minor] Export a new component `ModalDefaultContentFullBleed` that allows full-bleed content for the `ModalDefault`. (#194)

### Changed

-   [Patch] Use `Image` component instead of lazysizes in `ServiceCardImage`.

## 2.2.0 - 2019-06-05

### Added

-   [Minor] Add `checkboxVerticalAlign` prop to `Checkbox` and `radioVerticalAlign` prop to `Radio` (#266)
-   [Minor] Add `tertiary` theme that is the same as our `secondary` style. `secondary` will soon be redesigned to have blue text. Consumers should replace `theme="secondary"` with `theme="tertiary"` to avoid and visual changes. (#89)

### Changed

-   [Patch] Add small delay before showing tooltip after hovering to prevent flickering. (#158)
-   [Patch] Redesign the avatar with initials design to use dynamic colours. (#25)

### Fixed

-   [Patch] Add `1px` min-height to the Image component root element to improve lazy-loading.

## 2.1.0 - 2019-06-04

### Added

-   [Minor] Add `onClick` prop to `ServiceCard`.
-   [Minor] Add `shouldOpenInNewTab` prop to `ServiceCard`.

### Changed

-   [Patch] Refactor the internals of the `Image` component.

## 2.0.0 - 2019-06-03

### Changed

-   [Major] Update `DatePicker` component design.
-   [Patch] Update version of the Thumbprint Tokens dependency.

## 1.0.0 - 2019-05-28

### Added

-   [Minor] Add quick fade in transition to the `Image` component. (#243)
-   [Minor] Add Pill component (#251)

### Changed

-   [Major] Remove `disableLazyLoading` prop from `Image` component (#257).

## 0.7.3 - 2019-05-24

### Changed

-   [Patch] Update some token names that were renamed. This doesn't affect the outputted code.

### Fixed

-   [Patch] Update dot centering on `DatePicker` component to work better at all breakpoints. (#244)

## 0.7.2 - 2019-05-17

### Changed

-   [Patch] Remove references to deprecated tokens.

## 0.7.1 - 2019-05-15

### Changed

-   [Patch] Update version of the Thumbprint Tokens dependency. This doesn't affect the outputted code.

### Fixed

-   [Patch] Support `width` classes and inline styles in the `Image` component. (#238)

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
