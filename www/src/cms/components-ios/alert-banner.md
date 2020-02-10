---
title: Alert Banner
description: Important account information displayed at the top of the application.
---
*This documentation page is still under construction, more coming soon...*

## **Usage**

`AlertBanner` is only integrated as a global banner in the pro app that displays at the top of the application, between the status bar area and the navigation bar. This is the only intended usage for the component, so you should not need to instantiate the class directly.

To define a new global banner, see ContextualInsightView.php in website. Some global banners may also require a new refresh trigger to update immediately after resolving the required action.

## **Behavior**

### **Refreshing**

The global banner refreshes on the following application events ( only when logged in ):

* application did start
* application did enter foreground
* main tab bar selection changed
* onboarding was dismissed ( including service setup )
* credit card added, removed, or updated
* EMR status changed within service settings

### Visibility

The global banner is always visible at the top of the application other than these exceptions:

* pre-login ( hidden )
* onboarding ( presented over )
* service setup ( presented over )
* presented full screen views ( presented over )

### Animation

The global banner expands and collapses between the status bar area and the navigation bar. If the global banner is already visible, the content will update immediately without animation.
