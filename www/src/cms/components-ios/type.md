---
title: Type
description: Styles for header and body text.
---
## Summary

`Font` contains constants for `UIFont` instances of each Thumbprint text style, as well as font variants and helper functions for use with Dynamic Type (see Accessibility below).

## Accessibility

Thumbprint supports both static fonts and Dynamic Type–the iOS feature that enables users to choose their preferred text/content size. To get a `UIFont` instance that will respect the user’s preferred content size, use one of the `Font.dynamic(Text/Title)*` constants or the `dynamicFont` property on a `Font.TextStyle`. If you will be using this font instance with an `NSAttributedString`, use the `scaledFont(compatibleWith:)` function on `Font.TextStyle` instead (otherwise the text size won’t scale as expected).

## Public API

### `Font`

`public static let title1: UIFont`
Static font with title 1 style.

`public static let title2: UIFont`
Static font with title 2 style.

`public static let title3: UIFont`
Static font with title 3 style.

`public static let title4: UIFont`
Static font with title 4 style.

`public static let title5: UIFont`
Static font with title 5 style.

`public static let title6: UIFont`
Static font with title 6 style.

`public static let title7: UIFont`
Static font with title 7 style.

`public static let title8: UIFont`
Static font with title 8 style.

`public static let text1: UIFont`
Static font with text 1 style.

`public static let text2: UIFont`
Static font with text 2 style.

`public static let text3: UIFont`
Static font with text 3 style.

`public static let dynamicTitle1: UIFont`
Font with title 1 style that supports scaling for accessibility.

`public static let dynamicTitle2: UIFont`
Font with title 2 style that supports scaling for accessibility.

`public static let dynamicTitle3: UIFont`
Font with title 3 style that supports scaling for accessibility.

`public static let dynamicTitle4: UIFont`
Font with title 4 style that supports scaling for accessibility.

`public static let dynamicTitle5: UIFont`
Font with title 5 style that supports scaling for accessibility.

`public static let dynamicTitle6: UIFont`
Font with title 6 style that supports scaling for accessibility.

`public static let dynamicTitle7: UIFont`
Font with title 7 style that supports scaling for accessibility.

`public static let dynamicTitle8: UIFont`
Font with title 8 style that supports scaling for accessibility.

`public static let dynamicText1: UIFont`
Font with text 1 style that supports scaling for accessibility.

`public static let dynamicText2: UIFont`
Font with text 2 style that supports scaling for accessibility.

`public static let dynamicText3: UIFont`
Font with text 3 style that supports scaling for accessibility.

`public static var traitCollectionOverrideForTesting: UITraitCollection?`
Used by snapshot tests to forcefully apply the given trait collection. Do not use in application code.

`static func loadCustomFonts()`
Prepare fonts for use.

`static func scaledValue(_ value: CGFloat, for style: TextStyle) -> CGFloat`
Scale a floating point value by the same multiplier that is currently being used for Dynamic Type on the specific text style.

### `Font.TextStyle` enum

`case title1, title2, title3, title4, title5, title6, title7, title8, text1, text2, text3`
Enum cases for each Thumbprint text style.

`public var font: UIFont`
Static font with this text style.

`public var dynamicFont: UIFont`
Font with this text style that supports scaling for accessibility.

`public func scaledFont(compatibleWith traitCollection: UITraitCollection) -> UIFont`
Font with this text style that supports scaling for accessibility and is configured with a specific trait collection.
When using attributed strings, UIContentSizeCategoryAdusting.adjustsFontForContentSizeCategory does not work, and therefore fonts must be configured with a specific trait collection and updated any time the preferred content size category on the relevant view changes.
