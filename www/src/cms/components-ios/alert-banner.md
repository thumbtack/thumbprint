---
title: Alert Banner
description: Important account information displayed at the top of the application.
---
*This documentation page is still under construction, more coming soon...*

## **Usage**

`AlertBanner` should be implemented as a global banner that displays at the top of the application. It is recommended to enforce a max height constraint to guard from the banner growing infinitely.

### Content Guidelines

* should be non-dismissible until a required action is completed 
* should have a link to resolve the required action
* should have a reasonable character count to avoid being shown with ellipsis

## Themes

### Caution

![caution theme example](/img/alert-banner-theme-caution.png "Caution")

### Info

![info theme example](/img/alert-banner-theme-info.png "Info")

### Warning

![warning theme example](/img/alert-banner-theme-warning.png "Warning")

## Visibility

The global banner should always be visible at the top of the application other than exceptions where it may be intentionally hidden to provide the best UX. Some situation where the banner may not be visible could be:

* pre-login / signup
* fullscreen presentations

## **Refreshing**

The global banner should refresh at predesignated triggers based on when the content may have changed, for example:

* application did start
* application did enter foreground
* main tab bar selection changed

## **Accessibility**

`AlertBanner` responds to the device text size setting by omitting the icon when using the extra large text size. In the event that constraints limit the size of the banner, ellipsis are used in the middle of the text so that the action link is always visible at the end.

## For Thumbtack

![](/img/alert-banner-info.png)

`AlertBanner` is implemented as a global banner only in the pro app. This is the only intended usage for this component at this time, so you should not need to instantiate the class directly.

To define a new global banner, see ContextualInsightView.php in website. Some global banners may also require a new refresh trigger to update immediately after resolving the required action.

The global banner is always visible at the top of the application other than these exceptions:

* pre-login ( hidden )
* onboarding ( presented over )
* service setup ( presented over )
* presented full screen views ( presented over )

Only one global banner is visible at a time, based on the pre-defined priority order.

The global banner expands and collapses with animation between the status bar area and the navigation bar. If the global banner is already visible, the content updates immediately without animation.

The global banner refreshes on the following application events ( only when logged in ):

* application did start
* application did enter foreground
* main tab bar selection changed
* onboarding was dismissed ( including service setup )
* credit card added, removed, or updated
* EMR status changed within service settings

The global banner is capped at a max height of 33% of the screen size.
