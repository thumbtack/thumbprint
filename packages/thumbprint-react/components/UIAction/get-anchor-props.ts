import isThumbtackUrl from './is-thumbtack-url';

const getRel = (url?: string, shouldOpenInNewTab = false): string | undefined => {
    if (shouldOpenInNewTab) {
        if (isThumbtackUrl(url)) {
            // There are performance benefits of adding `rel="noopener"`.
            // https://jakearchibald.com/2016/performance-benefits-of-rel-noopener/
            return 'noopener';
        }

        // https://mathiasbynens.github.io/rel-noopener/
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-target-blank.md
        return 'noopener noreferrer';
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
}: {
    isDisabled?: boolean;
    shouldOpenInNewTab?: boolean;
    to?: string;
    onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}): AnchorProps => ({
    onClick,
    href: isDisabled ? undefined : to,
    target: shouldOpenInNewTab ? '_blank' : '_self',
    // NOTE use `noopener` even for internal links in new tabs to prevent potential slowdown of
    // new tab https://mathiasbynens.github.io/rel-noopener/
    rel: getRel(to, shouldOpenInNewTab),
});

export default getAnchorProps;
