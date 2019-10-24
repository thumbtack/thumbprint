import React from 'react';
import warning from 'warning';
import { Themed, Plain } from '../UIAction/index';

function validateProps({ to, onClick }: Pick<LinkPropTypes, 'to' | 'onClick'>): void {
    warning(
        // If `onClick` prop exists then `to` must also exist.
        !onClick || (to && onClick),
        'The `onClick` prop in the Thumbprint `Link` and `ThemedLink` components should only be used when the `to` prop is also provided. Consider using the `Button` component instead.',
    );
}

/**
 * Anchor link that renders as text.
 */
const Link = React.forwardRef<HTMLAnchorElement, LinkPropTypes>(
    (
        {
            children,
            accessibilityLabel,
            isDisabled = false,
            iconLeft = null,
            iconRight = null,
            to,
            onClick,
            theme = 'primary',
            shouldOpenInNewTab = false,
            dataTest,
        }: LinkPropTypes,
        ref,
    ) => {
        validateProps({ to, onClick });

        return (
            <Plain
                to={to}
                onClick={onClick}
                shouldOpenInNewTab={shouldOpenInNewTab}
                isDisabled={isDisabled}
                accessibilityLabel={accessibilityLabel}
                dataTest={dataTest}
                theme={theme}
                iconLeft={iconLeft}
                iconRight={iconRight}
                ref={ref}
            >
                {children}
            </Plain>
        );
    },
);

interface LinkPropTypes {
    /**
     * Contents displayed within the anchor.
     */
    children?: React.ReactNode;
    /**
     * Description of the link’s content. It is required if the link contains an icon and no
     * descriptive text.
     */
    accessibilityLabel?: string;
    /**
     * Functionally disables the anchor. We discourage the use of this prop since it is difficult
     * to visually indicate that a link is disabled. Consider not rendering the link if it is not
     * interactive.
     */
    isDisabled?: boolean;
    /**
     * Page to navigate to when the anchor is clicked.
     */
    to?: string;
    /**
     * Function to fire when clicking on the anchor. This should be used alongside the `to` prop.
     */
    onClick?: () => {};
    /**
     * Icon from [Thumbprint Icons](/icons/) to render left of the text within `Link`.
     */
    iconLeft?: React.ReactNode;
    /**
     * Icon from [Thumbprint Icons](/icons/) to render right of the text within `Link`.
     */
    iconRight?: React.ReactNode;
    /**
     * Opens the URL in a new tab when clicked.
     */
    shouldOpenInNewTab?: boolean;
    /**
     * Sets the anchor’s text color.
     *
     * `inherit` will make the anchor inherit `color` from its parent.
     */
    theme?: 'primary' | 'secondary' | 'tertiary' | 'inherit';
    /**
     * A selector hook into the React component for use in automated testing environments.
     */
    dataTest?: string;
}

/**
 * Anchor link that visually looks like a button.
 */
const ThemedLink = React.forwardRef<HTMLAnchorElement, ThemedLinkPropTypes>(
    (
        {
            children,
            accessibilityLabel,
            isDisabled = false,
            shouldOpenInNewTab = false,
            theme = 'primary',
            size = 'large',
            width = 'auto',
            icon = null,
            to,
            onClick,
            dataTest,
        }: ThemedLinkPropTypes,
        ref,
    ) => (
        <Themed
            accessibilityLabel={accessibilityLabel}
            isDisabled={isDisabled}
            shouldOpenInNewTab={shouldOpenInNewTab}
            to={to}
            onClick={onClick}
            icon={icon}
            theme={theme}
            size={size}
            width={width}
            dataTest={dataTest}
            ref={ref}
        >
            {children}
        </Themed>
    ),
);

interface ThemedLinkPropTypes {
    /**
     * Contents displayed within the button.
     */
    children?: React.ReactNode;
    /**
     * Description of the link’s content. It is required if the link contains an icon and no
     * descriptive text.
     */
    accessibilityLabel?: string;
    /**
     * Visually and functionally disables the button.
     */
    isDisabled?: boolean;
    /**
     * Page to navigate to when the anchor is clicked.
     */
    to?: string;
    /**
     * Function to fire when clicking on the anchor. This should be used alongside the `to` prop.
     */
    onClick?: () => void;
    /**
     * Opens the URL in a new tab when clicked.
     */
    shouldOpenInNewTab?: boolean;
    /**
     * Icon from [Thumbprint Icons](/icons/) to render within the
     * button. It must be one of the `small` icons.
     */
    icon?: React.ReactNode;
    /**
     * Controls the button's background, text, and border theme.
     */
    theme?: 'primary' | 'secondary' | 'tertiary' | 'caution' | 'solid';
    /**
     * Changes the button's `line-height`, `padding`, `border-radius`, and `font-size`.
     */
    size?: 'small' | 'large';
    /**
     * Themed links are as wide as the content that is passed in.  The `full` option will
     * expand the width to `100%` on all screens. `full-below-small` will expand the width to 100%
     * on devices smaller than [our `small` breakpoint](/tokens/#section-breakpoint).
     */
    width?: 'auto' | 'full' | 'full-below-small';
    /**
     * A selector hook into the React component for use in automated testing environments.
     */
    dataTest?: string;
}

export default Link;
export { ThemedLink };
