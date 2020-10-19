import { sortBy } from 'lodash';

/**
 * The order to use when deciding which platform to display first.
 */
const platformOrder = {
    usage: 1,
    react: 2,
    scss: 3,
    ios: 4,
    android: 5,
};

const getPlatformByPathname = pathname => {
    const splitPathname = pathname.split('/');

    // If input is `/components/button/react/`, this gets the word `react`.
    return splitPathname[splitPathname.length - 2];
};

const getURL = platforms => {
    // Sort the available platforms by `platformOrder`.
    const sorted = sortBy(
        platforms,
        platform => platformOrder[getPlatformByPathname(platform.node.path)],
    );

    return sorted[0].node.path;
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

const getComponentsLinkProps = (platforms, pathname) => {
    const to = getURL(platforms);

    return {
        to,
        isActive: pathname
            ? removeLastDirectoryOfURL(to) === removeLastDirectoryOfURL(pathname)
            : false,
    };
};

export default getComponentsLinkProps;
