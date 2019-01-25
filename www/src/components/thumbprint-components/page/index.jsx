import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { map, sortBy, get } from 'lodash';
import marked from 'marked';
import Container from '../../container';
import PageHeader from '../../page-header';
import Wrap from '../../wrap';
import PackageTable from '../../package-table';
import PropsTable from '../props-table';
import PlatformNav from '../platform-nav';
import platformOrder from '../platform-order';
import Alert from '../../alert';
import getImportStatement from '../get-import-statement';
import { MDXRenderer, H2, H3 } from '../../mdx';

const platforms = {
    usage: 'Usage',
    react: 'React',
    scss: 'SCSS',
};

const Page = props => {
    const { data, location } = props;

    // These are all of the data sources that we use to build the page.
    const { componentApi, kit, currentComponentPlatforms, packageJSON, componentFile } = data;

    const packageName = get(componentApi, 'frontmatter.package');
    const platform = get(componentApi, 'frontmatter.platform', 'usage');
    const packageDeprecated = get(componentApi, 'frontmatter.deprecated');

    const {
        name,
        description,
        deprecated: kitDeprecated,
        url: usageRulesUrl,
    } = kit.childMdx.frontmatter;
    const { version, homepage } = packageJSON || {};
    const { components } = componentFile || {};

    const unsortedPlatforms = currentComponentPlatforms.edges.map(p => ({
        name: platforms[p.node.frontmatter.platform],
        to: p.node.frontmatter.url,
    }));

    if (usageRulesUrl) {
        unsortedPlatforms.push({ name: 'Usage', to: usageRulesUrl });
    }

    // Sorted array of all the platforms this package is available in.
    const sortedPlatforms = sortBy(unsortedPlatforms, p => platformOrder[p.name.toLowerCase()]);

    const contents = get(componentApi, 'code.body') || get(kit, 'childMdx.code.body');

    /* eslint-disable react/no-danger */
    return (
        <Container location={location} activeSection="Components">
            <Wrap>
                {kitDeprecated && (
                    <Alert type="warning" title="Deprecated">
                        <span dangerouslySetInnerHTML={{ __html: marked(kitDeprecated) }} />
                    </Alert>
                )}

                {/* The `visually-hidden` code is used to add the platform to Algolia. */}
                <PageHeader
                    metaTitle={`${name} (${platforms[platform]})`}
                    pageTitle={
                        <span>
                            {name}
                            <span className="visually-hidden"> {`(${platforms[platform]})`}</span>
                        </span>
                    }
                    description={description}
                />

                <PlatformNav title={name} platforms={sortedPlatforms} />

                {packageName && (
                    <PackageTable
                        version={version}
                        deprecated={packageDeprecated}
                        // This is the URL to the component's folder on GitHub
                        sourceDirectory={`${homepage}components/${name.replace(/ /g, '')}`}
                        packageName={packageName}
                        importStatement={getImportStatement({ platform, components, packageName })}
                    />
                )}

                {!kitDeprecated && packageDeprecated && (
                    <Alert type="warning" title="Deprecated">
                        <span dangerouslySetInnerHTML={{ __html: marked(packageDeprecated) }} />
                    </Alert>
                )}

                {contents && <MDXRenderer>{contents}</MDXRenderer>}

                {components && (
                    <div>
                        <H2>Props</H2>
                        {map(components, component => (
                            <div key={component.displayName} className="mb6">
                                <H3>{component.displayName}</H3>
                                {component.description && (
                                    <div className="mb3">
                                        <MDXRenderer>
                                            {component.description.childMdx.code.body}
                                        </MDXRenderer>
                                    </div>
                                )}
                                <PropsTable component={component} />
                            </div>
                        ))}
                    </div>
                )}
            </Wrap>
        </Container>
    );
};

Page.propTypes = {
    data: PropTypes.shape({}).isRequired,
    location: PropTypes.shape({}).isRequired,
};

export default Page;

export const pageQuery = graphql`
    query(
        $url: String
        $package: String
        $pathToReactComponentFolder: String
        $kitPath: String!
        # This file is for React, SCSS, and also design guidelines. We don't have to (and can't)
        # load all of the data for the design pages since they don't have examples and don't
        # map to a 'package.json' file.
        $isDesignGuidelinesPage: Boolean!
    ) {
        # Data from the \`README.mdx\` file.
        componentApi: mdx(frontmatter: { url: { eq: $url } }) @skip(if: $isDesignGuidelinesPage) {
            code {
                body
            }
            frontmatter {
                platform
                package
                deprecated
            }
        }
        # Data about this package that is platform agnostic.
        kit: file(relativePath: { eq: $kitPath }) {
            childMdx {
                frontmatter {
                    name
                    description
                    url
                    deprecated
                }
                code {
                    body
                }
            }
        }
        # All of the platforms that this component is available in.
        currentComponentPlatforms: allMdx(filter: { frontmatter: { kit: { eq: $kitPath } } }) {
            edges {
                node {
                    frontmatter {
                        platform
                        url
                    }
                }
            }
        }
        # The current package's \`package.json\` file.
        packageJSON: thumbprintComponentPackageJson(name: { eq: $package })
            @skip(if: $isDesignGuidelinesPage) {
            name
            homepage
            version
        }
        # The main JSX file for this component.
        componentFile: file(
            relativeDirectory: { eq: $pathToReactComponentFolder }
            name: { eq: "index" }
            ext: { eq: ".jsx" }
        ) @skip(if: $isDesignGuidelinesPage) {
            components: childrenComponentMetadata {
                displayName
                description {
                    childMdx {
                        code {
                            body
                        }
                    }
                }
                doclets
                props {
                    name
                    required
                    doclets
                    defaultValue {
                        value
                        computed
                    }
                    description {
                        childMdx {
                            code {
                                body
                            }
                        }
                    }
                    type {
                        name
                        value
                    }
                }
            }
        }
    }
`;
