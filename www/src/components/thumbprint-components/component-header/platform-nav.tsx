import React from 'react';
import { sortBy } from 'lodash';
import TabNav, { TabNavItem } from '../../tab-nav';

type PlatformSlug = 'usage' | 'react' | 'scss' | 'ios' | 'android';
type PlatformName = 'Usage' | 'React' | 'SCSS' | 'iOS' | 'Android';
type PlatformIndex = 1 | 2 | 3 | 4 | 5;

/**
 * Given `/components/button/react/`, this function returns `react`.
 */
const getPlatformSlugByPath = (path: string): PlatformSlug => {
    const arr = path.split('/');
    return arr[arr.length - 2] as PlatformSlug;
};

const sortPlatforms = ({ node }: { node: { path: string } }): PlatformIndex => {
    const platformOrder: Record<PlatformSlug, PlatformIndex> = {
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
const getPlatformDisplayName = (path: string): PlatformName => {
    const displayName: Record<PlatformSlug, PlatformName> = {
        usage: 'Usage',
        react: 'React',
        scss: 'SCSS',
        ios: 'iOS',
        android: 'Android',
    };

    return displayName[getPlatformSlugByPath(path)];
};

export default function PlatformNav({
    platformNavQueryResults,
}: {
    platformNavQueryResults: { edges: { node: { path: string } }[] };
}): JSX.Element {
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
}
