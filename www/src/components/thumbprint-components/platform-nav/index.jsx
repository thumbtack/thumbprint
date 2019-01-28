import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

const isActive = ({ isCurrent }) => {
    const commonClasses = 'b pv2 ph3 black relative top-3 ';
    return isCurrent
        ? { className: `bb bw-3 b-blue z-1 ${commonClasses}` }
        : { className: commonClasses };
};

const PlatformNav = ({ title, platforms }) => (
    <div className="mb5">
        <nav className="flex" aria-label={`Available documentation for ${title}`}>
            {platforms.map(platform => (
                <Link
                    key={platform.name}
                    getProps={isActive}
                    to={platform.to}
                    title={`View this documentation in ${platform.name}`}
                >
                    {platform.name}
                </Link>
            ))}
        </nav>
        <div className="bb bw-3 b-gray-300" />
    </div>
);

PlatformNav.propTypes = {
    /**
     * Display name of the component being documented.
     */
    title: PropTypes.string.isRequired,
    /**
     * Array of the pages to link to.
     */
    platforms: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            to: PropTypes.string.isRequired,
        }),
    ).isRequired,
};

export default PlatformNav;
