import React, { useState } from 'react';
import Link from 'next/link';
import { Text } from '@thumbtack/thumbprint-react';
import ClickableBox from 'clickable-box';
import { NavigationCaretDownSmall, NavigationCaretUpSmall } from '@thumbtack/thumbprint-icons';
import { ScrollMarkerLink } from 'react-scroll-marker';
import cx from 'classnames';
import styles from './side-nav.module.scss';

interface SideNavLinkProps {
    to: string;
    children?: React.ReactNode;
    level: 1 | 2 | 3;
    title: string;
    isActive: boolean;
}

interface SideNavGroupProps {
    children: React.ReactNode;
    level: 2 | 3;
}

export function SideNavGroup({ children, level }: SideNavGroupProps): React.ReactElement {
    return (
        <li
            className={cx({
                [styles.sideNavGroup]: true,
                [styles.sideNavGroupLevel2]: level === 2,
                [styles.sideNavGroupLevel3]: level === 3,
            })}
        >
            <ul>{children}</ul>
        </li>
    );
}

export function SideNavLink({
    to,
    children,
    level,
    title,
    isActive,
}: SideNavLinkProps): React.ReactElement {
    const [isExpanded, setIsExpanded] = useState(isActive);
    const [isExpandButtonHovered, setIsExpandButtonHovered] = useState(false);

    // Gets `color` from a path like `/tokens/#section-color`.
    const hash = to.split('#') ? to.split('#')[1] : null;

    /**
     * This function exists to share code between the `Link` component instances when wrapped in
     * `ScrollMarkerLink` and when used on its own.
     */
    const getLinkClasses = (hasActiveClass): string =>
        cx({
            'db flex-1 black': true,
            'pv2 ph3': level === 1,
            'pv1 ph4': level === 2,
            'pv1 ph5': level === 3,
            b: (hasActiveClass && !children) || level === 1,
            [styles.sideNavLinkBlueActiveIndicator]:
                hasActiveClass && (level === 3 || (level === 2 && !children)),
        });

    return (
        <Text elementName="li" size={2}>
            <div
                className={cx({
                    'relative flex': true,
                    'hover-bg-gray-200': !isExpandButtonHovered,
                })}
            >
                {hash ? (
                    <ScrollMarkerLink id={hash}>
                        {({ isActive: isHashActive, onClick }) => (
                            <Link href={to}>
                                <a className={getLinkClasses(isHashActive)} onClick={onClick}>
                                    {title}
                                </a>
                            </Link>
                        )}
                    </ScrollMarkerLink>
                ) : (
                    <Link href={to}>
                        <a className={getLinkClasses(isActive)} aria-current={isActive}>
                            {title}
                        </a>
                    </Link>
                )}
                {children && (
                    // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
                    <ClickableBox
                        className={cx({
                            'db hover-bg-gray-200 ph3 flex b pointer': true,
                            pv2: level === 1,
                            pv1: level === 2 || level === 3,
                            [styles.sideNavClickableBox]: true,
                        })}
                        onClick={(): void => {
                            setIsExpanded(!isExpanded);
                        }}
                        onMouseOver={(): void => {
                            setIsExpandButtonHovered(true);
                        }}
                        onMouseLeave={(): void => {
                            setIsExpandButtonHovered(false);
                        }}
                    >
                        {isExpanded ? (
                            <NavigationCaretUpSmall className="ml-auto black-300" />
                        ) : (
                            <NavigationCaretDownSmall className="ml-auto black-300" />
                        )}
                    </ClickableBox>
                )}
            </div>
            {children && (
                <ul hidden={!isExpanded} className="pb1">
                    {children}
                </ul>
            )}
        </Text>
    );
}
