---
title: Accessibility
description: Building for the widest audience possible.
---
The openness of the Web means it’s easy to build any website you want. This also means it’s easy to inadvertently build one that’s difficult for people to use. While common problems like small font sizes are easy to spot, building a truly accessible website goes well beyond that.

Though by no means an exhaustive list, the following are concepts we take into consideration when creating our [Toolkits](/guide/product/toolkits/). By baking them into the Design System’s process our designers and developers can be confident that our tools and components will function for a broad range of customers.

![](/img/accessibility-illustration.svg)

## Design

### Color

Prior to Thumbprint there were few usage rules for colors, many did not have sufficient contrast for text, and there were simply too many of them. For text, we now have two options, black for headings and a dark gray for body copy (no more [light gray text](https://www.wired.com/2016/10/how-the-web-became-unreadable/!)) and our colors have clearer guidelines.

### Type

Similar to the process with color, we significantly reduced the number of type sizes, removed the smallest sizes to improve readability, and divided them into "Title" and "Text" categories with options to output the appropriate heading level or element.

### Size & space

For users with poor vision, hand tremors, or simply big fingers it’s important that target sizes for buttons and other interactive elements are large enough to use efficiently.

## Code

### HTML

By using semantic HTML elements we enable alternative ways to navigate our content. We also add important attributes where appropriate, for example, `alt` text for images and `aria-label` when a visible label is not available.

### Keyboard navigation

Interactive components should be navigable from the keyboard. This means paying attention to `tabindex` values and listening for key commands to perform an action, for example, closing a modal with the "escape" key.

### Documentation

In addition to building accessibility into our components we also provide notes in our documentation to alert developers to potential issues and console warnings when they are used in inaccessible ways.

## Resources

The good news is that there are an abundance of tools and resources to help evaluate and implement accessibility. Here are a few we recommend:

* [WebAIM](https://webaim.org/). Articles and training to help developers make their content accessible.
* [Contrast](https://itunes.apple.com/us/app/contrast-color-accessibility/id1254981365?mt=12). A MacOS app to test on-screen colors for accessible contrast.
* [Lighthouse](https://developers.google.com/web/tools/lighthouse/). Now built into Chrome’s DevTools this tool will run a variety of tests, among them an accessibility audit with suggested fixes.
