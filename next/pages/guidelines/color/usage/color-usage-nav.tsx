import React from 'react';
import PropTypes from 'prop-types';
import { sortBy } from 'lodash';
import TabNav, { TabNavItem } from '../../../../components/tab-nav/tab-nav';

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
        swiftui: 5,
        android: 6,
    };

    const { path } = node;
    return platformOrder[getPlatformSlugByPath(path)];
};

/**
 * Given `/components/button/react/`, this function returns `React`.
 */
const getPlatformDisplayName = path => {
    const displayName = {
        neutral: 'Neutral',
        primary: 'Primary & info',
        success: 'Success, finance & ratings',
        guidance: 'Guidance & visualization',
        alert: 'Alert',
        caution: 'Caution',
        accent: 'Accents',
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
