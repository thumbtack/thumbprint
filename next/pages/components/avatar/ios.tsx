import React from 'react';
import type { InferGetStaticPropsType } from 'next';
import { MDXComponentPage } from '../../../components/mdx/mdx';
import getComponentPageStaticProps from '../../../utils/get-component-page-static-props';
import { CodeExperimental, H2, H3, Img, LI, P, UL } from '../../../components/mdx/components';

import avatarOnlineNow from '../../../images/pages/components/avatar/ios/avatar-online-now.png';
import avatarVariations from '../../../images/pages/components/avatar/ios/avatar-variations.png';

export const getStaticProps = () => {
    return getComponentPageStaticProps({
        title: 'Avatar',
        description: 'Display user images and badges on Thumbtack.',
        componentId: 'avatar',
        platformId: 'ios',
    });
};

export default function ComponentDocumentationPage({
    layoutProps,
    componentPageProps,
}: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <MDXComponentPage componentPageProps={componentPageProps} layoutProps={layoutProps}>
            <H2>Summary</H2>
            <P>
                Avatars provide a container for displaying Entity or User images on Thumbtack. This{' '}
                <CodeExperimental>UIView</CodeExperimental> container displays either the filled
                images after loading the image via URL or the blank Avatar view if there’s no
                backing image and initials are provided.
            </P>
            <P>
                Use <CodeExperimental>EntityAvatar</CodeExperimental> or{' '}
                <CodeExperimental>UserAvatar</CodeExperimental> classes directly depending on the
                object to be displayed.
            </P>
            <UL>
                <LI>
                    <b>Entity</b>: a company, business, or service. A square with our standard 4px
                    border-radius is best here.
                </LI>
                <LI>
                    <b>User</b>: a person or user. A circle is best suited for people - primarily
                    faces.
                </LI>
            </UL>
            <P>
                <Img
                    {...avatarVariations}
                    alt="Screenshot of Entity and User Avatars"
                    fill={false}
                />
            </P>

            <CodeExperimental language="swiftui">{`
let entityAvatar = EntityAvatar(size: .medium)
entityAvatar.name = "Nicolas Cage"
entityAvatar.initials = "NC"
entityAvatar.setImageURL(avatarImageURL)

let userAvatar = UserAvatar(size: .medium)
userAvatar.name = "Nicolas Cage"
userAvatar.initials = "NC"
userAvatar.setImageURL(avatarImageURL)
`}</CodeExperimental>

            <H2>Accessibility</H2>
            <P>
                Provide the <CodeExperimental>name</CodeExperimental> property to override the
                view’s accessibility label. If not provided, the accessibility label will be{' '}
                <CodeExperimental>nil</CodeExperimental>.
            </P>
            <H2>Public API</H2>
            <H3>
                <CodeExperimental>public var image: UIImage?</CodeExperimental>
            </H3>
            <P>The image displayed in the avatar image view.</P>
            <H3>
                <CodeExperimental>public var size: Avatar.Size</CodeExperimental>
            </H3>
            <P>
                One of the provided avatar sizes: <CodeExperimental>xSmall</CodeExperimental>,{' '}
                <CodeExperimental>small</CodeExperimental>,{' '}
                <CodeExperimental>medium</CodeExperimental>,{' '}
                <CodeExperimental>large</CodeExperimental>,{' '}
                <CodeExperimental>xLarge</CodeExperimental>
            </P>
            <H3>
                <CodeExperimental>public var isOnline: Bool</CodeExperimental>
            </H3>
            <P>Boolean value that controls whether the online badge is shown or not.</P>
            <P>
                <Img
                    {...avatarOnlineNow}
                    alt="Screenshot of Online Badge on Entity and User Avatar"
                    fill={false}
                />
            </P>
            <H3>
                <CodeExperimental>public var initials: String?</CodeExperimental>
            </H3>
            <P>
                The initials to be shown when displaying the blank avatar. Any string longer than
                one character will be truncated for display.
            </P>
            <H3>
                <CodeExperimental>public var name: String?</CodeExperimental>
            </H3>
            <P>Used for accessibility label for the avatar.</P>
            <H3>
                <CodeExperimental>
                    public init(size: Avatar.Size, initials: String? = nil, name: String? = nil,
                    isOnline: Bool = false)
                </CodeExperimental>
            </H3>
            <P>
                Initializes an EntityAvatar/UserAvatar. Parameters: size: The initial{' '}
                <CodeExperimental>Avatar.Size</CodeExperimental> class for the component. initials:
                Any string longer that one character will be truncated for display. name: Used for
                accessibility label for the avatar.
            </P>
            <P>
                <em>Note</em> A URL extension is provided for utility for loading a remote image. It
                is not part of the core Thumbprint API as it relies on SDWebImage.
            </P>
            <H3>
                <CodeExperimental>
                    func setImageURL(_ url: URL?) -&gt; SDWebImageOperation?
                </CodeExperimental>
            </H3>
            <P>
                Loads an image from the given URL and sets a blank placeholder image while loading.
                Once loaded, the image is displayed in the Avatar.
            </P>
        </MDXComponentPage>
    );
}
