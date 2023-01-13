import React from 'react';
import { Text } from '@thumbtack/thumbprint-react';
import { isString, get, find } from 'lodash';
import Tag from '../../tag/tag';
import { H2, H3 } from '../../mdx/components';
import PropType from './prop-type';
import InlineCode from '../../inline-code/inline-code';
import { ReactDocgenComponent } from './react-docgen-component';

export default function PropsTable({
    data,
    mdxRenderer,
}: {
    data: ReactDocgenComponent[];
    mdxRenderer: unknown;
}): JSX.Element | null {
    const MDXRenderer = mdxRenderer;

    return (
        <React.Fragment>
            <H2>Props</H2>
            {data.map(component => {
                console.log(component);

                return (
                    <div key={component.displayName} className="ph5 pb3 mb5 ba br2 b-gray-300">
                        <H3>{component.displayName}</H3>
                        {component.description && (
                            <div className="mb3">
                                <MDXRenderer>{component.description}</MDXRenderer>
                            </div>
                        )}
                        <ul>
                            {Object.keys(component.props)
                                .sort(
                                    (a, b) =>
                                        component.props[b].required - component.props[a].required,
                                )
                                .map(propName => {
                                    const prop = component.props[propName];

                                    const deprecated = find(
                                        prop.doclets,
                                        o => o.tag === 'deprecated',
                                    );

                                    return (
                                        <li className="pv4 bt b-gray-300" key={propName}>
                                            <div className="flex">
                                                <div className="b">
                                                    <InlineCode shouldCopyToClipboard theme="plain">
                                                        {propName}
                                                    </InlineCode>
                                                </div>
                                                {prop.required && (
                                                    <div className="ml2">
                                                        <Tag type="required" />
                                                    </div>
                                                )}
                                                {deprecated && (
                                                    <div className="ml2">
                                                        <Tag type="deprecated" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="black-300 mw8 mb2">
                                                {prop.description && (
                                                    <MDXRenderer>{prop.description}</MDXRenderer>
                                                )}

                                                {deprecated && isString(deprecated.value) && (
                                                    <p>
                                                        <b>Note:</b> {deprecated.value}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="flex">
                                                {prop.tsType && (
                                                    <Text
                                                        size={2}
                                                        className="mr4 w-50 s_w-40 m_w-30 m_w-20"
                                                        elementName="div"
                                                    >
                                                        <div className="b black-300">Type</div>
                                                        <PropType
                                                            type={prop.tsType.name}
                                                            value={prop.tsType.elements}
                                                        />
                                                    </Text>
                                                )}
                                                {get(prop.defaultValue, 'value') && (
                                                    <Text
                                                        size={2}
                                                        className="mr4 w-50 s_w-40 m_w-30 m_w-20"
                                                        elementName="div"
                                                    >
                                                        <div className="b black-300">Default</div>
                                                        <div className="black-300">
                                                            <InlineCode theme="plain">
                                                                {get(prop.defaultValue, 'value')}
                                                            </InlineCode>
                                                        </div>
                                                    </Text>
                                                )}
                                            </div>
                                        </li>
                                    );
                                })}
                        </ul>
                    </div>
                );
            })}
        </React.Fragment>
    );
}
