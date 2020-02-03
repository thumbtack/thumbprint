import React from 'react';
import PropTypes from 'prop-types';
import { Text } from '@thumbtack/thumbprint-react';
import { isString } from 'lodash';
import Tag from '../tag';
import { InlineCode } from '../mdx';
import styles from './index.module.scss';

const APITable = ({ properties }) => (
    <ul>
        {properties
            .sort((a, b) => b.required - a.required)
            .map(({ name, deprecated, description, type, isRequired, defaultValue }) => (
                <li className="pv3" key={name}>
                    <div className="flex">
                        <div className="b">
                            <InlineCode shouldCopyToClipboard theme="plain">
                                {name}
                            </InlineCode>
                        </div>
                        {isRequired && (
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
                        {description}

                        {deprecated && isString(deprecated) && (
                            <p>
                                <b>Note:</b> {deprecated}
                            </p>
                        )}
                    </div>
                    <div className="flex">
                        <Text className="mr4 w-50 s_w-40 m_w-30 m_w-20" elementName="div">
                            <div className="b">Type</div>
                            <div className="black-300">
                                <InlineCode theme="plain">{type.name}</InlineCode>

                                {type.options && (
                                    <ul className={styles.unionPropType}>
                                        {type.options.map(t => (
                                            <li key={t}>
                                                <InlineCode theme="plain">{t}</InlineCode>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </Text>
                        {defaultValue && (
                            <div>
                                <div className="b">Default</div>
                                <div className="black-300">
                                    <InlineCode theme="plain">{defaultValue}</InlineCode>
                                </div>
                            </div>
                        )}
                    </div>
                </li>
            ))}
    </ul>
);

APITable.propTypes = {
    properties: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            description: PropTypes.node.isRequired,
            type: PropTypes.shape({
                name: PropTypes.string.isRequired,
                options: PropTypes.arrayOf(PropTypes.string),
            }),
            defaultValue: PropTypes.string,
            isRequired: PropTypes.bool,
            deprecated: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
        }),
    ).isRequired,
};

export default APITable;
