---
title: Avatar
description: Display user images and badges on Thumbtack.
---
## Avatar variations

Avatars can be placed in your layout files as either: `EntityAvatarView` or `UserAvatarView`.

![Screenshot of both Avatar types](/img/avatar-android-variations.png)

```xml
<com.thumbtack.thumbprint.views.EntityAvatarView
    android:id="@+id/variationEntity"
    style="@style/avatarExtraLarge" />
```

```xml
<com.thumbtack.thumbprint.views.UserAvatarView
    android:id="@+id/variationUser"
    style="@style/avatarExtraLarge"/>
```

```java
variationEntity.bind(imageUrl = NICOLAS_CAGE_URL, initials = "N")
variationUser.bind(imageUrl = NICOLAS_CAGE_URL, initials = "NC")
```

`UserAvatarView` is for people or users whereas `EntityAvatarView` is for companies, businesses, or services.

Note that image URLs and avatar initials are _not_ specified in the layout; those are specified in the avatar's `.bind()` method.

```java
/**
* Begins loading the image from the given [imageUrl], positions and sizes the online badge,
* sets its visiblity based on [isOnline], and create a [BlankAvatarDrawable] as the
* fallback avatar. The [BlankAvatarDrawable] will contain the string [initials] and use the
* colors specified in [BlankAvatarDrawable.setColorsFromInitials], which maps the first letter
* of [initials] to background and text color values.
*
* If no [imageUrl] is given, or if there is an error fetching the image, then the
* [BlankAvatarDrawable] created from [initials] will be displayed. A gray placeholder is shown
* during the image's loading if an [imageUrl] is specified.
*
* If both [imageUrl] and [initials] are unspecified, no avatar will be displayed.
*
* As specified in Thumbprint style guides, entity avatars should pass in one letter
* for [initials] and user avatars should pass in two letters for [initials].
*/
fun bind(imageUrl: String? = null, initials: String? = null, isOnline: Boolean = false) {
    ...
}
```
