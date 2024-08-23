import React from 'react';
import { StaticImageData } from 'next/image';
import usageContentMappings from '../usage-mappings';
import ExampleBox from '../../../../components/example-box';
import { H2, P } from '../../../../components/mdx/components';

export default function UsageCategory({ usages, images }): JSX.Element {
    return (
        <div>
            {Object.keys(usages).map(key => {
                return (
                    <div key={key}>
                        <div className="mb4">
                            <H2>{usageContentMappings[key].title}</H2>
                            <P>{usageContentMappings[key].description}</P>
                        </div>
                        <table className="tp-body-2 black-300">
                            <tr className="bb b-gray-300">
                                <th className="tl pv2 pr4">Color</th>
                                <th className="tl pv2 pr4">Emphasis</th>
                                <th className="tl pv2 pr4">Interaction</th>
                                <th className="tl pv2 ">Description</th>
                            </tr>
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
                                                {component.values.color}
                                            </div>
                                        </td>
                                        <td className="v-top pv2 pr4">
                                            {component.values.emphasis}
                                        </td>
                                        <td className="v-top pv2 pr4">
                                            {component.values.interaction}
                                        </td>
                                        <td className="v-top pv2">
                                            {component.values.description}
                                        </td>
                                    </tr>
                                );
                            })}
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
            })}
        </div>
    );
}
