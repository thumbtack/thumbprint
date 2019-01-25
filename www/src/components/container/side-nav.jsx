import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { Text } from '@thumbtack/thumbprint-react';
import classNames from 'classnames';
import ClickableBox from 'clickable-box';
import { NavigationCaretDownSmall, NavigationCaretUpSmall } from '@thumbtack/thumbprint-icons';
import { ScrollMarkerLink } from 'react-scroll-marker';
import styles from './side-nav.module.scss';

const SideNav = ({ children }) => <ul className="flex-1 overflow-y-auto pb3">{children}</ul>;

SideNav.propTypes = {
    children: PropTypes.node.isRequired,
};

class SideNavSection extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isExpanded: props.isActive,
        };

        this.toggleIsExpanded = this.toggleIsExpanded.bind(this);
    }

    toggleIsExpanded() {
        this.setState(prevState => ({
            isExpanded: !prevState.isExpanded,
        }));
    }

    render() {
        const { title, children, to } = this.props;
        const { isExpanded } = this.state;

        const textSize = 2;
        const textClasses = 'db hover-bg-gray-200 pv2 ph4 flex b black pointer';

        return (
            <Text elementName="li" size={textSize}>
                {to ? (
                    <Link className={textClasses} to={to}>
                        {title}
                    </Link>
                ) : (
                    <React.Fragment>
                        <ClickableBox
                            className={classNames(textClasses, styles.sideNavClickableBox)}
                            onClick={this.toggleIsExpanded}
                        >
                            {title}

                            {isExpanded ? (
                                <NavigationCaretUpSmall className="ml-auto black-300" />
                            ) : (
                                <NavigationCaretDownSmall className="ml-auto black-300" />
                            )}
                        </ClickableBox>

                        <ul hidden={!isExpanded} className="pb1">
                            {children}
                        </ul>
                    </React.Fragment>
                )}
            </Text>
        );
    }
}

SideNavSection.propTypes = {
    children: PropTypes.node,
    title: PropTypes.string.isRequired,
    to: PropTypes.string,
    /**
     * True if the currently viewed page is within this section.
     */
    isActive: PropTypes.bool.isRequired,
};

SideNavSection.defaultProps = {
    children: undefined,
    to: undefined,
};

const SideNavSectionGroup = ({ children }) => (
    <li className={styles.sideNavSectionGroup}>
        <ul>{children}</ul>
    </li>
);

SideNavSectionGroup.propTypes = {
    children: PropTypes.node.isRequired,
};

const SideNavSectionGroupLink = props => {
    const { to, children, isActive, isFirstHashLink } = props;

    // Get `color` from a path like `/tokens/#section-color`.
    const hash = to.split('#') ? to.split('#')[1] : null;

    const getClasses = shouldApplyActiveStyles =>
        classNames({
            'db hover-bg-gray-200 pv1 ph5 black': true,
            b: shouldApplyActiveStyles,
            [styles.sideNavSectionGroupIsActive]: shouldApplyActiveStyles,
        });

    return (
        <li className="relative">
            {hash ? (
                <ScrollMarkerLink id={hash}>
                    {({ isActive: isHashActive, onClick }) => (
                        <Link
                            className={getClasses(isHashActive)}
                            onClick={onClick}
                            // We want to link the first hash link to the page, not a section,
                            // since we don't have any link to pages like Atomic or Tokens. By
                            // linking directly to the section, the user would have to scroll up
                            // to see the page header with useful information.
                            to={isFirstHashLink ? to.replace(`#${hash}`, '') : to}
                        >
                            {children}
                        </Link>
                    )}
                </ScrollMarkerLink>
            ) : (
                <Link className={getClasses(isActive)} aria-current={isActive} to={to}>
                    {children}
                </Link>
            )}
        </li>
    );
};

SideNavSectionGroupLink.propTypes = {
    children: PropTypes.node.isRequired,
    to: PropTypes.string.isRequired,
    /**
     * Indicates the current page (or section of a page). This should be fase if it is a hash link
     * since the active section will depend on the user's scrolling.
     */
    isActive: PropTypes.bool.isRequired,
    /**
     * If true, this link will link send users to the top of the page, not the first section. We do
     * this so users have a way to see the header since there is no other link that will take them
     * to the top of the page.
     */
    isFirstHashLink: PropTypes.bool,
};

SideNavSectionGroupLink.defaultProps = {
    isFirstHashLink: false,
};

export default SideNav;
export { SideNavSection, SideNavSectionGroup, SideNavSectionGroupLink };
