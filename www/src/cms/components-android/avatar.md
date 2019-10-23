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

## Avatar sizes

Both `UserAvatarView` and `EntityAvatarView` are available in five sizes ranging from `avatarExtraLarge` to `avatarExtraSmall`.

![Avatar sizes](/img/android-avatar-sizes.png)

```xml
<com.thumbtack.thumbprint.views.UserAvatarView
    style="@style/avatarExtraLarge"/>
```

```xml
<com.thumbtack.thumbprint.views.UserAvatarView
    style="@style/avatarLarge"/>
```

```xml
<com.thumbtack.thumbprint.views.UserAvatarView
    style="@style/avatarMedium"/>
```

```xml
<com.thumbtack.thumbprint.views.UserAvatarView
    style="@style/avatarSmall"/>
```

```xml
<com.thumbtack.thumbprint.views.UserAvatarView
    style="@style/avatarExtraSmall"/>
```

---

```xml
<com.thumbtack.thumbprint.views.EntityAvatarView
    style="@style/avatarExtraLarge"/>
```

```xml
<com.thumbtack.thumbprint.views.EntityAvatarView
    style="@style/avatarLarge"/>
```

```xml
<com.thumbtack.thumbprint.views.EntityAvatarView
    style="@style/avatarMedium"/>
```

```xml
<com.thumbtack.thumbprint.views.EntityAvatarView
    style="@style/avatarSmall"/>
```

```xml
<com.thumbtack.thumbprint.views.EntityAvatarView
    style="@style/avatarExtraSmall"/>
```

## Avatars without images

Avatars without images can display the the user or entity’s initials instead. The initials and background colors are assigned based on the first letter in the `initials` parameter of the `.bind()` method.

![Avatar Without Images](/img/android-avatar-without-images.png)

```xml
<LinearLayout
    android:id="@+id/noImagesUser"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:orientation="horizontal"
    android:gravity="center">

    <com.thumbtack.thumbprint.views.UserAvatarView
        style="@style/avatarMedium"/>
        ...

</LinearLayout>
```

```xml
<LinearLayout
    android:id="@+id/noImagesEntity"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:orientation="horizontal"
    android:gravity="center">

    <com.thumbtack.thumbprint.views.EntityAvatarView
        style="@style/avatarMedium"/>
        ...

</LinearLayout>
```

```java
var letters = sequenceOf("A", "B", "C", "D", "E", "F").iterator()
noImagesUser.forEachChild {
    (it as? UserAvatarView)?.bind(imageUrl = null, initials = letters.next() + "A")
}

letters = sequenceOf("A", "B", "C", "D", "E", "F").iterator()
noImagesEntity.forEachChild {
    (it as? EntityAvatarView)?.bind(imageUrl = null, initials = letters.next())
}
```

### Online

This badge indicates that a user or entity is online. It can be set initially through the `.bind()` method, or dynamically through the `setIsOnline()` method.

![Avatar badges](/img/avatar-android-online-indicator.png)

```java
badgesUser.forEachChild {
    (it as? UserAvatarView)?.bind(imageUrl = NICOLAS_CAGE_URL, isOnline = true)
}

badgesEntity.forEachChild {
    (it as? EntityAvatarView)?.bind(imageUrl = NICOLAS_CAGE_URL, isOnline = true)
}
```
