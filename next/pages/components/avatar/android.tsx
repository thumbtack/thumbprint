import React from 'react';
import type { InferGetStaticPropsType } from 'next';
import { MDXComponentPage } from '../../../components/mdx/mdx';
import getComponentPageStaticProps from '../../../utils/get-component-page-static-props';
import { CodeExperimental, H2, H3, HR, Img, P } from '../../../components/mdx/components';

import androidAvatarSizes from '../../../images/pages/components/avatar/android/android-avatar-sizes.png';
import androidAvatarWithoutImages from '../../../images/pages/components/avatar/android/android-avatar-without-images.png';
import avatarAndroidOnlineIndicator from '../../../images/pages/components/avatar/android/avatar-android-online-indicator.png';
import avatarAndroidVariations from '../../../images/pages/components/avatar/android/avatar-android-variations.png';

export const getStaticProps = () => {
    return getComponentPageStaticProps({
        title: 'Avatar',
        description: 'Display user images and badges on Thumbtack.',
        componentId: 'avatar',
        platformId: 'android',
    });
};

export default function ComponentDocumentationPage({
    layoutProps,
    componentPageProps,
}: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <MDXComponentPage componentPageProps={componentPageProps} layoutProps={layoutProps}>
            <H2>Avatar variations</H2>
            <P>
                Avatars can be placed in your layout files as either:{' '}
                <CodeExperimental>EntityAvatarView</CodeExperimental> or{' '}
                <CodeExperimental>UserAvatarView</CodeExperimental>.
            </P>
            <P>
                <Img {...avatarAndroidVariations} alt="Screenshot of both Avatar types" />
            </P>

            <CodeExperimental language="xml">{`
<com.thumbtack.thumbprint.views.EntityAvatarView
    android:id="@+id/variationEntity"
    style="@style/avatarExtraLarge" />`}</CodeExperimental>

            <CodeExperimental language="xml">{`
<com.thumbtack.thumbprint.views.UserAvatarView
    android:id="@+id/variationUser"
    style="@style/avatarExtraLarge"/>
    `}</CodeExperimental>

            <CodeExperimental language="java">{`
variationEntity.bind(imageUrl = NICOLAS_CAGE_URL, initials = "N")
variationUser.bind(imageUrl = NICOLAS_CAGE_URL, initials = "NC")
`}</CodeExperimental>

            <P>
                <CodeExperimental>UserAvatarView</CodeExperimental> is for people or users whereas{' '}
                <CodeExperimental>EntityAvatarView</CodeExperimental> is for companies, businesses,
                or services.
            </P>
            <P>
                Note that image URLs and avatar initials are <em>not</em> specified in the layout;
                those are specified in the avatar’s <CodeExperimental>.bind()</CodeExperimental>{' '}
                method.
            </P>

            <CodeExperimental language="java">{`
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
`}</CodeExperimental>

            <H2>Avatar sizes</H2>
            <P>
                Both <CodeExperimental>UserAvatarView</CodeExperimental> and{' '}
                <CodeExperimental>EntityAvatarView</CodeExperimental> are available in five sizes
                ranging from <CodeExperimental>avatarExtraLarge</CodeExperimental> to{' '}
                <CodeExperimental>avatarExtraSmall</CodeExperimental>.
            </P>
            <P>
                <Img {...androidAvatarSizes} alt="Avatar sizes" />
            </P>

            <CodeExperimental language="xml">{`
<com.thumbtack.thumbprint.views.UserAvatarView
    style="@style/avatarExtraLarge"/>
`}</CodeExperimental>

            <CodeExperimental language="xml">{`
<com.thumbtack.thumbprint.views.UserAvatarView
    style="@style/avatarLarge"/>
`}</CodeExperimental>

            <CodeExperimental language="xml">{`
<com.thumbtack.thumbprint.views.UserAvatarView
    style="@style/avatarMedium"/>
`}</CodeExperimental>

            <CodeExperimental language="xml">{`
<com.thumbtack.thumbprint.views.UserAvatarView
    style="@style/avatarSmall"/>
`}</CodeExperimental>

            <CodeExperimental language="xml">{`
<com.thumbtack.thumbprint.views.UserAvatarView
    style="@style/avatarExtraSmall"/>
`}</CodeExperimental>

            <HR />

            <CodeExperimental language="xml">{`
<com.thumbtack.thumbprint.views.EntityAvatarView
    style="@style/avatarExtraLarge"/>
`}</CodeExperimental>

            <CodeExperimental language="xml">{`
<com.thumbtack.thumbprint.views.EntityAvatarView
    style="@style/avatarLarge"/>
`}</CodeExperimental>

            <CodeExperimental language="xml">{`
<com.thumbtack.thumbprint.views.EntityAvatarView
    style="@style/avatarMedium"/>
`}</CodeExperimental>

            <CodeExperimental language="xml">{`
<com.thumbtack.thumbprint.views.EntityAvatarView
    style="@style/avatarSmall"/>
`}</CodeExperimental>

            <CodeExperimental language="xml">{`
<com.thumbtack.thumbprint.views.EntityAvatarView
    style="@style/avatarExtraSmall"/>
`}</CodeExperimental>

            <H2>Avatars without images</H2>
            <P>
                Avatars without images can display the the user or entity’s initials instead. The
                initials and background colors are assigned based on the first letter in the{' '}
                <CodeExperimental>initials</CodeExperimental> parameter of the{' '}
                <CodeExperimental>.bind()</CodeExperimental> method.
            </P>
            <P>
                <Img {...androidAvatarWithoutImages} alt="Avatar Without Images" />
            </P>

            <CodeExperimental language="xml">{`
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
`}</CodeExperimental>

            <CodeExperimental language="xml">{`
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
`}</CodeExperimental>

            <CodeExperimental language="java">{`
var letters = sequenceOf("A", "B", "C", "D", "E", "F").iterator()
noImagesUser.forEachChild {
    (it as? UserAvatarView)?.bind(imageUrl = null, initials = letters.next() + "A")
}

letters = sequenceOf("A", "B", "C", "D", "E", "F").iterator()
noImagesEntity.forEachChild {
    (it as? EntityAvatarView)?.bind(imageUrl = null, initials = letters.next())
}
`}</CodeExperimental>

            <H3>Online</H3>
            <P>
                This badge indicates that a user or entity is online. It can be set initially
                through the <CodeExperimental>.bind()</CodeExperimental> method, or dynamically
                through the <CodeExperimental>setIsOnline()</CodeExperimental> method.
            </P>
            <P>
                <Img {...avatarAndroidOnlineIndicator} alt="Avatar badges" />
            </P>

            <CodeExperimental language="java">{`
badgesUser.forEachChild {
    (it as? UserAvatarView)?.bind(imageUrl = NICOLAS_CAGE_URL, isOnline = true)
}

badgesEntity.forEachChild {
    (it as? EntityAvatarView)?.bind(imageUrl = NICOLAS_CAGE_URL, isOnline = true)
}
`}</CodeExperimental>
        </MDXComponentPage>
    );
}
