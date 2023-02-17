import OutsideClickHandler from 'react-outside-click-handler';
import { ScrollMarkerContainer } from 'react-scroll-marker';
import React, { useRef, useState } from 'react';
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
import { useRouter } from 'next/router';
import logo from '../../images/thumbprint-logo.svg';
import styles from './layout.module.scss';
import type { LayoutProps } from '../../utils/get-layout-props';
import SideNav, { SideNavGroup, SideNavLink } from '../side-nav/side-nav';
import DocSearch from '../doc-search/doc-search';

export default function Layout({
    navigation,
    children,
}: LayoutProps & {
    children: React.ReactNode;
}): JSX.Element {
    const router = useRouter();
    const [searchValue, setSearchValue] = useState<string | undefined>(undefined);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const sidebarCloseEl = useRef();
    const sidebarOpenEl = useRef();
    const pathWithoutHash = router.asPath.split('#')[0];

    return (
        <div className="flex h-100">
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
                            {navigation.map(section => {
                                // Level 1 are the links like "Overview" and "Components".
                                const level1IsActive =
                                    pathWithoutHash.split('/')[1] === section.href.split('/')[1];

                                return (
                                    <SideNavLink
                                        title={section.title}
                                        isActive={level1IsActive}
                                        href={section.href}
                                        key={section.href}
                                        level={1}
                                    >
                                        {section.groups.map(sectionGroup => {
                                            const key = sectionGroup
                                                .map(groupItem => groupItem.href)
                                                .join('-');

                                            return (
                                                <SideNavGroup key={key} level={2}>
                                                    {sectionGroup.map(groupItem => {
                                                        // Level 2 are the links like "Overview >
                                                        // About" and "Components > Button".
                                                        const level2IsActive =
                                                            level1IsActive &&
                                                            pathWithoutHash.split('/')[2] ===
                                                                groupItem.href.split('/')[2];

                                                        return groupItem.sections ? (
                                                            <SideNavLink
                                                                title={groupItem.title}
                                                                level={2}
                                                                href={groupItem.href}
                                                                isActive={level2IsActive}
                                                                key={groupItem.href}
                                                            >
                                                                <SideNavGroup level={3}>
                                                                    {groupItem.sections?.map(
                                                                        sectionItem => {
                                                                            const level3IsActive =
                                                                                level1IsActive &&
                                                                                level2IsActive &&
                                                                                pathWithoutHash.split(
                                                                                    '/',
                                                                                )[3] ===
                                                                                    sectionItem.href.split(
                                                                                        '/',
                                                                                    )[3];

                                                                            return (
                                                                                <SideNavLink
                                                                                    title={
                                                                                        sectionItem.title
                                                                                    }
                                                                                    href={
                                                                                        sectionItem.href
                                                                                    }
                                                                                    key={
                                                                                        sectionItem.href
                                                                                    }
                                                                                    level={3}
                                                                                    isActive={
                                                                                        level3IsActive
                                                                                    }
                                                                                />
                                                                            );
                                                                        },
                                                                    )}
                                                                </SideNavGroup>
                                                            </SideNavLink>
                                                        ) : (
                                                            <SideNavLink
                                                                title={groupItem.title}
                                                                key={groupItem.href}
                                                                level={2}
                                                                href={groupItem.href}
                                                                isActive={level2IsActive}
                                                            />
                                                        );
                                                    })}
                                                </SideNavGroup>
                                            );
                                        })}
                                    </SideNavLink>
                                );
                            })}
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
        </div>
    );
}
