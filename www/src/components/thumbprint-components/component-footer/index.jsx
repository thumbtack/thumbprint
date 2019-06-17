import React from 'react';
import PropTypes from 'prop-types';
import { Text } from '@thumbtack/thumbprint-react';
import { isString, get, find } from 'lodash';
import Tag from '../../tag';
import { MDXRenderer, InlineCode, H2, H3 } from '../../mdx';
import PropType from './prop-type';

const ComponentFooter = ({ data }) => {
    const { reactComponentProps } = data;

    if (!reactComponentProps) {
        return null;
    }

    return (
        <React.Fragment>
            <H2>Props</H2>
            {reactComponentProps.childrenComponentMetadata.map(component => (
                <div key={component.displayName}>
                    <H3>{component.displayName}</H3>
                    {component.description && (
                        <div className="mb3">
                            <MDXRenderer>{component.description.childMdx.code.body}</MDXRenderer>
                        </div>
                    )}
                    <ul>
                        {component.props.map(prop => {
                            const deprecated = find(prop.doclets, o => o.tag === 'deprecated');
                            console.log({ deprecated });

                            return (
                                <li className="bb b-gray-300 pv3" key={prop.name}>
                                    <div className="flex">
                                        <div className="b">
                                            <InlineCode shouldCopyToClipboard theme="plain">
                                                {prop.name}
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
                                            <MDXRenderer>
                                                {prop.description.childMdx.code.body}
                                            </MDXRenderer>
                                        )}

                                        {deprecated && isString(deprecated.value) && (
                                            <p>
                                                <b>Note:</b> {deprecated.value}
                                            </p>
                                        )}
                                    </div>
                                    <div className="flex">
                                        {prop.type && (
                                            <Text
                                                className="black-300 mr4 w-50 s_w-40 m_w-30 m_w-20"
                                                elementName="div"
                                            >
                                                <InlineCode theme="plain">Type</InlineCode>
                                                <div className="b">
                                                    <PropType
                                                        type={prop.type.name}
                                                        value={prop.type.value}
                                                    />
                                                </div>
                                            </Text>
                                        )}
                                        {get(prop.defaultValue, 'value') && (
                                            <Text className="black-300" elementName="div">
                                                <InlineCode theme="plain">Default</InlineCode>
                                                <div className="indigo b">
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
            ))}
        </React.Fragment>
    );
};

ComponentFooter.propTypes = {
    data: PropTypes.shape({
        reactComponentProps: PropTypes.shape({}),
    }).isRequired,
};

export default ComponentFooter;
