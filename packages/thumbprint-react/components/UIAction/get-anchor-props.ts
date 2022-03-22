import split from 'lodash/split';
import isThumbtackUrl from './is-thumbtack-url';

const getRel = (
    url?: string,
    target?: string,
    shouldOpenInNewTab = false,
    rel?: string,
): string | undefined => {
    // Use a set to prevent duplicate rel values from being defined
    let relSet = new Set();
    if (rel) {
        // handle possibility of multiple rel values being provided
        const relStrings = split(rel, ' ');
        relSet = new Set(relStrings);
    }
    if (shouldOpenInNewTab || target === '_blank') {
        // There are performance benefits of adding `rel="noopener"`.
        // https://jakearchibald.com/2016/performance-benefits-of-rel-noopener/
        // https://mathiasbynens.github.io/rel-noopener/
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-target-blank.md
        relSet.add('noopener');

        if (!isThumbtackUrl(url)) {
            relSet.add('noreferrer');
        }
    }

    if (relSet.size > 0) {
        return [...relSet].join(' ');
    }
    return undefined;
};

interface AnchorProps {
    onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
    href?: string;
    target: string;
    rel?: string;
}

/**
 * Enable plain and themed `<a>` elements to share the same props.
 */
const getAnchorProps = ({
    isDisabled,
    shouldOpenInNewTab,
    to,
    onClick,
    rel,
    target,
}: {
    isDisabled?: boolean;
    shouldOpenInNewTab?: boolean;
    to?: string;
    onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
    rel?: string;
    target?: string;
}): AnchorProps => ({
    onClick,
    href: isDisabled ? undefined : to,
    // NOTE use `noopener` even for internal links in new tabs to prevent potential slowdown of
    // new tab https://mathiasbynens.github.io/rel-noopener/
    rel: getRel(to, target, shouldOpenInNewTab, rel),
    target: target || (shouldOpenInNewTab ? '_blank' : '_self'),
});

export default getAnchorProps;
