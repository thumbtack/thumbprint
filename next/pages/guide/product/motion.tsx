import React from 'react';
import type { InferGetStaticPropsType } from 'next';
import { Text, HorizontalRule } from '@thumbtack/thumbprint-react';
import { ContentPage } from '../../../components/mdx/mdx';
import getContentPagteStaticProps from '../../../utils/get-content-page-static-props';
import {
    A,
    CodeExperimental,
    H2,
    H3,
    H4,
    Img,
    P,
    Table,
    TD,
    TH,
} from '../../../components/mdx/components';
import Banner from '../../../components/motion/general/banner';
import Scale from '../../../components/motion/general/scale';
import Skip from '../../../components/motion/general/skip';
import Easing from '../../../components/motion/general/easing';
import Color from '../../../components/motion/general/color';
import Pop from '../../../components/motion/general/pop';
import Slide from '../../../components/motion/general/slide';
import Push from '../../../components/motion/page/push';
import IosPageSheet from '../../../components/motion/page/ios/page-sheet';
import IosFullScreenModal from '../../../components/motion/page/ios/full-screen-modal';
import AndroidFullPage from '../../../components/motion/page/android/full-page';
import AndroidParentChild from '../../../components/motion/page/android/parent-child';

import appStoreImage from '../../../images/pages/guide/product/motion/app-store.gif';
import transitionNoteImage from '../../../images/pages/guide/product/motion/transition-note.jpg';

export const getStaticProps = getContentPagteStaticProps;

