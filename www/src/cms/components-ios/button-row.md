---
title: Button Row
description: Consistent spacing between buttons.
---
## Summary

`ButtonRow` should be used to display two `Buttons` side-by-side. The `ButtonRow` should fill the readable content width of the screen, and its distribution should be used to define the layout of the buttons within it.

### Distribution

A `ButtonRow`’s distribution determines both the size and position of its buttons. `ButtonRow.Distribution` is an enum with three cases:

#### Equal

Left & right buttons each use 50% of the total space.

![Button row with equal distribution](/img/equal 3.57.45 PM.png)

#### Emphasis

Left button is given enough space to fit its content, and right button takes up the remaining space.

![Button row with emphasis distribution](/img/emphasis 3.57.45 PM.png)

#### Minimal

Left & right buttons are each given enough space to fit their content, but with the additional restriction that the right button never be smaller than the left button.

![Button row with minimal distribution](/img/minimal 3.57.45 PM.png)

## Public API

#### `public init(leftButton: Button, rightButton: Button, distribution: Button.Distribution = .emphasis)`

Creates and returns a new button row with the specified buttons and distribution.

#### `public let leftButton: Button`

Button to be shown on the left, should typically have either a secondary or tertiary button style.

#### `public let rightButton: Button`

Button to be shown on the right, should typically have primary button style.

#### `public var distribution: Button.Distribution`

Enum specifying how the buttons should be distributed along the horizontal axis.
