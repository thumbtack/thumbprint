# Changelog

## Unreleased

## 12.5.0 - 2020-05-01

### Fixed

-   [Minor] Add `isReadOnly` prop to `TextArea`. (#681)

## 12.4.0 - 2020-03-23

### Changed

-   [Patch] Rewrite `ModalCurtain` component in TypeScript.
-   [Patch] Add types to some `useState` calls in a few components.

### Added

-   [Minor] Add iconRight prop to `Button` and `ThemedLink`.

## 12.3.0 - 2020-03-16

### Added

-   [Minor] Add React component of `FAB`.

### Changed

-   [Patch] Rewrite `Modal` component in TypeScript.

## 12.2.1 - 2020-03-02

### Changed

-   [Patch] Tweak color of `muted` `LoaderDots` to use `black-300`. (#643)

### Fixed

-   [Patch] Fix `AlertBanner` component to horizontally center items.

## 12.2.0 - 2020-01-22

### Added

-   [Minor] Add `AlertBanner` component in React (Typescript).

### Changed

-   [Patch] Reorganize `Calendar` component files so the types display correctly in docs. (#586)

### Deprecated

-   [Patch] Deprecate usage of `BannerAlert` component.

## 12.1.2 - 2020-01-22

### Fixed

-   [Patch] Re-write ref handling in `Image` component so it works with a change in `react-intersection-observer@8.24.1`.

## 12.1.1 - 2020-01-18

### Changed

-   [Patch] Rewrite `HorizontalRule` component in TypeScript.
-   [Patch] Rewrite `Pill` component in TypeScript.
-   [Patch] Rewrite `InputRow` component in TypeScript.
-   [Patch] Rewrite `Link` component in TypeScript.

## 12.1.0 - 2020-01-09

### Changed

-   [Patch] Change some JSDoc annotations to please Gatsby
-   [Patch] Refactored `StarRating` to output less HTML, add accessibility.
-   [Patch] Change the formatting in the `package.json` field.
-   [Patch] Replace existing duration and easing values for SCSS/JS tokens in `Modal`.

### Added

-   [Minor] Add opacity fade-in using duration token in `Tooltip`.

## 12.0.0 - 2019-12-17

### Fixed

-   [Patch] Remove the `ClearButton` alias for `TextInputClearButton` from the `TextInput` source file. It was not accessible to consumers since our `index.ts` entrypoint doesn't export it. (#573)

### Removed

-   [Major] Remove `DatePicker`, `Select`, `ModalDefault`, `ModalDefaultHeader`, `ModalDefaultTitle`, `ModalDefaultDescription`, `ModalDefaultContent`, `ModalDefaultContentFullBleed`, `ModalDefaultFooter`, `ModalDefaultAnimatedWrapper`, `Textarea`, `Input`, `InputIcon`, and `InputClearButton` components. These have all been renamed and continue to exist under the new names. (#566)

## 11.1.1 - 2019-12-13

### Fixed

-   [Patch] The `Checkbox` HTML will no longer include the `value` attribute if the value prop is `undefined`. (#589)

### Changed

-   [Patch] Rename a few directories in our source files. This doesn't affect consumers. (#566)

## 11.1.0 - 2019-12-05

### Added

-   [Minor] Export a `TextArea` component that is an alias for `Textarea`. (#566)
-   [Minor] Export `Modal*` components that are aliases for `ModalDefault*`. (#566)
-   [Minor] Export a `TextInput` component that is an alias for `Input`. (#566)
-   [Minor] Export a `Dropdown` component that is an alias for `Select`. (#566)
-   [Minor] Export a `Calendar` component that is an alias for `DatePicker`. (#566)

## 11.0.2 - 2019-11-21

### Changed

-   [Patch] Update version of the Thumbprint SCSS dependency.

## 11.0.1 - 2019-11-21

### Changed

-   [Patch] Update version of the Thumbprint SCSS dependency.

## 11.0.0 - 2019-11-20

### Removed

-   [Major] Remove `BlockList`, `ProgressBar`, and `ProgressBarBase` components. (#544)

## 10.1.1 - 2019-11-11

### Changed

-   [Patch] Rewrite `Button` component in TypeScript.
-   [Patch] Rewrite `UIAction` component in TypeScript.
-   [Patch] Rewrite internal utility function and components in TypeScript.

## 10.1.0 - 2019-11-06

### Changed

-   [Patch] Convert `Radio` component to TypeScript.

### Fixed

-   [Patch] Update Type syntax for `Image` and `ServiceCardImage` to fix missing API docs.

### Added

-   [Minor] Create `Alert` component in React (TypeScript).
-   [Minor] Add `ref` support to `Input` component. (#492)

## 10.0.1 - 2019-10-21

### Fixed

-   [Patch] Adjust `Input` padding when `innerLeft` or `innerRight` exist to prevent overlap and provide better spacing. Reverting previous change to `z-index`. (#498)
-   [Patch] Change z-index of icon container on `Input` to prevent overlap when input background has a color. (#498)

## 10.0.0 - 2019-10-17

### Changed

-   [Patch] Rewrite `Label` component in TypeScript.
-   [Patch] Convert `Input` component to TypeScript.
-   [Major] Change type of `maxLength` attribute of `Input` from `string` to `number`.

## 9.7.1 - 2019-10-17

### Changed

-   [Patch] Convert `Input` component to a function component with Hooks.
-   [Patch] Update version of the Thumbprint Tokens dependency.

## 9.7.0 - 2019-10-16

### Added

-   [Minor] Add `value` to `Checkbox` component. (#501)

## 9.6.0 - 2019-10-16

### Added

-   [Minor] Add `isRequired` to `Radio` component.
-   [Minor] Add `isRequired` to `Checkbox` component.

### Fixed

-   [Patch] Add `line-height` to `Pill` to ensure alignment, prevent external value inheritance. (#494)
-   [Patch] Enable `size` prop to properly pass through a `number` to the `Image` height. (#486)

### Changed

-   [Patch] Rewrite `Checkbox` component in TypeScript.
-   [Patch] Rewrite `Textarea` component in TypeScript.

## 9.5.6 - 2019-10-09

### Changed

-   [Patch] Rewrite `Popover` component in TypeScript.
-   [Patch] Rewrite `Select` component in TypeScript.

## 9.5.5 - 2019-10-09

### Changed

-   [Patch] Rewrite `ServiceCard` component in TypeScript.

## 9.5.4 - 2019-10-07

### Changed

-   [Patch] Rewrite `Carousel` component in TypeScript.
-   [Patch] Rewrite `DatePicker` component in TypeScript.

## 9.5.3 - 2019-10-03

### Changed

-   [Patch] Rewrite `StarRating` component in TypeScript.
-   [Patch] Rewrite `Text` and `Title` components in TypeScript.
-   [Patch] Rewrite `Image` component in TypeScript.
-   [Patch] Rewrite `Wrap` component in TypeScript.

## 9.5.2 - 2019-09-27

### Changed

-   [Patch] Rewrite `Avatar` component in TypeScript.
-   [Patch] Add TS declarations for main entry point (`index.ts`) so consumers of this library can access component type definitions.

## 9.5.1 - 2019-09-25

### Changed

-   [Patch] Rewrite `FormNote` component in TypeScript.
-   [Patch] Rewrite `Grid` and `GridColumn` components in TypeScript.
-   [Patch] Rewrite `LoaderDots` component in TypeScript.
-   [Patch] Rewrite `Tooltip` component in TypeScript.

## 9.5.0 - 2019-09-24

### Added

-   [Minor] Add `onKeyPress` prop to input.

## 9.4.1 - 2019-09-24

### Changed

-   [Patch] Rewrite `ButtonRow` component in TypeScript.

### Fixed

-   [Patch] Replace slow `scrollparent` NPM package with faster script. (#416)

## 9.4.0 - 2019-09-18

### Added

-   [Minor] Add `iconRight` prop to `Link`. (#436)

## 9.3.0 - 2019-09-17

### Added

-   [Minor] Add `iconRight` prop to `TextButton`. (#436)

## 9.2.0 - 2019-09-05

### Added

-   [Minor] Add `heightAboveSmall` to `ModalDefault` and `ModalDefaultAnimatedWrapper`. (#433)

### Changed

-   [Patch] Fix bottom padding in `ModalDefault` for Firefox and Edge (#376)

## 9.1.2 - 2019-09-03

### Changed

-   [Patch] Code formatting tweaks due to Prettier version bump.

## 9.1.1 - 2019-08-23

### Fixed

-   [Patch] Prevent noscript image when `forceEarlyRender` prop is used.

## 9.1.0 - 2019-08-22

### Added

-   [Minor] Add `forceEarlyRender` prop to `Image` to disable the default lazy-loading behavior and override the `sizes` attribute. (#426)

### Fixed

-   [Patch] Fixed missing `Unreleased` header in CHANGELOG.

## 9.0.3 - 2019-08-21

### Changed

-   [Patch] Update version of the Thumbprint Tokens dependency.

## 9.0.2 - 2019-08-19

### Changed

-   [Patch] Fix a bug in `BaseCarousel` caused by previous refactor. (#427)

## 9.0.1 - 2019-08-13

### Changed

-   [Patch] Refactor `BaseCarousel` to be a SFC with Hooks.

## 9.0.0 - 2019-08-13

### Added

-   [Minor] Update `DatePicker` to accept a `month` prop to control the active month.

### Changed

-   [Major] Make the `onMonthChanged` prop from `DatePicker` required.

### Fixed

-   [Patch] Update `react-day-picker` dependency to 7.3.2. (#150)

## 8.0.1 - 2019-08-08

### Fixed

-   [Patch] Fix bug in `Carousel` where transition animation was not working.

## 8.0.0 - 2019-08-08

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
