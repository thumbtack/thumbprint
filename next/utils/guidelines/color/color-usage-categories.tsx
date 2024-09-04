import React from 'react';
import usageContentMappings from './color-usage-mappings';
import ExampleBox from '../../../components/example-box';
import { H2, P } from '../../../components/mdx/components';
import { Usage, Image } from './color-usage-types';

function showInteractionColumn(usages: [Usage]): number {
    return usages.filter(item => item.values.interaction !== '').length;
}

export default function UsageCategory({
    usages,
    images,
}: {
    usages: Usage[];
    images: Image[];
}): JSX.Element {
    return (
        <div>
            {Object.keys(usages)
                .map(key => {
                    return (
                        <div key={key}>
                            {usageContentMappings[key] ? (
                                <div className="mb4">
                                    <H2>{usageContentMappings[key].title}</H2>
                                    <P>{usageContentMappings[key].description}</P>
                                </div>
                            ) : (
                                <div className="visually-hidden">
                                    Add missing {key} to usage content mapping
                                </div>
                            )}

                            <table className="tp-body-2 black-300">
                                <thead>
                                    <tr className="bb b-gray-300">
                                        <th className="tl pv2 pr4">Color</th>
                                        <th className="tl pv2 pr4">Emphasis</th>
                                        {showInteractionColumn(usages[key]) > 0 ? (
                                            <th className="tl pv2 pr4">Interaction</th>
                                        ) : null}
                                        <th className="tl pv2 ">Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {usages[key].map(component => {
                                        return (
                                            <tr className="bb b-gray-300" key={component}>
                                                <td className="v-top pv2 pr4 s_nowrap">
                                                    <div>
                                                        <span
                                                            className="w1 h1 mr2 dib relative top-3 br2 b-gray-300 ba"
                                                            style={{
                                                                background: `${component.values['light-hex']}`,
                                                            }}
                                                        />
                                                        {component.values.color.replace('400', '')}
                                                    </div>
                                                </td>
                                                <td className="v-top pv2 pr4">
                                                    {component.values.emphasis}
                                                </td>
                                                {showInteractionColumn(usages[key]) > 0 ? (
                                                    <td className="v-top pv2 pr4">
                                                        {component.values.interaction}
                                                    </td>
                                                ) : null}
                                                <td className="v-top pv2">
                                                    {component.values.description}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                            {images[key] ? (
                                <div className="pt3">
                                    <span className="tp-body-3 black-300 ttu">Examples</span>
                                    <ExampleBox>
                                        <div className="tc" style={{ minWidth: '375px' }}>
                                            <img
                                                src={images[key].src.src}
                                                width="375px"
                                                alt={images[key].alt}
                                            />
                                        </div>
                                    </ExampleBox>
                                </div>
                            ) : null}
                        </div>
                    );
                })
                .sort((a, b) => {
                    const themeOrder = {
                        neutral: 1,
                        primary: 2,
                        guidance: 3,
                        accent: 4,
                        success: 5,
                        alert: 6,
                        caution: 7,
                        input: 8,
                    };
                    if (!themeOrder[a.key] || !themeOrder[b.key]) {
                        throw new Error(`All themes must be defined in the \`themeOrder\` object.`);
                    }
                    return themeOrder[a.key] - themeOrder[b.key];
                })}
        </div>
    );
}
