---
title: Icon Button
description: Icon-only button used to perform actions.
---
## Summary

`IconButton` should be used for interactive elements which do not contain text like a usual `Button`.

## Accessibility

Icon buttons are required to have a non-empty accessibility label to ensure that VoiceOver and the Large Content Viewer can provide users with a helpful description of their purpose.

`UIAccessibilityTraits.button` is added to all icon buttons. Additionally, `UIAccessibilityTraits.selected` / `UIAccessibilityTraits.notEnabled` are added when the button is in the selected or disabled state, respectively.

In iOS 13.0+, icon buttons support the Large Content Viewer–users who set one a large text sizes for accessibility can long press on an icon button to see a HUD with the icon button's icon enlarged as well as a label with the button's accessibility label. No action is required to enable this functionality–it is added automatically.

As with all Thumbprint controls, icon buttons will always have a minimum tap target of 48x48 points, independent of the button's frame. This does not affect the visual layout of the button–it purely affects the size of the area around the button that captures touches.

## Public API

### Theme struct

#### `public let tintColor: UIColor`

Default tint color for button's icon.

#### `public let activeTintColor: UIColor`

Tint color for button's icon in highlighted and selected states.

#### `public let disabledTintColor: UIColor`

Tint color for button's icon in disabled state.

#### `public init(tintColor: UIColor, activeTintColor: UIColor, disabledTintColor: UIColor)`

Creates and returns a custom theme.

#### `public static let default: IconButton.Theme`

Default theme for use on a light background.

#### `public static let dark: IconButton.Theme`

Theme for use on a dark background.

### IconButton

#### `public private(set) var icon: UIImage`

Icon to be displayed. To set this property, use `setIcon(_:accessibilityLabel:theme:)`.

#### `public private(set) var theme: Theme`

Icon button's theme. To set this property, use `setIcon(_:accessibilityLabel:theme:)`.

#### `public var contentEdgeInsets: UIEdgeInsets`

Set padding around the icon.

#### `public func setIcon(_ icon: UIImage, accessibilityLabel: String, theme: IconButton.Theme = .default)`

Update the icon, accessibility label, and/or theme of this button. The accessibility label must not be an empty string.

#### `public init(icon: UIImage, accessibilityLabel: String, theme: IconButton.Theme = .default)`

Creates and returns an icon button with the specified icon, accessibility label, and theme. The accessibility label must not be an empty string.
