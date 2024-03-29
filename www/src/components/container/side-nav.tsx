import React, { useState } from 'react';
import { Text } from '@thumbtack/thumbprint-react';
import classNames from 'classnames';
import ClickableBox from 'clickable-box';
import { NavigationCaretDownSmall, NavigationCaretUpSmall } from '@thumbtack/thumbprint-icons';
import { ScrollMarkerLink } from 'react-scroll-marker';
import styles from './side-nav.module.scss';

export default function SideNav({ children }: { children: React.ReactNode }): JSX.Element {
    return (
        <div className="flex-1 flex overflow-y-auto flex-column">
            <ul className={`pb3 ${styles.sideNav}`}>{children}</ul>
            <ul className="mt-auto ph3 pv3 flex">
                <Text elementName="li" size={2} className={styles.sideNavBottomFooterLinks}>
                    <a
                        href="https://github.com/thumbtack/thumbprint/blob/master/LICENSE"
                        className="black"
                    >
                        License
                    </a>
                </Text>
                <Text elementName="li" size={2} className={styles.sideNavBottomFooterLinks}>
                    <a href="https://www.thumbtack.com/" className="black">
                        Thumbtack, Inc.
                    </a>
                </Text>
            </ul>
        </div>
    );
}

export function SideNavGroup({
    children,
    level,
}: {
    children: React.ReactNode;
    level: 2 | 3;
}): JSX.Element {
    return (
        <li
            className={classNames({
                [styles.sideNavGroup]: true,
                [styles.sideNavGroupLevel2]: level === 2,
                [styles.sideNavGroupLevel3]: level === 3,
            })}
        >
            <ul>{children}</ul>
        </li>
    );
}

interface PropTypes {
    title: string;
    children?: React.ReactNode;
    to: string;
    level: 1 | 2 | 3;
    /**
     * Indicates the current page (or section of a page). This should be fase if it is a hash link
     * since the active section will depend on the user's scrolling.
     */
    isActive?: boolean;
}

export function SideNavLink({
    to,
    children,
    level,
    title,
    isActive = false,
}: PropTypes): JSX.Element {
    const [isExpanded, setIsExpanded] = useState(isActive);
    const [isExpandButtonHovered, setIsExpandButtonHovered] = useState(false);

    // Gets `color` from a path like `/tokens/#section-color`.
    const hash = to.split('#') ? to.split('#')[1] : null;

    /**
     * This function exists to share code between the `Link` component instances when wrapped in
     * `ScrollMarkerLink` and when used on its own.
     */
    const getLinkClasses = (hasActiveClass: boolean): string =>
        classNames({
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
                className={classNames({
                    'relative flex': true,
                    'hover-bg-gray-200': !isExpandButtonHovered,
                })}
            >
                {hash ? (
                    <ScrollMarkerLink id={hash}>
                        {({ isActive: isHashActive, onClick }): JSX.Element => (
                            <a className={getLinkClasses(isHashActive)} onClick={onClick} href={to}>
                                {title}
                            </a>
                        )}
                    </ScrollMarkerLink>
                ) : (
                    <a className={getLinkClasses(isActive)} aria-current={isActive} href={to}>
                        {title}
                    </a>
                )}
                {children && (
                    // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
                    <ClickableBox
                        className={classNames({
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
