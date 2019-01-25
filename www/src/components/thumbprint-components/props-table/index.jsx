import React from 'react';
import PropTypes from 'prop-types';
import { get, map, reject, sortBy, isString } from 'lodash';
import { Text } from '@thumbtack/thumbprint-react';
import { InlineCode, MDXRenderer } from '../../mdx';
import Tag from '../../tag';

const PropType = ({ type, value }) => {
    if (type === 'enum') {
        const enumValues = map(value, 'value');

        return (
            <pre className="black-300">
                <InlineCode theme="plain">{`oneOf([
  ${enumValues.join(',\n  ')},
]);`}</InlineCode>
            </pre>
        );
    }

    return (
        <span className="black-300">
            <InlineCode theme="plain">{type}</InlineCode>
        </span>
    );
};

PropType.propTypes = {
    type: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.object), PropTypes.string]),
};

PropType.defaultProps = {
    value: undefined,
};

const PropsTable = ({ component }) => {
    const props = sortBy(reject(component.props, 'doclets.private'), ['name']);

    /* eslint-disable react/no-danger */
    return (
        <ul>
            {map(props, prop => (
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
                        {prop.doclets.deprecated && (
                            <div className="ml2">
                                <Tag type="deprecated" />
                            </div>
                        )}
                    </div>
                    <div className="black-300 mw8 mb2">
                        {prop.description && (
                            <MDXRenderer>{prop.description.childMdx.code.body}</MDXRenderer>
                        )}

                        {isString(prop.doclets.deprecated) && (
                            <p>
                                <b>Note:</b> {prop.doclets.deprecated}
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
                                    <PropType type={prop.type.name} value={prop.type.value} />
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
            ))}
        </ul>
    );
};

PropsTable.propTypes = {
    /**
     * Object from `gatsby-transformer-react-docgen`.
     */
    component: PropTypes.shape({}).isRequired,
};

export default PropsTable;
