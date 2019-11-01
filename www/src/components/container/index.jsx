import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Link, graphql, useStaticQuery } from 'gatsby';
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
import SideNav, { SideNavLink, SideNavGroup } from './side-nav';
import thumbprintLogo from './thumbprintLogo.svg';
import DocSearch from './doc-search';
import getComponentsLinkProps from './get-component-link-props';
import generateSlug from '../generate-slug';
import styles from './index.module.scss';

// https://github.com/gatsbyjs/gatsby/issues/7209
// https://github.com/gaearon/react-hot-loader/issues/1034
setConfig({ logLevel: 'no-errors-please' });

const ActiveSectionContext = React.createContext(null);

const Container = ({ children, location, activeSection }) => {
    const [searchValue, setSearchValue] = useState(undefined);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const sidebarCloseEl = useRef();
    const sidebarOpenEl = useRef();

    const data = useStaticQuery(graphql`
        query HeadingQuery {
            allAtomic: mdx(fileAbsolutePath: { glob: "**/src/pages/atomic/index.mdx" }) {
                headings(depth: h2) {
                    value
                }
            }
            allScssTokens: thumbprintToken {
                categories(platform: "scss") {
                    name
                }
            }
            allJavaScriptTokens: thumbprintToken {
                categories(platform: "javascript") {
                    name
                }
            }
            allIosTokens: thumbprintToken {
                categories(platform: "ios") {
                    name
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
                            "/components/overview/"
                            "/components/global-css/scss/"
                            "/components/mixins/scss/"
                        ]
                    }
                    context: { frontmatter: { unlisted: { ne: true } } }
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
    `);

    const {
        allAtomic,
        allGuides,
        allScssTokens,
        allJavaScriptTokens,
        allIosTokens,
        allComponents,
    } = data;
    const { pathname, hash } = location;

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
                                setIsSidebarOpen(false);
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
                            <div className="ph3 pv4 flex-none z-1 bb b-gray-300 bg-gray-200">
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
                                            onChange={v => {
                                                setSearchValue(v);
                                            }}
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
                                    setIsSidebarOpen(false);
                                }}
                                aria-label="Close sidebar navigation"
                                ref={sidebarCloseEl}
                            >
                                <NavigationCloseSmall className="db" />
                            </ClickableBox>

                            <SideNav pathName={pathname} hash={hash}>
                                <SideNavLink
                                    title="Overview"
                                    isActive={activeSection === 'Overview'}
                                    to="/overview/about/"
                                    level={1}
                                >
                                    <SideNavGroup level={2}>
                                        <SideNavLink
                                            title="About"
                                            level={2}
                                            to="/overview/about/"
                                            isActive={pathname === '/overview/about/'}
                                        />
                                        <SideNavLink
                                            title="Accessibility"
                                            level={2}
                                            to="/overview/accessibility/"
                                            isActive={pathname === '/overview/accessibility/'}
                                        />
                                        <SideNavLink
                                            title="Contributing"
                                            level={2}
                                            to="/overview/contributing/"
                                            isActive={pathname === '/overview/contributing/'}
                                        />
                                        <SideNavLink
                                            title="Developers"
                                            level={2}
                                            to="/overview/developers/"
                                            isActive={pathname === '/overview/developers/'}
                                        />
                                    </SideNavGroup>
                                </SideNavLink>

                                <SideNavLink
                                    title="Guidelines"
                                    isActive={activeSection === 'Guidelines'}
                                    to={allGuides.edges[0].node.path}
                                    level={1}
                                >
                                    <SideNavGroup level={2}>
                                        {map(allGuides.edges, ({ node }) => (
                                            <SideNavLink
                                                title={node.context.frontmatter.title}
                                                level={2}
                                                to={node.path}
                                                key={node.path}
                                                isActive={node.path === pathname}
                                            />
                                        ))}
                                    </SideNavGroup>
                                </SideNavLink>

                                <SideNavLink
                                    title="Components"
                                    isActive={activeSection === 'Components'}
                                    to="/components/overview/"
                                    level={1}
                                >
                                    <SideNavGroup level={2}>
                                        <SideNavLink
                                            title="Overview"
                                            level={2}
                                            to="/components/overview/"
                                            isActive={pathname === '/components/overview/'}
                                        />
                                        <SideNavLink
                                            title="Global CSS"
                                            level={2}
                                            to="/components/global-css/scss/"
                                            isActive={pathname === '/components/global-css/scss/'}
                                        />
                                        <SideNavLink
                                            title="Mixins"
                                            level={2}
                                            to="/components/mixins/scss/"
                                            isActive={pathname === '/components/mixins/scss/'}
                                        />
                                    </SideNavGroup>
                                    <SideNavGroup level={2}>
                                        {map(allComponents.group, group => (
                                            <SideNavLink
                                                title={group.fieldValue}
                                                level={2}
                                                key={group.edges[0].node.path}
                                                {...getComponentsLinkProps(group.edges, pathname)}
                                            />
                                        ))}
                                    </SideNavGroup>
                                </SideNavLink>

                                <SideNavLink
                                    title="Atomic"
                                    isActive={activeSection === 'Atomic'}
                                    to="/atomic/"
                                    level={1}
                                >
                                    <SideNavGroup level={2}>
                                        <SideNavLink
                                            title="Usage"
                                            level={2}
                                            to="/atomic/usage/"
                                            isActive={pathname === '/atomic/usage/'}
                                        />
                                    </SideNavGroup>

                                    <SideNavGroup level={2}>
                                        {map(allAtomic.headings, ({ value }) => (
                                            <SideNavLink
                                                title={value}
                                                level={2}
                                                to={`/atomic/#${generateSlug({
                                                    level: 'section',
                                                    children: value,
                                                })}`}
                                                isActive={false}
                                                key={value}
                                            />
                                        ))}
                                    </SideNavGroup>
                                </SideNavLink>

                                <SideNavLink
                                    title="Tokens"
                                    isActive={activeSection === 'Tokens'}
                                    to="/tokens/scss/"
                                    level={1}
                                >
                                    <SideNavGroup level={2}>
                                        <SideNavLink
                                            title="SCSS"
                                            to="/tokens/scss/"
                                            level={2}
                                            isActive={pathname.startsWith('/tokens/scss/')}
                                        >
                                            <SideNavGroup level={3}>
                                                {map(allScssTokens.categories, category => (
                                                    <SideNavLink
                                                        title={category.name}
                                                        to={`/tokens/scss/#${generateSlug({
                                                            level: 'section',
                                                            children: category.name,
                                                        })}`}
                                                        key={category.name}
                                                        level={3}
                                                    />
                                                ))}
                                            </SideNavGroup>
                                        </SideNavLink>
                                        <SideNavLink
                                            title="JavaScript"
                                            to="/tokens/javascript/"
                                            level={2}
                                            isActive={pathname.startsWith('/tokens/javascript/')}
                                        >
                                            <SideNavGroup level={3}>
                                                {map(allJavaScriptTokens.categories, category => (
                                                    <SideNavLink
                                                        title={category.name}
                                                        to={`/tokens/javascript/#${generateSlug({
                                                            level: 'section',
                                                            children: category.name,
                                                        })}`}
                                                        key={category.name}
                                                        level={3}
                                                    />
                                                ))}
                                            </SideNavGroup>
                                        </SideNavLink>
                                        <SideNavLink
                                            title="iOS"
                                            to="/tokens/ios/"
                                            level={2}
                                            isActive={pathname.startsWith('/tokens/ios/')}
                                        >
                                            <SideNavGroup level={3}>
                                                {map(allIosTokens.categories, category => (
                                                    <SideNavLink
                                                        title={category.name}
                                                        to={`/tokens/ios/#${generateSlug({
                                                            level: 'section',
                                                            children: category.name,
                                                        })}`}
                                                        key={category.name}
                                                        level={3}
                                                    />
                                                ))}
                                            </SideNavGroup>
                                        </SideNavLink>
                                    </SideNavGroup>
                                </SideNavLink>

                                <SideNavLink
                                    title="Icons"
                                    to="/icons/"
                                    isActive={activeSection === 'Icons'}
                                    level={1}
                                />

                                <SideNavLink
                                    title="Updates"
                                    isActive={activeSection === 'Updates'}
                                    to="/updates/notes/"
                                    level={1}
                                >
                                    <SideNavGroup level={2}>
                                        <SideNavLink
                                            title="Release Notes"
                                            level={2}
                                            to="/updates/notes/"
                                            isActive={pathname.startsWith('/updates/notes/')}
                                        />
                                        <SideNavLink
                                            title="Roadmap"
                                            level={2}
                                            to="/updates/roadmap/"
                                            isActive={pathname === '/updates/roadmap/'}
                                        />
                                    </SideNavGroup>
                                </SideNavLink>

                                <SideNavLink
                                    title="Help"
                                    to="/help/"
                                    isActive={activeSection === 'Help'}
                                    level={1}
                                />
                            </SideNav>
                        </div>
                    </OutsideClickHandler>

                    <div className="flex-1 l_ml8">
                        <ClickableBox
                            className="inline-flex pv3 ph4 pointer l_dn"
                            onClick={() => {
                                setIsSidebarOpen(true);
                            }}
                            aria-label="Open sidebar navigation"
                            ref={sidebarOpenEl}
                        >
                            <NavigationHamburgerMedium />
                        </ClickableBox>

                        {children}
                    </div>
                </ScrollMarkerContainer>
            </ActiveSectionContext.Provider>
        </div>
    );
};

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
