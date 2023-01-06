import OutsideClickHandler from 'react-outside-click-handler';
import { ScrollMarkerContainer } from 'react-scroll-marker';
import React, { createContext, useRef, useState } from 'react';
import { TextInput, TextInputIcon } from '@thumbtack/thumbprint-react';
import ClickableBox from 'clickable-box';
import classNames from 'classnames';
import {
    NavigationSearchSmall,
    NavigationCloseSmall,
    NavigationHamburgerMedium,
} from '@thumbtack/thumbprint-icons';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../images/thumbprint-logo.svg';
import styles from './layout.module.scss';
import type { LayoutProps } from '../../utils/get-layout-props';
import SideNav, { SideNavGroup, SideNavLink } from '../side-nav/side-nav';
import DocSearch from '../doc-search/doc-search';

export const ActiveSectionContext = createContext<string | null | undefined>(null);

export default function Layout({
    activeSection,
    navigation,
    children,
}: LayoutProps & {
    children: React.ReactNode;
}): JSX.Element {
    const [searchValue, setSearchValue] = useState<string | undefined>(undefined);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const sidebarCloseEl = useRef();
    const sidebarOpenEl = useRef();

    return (
        <div className="flex h-100">
            <ActiveSectionContext.Provider value={activeSection}>
                <ScrollMarkerContainer>
                    <OutsideClickHandler
                        onOutsideClick={(): void => {
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
                                <Link href="/" className="db mb3">
                                    <Image
                                        src={logo}
                                        className="db"
                                        style={{ width: '130px', height: '22px' }}
                                        alt="Thumbprint logo"
                                    />
                                </Link>

                                <DocSearch>
                                    {({ id }): JSX.Element => (
                                        <TextInput
                                            type="search"
                                            size="small"
                                            placeholder="Search"
                                            onChange={(v): void => {
                                                setSearchValue(v);
                                            }}
                                            value={searchValue}
                                            id={id}
                                            innerLeft={
                                                <TextInputIcon>
                                                    <NavigationSearchSmall />
                                                </TextInputIcon>
                                            }
                                        />
                                    )}
                                </DocSearch>
                            </div>
                            <ClickableBox
                                className="pa2 absolute top0 right0 pointer l_dn z-1"
                                onClick={(): void => {
                                    setIsSidebarOpen(false);
                                }}
                                aria-label="Close sidebar navigation"
                                ref={sidebarCloseEl}
                            >
                                <NavigationCloseSmall className="db" />
                            </ClickableBox>

                            <SideNav>
                                {navigation.map(section => (
                                    <SideNavLink
                                        title={section.title}
                                        isActive={activeSection === section.title}
                                        href={section.href}
                                        key={section.href}
                                        level={1}
                                    >
                                        {section.groups.map((sectionGroup, i) => (
                                            // There's no unique identifier for the group, so we use the index.
                                            // eslint-disable-next-line react/no-array-index-key
                                            <SideNavGroup key={`${section.title}-${i}`} level={2}>
                                                {sectionGroup.map(groupItem =>
                                                    groupItem.sections ? (
                                                        <SideNavLink
                                                            title={groupItem.title}
                                                            level={2}
                                                            href={groupItem.href}
                                                            isActive={false}
                                                            key={groupItem.href}
                                                        >
                                                            <SideNavGroup level={3}>
                                                                {groupItem.sections?.map(
                                                                    sectionItem => (
                                                                        <SideNavLink
                                                                            title={
                                                                                sectionItem.title
                                                                            }
                                                                            href={sectionItem.href}
                                                                            key={sectionItem.href}
                                                                            level={3}
                                                                        />
                                                                    ),
                                                                )}
                                                            </SideNavGroup>
                                                        </SideNavLink>
                                                    ) : (
                                                        <SideNavLink
                                                            title={groupItem.title}
                                                            key={groupItem.href}
                                                            level={2}
                                                            href={groupItem.href}
                                                            isActive={false}
                                                        />
                                                    ),
                                                )}
                                            </SideNavGroup>
                                        ))}
                                    </SideNavLink>
                                ))}
                            </SideNav>
                        </div>
                    </OutsideClickHandler>
                    <div className="flex-1 l_ml8">
                        <ClickableBox
                            className="inline-flex pv3 ph4 pointer l_dn"
                            onClick={(): void => {
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
}
