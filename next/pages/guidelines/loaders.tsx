import React from 'react';
import type { InferGetStaticPropsType } from 'next';
import { LoaderDots, Title, Text, Button } from '@thumbtack/thumbprint-react';
import { ContentModifierTimeSmall } from '@thumbtack/thumbprint-icons';
import { ContentPage } from '../../components/mdx/mdx';
import getContentPageStaticProps from '../../utils/get-content-page-static-props';
import { A, H2, H3, LI, OL, P } from '../../components/mdx/components';
import androidLoader from '../../images/pages/guide/product/loaders/android-loader.gif';
import iosLoader from '../../images/pages/guide/product/loaders/ios-loader.gif';
import Skeleton from '../../components/skeleton-loader';

export const getStaticProps = getContentPageStaticProps;

export default function OverviewAbout({
    layoutProps,
}: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <ContentPage
            title="Loaders"
            description="What to show users when there’s a delay."
            layoutProps={layoutProps}
        >
            <P>
                Loading animations let the user know that content is on the way. Because we’re
                asking the user to wait, we want to be consistent, limit this delay and, where
                possible, preview the content that’s about to load.
            </P>
            <H2>Loading types</H2>
            <P>There are three loading types recommended for use in Thumbtack products:</P>
            <OL>
                <LI>Loading dot animation.</LI>
                <LI>Skeleton loaders.</LI>
                <LI>For native apps only, the operating system loader.</LI>
            </OL>
            <H3>1. Loading dots</H3>
            <P>
                This is our standard loading animation. It should be used when if we need to keep
                the user on the page or when smaller pieces of an existing layout is being
                generated. Use the blue <A href="/components/loader-dots/react/">loading dots</A>{' '}
                over white whenever possible.
            </P>

            <div className="grid">
                <div className="m_col-4 mb3 m_mb0">
                    <div className="h6 ba bw-2 b-gray br2 pa3 bg-white relative overflow-hidden">
                        <div className="flex mb2">
                            <div
                                className="w4 h4 mr2 br2 flex-none cover"
                                style={{ background: 'url("https://picsum.photos/300/300")' }}
                            />
                            <Text size={3} className="black-300 b">
                                Pro Photos
                            </Text>
                        </div>
                        <div className="flex mb2">
                            <div
                                className="w4 h4 mr2 br2 flex-none cover"
                                style={{ background: 'url("https://picsum.photos/301/301")' }}
                            />
                            <Text size={3} className="black-300 b">
                                Super Duper Photography
                            </Text>
                        </div>
                        <div className="flex mb2">
                            <div
                                className="w4 h4 mr2 br2 flex-none cover"
                                style={{ background: 'url("https://picsum.photos/302/302")' }}
                            />
                            <Text size={3} className="black-300 b">
                                Danny’s Wedding Photos
                            </Text>
                        </div>
                        <div className="flex mb2">
                            <div
                                className="w4 h4 mr2 br2 flex-none cover"
                                style={{ background: 'url("https://picsum.photos/304/304")' }}
                            />
                            <Text size={3} className="black-300 b">
                                Photos 4U
                            </Text>
                        </div>
                        <div
                            className="absolute top-0 left-0 w-100 h-100 flex items-center justify-center"
                            style={{ background: 'rgba(255,255,255,0.7)' }}
                        >
                            <LoaderDots size="small" />
                        </div>
                    </div>
                    <Text size={2} className="mt2 black-300">
                        <span className="b">Example 1.</span> An action was triggered and we prevent
                        further actions with a scrim. Use the{' '}
                        <A href="/tokens/scss/#section-scrim">light scrim token</A> to create this
                        UI.
                    </Text>
                </div>
                <div className="m_col-4 mb3 m_mb0">
                    <div className="h6 ba bw-2 b-gray br2 pa3 bg-white">
                        <div className="flex items-center bb b-gray-300 pb2 mb2">
                            <LoaderDots size="small" />
                            <Text size={2} className="black-300 ml2">
                                Calculating&hellip;
                            </Text>
                        </div>
                        <div>
                            <Title size={6} className="mb1">
                                You contacted this pro.
                            </Title>
                            <div className="flex items-center">
                                <ContentModifierTimeSmall className="gray mr1" />
                                <Text size={2} className="black-300">
                                    Waiting to hear back.
                                </Text>
                            </div>
                        </div>
                    </div>
                    <Text size={2} className="mt2 black-300">
                        <span className="b">Example 2.</span> A smaller piece of content is being
                        loaded on an existing page.
                    </Text>
                </div>
                <div className="m_col-4 mb3 m_mb0">
                    <div className="h6 ba bw-2 b-gray br2 pa3 flex flex-column bg-white">
                        <div className="flex-1">
                            <Title size={6} className="mb2">
                                Share your project.
                            </Title>
                            <Text size={2} className="black-300">
                                It’s better to have a few pros look into the job.
                            </Text>
                        </div>
                        <div className="flex-none">
                            <Button isLoading size="small" width="full">
                                Send Quote
                            </Button>
                        </div>
                    </div>
                    <Text size={2} className="mt2 black-300">
                        <span className="b">Example 3.</span> A button was clicked and we we’re
                        waiting for data.
                    </Text>
                </div>
            </div>

            <H3>2. Skeleton loader</H3>
            <P>
                When the layout of the content to be rendered is known in advance — for example, a
                list of avatars with names and descriptions — studies indicate that skeleton loaders
                can reduce the user’s perceived loading time.
            </P>

            <div className="grid">
                <div className="m_col-4 mb3 m_mb0">
                    <div className="h6 ba bw-2 b-gray br2 pa3 bg-white overflow-hidden">
                        <Title size={6} className="mb2">
                            Projects
                        </Title>
                        <div className="flex mb2">
                            <div className="flex-none mr2 w4">
                                <Skeleton aspectRatio="1:1" />
                            </div>
                            <div className="flex-1">
                                <Text size={3} className="black-300 b">
                                    <Skeleton type="text" />
                                    <Skeleton type="text" width="50%" />
                                </Text>
                            </div>
                        </div>
                        <div className="flex mb2">
                            <div className="flex-none mr2 w4">
                                <Skeleton aspectRatio="1:1" />
                            </div>
                            <div className="flex-1">
                                <Text size={3} className="black-300 b">
                                    <Skeleton type="text" />
                                    <Skeleton type="text" width="50%" />
                                </Text>
                            </div>
                        </div>
                        <div className="flex mb2">
                            <div className="flex-none mr2 w4">
                                <Skeleton aspectRatio="1:1" />
                            </div>
                            <div className="flex-1">
                                <Text size={3} className="black-300 b">
                                    <Skeleton type="text" />
                                    <Skeleton type="text" width="50%" />
                                </Text>
                            </div>
                        </div>
                        <div className="flex">
                            <div className="flex-none mr2 w4">
                                <Skeleton aspectRatio="1:1" />
                            </div>
                            <div className="flex-1">
                                <Text size={3} className="black-300 b">
                                    <Skeleton type="text" />
                                    <Skeleton type="text" width="50%" />
                                </Text>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="m_col-4 mb3 m_mb0">
                    <div className="h6 ba bw-2 b-gray br2 pa3 bg-white overflow-hidden">
                        <Title size={6} className="mb2">
                            Popular services
                        </Title>
                        <div className="mb3">
                            <div className="flex-none mb2">
                                <Skeleton aspectRatio="7:3" />
                            </div>
                            <Text size={3} className="black-300 b">
                                <Skeleton type="text" />
                                <Skeleton type="text" width="50%" />
                            </Text>
                        </div>
                        <div>
                            <div className="flex-none mb2">
                                <Skeleton aspectRatio="7:3" />
                            </div>
                            <Text size={3} className="black-300 b">
                                <Skeleton type="text" />
                                <Skeleton type="text" width="50%" />
                            </Text>
                        </div>
                    </div>
                </div>
            </div>

            <H3>3. Native loader</H3>
            <P>
                In cases where content is loading from the device in Thumbtack’s native apps, for
                example, a “pull down to refresh” or retrieving location settings, we can rely on
                the native loading animation.
            </P>

            <div className="grid">
                <div className="m_col-4 mb3 m_mb0">
                    <div className="h5 ba bw-2 b-gray br2 pa3 bg-white flex items-center justify-center">
                        <img
                            {...iosLoader}
                            width="16"
                            height="16"
                            alt="Animation of the iOS loading spinner"
                        />
                    </div>
                    <Text size={2} className="b mt1">
                        iOS
                    </Text>
                </div>
                <div className="m_col-4 mb3 m_mb0">
                    <div className="h5 ba bw-2 b-gray br2 pa3 bg-white flex items-center justify-center">
                        <img
                            {...androidLoader}
                            width="16"
                            height="16"
                            alt="Animation of the Android loading spinner"
                        />
                    </div>
                    <Text size={2} className="b mt1">
                        Android
                    </Text>
                </div>
            </div>
        </ContentPage>
    );
}
