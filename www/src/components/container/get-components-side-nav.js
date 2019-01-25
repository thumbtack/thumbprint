import { find, sortBy } from 'lodash';

/**
 * The order to use when deciding which platform to display first.
 */
const platformOrder = {
    react: 1,
    scss: 2,
};

const getURL = (kit, { allComponentApi }) => {
    // Prefer links to the usage guidelines over any of the API implementations.
    if (kit.frontmatter.url) {
        return kit.frontmatter.url;
    }

    const mdxPackages = find(allComponentApi.group, ['fieldValue', kit.parent.relativePath]);

    // Sort the available platforms by `platformOrder`.
    const sorted = sortBy(mdxPackages.edges, pkg => platformOrder[pkg.node.frontmatter.platform]);

    return sorted[0].node.frontmatter.url;
};

/**
 * Removes platform from the URL for URLs ending with or without a slash.
 *
 * Turns `/components/button/react` and `/components/button/react/` into
 * `/components/button`.
 */
const removeLastDirectoryOfURL = url => {
    const urlWithoutTrailingSlash = url.endsWith('/') ? url.substring(0, url.length - 1) : url;
    const urlArr = urlWithoutTrailingSlash.split('/');
    urlArr.pop();
    return urlArr.join('/');
};

const getComponentsSideNav = (allKits, allComponentApi, location) => {
    const sorted = sortBy(allKits.edges, ({ node }) => node.frontmatter.name);

    return sorted.map(({ node }) => {
        const to = getURL(node, { allComponentApi });
        return {
            title: node.frontmatter.name,
            to,
            // The sidebar links point to a single platform but we want them to appear
            // active regardless of the platform that is being viewed. The "Button" link
            // should appear active when viewing both the React and SCSS "Button" pages.
            isActive:
                location && removeLastDirectoryOfURL(to) === removeLastDirectoryOfURL(location),
        };
    });
};

export default getComponentsSideNav;
