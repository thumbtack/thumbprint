import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { graphql } from 'gatsby';
import { camelCase, map, sortBy, groupBy } from 'lodash';
import { Text, Select } from '@thumbtack/thumbprint-react';
import { ScrollMarkerSection } from 'react-scroll-marker';
import Wrap from '../components/wrap';
import Container from '../components/container';
import PageHeader from '../components/page-header';
import { H2, InlineCode } from '../components/mdx';
import PackageTable from '../components/package-table';
import Tag from '../components/tag';
import TokenExample from '../components/thumbprint-tokens/token-example';
import { version, name } from '../../../packages/thumbprint-tokens/package.json';

const formatTokenFromId = {
    javascript: id => camelCase(id),
    scss: id => `$${id}`,
};

const importInstructions = {
    javascript: "import * as tokens from '@thumbtack/thumbprint-tokens';",
    scss: '@import "@thumbtack/thumbprint-tokens/dist/scss/_index";',
};

const TokenRow = ({ group, groupName, language }) => (
    <tr className="bb b-gray-300">
        <td colSpan="2">
            <table className="w-100 collapse tp-body-2">
                <tbody>
                    {map(group, (token, index) => (
                        <tr
                            key={token.id}
                            className={classNames({
                                'bb b-gray-300': groupName === 'null' && index !== group.length - 1,
                            })}
                        >
                            <td className="tl pv2" data-algolia="include">
                                {token.deprecated && <Tag type="deprecated" className="mr2" />}
                                <InlineCode theme="plain" shouldCopyToClipboard>
                                    {formatTokenFromId[language](token.id)}
                                </InlineCode>
                                {token.description && (
                                    <Text elementName="span" size={2} className="ml3 black-300">
                                        {token.description}
                                    </Text>
                                )}
                            </td>
                            <td className="tr pv2">
                                <TokenExample type={token.type}>{token.value.web}</TokenExample>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </td>
    </tr>
);

TokenRow.propTypes = {
    group: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    groupName: PropTypes.string.isRequired,
    language: PropTypes.oneOf(['scss', 'javascript']).isRequired,
};

class Page extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            language: 'scss',
        };

        this.onLanguageSelect = this.onLanguageSelect.bind(this);
    }

    onLanguageSelect(newLangauge) {
        this.setState({
            language: newLangauge,
        });
    }

    render() {
        const { data, location } = this.props;
        const { language } = this.state;

        // Sort alphabetically but with the "Deprecated" section last.
        const sectionEdges = sortBy(data.allThumbprintToken.edges, [
            section => section.node.name === 'Deprecated',
            'node.name',
        ]);

        return (
            <Container location={location} activeSection="Tokens">
                <Wrap>
                    <header className="flex items-start">
                        <PageHeader
                            pageTitle="Tokens"
                            metaTitle="Tokens"
                            description="Design variables that power Thumbtack’s UI."
                        />
                        <div className="flex ml-auto">
                            <Select value={language} onChange={this.onLanguageSelect} size="small">
                                <option value="scss">SCSS</option>
                                <option value="javascript">JavaScript</option>
                            </Select>
                        </div>
                    </header>

                    <PackageTable
                        version={version}
                        deprecated={false}
                        packageName={name}
                        importStatement={importInstructions[language]}
                        sourceDirectory="https://github.com/thumbtack/thumbprint/tree/master/packages/thumbprint-tokens"
                    />

                    {map(sectionEdges, sectionEdge => {
                        const section = sectionEdge.node;
                        const groupedTokens = groupBy(section.tokens, 'group');

                        return (
                            <div key={section.name}>
                                {section.tokens.length > 0 && (
                                    <ScrollMarkerSection id={section.name}>
                                        {({ id }) => (
                                            <section>
                                                <H2 id={id}>{section.name}</H2>
                                                {section.description && (
                                                    <p className="black-300 mb4">
                                                        {section.description}
                                                    </p>
                                                )}
                                                <table className="w-100 collapse tp-body-2">
                                                    <thead>
                                                        <tr className="bb b-gray-300">
                                                            <th className="tl pb2">Token Name</th>
                                                            <th className="tr pb2">Value</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {map(groupedTokens, (group, groupName) => (
                                                            <TokenRow
                                                                group={group}
                                                                groupName={groupName}
                                                                key={groupName}
                                                                language={language}
                                                            />
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </section>
                                        )}
                                    </ScrollMarkerSection>
                                )}
                            </div>
                        );
                    })}
                </Wrap>
            </Container>
        );
    }
}

Page.propTypes = {
    data: PropTypes.shape({
        allThumbprintToken: PropTypes.shape({
            edges: PropTypes.array,
        }),
    }).isRequired,
    location: PropTypes.shape({}).isRequired,
};

export default Page;

export const pageQuery = graphql`
    query Tokens {
        allThumbprintToken(sort: { order: ASC, fields: [name] }) {
            edges {
                node {
                    name
                    description
                    tokens {
                        id
                        name
                        type
                        description
                        deprecated
                        value {
                            web
                        }
                        group
                    }
                }
            }
        }
    }
`;
