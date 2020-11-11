import React from 'react';
import warning from 'warning';
import { Themed, Plain } from '../UIAction/index';

interface CommonProps {
    to?: string;
    target?: string;
    shouldOpenInNewTab?: boolean;
    children?: React.ReactNode;
    isDisabled?: boolean;
    onClick?: () => void;
    dataTestId?: string;
    dataTest?: string;
    accessibilityLabel?: string;
}

const getCommonLinkProps = (props: CommonProps): CommonProps => {
    warning(
        // If `onClick` prop exists then `to` must also exist.
        !props.onClick || (props.to && props.onClick),
        'The `onClick` prop in the Thumbprint `Link` and `ThemedLink` components should only be used when the `to` prop is also provided. Consider using the `Button` component instead.',
    );

    return {
        to: props.to,
        onClick: props.onClick,
        target: props.target,
        shouldOpenInNewTab: props.shouldOpenInNewTab,
        isDisabled: props.isDisabled,
        children: props.children,
        accessibilityLabel: props.accessibilityLabel,
        dataTestId: props.dataTestId,
        dataTest: props.dataTest,
    };
};

/**
 * Anchor link that renders as text.
 */
const Link = React.forwardRef<HTMLAnchorElement, LinkPropTypes>(
    (
        {
            to,
            onClick,
            target,
            shouldOpenInNewTab = false,
            isDisabled = false,
            children,
            accessibilityLabel,
            dataTest,
            dataTestId,
            theme = 'primary',
            iconLeft,
            iconRight,
        }: LinkPropTypes,
        ref,
    ) => (
        <Plain
            {...getCommonLinkProps({
                to,
                onClick,
                target,
                shouldOpenInNewTab,
                isDisabled,
                children,
                accessibilityLabel,
                dataTest,
                dataTestId,
            })}
            theme={theme}
            iconLeft={iconLeft}
            iconRight={iconRight}
            ref={ref}
        />
    ),
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
    onClick?: () => void;
    /**
     * Icon from [Thumbprint Icons](/icons/) to render left of the text within `Link`.
     */
    iconLeft?: React.ReactNode;
    /**
     * Icon from [Thumbprint Icons](/icons/) to render right of the text within `Link`.
     */
    iconRight?: React.ReactNode;
    /**
     * The anchor `target` attribute. Set this to `_blank` to open in a new tab, or to an arbitrary
     * string to open the link in an `<iframe>` with the same `name`.
     */
    target?: string;
    /**
     * @deprecated
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
    dataTestId?: string;
    /**
     * A selector hook into the React component for use in automated testing environments.
     * @deprecated Deprecated in favor of the `dataTestId` prop
     */
    dataTest?: string;
}

/**
 * Anchor link that visually looks like a button.
 */
const ThemedLink = React.forwardRef<HTMLAnchorElement, ThemedLinkPropTypes>(
    (
        {
            to,
            onClick,
            shouldOpenInNewTab = false,
            target,
            isDisabled = false,
            children,
            accessibilityLabel,
            dataTest,
            dataTestId,
            icon,
            iconRight,
            theme = 'primary',
            size = 'large',
            width = 'auto',
        }: ThemedLinkPropTypes,
        ref,
    ) => (
        <Themed
            {...getCommonLinkProps({
                to,
                onClick,
                shouldOpenInNewTab,
                target,
                isDisabled,
                children,
                accessibilityLabel,
                dataTest,
                dataTestId,
            })}
            icon={icon}
            iconRight={iconRight}
            theme={theme}
            size={size}
            width={width}
            ref={ref}
        />
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
     * The anchor `target` attribute. Set this to `_blank` to open in a new tab, or to an arbitrary
     * string to open the link in an `<iframe>` with the same `name`.
     */
    target?: string;
    /**
     * Opens the URL in a new tab when clicked.
     */
    shouldOpenInNewTab?: boolean;
    /**
     * Icon from [Thumbprint Icons](/icons/) to render left within the
     * button. It must be one of the `small` icons.
     */
    icon?: React.ReactNode;
    /**
     * Icon from [Thumbprint Icons](/icons/) to render right within the
     * button. It must be one of the `small` icons.
     */
    iconRight?: React.ReactNode;
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
    dataTestId?: string;
    /**
     * A selector hook into the React component for use in automated testing environments.
     * @deprecated Deprecated in favor of the `dataTestId` prop
     */
    dataTest?: string;
}

export default Link;
export { ThemedLink };
