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
import { paletteColortMappings } from '../../../utils/guidelines/color/color-usage-mappings';
import { Color, Image, Usage } from '../../../utils/guidelines/color/color-usage-types';

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

function TokenPill({ fill, title, value }: ColoredPillProps): JSX.Element {
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

function ColorSection({ values }: { values: Color['values'] }): JSX.Element {
    // opens single color per section open by default
    const isOpen = values.level === '400' || values.color === 'White';
    const [isActive, setIsActive] = useState(isOpen);

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
                onClick={(): void => setIsActive(!isActive)}
            >
                <div className="flex-auto tp-body-2">
                    <span className="pr2">{values.color.replace('400', '')}</span>
                    {values.level === '400' ? (
                        <CoreColorPill tokenColor={values.javascript} />
                    ) : null}
                </div>
                {!isActive ? <NavigationCaretDownSmall /> : <NavigationCaretUpSmall />}
            </ClickableBox>
            {/* end clickable region */}
            <div
                className={classNames('ph3', {
                    'h-0 overflow-hidden': !isActive,
                    'h-auto pb3 ': isActive,
                })}
            >
                {/* body content */}
                <div className="pb3">
                    <ul style={{ listStyle: 'bullet' }} className="ml3">
                        {values.description.split('\n').map(item => {
                            return <li key={item.replace(' ', '-')}>{item}</li>;
                        })}
                    </ul>
                </div>
                {/* tokens */}
                <div className="flex flex-row col-gap2 row-gap2 flex-wrap mv3">
                    <TokenPill
                        title="Hex"
                        value={values['light-hex']}
                        fill={values['pill-color']}
                    />
                    <TokenPill
                        title="Javascript"
                        value={values.javascript}
                        fill={values['pill-color']}
                    />
                    <TokenPill title="Android" value={values.android} fill={values['pill-color']} />
                    <TokenPill title="scss" value={values.scss} fill={values['pill-color']} />
                </div>
            </div>
        </div>
    );
}

function renderColors({ usages }: { usages: Usage[] }): JSX.Element {
    return (
        <div className="pt4">
            {Object.keys(usages)
                .map(key => {
                    return (
                        <div key={key} className="ba b-gray-300 pa5 br3 mb5">
                            <H2 atomicClasses="mt1">{paletteColortMappings[key].title}</H2>
                            <P>{paletteColortMappings[key].description}</P>

                            <div className="flex flex-column l_flex-row row-gap4 col-gap4 ">
                                <div className="flex-auto tp-body-2">
                                    <div className="b">Suggested use</div>
                                    <Text className="pb3 black-300" size={2}>
                                        {paletteColortMappings[key].suggestedUse}
                                    </Text>

                                    <div className="br3 overflow-hidden mt2">
                                        {usages[key]
                                            .map((component: Usage) => {
                                                return (
                                                    <ColorSection
                                                        values={component.values}
                                                        key={component.name}
                                                    />
                                                );
                                            })
                                            .reverse()}
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

function CoreColorPill({ tokenColor }: { tokenColor: string }): JSX.Element {
    const bgColor = tokens[`tpColor${tokenColor?.replace('tpColor', '')}500`];
    return (
        <span
            className="white br-pill pv1 ph3 tp-body-2"
            style={{
                background: bgColor,
            }}
        >
            core
        </span>
    );
}

export default function Palette({
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
