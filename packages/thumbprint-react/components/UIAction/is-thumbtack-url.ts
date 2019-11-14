import isString from 'lodash/isString';
/**
 * thumbtackDomainPattern should account for:
 * - http://*thumbtack.com
 * - https://*thumbtack.com
 * - //*thumbtack.com
 */
const thumbtackDomainPattern = /^(?:https?:)?\/\/(?:[a-zA-Z0-9-]+\.)*thumbtack\.com\//;
const rootRelativeUrlPattern = /^\//;
const hashUrlPattern = /^#/;
/**
 * Check if a URL is an internal (TT.com) link
 */
const isThumbtackUrl = (url?: string): boolean =>
    isString(url) &&
    (thumbtackDomainPattern.test(url) ||
        rootRelativeUrlPattern.test(url) ||
        hashUrlPattern.test(url));

export default isThumbtackUrl;
