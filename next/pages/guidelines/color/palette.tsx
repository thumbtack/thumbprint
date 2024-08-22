import React from 'react';
import type { InferGetStaticPropsType } from 'next';
import { groupBy } from 'lodash-es';
import classNames from 'classnames';
import { Grid, GridColumn, Text } from '@thumbtack/thumbprint-react';
import * as tokens from '@thumbtack/thumbprint-tokens';
import { NavigationCaretDownSmall } from '@thumbtack/thumbprint-icons';
import { ContentPage } from '../../../components/mdx/mdx';
import getLayoutProps from '../../../utils/get-layout-props';
import { CodeExperimental, H2, H3, LI, P, UL } from '../../../components/mdx/components';

interface Usage {
    values: {
        usage: string;
        // usage: string;
        theme: string;
        'light-hex': string;
        'pill-color': string;
        color: string;
        emphasis: string;
        interaction: string;
        description: string;
        family: string;
        level: string;
        javascript: string;
        ios: string;
        android: string;
        scss: string;
    };
}

interface ColoredPill {
    fill: string;
    title: string;
    value: string;
}

function coloredPill({ fill, title, value }: ColoredPill): JSX.Element {
    return (
        <div>
            <div>{title}</div>
            <div
                className="ph3 pv2 br-pill"
                style={{
                    background: `${fill}`,
                }}
            >
                <span className="white">{value}</span>
            </div>
        </div>
    );
}

function ColorSection({ values }: Usage): JSX.Element {
    return (
        <div
            className={classNames('flex flex-column tp-body-3', {
                white:
                    (['400', '500', '600'].includes(values.level) &&
                        values.color != 'Yellow 400') ||
                    ['Black', 'Black 300'].includes(values.color),
            })}
            style={{
                background: `${values['light-hex']}`,
            }}
        >
            {/* clickable region */}
            <div className="pv3 ph3 b flex flex-row">
                <span className="flex-auto tp-body-2">{values.color}</span>{' '}
                <NavigationCaretDownSmall />
            </div>
            {/* end clickable region */}
            <div className="pb3 ph3">
                {/* body content */}
                <div className="pb3">{values.description}</div>
                {/* tokens */}
                <div className="flex flex-row col-gap2 row-gap2 flex-wrap">
                    {coloredPill({
                        title: 'Hex',
                        value: values['light-hex'],
                        fill: values['pill-color'],
                    })}
                    {coloredPill({
                        title: 'Javascript',
                        value: values.javascript,
                        fill: values['pill-color'],
                    })}
                    {coloredPill({
                        title: 'ios',
                        value: values.ios,
                        fill: values['pill-color'],
                    })}
                    {coloredPill({
                        title: 'Android',
                        value: values.android,
                        fill: values['pill-color'],
                    })}
                    {coloredPill({
                        title: 'scss',
                        value: values.scss,
                        fill: values['pill-color'],
                    })}
                </div>
            </div>
        </div>
    );
}

export default function OverviewAbout({
    usages,
    layoutProps,
}: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <ContentPage
            title="Palette"
            description="A simple system for interfaces and illustrations"
            layoutProps={layoutProps}
        >
            <P>
                Core colors are expanded into a range of values to support varying moments within
                the product. The usage patterns for each value below can be found in our usage page.
            </P>

            <div>
                <H2>Color system</H2>
                <P>
                    These colors should be used to drive the user experience depending on their
                    intended use case and should be used sparingly to drive focus to moments that
                    matter from a branded or feedback perspective.
                </P>
            </div>

            <div>color palette table</div>

            {Object.keys(usages).map(key => {
                return (
                    <div className="ba b-gray-300 pa5 br3 mb5">
                        <H2>{key}</H2>
                        <P>
                            Express default and less-opinionated UI elements such as background
                            colors, icons, and text elements.
                        </P>

                        <div className="flex flex-row col-gap4">
                            <div className="flex-auto tp-body-2">
                                <div className="b">Suggested use</div>
                                <div className="pb3">Backgrounds, text, iconography, shadows.</div>

                                <div className="br3 overflow-hidden">
                                    {usages[key].map(component => {
                                        return <ColorSection values={component.values} />;
                                    })}
                                </div>
                            </div>

                            <div style={{ minWidth: '375px' }}>
                                <div className="tp-body-3 ttu">Examples</div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </ContentPage>
    );
}

export const getStaticProps = async () => {
    const listRowsRes = await fetch(
        // https://coda.io/developers/apis/v1#operation/listRows
        `https://coda.io/apis/v1/docs/bXyUQb2tJW/tables/grid-oefPpAQq-z/rows?useColumnNames=true`,
        {
            headers: {
                Authorization: `Bearer ${process.env.CODA_API_TOKEN}`,
            },
        },
    );

    const data = listRowsRes.ok ? await listRowsRes.json() : null;
    const usages: Usage[] = data ? data.items : [];

    const groupedUsages = groupBy(usages, usage => {
        return usage.values.family;
    });

    return {
        props: {
            layoutProps: getLayoutProps(),
            usages: groupedUsages,
        },
    };
};
