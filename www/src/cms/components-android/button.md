---
title: Button
description: Clickable elements used to perform actions.
---
### Themes

A button can have one of five themes: Primary, Secondary, Tertiary, Caution and Solid.

![Button themes](/img/button_states.png "Button themes")

#### States

There are three global states: default, active and disabled. The primary button also has a loading state. All active states double as focus states.

### Anatomy

![Button anatomy](/img/button_anatomy.png "Button anatomy")

Buttons contain one required element and one optional element.

1. **Background**: Buttons are either a solid color or have a 2dp border. All buttons have a 4dp border radius.
2. **Content/CTA** (required): Buttons should be sentence case with exceptions for proper nouns. Buttons should be limited to three words where possible.
3. **Icon** (optional): An icon is used to emphasize an action.

### Size

Only one button size is available on native. It adheres to our global tap target of 48dp.

### Behavior

By default buttons change width depending on the content inside of them. Occasionally a design requires a button to span the width of the container. Full width buttons occupy 100% of the width available to them in the container.

![Button width examples](/img/button_widths.png "Button width examples")

### Implementation

1. **ThumbprintPrimaryButton**

   Configurable items (via xml or properties): buttonText, inlineDrawable, isLoading, isEnabled

   ```
   <com.thumbtack.thumbprint.views.ThumbprintPrimaryButton
                   android:id="@+id/primaryButton"
                   android:layout_width="wrap_content"
                   android:layout_height="wrap_content"
                   app:buttonText="Primary"
                   app:inlineDrawable="@drawable/lightning__small"
                   app:isLoading="false"
                   app:isEnabled="true" />
   ```
2. **ThumbprintSecondaryButton**

   Configurable items (via xml or properties): buttonText, inlineDrawable, isEnabled

   ```
   <com.thumbtack.thumbprint.views.ThumbprintSecondaryButton
                   android:id="@+id/secondaryButton"
                   android:layout_width="wrap_content"
                   android:layout_height="wrap_content"
                   app:buttonText="Secondary"
                   app:inlineDrawable="@drawable/lightning__small"
                   app:isEnabled="true" />
   ```
3. **ThumbprintTertiaryButton**

   Configurable items (via xml or properties): buttonText, inlineDrawable, isEnabled

   ```
   <com.thumbtack.thumbprint.views.ThumbprintTertiaryButton
                   android:id="@+id/tertiaryButton"
                   android:layout_width="wrap_content"
                   android:layout_height="wrap_content"
                   app:buttonText="Tertiary"
                   app:inlineDrawable="@drawable/lightning__small"
                   app:isEnabled="true" />
   ```
4. **ThumbprintCautionButton**

   Configurable items (via xml or properties): buttonText, inlineDrawable, isEnabled

   ```
   <com.thumbtack.thumbprint.views.ThumbprintCautionButton
                   android:id="@+id/cautionButton"
                   android:layout_width="wrap_content"
                   android:layout_height="wrap_content"
                   app:buttonText="Caution"
                   app:inlineDrawable="@drawable/lightning__small"
                   app:isEnabled="true" />
   ```
5. **ThumbprintSolidButton**

   Configurable items (via xml or properties): buttonText, inlineDrawable, isEnabled

   ```
   <com.thumbtack.thumbprint.views.ThumbprintSolidButton
                   android:id="@+id/solidButton"
                   android:layout_width="wrap_content"
                   android:layout_height="wrap_content"
                   app:buttonText="Solid"
                   app:inlineDrawable="@drawable/lightning__small"
                   app:isEnabled="true" />
   ```
