import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { Text } from '@thumbtack/thumbprint-react';
import { isString, get } from 'lodash';
import Tag from '../tag';
import PropType from './prop-type';
import PlatformNav from './platform-nav';
import ComponentPackageTable from './component-package-table';
import { MDXRenderer, InlineCode, H2, H3 } from '../mdx';

import '@thumbtack/tp-ui-component-alert';
import '@thumbtack/tp-ui-component-avatar';
import '@thumbtack/tp-ui-component-form-note';
import '@thumbtack/tp-ui-component-loader';
import '@thumbtack/tp-ui-element-button';
import '@thumbtack/tp-ui-element-checkbox';
import '@thumbtack/tp-ui-element-fieldset';
import '@thumbtack/tp-ui-element-hr';
import '@thumbtack/tp-ui-element-img';
import '@thumbtack/tp-ui-element-input';
import '@thumbtack/tp-ui-element-label';
import '@thumbtack/tp-ui-element-link';
import '@thumbtack/tp-ui-element-list';
import '@thumbtack/tp-ui-element-radio';
import '@thumbtack/tp-ui-element-select';
import '@thumbtack/tp-ui-element-table';
import '@thumbtack/tp-ui-element-textarea';
import '@thumbtack/tp-ui-element-type';
import '@thumbtack/tp-ui-layout-block-list';
import '@thumbtack/tp-ui-layout-button-row';
import '@thumbtack/tp-ui-layout-form';
import '@thumbtack/tp-ui-layout-grid';
import '@thumbtack/tp-ui-layout-input-row';
import '@thumbtack/tp-ui-layout-longread';
import '@thumbtack/tp-ui-layout-wrap';

const ComponentHeader = ({ data, deprecated }) => {
    const { platformNav: platformNavQueryResults, packageTable, reactComponentProps } = data;

    return (
        <React.Fragment>
            <PlatformNav platformNavQueryResults={platformNavQueryResults} />

            {packageTable && (
                <ComponentPackageTable
                    components={
                        reactComponentProps
                            ? reactComponentProps.childrenComponentMetadata
                            : undefined
                    }
                    deprecated={deprecated}
                    name={packageTable.name}
                    version={packageTable.version}
                    homepage={packageTable.homepage}
                />
            )}
        </React.Fragment>
    );
};

ComponentHeader.propTypes = {
    data: PropTypes.shape({
        platformNav: PropTypes.shape({}).isRequired,
        packageTable: PropTypes.shape({}),
        reactComponentProps: PropTypes.shape({}),
    }).isRequired,
    deprecated: PropTypes.bool,
};

ComponentHeader.defaultProps = {
    deprecated: false,
};

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
                        {component.props.map(prop => (
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
                                        <MDXRenderer>
                                            {prop.description.childMdx.code.body}
                                        </MDXRenderer>
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
                        ))}
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

export { ComponentHeader, ComponentFooter };

/**
 * These fragments allow us to not have to define these fields on each component MDX page.
 */
export const query = graphql`
    fragment PlatformNavFragment on SitePage {
        path
    }
    fragment PackageTableFragment on Json {
        name
        version
        homepage
    }
    fragment ReactComponentPropsFragment on File {
        childrenComponentMetadata {
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
`;
