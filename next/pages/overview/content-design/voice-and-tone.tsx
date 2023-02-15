import React from 'react';
import type { InferGetStaticPropsType } from 'next';
import { Text } from '@thumbtack/thumbprint-react';
import { ContentPage } from '../../../components/mdx/mdx';
import getContentPageStaticProps from '../../../utils/get-content-page-static-props';
import { P, B, H2, H3, LI, UL, Table, TH, TD } from '../../../components/mdx/components';

export const getStaticProps = getContentPageStaticProps;

export default function OverviewAbout({
    layoutProps,
}: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <ContentPage
            title="Voice and tone"
            description="This section outlines how we write to express our brand and values and how we adapt our content to different contexts for our customers and pros."
            layoutProps={layoutProps}
        >
            <H2>What is voice and tone?</H2>

            <P>
                <B>Voice</B> doesn’t change. It’s your personality and how you sound, regardless of
                the situation.
            </P>
            <P>
                <B>Tone</B> changes all the time depending on context and setting. It’s how you
                speak, depending on who you’re talking to or the situation you’re addressing.
            </P>

            <H3>Thumbtack’s voice attributes</H3>
            <P>
                Pros and customers should read and sense the real person on the other end of those
                words. In combination, the following attributes make Thumbtack’s voice what it is:
            </P>

            <Table>
                <thead>
                    <tr>
                        <TH>Attributes</TH>
                        <TH>In other words:</TH>
                    </tr>
                </thead>
                <tbody className="v-top">
                    <tr>
                        <TD>
                            <Text size={1} className="black-300">
                                Refreshing
                            </Text>
                        </TD>
                        <TD>
                            <UL>
                                <LI>Unexpected</LI>
                                <LI>A relief</LI>
                                <LI>Relatable</LI>
                                <LI>No BS</LI>
                            </UL>
                        </TD>
                    </tr>
                    <tr>
                        <TD>
                            <Text size={1} className="black-300">
                                Realistic
                            </Text>
                        </TD>
                        <TD>
                            <UL>
                                <LI>Straightforward</LI>
                                <LI>Grounded</LI>
                                <LI>Self-aware</LI>
                            </UL>
                        </TD>
                    </tr>
                    <tr>
                        <TD>
                            <Text size={1} className="black-300">
                                Relatable
                            </Text>
                        </TD>
                        <TD>
                            <UL>
                                <LI>Glad to be of help</LI>
                                <LI>Trusted</LI>
                                <LI>Reassuring</LI>
                            </UL>
                        </TD>
                    </tr>
                </tbody>
            </Table>

            <H3>Different moments, different tones</H3>

            <P>When deciding on tone, consider:</P>

            <UL>
                <LI>What stage of user journey you’re currently writing for </LI>
                <LI>The user’s current emotions </LI>
                <LI>How much space you have for content</LI>
            </UL>

            <Table>
                <thead>
                    <tr>
                        <TH>
                            <Text size={1} className="black-300">
                                Low tone
                            </Text>
                        </TH>
                        <TH>
                            <Text size={1} className="black-300">
                                Medium tone
                            </Text>
                        </TH>
                        <TH>
                            <Text size={1} className="black-300">
                                High tone
                            </Text>
                        </TH>
                    </tr>
                </thead>
                <tbody className="v-top">
                    <tr>
                        <TD>
                            <UL>
                                <LI>Error messages</LI>
                                <LI>Collecting sensitive info like addresses or SSNs</LI>
                                <LI>Addressing changes to prices or pricing</LI>
                                <LI>Unhappy paths (payment failure, no pros found)</LI>
                                <LI>Legal related content</LI>
                            </UL>
                        </TD>
                        <TD>
                            <UL>
                                <LI>Transactional emails</LI>
                                <LI>Feature updates and announcements</LI>
                                <LI>Ghost text/UI</LI>
                            </UL>
                        </TD>
                        <TD>
                            <UL>
                                <LI>Celebratory moments</LI>
                                <LI>Review flow</LI>
                                <LI>Onboarding and welcome</LI>
                                <LI>Explore page</LI>
                                <LI>Moments of inspiration</LI>
                            </UL>
                        </TD>
                    </tr>
                </tbody>
            </Table>
        </ContentPage>
    );
}
