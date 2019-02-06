import { graphql } from 'gatsby';
import ComponentHeader from './component-header';
import ComponentFooter from './component-footer';
import DeprecatedComponentAlert from './deprecated-component-alert';

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

export { ComponentHeader, ComponentFooter, DeprecatedComponentAlert };

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
