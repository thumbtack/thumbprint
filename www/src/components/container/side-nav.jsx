import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { Text } from '@thumbtack/thumbprint-react';
import classNames from 'classnames';
import ClickableBox from 'clickable-box';
import { NavigationCaretDownSmall, NavigationCaretUpSmall } from '@thumbtack/thumbprint-icons';
import { ScrollMarkerLink } from 'react-scroll-marker';
import styles from './side-nav.module.scss';

const SideNav = ({ children }) => (
    <ul className={`flex-1 overflow-y-auto pb3 ${styles.sideNav}`}>{children}</ul>
);

SideNav.propTypes = {
    children: PropTypes.node.isRequired,
};

const SideNavGroup = ({ children, level }) => (
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

SideNavGroup.propTypes = {
    children: PropTypes.node.isRequired,
    level: PropTypes.oneOf([2, 3]).isRequired,
};

const SideNavLink = ({ to, children, level, title, isActive }) => {
    const [isExpanded, setIsExpanded] = useState(isActive);
    const [isExpandButtonHovered, setIsExpandButtonHovered] = useState(false);

    // Gets `color` from a path like `/tokens/#section-color`.
    const hash = to.split('#') ? to.split('#')[1] : null;

    /**
     * This function exists to share code between the `Link` component instances when wrapped in
     * `ScrollMarkerLink` and when used on its own.
     */
    const getLinkClasses = hasActiveClass =>
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
                        {({ isActive: isHashActive, onClick }) => (
                            <Link
                                className={getLinkClasses(isHashActive)}
                                onClick={onClick}
                                to={to}
                            >
                                {title}
                            </Link>
                        )}
                    </ScrollMarkerLink>
                ) : (
                    <Link className={getLinkClasses(isActive)} aria-current={isActive} to={to}>
                        {title}
                    </Link>
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
                        onClick={() => {
                            setIsExpanded(!isExpanded);
                        }}
                        onMouseOver={() => {
                            setIsExpandButtonHovered(true);
                        }}
                        onMouseLeave={() => {
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
};

SideNavLink.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node,
    to: PropTypes.string.isRequired,
    level: PropTypes.oneOf([1, 2, 3]).isRequired,
    /**
     * Indicates the current page (or section of a page). This should be fase if it is a hash link
     * since the active section will depend on the user's scrolling.
     */
    isActive: PropTypes.bool,
};

SideNavLink.defaultProps = {
    children: undefined,
    isActive: false,
};

export default SideNav;
export { SideNavLink, SideNavGroup };
