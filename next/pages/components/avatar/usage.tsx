import React from 'react';
import type { InferGetStaticPropsType } from 'next';
import { EntityAvatar, UserAvatar } from '@thumbtack/thumbprint-react';
import { MDXComponentPage } from '../../../components/mdx/mdx';
import getComponentPageStaticProps from '../../../utils/get-component-page-static-props';
import { H2, H3, LI, P, UL } from '../../../components/mdx/components';

export const getStaticProps = () => {
    return getComponentPageStaticProps({
        title: 'Avatar',
        description: 'Display user images and badges on Thumbtack.',
        componentId: 'avatar',
        platformId: 'usage',
    });
};

export default function ComponentDocumentationPage({
    layoutProps,
    componentPageProps,
}: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <MDXComponentPage componentPageProps={componentPageProps} layoutProps={layoutProps}>
            <H2>Options</H2>
            <H3>Entities &amp; Users</H3>
            <P>
                One of the defining guidelines for avatars and their shape is what the avatar is
                representing. We divide these two groups into entities and users.
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

            <div className="grid mw8 mt3">
                <div className="col-4">
                    <EntityAvatar imageUrl="https://i.pravatar.cc/140" size="xlarge" />
                    <div className="tp-body-3 mt2 black-300">
                        <div>Entity Avatar</div>
                    </div>
                </div>
                <div className="col-4">
                    <UserAvatar imageUrl="https://i.pravatar.cc/140" size="xlarge" />
                    <div className="tp-body-3 mt2 black-300">
                        <div>User Avatar</div>
                    </div>
                </div>
            </div>
            <H3>Sizes</H3>
            <div className="grid mw8 mb3">
                <div className="col-6">
                    <div className="tp-body-2 mt2 black-300">
                        <div>Extra Large: 140px</div>
                        <div>Large: 100px</div>
                        <div>Medium: 72px</div>
                        <div>Small: 48px</div>
                        <div>Extra Small: 32px</div>
                    </div>
                </div>
            </div>
            <div className="flex items-baseline">
                <div className="mr4">
                    <EntityAvatar imageUrl="https://i.pravatar.cc/140" size="xlarge" />
                    <div className="tp-body-3">Extra Large</div>
                </div>
                <div className="mr4">
                    <EntityAvatar imageUrl="https://i.pravatar.cc/140" size="large" />
                    <div className="tp-body-3">Large</div>
                </div>
                <div className="mr4">
                    <EntityAvatar imageUrl="https://i.pravatar.cc/140" size="medium" />
                    <div className="tp-body-3">Medium</div>
                </div>
                <div className="mr4">
                    <EntityAvatar imageUrl="https://i.pravatar.cc/140" size="small" />
                    <div className="tp-body-3">Small</div>
                </div>
                <div className="mr4">
                    <EntityAvatar imageUrl="https://i.pravatar.cc/140" size="xsmall" />
                    <div className="tp-body-3">Extra Small</div>
                </div>
            </div>

            <H3>Blank Avatars</H3>

            <P>
                When images aren’t provided for avatars we use blank states in their place. Initials
                are used for blank profiles and differ for entities and users. For entities, we use
                the first letter of the business name. For users, we use the first and last initial
                of the user’s name. The initials will display capitalized and bolded.
            </P>

            <H3>Type Sizes</H3>

            <div className="grid mw8 mb3">
                <div className="col-6">
                    <div className="tp-body-2 mt2 black-300">
                        <div>Extra Large: 32px</div>
                        <div>Large: 24px</div>
                        <div>Medium: 20px</div>
                        <div>Small: 16px</div>
                        <div>Extra Small: 10px</div>
                    </div>
                </div>
            </div>
            <div className="grid mw8">
                <div className="col-4">
                    <div className="mr2">
                        <EntityAvatar initial="A" size="large" />
                        <div className="mt2">
                            <div>
                                <b>Entity</b> avatars get the first initial of the business name
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-4">
                    <div className="mr2">
                        <UserAvatar initials="BB" size="large" />
                        <div className="mt2">
                            <div>
                                <b>User</b> avatars get the first and last initial
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <H3>Color</H3>

            <P>
                Blank avatars get assigned a 100-level color from our extended palette based on the
                ascii value of the initials attached to the user name or entity.
            </P>
        </MDXComponentPage>
    );
}