export default function OverviewAbout({
    layoutProps,
}: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <ContentPage
            title="Motion"
            description="Bringing layouts to life."
            layoutProps={layoutProps}
        >
            <P>
                Motion can introduce elements of delight and activity for users. Used sparingly, it
                can focus their attention and help them navigate through the UI. Here we discuss
                motion generally, the specific page-level navigations available on iOS and Android,
                and custom animations.
            </P>
            <H2>General motion</H2>
            <H3>Principles</H3>
            <P>
                Deciding what type of animation to use is more art than science. They should be
                quick but not jarring. To achieve this balance we generally use short durations for
                animations with smaller items and those moving smaller distances. Larger objects and
                objects moving larger distances will use longer durations.
            </P>
            <H3>Easing</H3>
            <P>
                For those familiar with easing values on the web these are slightly more aggressive
                than a browser’s <CodeExperimental>animation-timing-function</CodeExperimental>{' '}
                defaults.
            </P>
            <P>
                <A href="/tokens/scss/#section-easing">Easing tokens</A> are available for use in
                SCSS and Javascript. iOS and Android should use their platform’s built-in easings.
            </P>

            <div className="grid mb3">
                <div className="m_col-6">
                    <div className="b">ease-in</div>
                    <Text size={2}>
                        <CodeExperimental>cubic-bezier(0.50, 0, 1, 1)</CodeExperimental>
                    </Text>
                    <Text size={2} className="black-300">
                        Moves from slow to fast.
                    </Text>
                </div>
                <div className="m_col-6 mt3 m_mt0">
                    <div className="bg-gray-200 h5 pa3 flex items-center br2">
                        <Easing animation="easeIn" />
                    </div>
                </div>
            </div>

            <div className="grid mb3">
                <div className="m_col-6">
                    <div className="b">ease-out</div>
                    <Text size={2}>
                        <CodeExperimental>cubic-bezier(0, 0, 0.40, 1)</CodeExperimental>
                    </Text>
                    <Text size={2} className="black-300">
                        Moves from fast to slow.
                    </Text>
                </div>
                <div className="m_col-6 mt3 m_mt0">
                    <div className="bg-gray-200 h5 pa3 flex items-center br2">
                        <Easing animation="easeOut" />
                    </div>
                </div>
            </div>

            <div className="grid mb3">
                <div className="m_col-6">
                    <div className="b">ease-in-out</div>
                    <Text size={2}>
                        <CodeExperimental>cubic-bezier(0.45, 0, 0.40, 1)</CodeExperimental>
                    </Text>
                    <Text size={2} className="black-300">
                        Moves slowly on both ends.
                    </Text>
                </div>
                <div className="m_col-6 mt3 m_mt0">
                    <div className="bg-gray-200 h5 pa3 flex items-center br2">
                        <Easing animation="easeInOut" />
                    </div>
                </div>
            </div>

            <H3>Duration</H3>
            <P>
                Determines the length of the animation. The length of the animation usually
                corresponds to the size and distance of the animation.
            </P>
            <P>
                <A href="/tokens/scss/#section-duration">Duration tokens</A> are available for all
                platforms.
            </P>

            <Table>
                <thead>
                    <tr>
                        <TH>
                            <Text size={2}>Token</Text>
                        </TH>
                        <TH>
                            <Text size={2}>Duration</Text>
                        </TH>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <TD>
                            <Text size={2}>
                                <CodeExperimental>duration-1</CodeExperimental>
                            </Text>
                        </TD>
                        <TD>
                            <Text size={2}>
                                <CodeExperimental>75ms</CodeExperimental>
                            </Text>
                        </TD>
                    </tr>
                    <tr>
                        <TD>
                            <Text size={2}>
                                <CodeExperimental>duration-2</CodeExperimental>
                            </Text>
                        </TD>
                        <TD>
                            <Text size={2}>
                                <CodeExperimental>150ms</CodeExperimental>
                            </Text>
                        </TD>
                    </tr>
                    <tr>
                        <TD>
                            <Text size={2}>
                                <CodeExperimental>duration-3</CodeExperimental>
                            </Text>
                        </TD>
                        <TD>
                            <Text size={2}>
                                <CodeExperimental>200ms</CodeExperimental>
                            </Text>
                        </TD>
                    </tr>
                    <tr>
                        <TD>
                            <Text size={2}>
                                <CodeExperimental>duration-4</CodeExperimental>
                            </Text>
                        </TD>
                        <TD>
                            <Text size={2}>
                                <CodeExperimental>250ms</CodeExperimental>
                            </Text>
                        </TD>
                    </tr>
                    <tr>
                        <TD>
                            <Text size={2}>
                                <CodeExperimental>duration-5</CodeExperimental>
                            </Text>
                        </TD>
                        <TD>
                            <Text size={2}>
                                <CodeExperimental>300ms</CodeExperimental>
                            </Text>
                        </TD>
                    </tr>
                    <tr>
                        <TD>
                            <Text size={2}>
                                <CodeExperimental>duration-6</CodeExperimental>
                            </Text>
                        </TD>
                        <TD>
                            <Text size={2}>
                                <CodeExperimental>350ms</CodeExperimental>
                            </Text>
                        </TD>
                    </tr>
                </tbody>
            </Table>

            <H3>Examples</H3>
            <P>
                These first three are generic examples of motion. Click each to toggle the
                animation.
            </P>

            <div className="grid mb5">
                <div className="m_col-4 mb3 m_mb0">
                    <div className="shadow-300 h6 relative br2">
                        <Color />
                    </div>
                    <Text size={2} className="mt2 b">
                        Color transition
                    </Text>
                    <Text size={2}>
                        <CodeExperimental>duration-3</CodeExperimental> with{' '}
                        <CodeExperimental>ease-in</CodeExperimental>
                    </Text>
                </div>
                <div className="m_col-4 mb3 m_mb0">
                    <div className="shadow-300 h6 relative br2">
                        <Pop />
                    </div>
                    <Text size={2} className="mt2 b">
                        Pop-up
                    </Text>
                    <Text size={2}>
                        <CodeExperimental>duration-2</CodeExperimental> with{' '}
                        <CodeExperimental>ease-out</CodeExperimental>
                    </Text>
                </div>
                <div className="m_col-4">
                    <div className="shadow-300 h6 relative br2">
                        <Slide />
                    </div>
                    <Text size={2} className="mt2 b">
                        Slide
                    </Text>
                    <Text size={2}>
                        <CodeExperimental>duration-5</CodeExperimental> with{' '}
                        <CodeExperimental>ease-out</CodeExperimental>
                    </Text>
                </div>
            </div>

            <P>
                And these three examples are based on interactions currently used in Thumbtack
                products.
            </P>

            <div className="grid">
                <div className="m_col-4 mb3 m_mb0">
                    <div className="shadow-300 h6 relative br2 overflow-hidden">
                        <Banner />
                    </div>
                    <Text size={2} className="mt2 b">
                        Banner slide down/up
                    </Text>
                    <Text size={2}>
                        <CodeExperimental>duration-3</CodeExperimental> with{' '}
                        <CodeExperimental>ease-in</CodeExperimental>
                    </Text>
                </div>
                <div className="m_col-4 mb3 m_mb0">
                    <div className="shadow-300 h6 relative br2 bg-gray-200">
                        <Scale />
                    </div>
                    <Text size={2} className="mt2 b">
                        Hover/touch scale
                    </Text>
                    <Text size={2}>
                        <CodeExperimental>duration-2</CodeExperimental> with{' '}
                        <CodeExperimental>ease-out</CodeExperimental>
                    </Text>
                </div>
                <div className="m_col-4">
                    <div className="shadow-300 h6 relative br2">
                        <Skip />
                    </div>
                    <Text size={2} className="mt2 b">
                        Skip fade out/in
                    </Text>
                    <Text size={2}>
                        <CodeExperimental>duration-4</CodeExperimental> with{' '}
                        <CodeExperimental>ease-out</CodeExperimental>
                    </Text>
                </div>
            </div>

            <div className="pt6">
                <HorizontalRule />
            </div>

            <H2>Page-level transitions</H2>
            <P>
                iOS and Android each ship with a number of stock page-level transitions. In this
                guide we’ll define which transitions are available on each platform, when each
                should be used, what’s involved in building custom transitions, and how transitions
                should be communicated by designers to developers in their layouts.
            </P>
            <H3>Examples</H3>
            <P>
                Click on any of the letters to toggle the animations. Note that the transition
                speeds used in these examples has been slowed to better convey how the transition
                works.
            </P>
            <H4>iOS</H4>

            <div className="grid">
                <div className="s_col-6 m_col-4 mb3">
                    <Push />
                    <div className="b mt2">Push</div>
                    <Text size={2} className="black-300">
                        “Pushes” a page out of the way for the other, sliding in from the right to
                        go deeper into the UI.
                    </Text>
                </div>
                <div className="s_col-6 m_col-4 mb3">
                    <IosPageSheet />
                    <div className="b mt2">Page sheet</div>
                    <Text size={2} className="black-300">
                        A page slides from bottom and stacks above parent page.
                    </Text>
                </div>
                <div className="s_col-6 m_col-4 mb3">
                    <IosFullScreenModal />
                    <div className="b mt2">Full screen modal</div>
                    <Text size={2} className="black-300">
                        Page slides from bottom, overtakes entire screen.
                    </Text>
                </div>
            </div>

            <H4>Android</H4>

            <div className="grid">
                <div className="s_col-6 m_col-4 mb3">
                    <Push />
                    <div className="b mt2">Push</div>
                    <Text size={2} className="black-300">
                        “Pushes” a page out of the way for the other, sliding in from the right to
                        go deeper into the UI.
                    </Text>
                </div>
                <div className="s_col-6 m_col-4 mb3">
                    <AndroidFullPage />
                    <div className="b mt2">Full page</div>
                    <Text size={2} className="black-300">
                        Page overtakes unrelated existing page with slight grow.
                    </Text>
                </div>
                <div className="s_col-6 m_col-4 mb3">
                    <AndroidParentChild />
                    <div className="b mt2">Parent child</div>
                    <Text size={2} className="black-300">
                        Transition from a child expanding to full screen.
                    </Text>
                </div>
            </div>

            <H3>Building custom native transitions</H3>
            <H4>Stick with stock</H4>
            <P>
                We generally recommend using the stock animations that are pre-packaged on the
                different platforms. The primary reason for this is consistency.
            </P>
            <P>
                Users get accustomed to page-level interactions. They become conventions.
                Introducing a new way for the user to interact, or changing existing ones, can be
                disorienting and confusing, particularly when a standard transition will do.
            </P>
            <P>
                Also, these interactions are changed occasionally in OS releases. If we bypass the
                stock animations our users will not benefit from these updates, again distancing
                them from the convention.
            </P>
            <H4>Custom</H4>

            <div className="grid grid-wide mb3">
                <div className="m_col-7">
                    <P>
                        A custom transition can be built into a feature or flow if it uniquely
                        improves the user experience as they pass through it.
                    </P>
                    <P>
                        For example, as of late 2019, the iOS App Store home used a custom
                        navigation that pushes the article out and over the link. Instead of an
                        overlay sliding from the right or bottom the user has the sense of moving
                        deeper into the UI, experiencing the hierarchy in a less jarring way.
                    </P>
                    <P>
                        Custom transitions like these should be vetted with prototypes, user
                        testing, and native developers who will determine the technical feasibility
                        of building and maintaining it.
                    </P>
                </div>
                <div className="m_col-5">
                    <Img
                        {...appStoreImage}
                        className="br2 ba b-gray-300"
                        alt="Example of motion in the iOS App Store"
                        style={{ width: '200px' }}
                    />
                </div>
            </div>

            <H2>Communicating motion in Figma</H2>
            <P>
                The inability to communicate motion in static layouts has been a long-standing
                problem in the design world. In the absence of this information it is often up to
                the native developer to decide how to implement it.
            </P>
            <P>
                To alleviate this problem with page-level transitions we recommend designers to use
                the motion annotations we’ve provided in Figma.
            </P>

            <Text size={2} className="black-300 mb3 b">
                Example transition annotations available in Figma.
            </Text>

            <Img {...transitionNoteImage} alt="Transition annotations for use in Figma" />
        </ContentPage>
    );
}
