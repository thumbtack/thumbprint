import React from 'react';
import type { InferGetStaticPropsType } from 'next';
import { EntityAvatar, UserAvatar } from '@thumbtack/thumbprint-react';
import { MDXComponentPage } from '../../../components/mdx/mdx';
import getComponentPageStaticProps from '../../../utils/get-component-page-static-props';
import { CodeExperimental, H2, H3, P } from '../../../components/mdx/components';
import DeprecatedComponentAlert from '../../../components/thumbprint-components/deprecated-component-alert/deprecated-component-alert';

export const getStaticProps = () => {
    return getComponentPageStaticProps({
        title: 'Avatar',
        description: 'Display user images and badges on Thumbtack.',
        componentId: 'avatar',
        platformId: 'react',
    });
};

export default function OverviewAbout({
    layoutProps,
    componentPageProps,
}: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <MDXComponentPage componentPageProps={componentPageProps} layoutProps={layoutProps}>
            <H2>Avatar variations</H2>

            <P>
                Avatars are available as two components:{' '}
                <CodeExperimental>UserAvatar</CodeExperimental> and{' '}
                <CodeExperimental>EntityAvatar</CodeExperimental>.
            </P>

            <CodeExperimental language="jsx">
                <div className="flex">
                    <div className="mr3">
                        <EntityAvatar imageUrl="https://i.pravatar.cc/140" size="xlarge" />
                    </div>
                    <div>
                        <UserAvatar imageUrl="https://i.pravatar.cc/140" size="xlarge" />
                    </div>
                </div>
            </CodeExperimental>

            <P>
                <CodeExperimental>UserAvatar</CodeExperimental> is for people or users whereas{' '}
                <CodeExperimental>EntityAvatar</CodeExperimental> is for companies, businesses, or
                services.
            </P>

            <H2>Avatar sizes</H2>

            <P>
                Both <CodeExperimental>UserAvatar</CodeExperimental> and{' '}
                <CodeExperimental>EntityAvatar</CodeExperimental> are available in five sizes
                ranging from <CodeExperimental>xlarge</CodeExperimental> to{' '}
                <CodeExperimental>xsmall</CodeExperimental>.
            </P>

            <CodeExperimental language="jsx">
                <>
                    <div className="flex items-center mb4">
                        <div className="mr3">
                            <UserAvatar imageUrl="https://i.pravatar.cc/140" size="xlarge" />
                        </div>
                        <div className="mr3">
                            <UserAvatar imageUrl="https://i.pravatar.cc/140" size="large" />
                        </div>
                        <div className="mr3">
                            <UserAvatar imageUrl="https://i.pravatar.cc/140" size="medium" />
                        </div>
                        <div className="mr3">
                            <UserAvatar imageUrl="https://i.pravatar.cc/140" size="small" />
                        </div>
                        <div className="mr3">
                            <UserAvatar imageUrl="https://i.pravatar.cc/140" size="xsmall" />
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div className="mr3">
                            <EntityAvatar imageUrl="https://i.pravatar.cc/140" size="xlarge" />
                        </div>
                        <div className="mr3">
                            <EntityAvatar imageUrl="https://i.pravatar.cc/140" size="large" />
                        </div>
                        <div className="mr3">
                            <EntityAvatar imageUrl="https://i.pravatar.cc/140" size="medium" />
                        </div>
                        <div className="mr3">
                            <EntityAvatar imageUrl="https://i.pravatar.cc/140" size="small" />
                        </div>
                        <div className="mr3">
                            <EntityAvatar imageUrl="https://i.pravatar.cc/140" size="xsmall" />
                        </div>
                    </div>
                </>
            </CodeExperimental>

            <H2>Avatars without images</H2>

            <P>
                Avatars without images can display the the user or entity’s initials instead. The
                initials are assigned to a color based on the first letter in the{' '}
                <CodeExperimental>initials</CodeExperimental> prop.
            </P>

            <CodeExperimental language="jsx">
                <>
                    <div className="flex mb4">
                        <div className="mr2">
                            <UserAvatar initials="AA" size="large" />
                        </div>
                        <div className="mr2">
                            <UserAvatar initials="BA" size="large" />
                        </div>
                        <div className="mr2">
                            <UserAvatar initials="CA" size="large" />
                        </div>
                        <div className="mr2">
                            <UserAvatar initials="DA" size="large" />
                        </div>
                        <div className="mr2">
                            <UserAvatar initials="EA" size="large" />
                        </div>
                        <div>
                            <UserAvatar initials="HA" size="large" />
                        </div>
                    </div>
                    <div className="flex">
                        <div className="mr2">
                            <EntityAvatar initial="A" size="large" />
                        </div>
                        <div className="mr2">
                            <EntityAvatar initial="B" size="large" />
                        </div>
                        <div className="mr2">
                            <EntityAvatar initial="C" size="large" />
                        </div>
                        <div className="mr2">
                            <EntityAvatar initial="D" size="large" />
                        </div>
                        <div className="mr2">
                            <EntityAvatar initial="E" size="large" />
                        </div>
                        <div>
                            <EntityAvatar initial="F" size="large" />
                        </div>
                    </div>
                </>
            </CodeExperimental>

            <H2>Avatar badges</H2>

            <P>
                Badges can be added to avatars to denote information including hired status and
                online status.
            </P>

            <H3>Online</H3>

            <P>This badge indicates that a user or entity is online.</P>

            <CodeExperimental language="jsx">
                <div>
                    <div className="flex items-center mb4">
                        <div className="mr2">
                            <UserAvatar
                                imageUrl="https://i.pravatar.cc/140"
                                isOnline
                                size="xlarge"
                            />
                        </div>
                        <div className="mr2">
                            <UserAvatar
                                imageUrl="https://i.pravatar.cc/140"
                                isOnline
                                size="large"
                            />
                        </div>
                        <div className="mr2">
                            <UserAvatar
                                imageUrl="https://i.pravatar.cc/140"
                                isOnline
                                size="medium"
                            />
                        </div>
                        <div className="mr2">
                            <UserAvatar
                                imageUrl="https://i.pravatar.cc/140"
                                isOnline
                                size="small"
                            />
                        </div>
                        <div className="mr2">
                            <UserAvatar
                                imageUrl="https://i.pravatar.cc/140"
                                isOnline
                                size="xsmall"
                            />
                        </div>
                    </div>

                    <div className="flex items-center">
                        <div className="mr2">
                            <EntityAvatar
                                imageUrl="https://i.pravatar.cc/140"
                                isOnline
                                size="xlarge"
                            />
                        </div>
                        <div className="mr2">
                            <EntityAvatar
                                imageUrl="https://i.pravatar.cc/140"
                                isOnline
                                size="large"
                            />
                        </div>
                        <div className="mr2">
                            <EntityAvatar
                                imageUrl="https://i.pravatar.cc/140"
                                isOnline
                                size="medium"
                            />
                        </div>
                        <div className="mr2">
                            <EntityAvatar
                                imageUrl="https://i.pravatar.cc/140"
                                isOnline
                                size="small"
                            />
                        </div>
                        <div className="mr2">
                            <EntityAvatar
                                imageUrl="https://i.pravatar.cc/140"
                                isOnline
                                size="xsmall"
                            />
                        </div>
                    </div>
                </div>
            </CodeExperimental>

            <H3>Checked</H3>

            <DeprecatedComponentAlert>
                The checked badge is deprecated. To indicate hired status of a user, show this
                information separately next to the avatar. Only the online badge is supported by
                both components. Checked is only supported by UserAvatar.
            </DeprecatedComponentAlert>

            <CodeExperimental language="jsx">
                <div className="flex items-center mb4">
                    <div className="mr2">
                        <UserAvatar imageUrl="https://i.pravatar.cc/140" isChecked size="xlarge" />
                    </div>
                    <div className="mr2">
                        <UserAvatar imageUrl="https://i.pravatar.cc/140" isChecked size="large" />
                    </div>
                    <div className="mr2">
                        <UserAvatar imageUrl="https://i.pravatar.cc/140" isChecked size="medium" />
                    </div>
                    <div className="mr2">
                        <UserAvatar imageUrl="https://i.pravatar.cc/140" isChecked size="small" />
                    </div>
                    <div className="mr2">
                        <UserAvatar imageUrl="https://i.pravatar.cc/140" isChecked size="xsmall" />
                    </div>
                </div>
            </CodeExperimental>
        </MDXComponentPage>
    );
}
