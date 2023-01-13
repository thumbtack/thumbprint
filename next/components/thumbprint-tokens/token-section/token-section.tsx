import React from 'react';
import { Text } from '@thumbtack/thumbprint-react';
import classNames from 'classnames';
import { groupBy } from 'lodash-es';

import TokenExample from './token-example/token-example';
import Tag from '../../tag/tag';
import { H2, P, InlineCode } from '../../mdx/mdx';

interface Token {
    deprecated: boolean | null;
    format: 'color' | null;
    group: string | null;
    platforms: Record<
        string,
        {
            value: string;
            name: string;
            description: string | null;
        }
    >;
}

export interface TokenCategory {
    name: string;
    description: string | null;
    tokens: Token[];
}

interface TokenSectionProps {
    platform: string;
    section: TokenCategory;
}

export default function TokenSection({ section, platform }: TokenSectionProps): JSX.Element {
    // Group tokens based on their optional `group` field.
    const groupedTokens = groupBy(section.tokens, x => x.group);

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
                    {Object.entries(groupedTokens).map(([groupName, group]) => (
                        <tr className="bb b-gray-300" key={groupName}>
                            <td colSpan={2}>
                                <table className="w-100 collapse tp-body-2">
                                    <tbody>
                                        {group.map((token, index) => {
                                            // Get the platform specific token data.
                                            const tokenPlatformValues = token.platforms[platform];

                                            return (
                                                <tr
                                                    key={tokenPlatformValues.name}
                                                    className={classNames({
                                                        'bb b-gray-300':
                                                            groupName === 'null' &&
                                                            index !== group.length - 1,
                                                    })}
                                                >
                                                    <td className="tl pv2" data-algolia="include">
                                                        {token.deprecated && (
                                                            <Tag
                                                                type="deprecated"
                                                                className="mr2"
                                                            />
                                                        )}
                                                        <InlineCode
                                                            theme="plain"
                                                            shouldCopyToClipboard
                                                        >
                                                            {platform === 'ios'
                                                                ? `${section.name}.${tokenPlatformValues.name}`
                                                                : tokenPlatformValues.name}
                                                        </InlineCode>
                                                        {tokenPlatformValues.description && (
                                                            <Text
                                                                size={3}
                                                                className="black-300 mt1"
                                                            >
                                                                {tokenPlatformValues.description}
                                                            </Text>
                                                        )}
                                                    </td>
                                                    <td className="tr pv2">
                                                        <TokenExample
                                                            format={token.format}
                                                            exampleData={
                                                                token.platforms.javascript &&
                                                                token.platforms.javascript.value
                                                            }
                                                            displayText={tokenPlatformValues.value}
                                                        />
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
