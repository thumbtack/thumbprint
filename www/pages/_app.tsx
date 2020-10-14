import React, { useState } from 'react';
import type { AppProps } from 'next/app';
import Link from 'next/link';
import cx from 'classnames';
import { TextInput, TextInputIcon } from '@thumbtack/thumbprint-react';
import ClickableBox from 'clickable-box';
import { NavigationSearchSmall, NavigationHamburgerMedium } from '@thumbtack/thumbprint-icons';
import { SideNavGroup, SideNavLink } from '../components/app/side-nav';
import '@thumbtack/thumbprint-global-css';
import '@thumbtack/thumbprint-atomic';
import 'docsearch.js/dist/npm/styles/main.scss';
import '../components/app/styles.scss';

function ThumbprintApp({ Component, pageProps }: AppProps): React.ReactElement {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isDocSearchInitialized, setIsDocSearchInitialized] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const docSearchId = 'algolia-search';

    return (
        <div className="flex">
            <div
                className={cx({
                    'bg-white w6 flex-column flex-none fixed h-100 z-1': true,
                    'dn l_flex': !isSidebarOpen,
                    flex: isSidebarOpen,
                })}
            >
                <header className="ph3 pv4 flex-none z-1 bb b-gray-300 bg-gray-200">
                    <Link href="/">
                        <a className="db mb3">
                            <img
                                src="/thumbprint-logo.svg"
                                alt="Thumbprint"
                                width="130px"
                                height="22px"
                            />
                        </a>
                    </Link>
                    <TextInput
                        type="search"
                        size="small"
                        placeholder="Search"
                        value={searchValue}
                        id={docSearchId}
                        innerLeft={
                            <TextInputIcon>
                                <NavigationSearchSmall />
                            </TextInputIcon>
                        }
                        onFocus={async (e): Promise<void> => {
                            // Get Algolia set up if it hasn't been set up already.
                            if (!isDocSearchInitialized) {
                                const { target } = e;
                                const docsearch = (await import('docsearch.js')).default;

                                docsearch({
                                    apiKey: 'e5314d1bc146a7d26433a00e2031794c',
                                    indexName: 'thumbprint',
                                    inputSelector: `#${docSearchId}`,
                                    transformData(suggestions) {
                                        if (process.env.NODE_ENV === 'production') {
                                            return suggestions;
                                        }

                                        return suggestions.map(suggestion => ({
                                            ...suggestion,
                                            url: suggestion.url.replace(
                                                'https://thumbprint.design/',
                                                'http://localhost:3000/',
                                            ),
                                        }));
                                    },
                                });

                                setIsDocSearchInitialized(true);
                                target.focus();
                            }
                        }}
                        onChange={(v): void => {
                            setSearchValue(v);
                        }}
                    />
                </header>
                <nav>
                    <ul>
                        <li>
                            <SideNavLink
                                title="Overview"
                                to="/overview/about"
                                level={1}
                                isActive={false}
                            >
                                <SideNavGroup level={2}>
                                    <SideNavLink
                                        title="About"
                                        level={2}
                                        to="/overview/about/"
                                        isActive={false}
                                    />
                                    <SideNavLink
                                        title="Accessibility"
                                        level={2}
                                        to="/overview/accessibility/"
                                        isActive={false}
                                    />
                                </SideNavGroup>
                            </SideNavLink>
                        </li>
                        <li>
                            <SideNavLink
                                title="Components"
                                to="/components"
                                level={1}
                                isActive={false}
                            />
                        </li>
                        <li>
                            <SideNavLink title="Atomic" to="/atomic" level={1} isActive={false} />
                        </li>
                        <li>
                            <SideNavLink
                                title="Tokens"
                                to="/tokens/scss"
                                level={1}
                                isActive={false}
                            >
                                <SideNavGroup level={2}>
                                    <SideNavLink
                                        title="SCSS"
                                        level={2}
                                        to="/tokens/scss/"
                                        isActive={false}
                                    />
                                    <SideNavLink
                                        title="JavaScript"
                                        level={2}
                                        to="/tokens/javascript/"
                                        isActive={false}
                                    />
                                    <SideNavLink
                                        title="iOS"
                                        level={2}
                                        to="/tokens/ios/"
                                        isActive={false}
                                    />
                                    <SideNavLink
                                        title="Android"
                                        level={2}
                                        to="/tokens/android/"
                                        isActive={false}
                                    />
                                </SideNavGroup>
                            </SideNavLink>
                        </li>
                    </ul>
                </nav>
            </div>
            <main className="flex-1 l_ml8">
                <ClickableBox
                    className="inline-flex pv3 ph4 pointer l_dn"
                    onClick={(): void => {
                        setIsSidebarOpen(true);
                    }}
                    aria-label="Open sidebar navigation"
                >
                    <NavigationHamburgerMedium />
                </ClickableBox>
                <Component {...pageProps} />
            </main>
        </div>
    );
}

export default ThumbprintApp;
