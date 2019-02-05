import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

const isActive = ({ isCurrent }) => {
    const commonClasses = 'b pv2 ph3 black relative top-3 ';
    return isCurrent
        ? { className: `bb bw-3 b-blue ${commonClasses}` }
        : { className: commonClasses };
};

const TabNav = ({ children }) => (
    <div className="mb5">
        <nav className="flex">{children}</nav>
        <div className="bb bw-3 b-gray-300" />
    </div>
);

TabNav.propTypes = {
    children: PropTypes.node.isRequired,
};

const TabNavItem = ({ to, children }) => (
    <Link getProps={isActive} to={to}>
        {children}
    </Link>
);

TabNavItem.propTypes = {
    children: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
};

export default TabNav;
export { TabNavItem };
