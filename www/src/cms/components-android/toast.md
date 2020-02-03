---
title: Toast
description: A message displayed for a short time at the base of the screen
---
Toasts are short messages displayed fleetingly (3-5 seconds) at screen base, with an optional associated action.

![Toast ](/img/Screen Shot 2019-12-10 at 8.30.23 AM.png "Toast")

Toasts are configured in code, using a builder-style construction.

```
ThumbprintToast()
    .withContainer(container)
    .withMessage("it's a fine day")
    .withAction("agree") {
       // do something
    }
    .show()
```
