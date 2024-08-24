import React, { useState } from 'react';
import type { InferGetStaticPropsType } from 'next';
import ClickableBox from 'clickable-box';
import { groupBy } from 'lodash-es';
import classNames from 'classnames';
import * as tokens from '@thumbtack/thumbprint-tokens';
import { NavigationCaretDownSmall, NavigationCaretUpSmall } from '@thumbtack/thumbprint-icons';
import { Text } from '@thumbtack/thumbprint-react';
import { ContentPage } from '../../../components/mdx/mdx';
import getLayoutProps from '../../../utils/get-layout-props';
import { H2, P } from '../../../components/mdx/components';
import { paletteColortMappings } from './usage-mappings';
import { Color, Image } from './utils';

import purple from '../../../images/pages/guide/product/color/palette/purple.png';
import yellow from '../../../images/pages/guide/product/color/palette/yellow.png';
import neutral from '../../../images/pages/guide/product/color/palette/neutral.png';
import red from '../../../images/pages/guide/product/color/palette/red.png';
import blue from '../../../images/pages/guide/product/color/palette/blue.png';
import green from '../../../images/pages/guide/product/color/palette/green.png';
import indigo from '../../../images/pages/guide/product/color/palette/indigo.png';

const images: Image = {
    purple: {
        src: purple,
        alt: 'user interface example where purple colors are applied',
    },
    yellow: {
        src: yellow,
        alt: 'user interface example where yellow colors are applied',
    },
    neutral: {
        src: neutral,
        alt: 'user interface example where neutral colors are applied',
    },
    red: {
        src: red,
        alt: 'user interface example where red colors are applied',
    },
    blue: {
        src: blue,
        alt: 'user interface example where blue colors are applied',
    },
    green: {
        src: green,
        alt: 'user interface example where green colors are applied',
    },
    indigo: {
        src: indigo,
        alt: 'user interface example where indigo colors are applied',
    },
};

interface ColoredPillProps {
    fill: string;
    title: string;
    value: string;
}

