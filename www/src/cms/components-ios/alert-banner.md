---
title: Alert Banner
description: Important account information displayed at the top of the application.
---
*This documentation page is still under construction, more coming soon...*

## **Usage**

`AlertBanner` is implemented as a global banner in the pro app that displays at the top of the application, between the status bar area and the navigation bar. This is the only intended usage for this component, so you should not need to instantiate the class directly.

To define a new global banner, see ContextualInsightView.php in website. Some global banners may also require a new refresh trigger to update immediately after resolving the required action.

## Themes

### Caution

![caution theme example](/img/alert-banner-theme-caution.png "Caution")

### Info

![info theme example](/img/alert-banner-theme-info.png "Info")

### Warning

![warning theme example](/img/alert-banner-theme-warning.png "Warning")

## Visibility

A global banner is always visible at the top of the application other than these exceptions:

* pre-login ( hidden )
* onboarding ( presented over )
* service setup ( presented over )
* presented full screen views ( presented over )

Only one global banner is visible at a time based on the pre-defined priority order.

![](/img/alert-banner-info.png)

## **Refreshing**

The global banner refreshes on the following application events ( only when logged in ):

* application did start
* application did enter foreground
* main tab bar selection changed
* onboarding was dismissed ( including service setup )
* credit card added, removed, or updated
* EMR status changed within service settings

## Animation

The global banner expands and collapses between the status bar area and the navigation bar. If the global banner is already visible, the content will update immediately without animation.
