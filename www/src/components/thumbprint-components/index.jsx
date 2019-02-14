import { graphql } from 'gatsby';
import ComponentHeader from './component-header';
import ComponentFooter from './component-footer';
import DeprecatedComponentAlert from './deprecated-component-alert';

import '@thumbtack/thumbprint-scss';

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