function coloredPill({ fill, title, value }: ColoredPillProps): JSX.Element {
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

function ColorSection({ values }: Color): JSX.Element {
    const [active, setActive] = useState(false);
    return (
        <div
            className={classNames('flex flex-column tp-body-3', {
                white:
                    (['400', '500', '600'].includes(values.level) &&
                        values.color !== 'Yellow 400') ||
                    ['Black', 'Black 300'].includes(values.color),
            })}
            style={{
                background: `${values['light-hex']}`,
            }}
        >
            {/* clickable region */}
            <ClickableBox
                className="pv3 ph3 b flex flex-row cursor-pointer"
                onClick={(): void => setActive(!active)}
            >
                <span className="flex-auto tp-body-2">{values.color}</span>{' '}
                {!active ? <NavigationCaretDownSmall /> : <NavigationCaretUpSmall />}
            </ClickableBox>
            {/* end clickable region */}
            <div
                className={classNames('ph3', {
                    'h-0 overflow-hidden': !active,
                    'h-auto pb3 ': active,
                })}
            >
                {/* body content */}
                <div className="pb3">
                    <ul style={{ listStyle: 'bullet' }} className="ml3">
                        {values.description.split('\n').map(item => {
                            return <li>{item}</li>;
                        })}
                    </ul>
                </div>
                {/* tokens */}
                <div className="flex flex-row col-gap2 row-gap2 flex-wrap mv3">
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

interface SwatchProps {
    tokenColor: string;
    level: string;
}

function Swatch({ tokenColor, level }: SwatchProps): JSX.Element {
    return (
        <div
            className="flex-auto tc"
            style={{ background: tokens[`${tokenColor}`], height: '48px' }}
        >
            <span style={{ color: tokens[`${tokenColor}`] }}>{level}</span>
        </div>
    );
}

function renderColors({ usages }): JSX.Element {
    return (
        <div className="pt6">
            {Object.keys(usages)
                .map(key => {
                    return (
                        <div key={key} className="ba b-gray-300 pa5 br3 mb5">
                            <H2>{paletteColortMappings[key].title}</H2>
                            <P>{paletteColortMappings[key].description}</P>

                            <div className="flex flex-column l_flex-row row-gap4 col-gap4 ">
                                <div className="flex-auto tp-body-2">
                                    <div className="b">Suggested use</div>
                                    <Text className="pb3 black-300" size={2}>
                                        {paletteColortMappings[key].suggestedUse}
                                    </Text>

                                    <div className="br3 overflow-hidden mt2">
                                        {usages[key].map(component => {
                                            return <ColorSection values={component.values} />;
                                        })}
                                    </div>
                                </div>

                                <div style={{ minWidth: '375px' }}>
                                    <div className="tp-body-3 ttu">Examples</div>
                                    <img
                                        src={images[key].src.src}
                                        width="375px"
                                        alt={images[key].alt}
                                    />
                                </div>
                            </div>
                        </div>
                    );
                })
                .sort((a, b) => {
                    const colorOrder = {
                        neutral: 1,
                        blue: 2,
                        indigo: 3,
                        purple: 4,
                        green: 5,
                        red: 6,
                        yellow: 7,
                    };
                    if (!colorOrder[a.key] || !colorOrder[b.key]) {
                        throw new Error(`All colors must be defined in the \`colorOrder\` object.`);
                    }
                    return colorOrder[a.key] - colorOrder[b.key];
                })}
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

            {/* palette */}
            <div className="br3 overflow-hidden">
                <div className="flex tp-body-2 pt5">
                    <div className="flex-auto h-100 pb2 tr pr2 w1 content-center">
                        <span className="white">Neutral</span>
                    </div>
                    <div className="flex-auto h-100 pb2 tc pr2 content-center">
                        <span className="Black">100</span>
                    </div>
                    <div className="flex-auto h-100 pb2 tc pr2 content-center">
                        <span className="Black">200</span>
                    </div>
                    <div className="flex-auto h-100 pb2 tc pr2 content-center">
                        <span className="Black">300</span>
                    </div>
                    <div className="flex-auto h-100 pb2 tc pr2 content-center">
                        <span className="Black">Core</span>
                    </div>
                    <div className="flex-auto h-100 pb2 tc pr2 content-center">
                        <span className="Black">500</span>
                    </div>
                    <div className="flex-auto h-100 pb2 tc pr2 content-center">
                        <span className="Black">600</span>
                    </div>
                </div>
                <div className="flex">
                    <div className="flex-auto h3 tr pr2 content-center w1">
                        <span className="Black">Netural</span>
                    </div>
                    <Swatch level="100" tokenColor="tpColorWhite" />
                    <Swatch level="200" tokenColor="tpColorGray200" />
                    <Swatch level="300" tokenColor="tpColorGray300" />
                    <Swatch level="400" tokenColor="tpColorGray" />
                    <Swatch level="500" tokenColor="tpColorBlack300" />
                    <Swatch level="600" tokenColor="tpColorBlack" />
                </div>
                <div className="flex">
                    <div className="flex-auto h3 tr pr2 content-center w1">
                        <span className="blue-500">Blue</span>
                    </div>
                    <Swatch level="100" tokenColor="tpColorBlue100" />
                    <Swatch level="200" tokenColor="tpColorBlue200" />
                    <Swatch level="300" tokenColor="tpColorBlue300" />
                    <Swatch level="core" tokenColor="tpColorBlue" />
                    <Swatch level="500" tokenColor="tpColorBlue500" />
                    <Swatch level="600" tokenColor="tpColorBlue600" />
                </div>
                <div className="flex">
                    <div className="flex-auto h3 tr pr2 content-center w1">
                        <span className="green-500">Green</span>
                    </div>
                    <Swatch level="100" tokenColor="tpColorGreen100" />
                    <Swatch level="200" tokenColor="tpColorGreen200" />
                    <Swatch level="300" tokenColor="tpColorGreen300" />
                    <Swatch level="core" tokenColor="tpColorGreen" />
                    <Swatch level="500" tokenColor="tpColorGreen500" />
                    <Swatch level="600" tokenColor="tpColorGreen600" />
                </div>
                <div className="flex">
                    <div className="flex-auto h3 tr pr2 content-center w1">
                        <span className="yellow-600">Yellow</span>
                    </div>
                    <Swatch level="100" tokenColor="tpColorYellow100" />
                    <Swatch level="200" tokenColor="tpColorYellow200" />
                    <Swatch level="300" tokenColor="tpColorYellow300" />
                    <Swatch level="core" tokenColor="tpColorYellow" />
                    <Swatch level="500" tokenColor="tpColorYellow500" />
                    <Swatch level="600" tokenColor="tpColorYellow600" />
                </div>
                <div className="flex">
                    <div className="flex-auto h3 tr pr2 content-center w1">
                        <span className="red-500">Red</span>
                    </div>
                    <Swatch level="100" tokenColor="tpColorRed100" />
                    <Swatch level="200" tokenColor="tpColorRed200" />
                    <Swatch level="300" tokenColor="tpColorRed300" />
                    <Swatch level="core" tokenColor="tpColorRed" />
                    <Swatch level="500" tokenColor="tpColorRed500" />
                    <Swatch level="600" tokenColor="tpColorRed600" />
                </div>
                <div className="flex">
                    <div className="flex-auto h3 tr pr2 content-center w1">
                        <span className="indigo-500">Indigo</span>
                    </div>
                    <Swatch level="100" tokenColor="tpColorIndigo100" />
                    <Swatch level="200" tokenColor="tpColorIndigo200" />
                    <Swatch level="300" tokenColor="tpColorIndigo300" />
                    <Swatch level="core" tokenColor="tpColorIndigo" />
                    <Swatch level="500" tokenColor="tpColorIndigo500" />
                    <Swatch level="600" tokenColor="tpColorIndigo600" />
                </div>
                <div className="flex">
                    <div className="flex-auto h3 tr pr2 content-center w1">
                        <span className="purple-500">Purple</span>
                    </div>
                    <Swatch level="100" tokenColor="tpColorPurple100" />
                    <Swatch level="200" tokenColor="tpColorPurple200" />
                    <Swatch level="300" tokenColor="tpColorPurple300" />
                    <Swatch level="core" tokenColor="tpColorPurple" />
                    <Swatch level="500" tokenColor="tpColorPurple500" />
                    <Swatch level="600" tokenColor="tpColorPurple600" />
                </div>
            </div>

            {/* colors */}
            {renderColors({ usages })}
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
