import React from 'react';
import PropTypes from 'prop-types';
import { Link, StaticQuery, graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import '@thumbtack/thumbprint-atomic';
import '@thumbtack/thumbprint-global-css';
import { Input, InputIcon } from '@thumbtack/thumbprint-react';
import { map } from 'lodash';
import { setConfig } from 'react-hot-loader';
import {
    NavigationSearchSmall,
    NavigationCloseSmall,
    NavigationHamburgerMedium,
} from '@thumbtack/thumbprint-icons';
import { ScrollMarkerContainer } from 'react-scroll-marker';
import ClickableBox from 'clickable-box';
import classNames from 'classnames';
import OutsideClickHandler from 'react-outside-click-handler';
// Polyfill for focus visible CSS
// https://caniuse.com/#feat=css-focus-visible
import 'focus-visible';
import SideNav, { SideNavSection, SideNavSectionGroup, SideNavSectionGroupLink } from './side-nav';
import thumbprintLogo from './thumbprintLogo.svg';
import DocSearch from './doc-search';
import getComponentsLinkProps from './get-component-link-props';
import generateSlug from '../generate-slug';
import styles from './index.module.scss';

// https://github.com/gatsbyjs/gatsby/issues/7209
// https://github.com/gaearon/react-hot-loader/issues/1034
setConfig({ logLevel: 'no-errors-please' });

const ActiveSectionContext = React.createContext(null);

class Container extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchValue: undefined,
            isSidebarOpen: false,
        };

        this.onSearchChange = this.onSearchChange.bind(this);
        this.showSidebar = this.showSidebar.bind(this);

        this.sidebarCloseEl = React.createRef();
        this.sidebarOpenEl = React.createRef();
    }

    onSearchChange(newValue) {
        this.setState({ searchValue: newValue });
    }

    showSidebar(isSidebarOpen) {
        this.setState({ isSidebarOpen }, () => {
            if (isSidebarOpen) {
                this.sidebarCloseEl.current.focus();
            } else {
                this.sidebarOpenEl.current.focus();
            }
        });
    }

    render() {
        const { children, location, activeSection } = this.props;
        const { searchValue, isSidebarOpen } = this.state;

        return (
            <div className="flex h-100">
                <ActiveSectionContext.Provider value={activeSection}>
                    <Helmet>
                        <title>Thumbprint</title>

                        <meta name="twitter:card" content="summary" />
                        <meta name="twitter:site" content="@thumbtackdesign" />
                        <meta name="twitter:title" content="Thumbprint" />

                        <meta property="og:title" content="Thumbprint" />

                        <style type="text/css">
                            {`
                            /*
                             * This sets global CSS on elements that Gatsby doesn't
                             * give us access to.
                             */
                            html,
                            body,
                            #root,
                            #___gatsby,
                            #___gatsby > div {
                                height: 100%;
                            }

                            /**
                             * https://github.com/WICG/focus-visible#2-update-your-css
                             */
                            .js-focus-visible :focus:not([data-focus-visible-added]) {
                                outline: none;
                            }
                        `}
                        </style>
                        <link
                            href="https://fonts.googleapis.com/css?family=Source+Code+Pro:500,700"
                            rel="stylesheet"
                        />
                    </Helmet>

                    <ScrollMarkerContainer>
                        <OutsideClickHandler
                            onOutsideClick={() => {
                                if (isSidebarOpen) {
                                    this.showSidebar(false);
                                }
                            }}
                        >
                            <div
                                className={classNames(styles.sidenav, {
                                    'bg-white w6 flex-column flex-none fixed h-100 z-1': true,
                                    'dn l_flex': !isSidebarOpen,
                                    flex: isSidebarOpen,
                                })}
                            >
                                <div className="pa4 flex-none z-1 bg-gray-200">
                                    <Link to="/" className="db mb3">
                                        <img
                                            src={thumbprintLogo}
                                            className="db"
                                            style={{ width: '130px', height: '22px' }}
                                            alt="Thumbprint logo"
                                        />
                                    </Link>

                                    <DocSearch>
                                        {({ id }) => (
                                            <Input
                                                type="search"
                                                size="small"
                                                placeholder="Search"
                                                onChange={this.onSearchChange}
                                                value={searchValue}
                                                id={id}
                                                innerLeft={
                                                    <InputIcon>
                                                        <NavigationSearchSmall />
                                                    </InputIcon>
                                                }
                                            />
                                        )}
                                    </DocSearch>
                                </div>
                                <ClickableBox
                                    className="pa2 absolute top0 right0 pointer l_dn z-1"
                                    onClick={() => {
                                        this.showSidebar(false);
                                    }}
                                    aria-label="Close sidebar navigation"
                                    ref={this.sidebarCloseEl}
                                >
                                    <NavigationCloseSmall className="db" />
                                </ClickableBox>

                                <StaticQuery
                                    query={graphql`
                                        query HeadingQuery {
                                            allAtomic: mdx(
                                                fileAbsolutePath: {
                                                    glob: "**/src/pages/atomic/index.mdx"
                                                }
                                            ) {
                                                headings(depth: h2) {
                                                    value
                                                }
                                            }
                                            allTokens: allThumbprintToken(
                                                sort: { order: ASC, fields: [name] }
                                                filter: { name: { ne: "Deprecated" } }
                                            ) {
                                                edges {
                                                    node {
                                                        name
                                                    }
                                                }
                                            }
                                            allGuides: allSitePage(
                                                filter: { path: { glob: "/guide/**" } }
                                                sort: { fields: context___frontmatter___title }
                                            ) {
                                                edges {
                                                    node {
                                                        path
                                                        context {
                                                            frontmatter {
                                                                title
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                            allComponents: allSitePage(
                                                filter: {
                                                    path: {
                                                        glob: "/components/*/*/"
                                                        nin: [
                                                            "/components/global-css/scss/"
                                                            "/components/mixins/scss/"
                                                        ]
                                                    }
                                                    context: {
                                                        frontmatter: { unlisted: { ne: true } }
                                                    }
                                                }
                                            ) {
                                                group(field: context___frontmatter___title) {
                                                    fieldValue
                                                    edges {
                                                        node {
                                                            path
                                                            context {
                                                                frontmatter {
                                                                    title
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    `}
                                    render={data => {
                                        const {
                                            allAtomic,
                                            allGuides,
                                            allTokens,
                                            allComponents,
                                        } = data;

                                        const { pathname, hash } = location;

                                        return (
                                            <SideNav pathName={pathname} hash={hash}>
                                                <SideNavSection
                                                    title="Overview"
                                                    isActive={activeSection === 'Overview'}
                                                >
                                                    <SideNavSectionGroup>
                                                        <SideNavSectionGroupLink
                                                            to="/overview/about/"
                                                            isActive={
                                                                pathname === '/overview/about/'
                                                            }
                                                        >
                                                            About
                                                        </SideNavSectionGroupLink>
                                                        <SideNavSectionGroupLink
                                                            to="/overview/accessibility/"
                                                            isActive={
                                                                pathname ===
                                                                '/overview/accessibility/'
                                                            }
                                                        >
                                                            Accessibility
                                                        </SideNavSectionGroupLink>
                                                        <SideNavSectionGroupLink
                                                            to="/overview/contributing/"
                                                            isActive={
                                                                pathname ===
                                                                '/overview/contributing/'
                                                            }
                                                        >
                                                            Contributing
                                                        </SideNavSectionGroupLink>
                                                        <SideNavSectionGroupLink
                                                            to="/overview/developers/"
                                                            isActive={
                                                                pathname === '/overview/developers/'
                                                            }
                                                        >
                                                            Developers
                                                        </SideNavSectionGroupLink>
                                                    </SideNavSectionGroup>
                                                </SideNavSection>

                                                <SideNavSection
                                                    title="Guidelines"
                                                    isActive={activeSection === 'Guidelines'}
                                                >
                                                    <SideNavSectionGroup>
                                                        {map(allGuides.edges, ({ node }) => (
                                                            <SideNavSectionGroupLink
                                                                to={node.path}
                                                                key={node.path}
                                                                isActive={node.path === pathname}
                                                            >
                                                                {node.context.frontmatter.title}
                                                            </SideNavSectionGroupLink>
                                                        ))}
                                                    </SideNavSectionGroup>
                                                </SideNavSection>

                                                <SideNavSection
                                                    title="Components"
                                                    isActive={activeSection === 'Components'}
                                                >
                                                    <SideNavSectionGroup>
                                                        <SideNavSectionGroupLink
                                                            to="/components/global-css/scss/"
                                                            isActive={
                                                                pathname ===
                                                                '/components/global-css/scss/'
                                                            }
                                                        >
                                                            Global CSS
                                                        </SideNavSectionGroupLink>
                                                        <SideNavSectionGroupLink
                                                            to="/components/mixins/scss/"
                                                            isActive={
                                                                pathname ===
                                                                '/components/mixins/scss/'
                                                            }
                                                        >
                                                            Mixins &amp; functions
                                                        </SideNavSectionGroupLink>
                                                    </SideNavSectionGroup>
                                                    <SideNavSectionGroup>
                                                        {map(allComponents.group, group => (
                                                            <SideNavSectionGroupLink
                                                                key={group.edges[0].node.path}
                                                                {...getComponentsLinkProps(
                                                                    group.edges,
                                                                    pathname,
                                                                )}
                                                            >
                                                                {group.fieldValue}
                                                            </SideNavSectionGroupLink>
                                                        ))}
                                                    </SideNavSectionGroup>
                                                </SideNavSection>

                                                <SideNavSection
                                                    title="Atomic"
                                                    isActive={activeSection === 'Atomic'}
                                                >
                                                    <SideNavSectionGroup>
                                                        <SideNavSectionGroupLink
                                                            to="/atomic/usage/"
                                                            isActive={pathname === '/atomic/usage/'}
                                                        >
                                                            Usage
                                                        </SideNavSectionGroupLink>
                                                    </SideNavSectionGroup>

                                                    <SideNavSectionGroup>
                                                        {map(
                                                            allAtomic.headings,
                                                            ({ value }, index) => (
                                                                <SideNavSectionGroupLink
                                                                    to={`/atomic/#${generateSlug({
                                                                        level: 'section',
                                                                        children: value,
                                                                    })}`}
                                                                    isFirstHashLink={index === 0}
                                                                    isActive={false}
                                                                    key={value}
                                                                >
                                                                    {value}
                                                                </SideNavSectionGroupLink>
                                                            ),
                                                        )}
                                                    </SideNavSectionGroup>
                                                </SideNavSection>

                                                <SideNavSection
                                                    title="Tokens"
                                                    isActive={activeSection === 'Tokens'}
                                                >
                                                    <SideNavSectionGroup>
                                                        {map(allTokens.edges, ({ node }, index) => (
                                                            <SideNavSectionGroupLink
                                                                to={`/tokens/scss/#${generateSlug({
                                                                    level: 'section',
                                                                    children: node.name,
                                                                })}`}
                                                                key={node.name}
                                                                isActive={pathname === false}
                                                                isFirstHashLink={index === 0}
                                                            >
                                                                {node.name}
                                                            </SideNavSectionGroupLink>
                                                        ))}
                                                    </SideNavSectionGroup>
                                                    <SideNavSectionGroup>
                                                        <SideNavSectionGroupLink
                                                            to={`/tokens/#${generateSlug({
                                                                level: 'section',
                                                                children: 'deprecated',
                                                            })}`}
                                                            isActive={pathname === false}
                                                        >
                                                            Deprecated
                                                        </SideNavSectionGroupLink>
                                                    </SideNavSectionGroup>
                                                </SideNavSection>

                                                <SideNavSection
                                                    title="Icons"
                                                    to="/icons/"
                                                    isActive={activeSection === 'Icons'}
                                                />

                                                <SideNavSection
                                                    title="Updates"
                                                    isActive={activeSection === 'Updates'}
                                                >
                                                    <SideNavSectionGroup>
                                                        <SideNavSectionGroupLink
                                                            to="/updates/graveyard/"
                                                            isActive={
                                                                pathname === '/updates/graveyard/'
                                                            }
                                                        >
                                                            Graveyard
                                                        </SideNavSectionGroupLink>
                                                        <SideNavSectionGroupLink
                                                            to="/updates/notes/"
                                                            isActive={pathname.startsWith(
                                                                '/updates/notes/',
                                                            )}
                                                        >
                                                            Release Notes
                                                        </SideNavSectionGroupLink>
                                                        <SideNavSectionGroupLink
                                                            to="/updates/roadmap/"
                                                            isActive={
                                                                pathname === '/updates/roadmap/'
                                                            }
                                                        >
                                                            Roadmap
                                                        </SideNavSectionGroupLink>
                                                    </SideNavSectionGroup>
                                                </SideNavSection>

                                                <SideNavSection
                                                    title="Help"
                                                    to="/help/"
                                                    isActive={activeSection === 'Help'}
                                                />
                                            </SideNav>
                                        );
                                    }}
                                />
                            </div>
                        </OutsideClickHandler>

                        <div className="flex-1 l_ml8">
                            <ClickableBox
                                className="inline-flex pv3 ph4 pointer l_dn"
                                onClick={() => {
                                    this.showSidebar(true);
                                }}
                                aria-label="Open sidebar navigation"
                                ref={this.sidebarOpenEl}
                            >
                                <NavigationHamburgerMedium />
                            </ClickableBox>

                            {children}
                        </div>
                    </ScrollMarkerContainer>
                </ActiveSectionContext.Provider>
            </div>
        );
    }
}

Container.propTypes = {
    children: PropTypes.node,
    location: PropTypes.shape({}).isRequired,
    activeSection: PropTypes.oneOf([
        'Overview',
        'Guidelines',
        'Components',
        'Atomic',
        'Tokens',
        'Icons',
        'Updates',
        'Help',
    ]),
};

Container.defaultProps = {
    children: undefined,
    activeSection: undefined,
};

export default Container;
export { ActiveSectionContext };
