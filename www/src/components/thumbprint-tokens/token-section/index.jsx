import React from 'react';
import PropTypes from 'prop-types';
import { Text } from '@thumbtack/thumbprint-react';
import classNames from 'classnames';
import { groupBy, map } from 'lodash';
import TokenExample from './token-example';
import Tag from '../../tag';
import { H2, P, InlineCode } from '../../mdx';

const TokenSection = ({ section, formatId, formatValue, platform }) => {
    // Filter out tokens that are not part of this platform.
    const currentPlatformTokens = section.tokens.filter(token => token.value[platform]);

    // Group tokens based on their optional `group` field.
    const groupedTokens = groupBy(currentPlatformTokens, 'group');

    return (
        <div key={section.name}>
            <H2>{section.name}</H2>
            {section.description && <P>{section.description}</P>}
            <table className="w-100 collapse tp-body-2">
                <thead>
                    <tr className="bb b-gray-300">
                        <th className="tl pb2">Token Name</th>
                        <th className="tr pb2">Value</th>
                    </tr>
                </thead>
                <tbody>
                    {map(groupedTokens, (group, groupName) => (
                        <tr className="bb b-gray-300" key={groupName}>
                            <td colSpan="2">
                                <table className="w-100 collapse tp-body-2">
                                    <tbody>
                                        {map(group, (token, index) => (
                                            <tr
                                                key={token.id}
                                                className={classNames({
                                                    'bb b-gray-300':
                                                        groupName === 'null' &&
                                                        index !== group.length - 1,
                                                })}
                                            >
                                                <td className="tl pv2" data-algolia="include">
                                                    {token.deprecated && (
                                                        <Tag type="deprecated" className="mr2" />
                                                    )}
                                                    <InlineCode theme="plain" shouldCopyToClipboard>
                                                        {formatId(token.id)}
                                                    </InlineCode>
                                                    {token.description &&
                                                        token.description[platform] && (
                                                            <Text
                                                                size={3}
                                                                className="black-300 mt1"
                                                            >
                                                                {token.description[platform]}
                                                            </Text>
                                                        )}
                                                </td>
                                                <td className="tr pv2">
                                                    <TokenExample
                                                        type={token.type}
                                                        data={token.value.web}
                                                        displayText={formatValue(token.value)}
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

TokenSection.propTypes = {
    section: PropTypes.shape({}).isRequired,
    platform: PropTypes.oneOf(['web', 'ios']).isRequired,
    /**
     * Function that gets run on the token `id`, transforming the string into the variable name
     * for that platform.
     */
    formatId: PropTypes.func.isRequired,
    /**
     * Function that gets run on the token `value`, transforming the string into the variable name
     * for that platform.
     */
    formatValue: PropTypes.func.isRequired,
};

export default TokenSection;
