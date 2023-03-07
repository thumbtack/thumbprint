import React from 'react';
import type { InferGetStaticPropsType } from 'next';
import { Grid, GridColumn, Text } from '@thumbtack/thumbprint-react';
import { ContentPage } from '../../components/mdx/mdx';
import getContentPageStaticProps from '../../utils/get-content-page-static-props';
import { P } from '../../components/mdx/components';

export const getStaticProps = getContentPageStaticProps;

export default function OverviewAbout({
    layoutProps,
}: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <ContentPage title="Brand assets" description="Logos and marks." layoutProps={layoutProps}>
            <P>
                Thumbtack, Inc. (“Thumbtack”) is the owner of its trademarks and logos below.
                Thumbtack is making its badges available only to individuals and companies who have
                been separately authorized to use these brand assets to promote Thumbtack. You do
                not have authorization to modify Thumbtack’s trademarks and logos contained within
                the badges, and you are only authorized to use these brand assets to promote
                Thumbtack or your products and services that you offer through Thumbtack pursuant to
                the terms of the separate agreement between you and Thumbtack.
            </P>
            <P>
                In using Thumbtack’s trademarks, always provide appropriate credit lines in your
                communications on your website or any other written materials. For example,
                “Thumbtack and the T Logos are trademarks of Thumbtack, Inc.”
            </P>
            <P>
                The brand assets should appear no smaller than <em>18px wide</em> for the logo-mark,
                no smaller than <em>80px wide</em> for the logo-type, and no smaller than{' '}
                <em>30px wide</em> for the app icons.
            </P>

            <div className="mb5">
                <Grid gutter="wide">
                    <GridColumn aboveSmall={6} aboveMedium={4}>
                        <div className="ph2 pv4 h-100 flex flex-column">
                            <div className="flex-auto pv4 flex mb3">
                                <img
                                    src="/brand-assets/logotype.svg"
                                    className="db ma-auto"
                                    alt="Logotype"
                                />
                            </div>
                            <div className="flex-none tc">
                                <Text size={3}>
                                    <a
                                        href="/brand-assets/logotype.zip"
                                        className="black-300 hover-blue"
                                    >
                                        Download SVG
                                    </a>
                                </Text>
                            </div>
                        </div>
                    </GridColumn>
                    <GridColumn aboveSmall={6} aboveMedium={4}>
                        <div className="ph2 pv4 h-100 flex flex-column">
                            <div className="flex-auto pv4 flex mb3">
                                <img
                                    src="/brand-assets/logomark_black.svg"
                                    className="db ma-auto"
                                    alt="Black logomark"
                                />
                            </div>
                            <div className="flex-none tc">
                                <Text size={3}>
                                    <a
                                        href="/brand-assets/logomark_black.zip"
                                        className="black-300 hover-blue"
                                    >
                                        Download SVG
                                    </a>
                                </Text>
                            </div>
                        </div>
                    </GridColumn>
                    <GridColumn aboveSmall={6} aboveMedium={4}>
                        <div className="ph2 pv4 h-100 flex flex-column">
                            <div className="flex-auto pv4 flex mb3">
                                <img
                                    src="/brand-assets/logomark_blue.svg"
                                    className="db ma-auto"
                                    alt="Blue logomark"
                                />
                            </div>
                            <div className="flex-none tc">
                                <Text size={3}>
                                    <a
                                        href="/brand-assets/logomark_blue.zip"
                                        className="black-300 hover-blue"
                                    >
                                        Download SVG
                                    </a>
                                </Text>
                            </div>
                        </div>
                    </GridColumn>
                    <GridColumn aboveSmall={6} aboveMedium={4}>
                        <div className="ph2 pv4 h-100 flex flex-column">
                            <div className="flex-auto pv4 flex mb3">
                                <img
                                    src="/brand-assets/logomark_grey.svg"
                                    className="db ma-auto"
                                    alt="Grey logomark"
                                />
                            </div>
                            <div className="flex-none tc">
                                <Text size={3}>
                                    <a
                                        href="/brand-assets/logomark_grey.zip"
                                        className="black-300 hover-blue"
                                    >
                                        Download SVG
                                    </a>
                                </Text>
                            </div>
                        </div>
                    </GridColumn>
                    <GridColumn aboveSmall={6} aboveMedium={4}>
                        <div className="ph2 pv4 h-100 flex flex-column">
                            <div className="flex-auto pv4 flex mb3">
                                <img
                                    src="/brand-assets/pro_app_icon.svg"
                                    className="db ma-auto"
                                    alt="Pro app icon"
                                />
                            </div>
                            <div className="flex-none tc">
                                <Text size={3}>
                                    <a
                                        href="/brand-assets/pro_app_icon.zip"
                                        className="black-300 hover-blue"
                                    >
                                        Download SVG
                                    </a>
                                </Text>
                            </div>
                        </div>
                    </GridColumn>
                    <GridColumn aboveSmall={6} aboveMedium={4}>
                        <div className="ph2 pv4 h-100 flex flex-column">
                            <div className="flex-auto pv4 flex mb3">
                                <img
                                    src="/brand-assets/customer_app_icon.svg"
                                    className="db ma-auto"
                                    alt="Customer app icon"
                                />
                            </div>
                            <div className="flex-none tc">
                                <Text size={3}>
                                    <a
                                        href="/brand-assets/customer_app_icon.zip"
                                        className="black-300 hover-blue"
                                    >
                                        Download SVG
                                    </a>
                                </Text>
                            </div>
                        </div>
                    </GridColumn>
                </Grid>
            </div>
        </ContentPage>
    );
}
