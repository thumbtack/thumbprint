---
title: Breakpoints
description: Variables for visual consistency across platforms.
---

Responsive design enables layouts that render well at any device width. Designers do this by providing layouts representing a component's state at different widths. Developers do this by using media queries, commonly with predefined breakpoints in Sass.

## Designing

In Thumbprint we have three breakpoints. Since designers can only provide static designs, each layout should be built to represent what the expected layout should be between the breakpoints, not at the breakpoint.

**Note:** In rare cases a layout will need to change at a breakpoint other than three provided. Add them with caution and provide comments explaining why they are needed.

## Implementing breakpoints in code

Thumbprint provides Sass mixins that produce the needed code. In each of these examples we are using breakpoint variables, however custom pixel widths are valid if needed. Because we are "small-first" (aka "mobile-first"), styles will often be grouped as follows:

```scss
.my-item {
    // styles for the "small" range at the root
    @include tp-respond-above($tp-breakpoint__small) {
        // styles above "small"
    }
    @include tp-respond-above($tp-breakpoint__medium) {
        // styles above "medium"
    }
    @include tp-respond-above($tp-breakpoint__large) {
        // styles above "large"
    }
}
```

Mixins are also provided to group code below a width&hellip;

```scss
@include tp-respond-below($tp-breakpoint__medium) {
    // styles below "medium"
}
```

&hellip;and between a range:

```scss
@include tp-respond-between($tp-breakpoint__small, $tp-breakpoint__medium) {
    // only above "small" and below "medium"
}
```
