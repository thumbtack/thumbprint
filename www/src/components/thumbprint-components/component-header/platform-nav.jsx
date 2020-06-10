import React from 'react';
import PropTypes from 'prop-types';
import { sortBy } from 'lodash';
import TabNav, { TabNavItem } from '../../tab-nav';

/**
 * Given `/components/button/react/`, this function returns `react`.
 */
const getPlatformSlugByPath = path => {
    const arr = path.split('/');
    return arr[arr.length - 2];
};

const sortPlatforms = ({ node }) => {
    const platformOrder = {
        usage: 1,
        react: 2,
        scss: 3,
        ios: 4,
        android: 5,
    };

    const { path } = node;
    return platformOrder[getPlatformSlugByPath(path)];
};

/**
 * Given `/components/button/react/`, this function returns `React`.
 */
const getPlatformDisplayName = path => {
    const displayName = {
        usage: 'Usage',
        react: 'React',
        scss: 'SCSS',
        ios: 'iOS',
        android: 'Android',
    };

    return displayName[getPlatformSlugByPath(path)];
};

const PlatformNav = ({ platformNavQueryResults }) => {
    const sortedPlatforms = sortBy(platformNavQueryResults.edges, sortPlatforms);

    return (
        <TabNav>
            {sortedPlatforms.map(({ node }) => (
                <TabNavItem to={node.path} key={node.path}>
                    {getPlatformDisplayName(node.path)}
                </TabNavItem>
            ))}
        </TabNav>
    );
};

PlatformNav.propTypes = {
    platformNavQueryResults: PropTypes.shape({}).isRequired,
};

export default PlatformNav;
