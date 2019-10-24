import React from 'react';
import PropTypes from 'prop-types';
import warning from 'warning';
import { Themed, Plain } from '../UIAction/index';

const getCommonLinkProps = props => {
    warning(
        // If `onClick` prop exists then `to` must also exist.
        !props.onClick || (props.to && props.onClick),
        'The `onClick` prop in the Thumbprint `Link` and `ThemedLink` components should only be used when the `to` prop is also provided. Consider using the `Button` component instead.',
    );

    return {
        to: props.to,
        onClick: props.onClick,
        shouldOpenInNewTab: props.shouldOpenInNewTab,
        isDisabled: props.isDisabled,
        children: props.children,
        accessibilityLabel: props.accessibilityLabel,
        dataTest: props.dataTest,
    };
};

/**
 * Anchor link that renders as text.
 */
const Link = React.forwardRef((props, ref) => (
    <Plain
        {...getCommonLinkProps(props)}
        theme={props.theme}
        iconLeft={props.iconLeft}
        iconRight={props.iconRight}
        ref={ref}
    />
));

Link.propTypes = {
    /**
     * Contents displayed within the anchor.
     */
    children: PropTypes.node,
    /**
     * Description of the link’s content. It is required if the link contains an icon and no
     * descriptive text.
     */
    accessibilityLabel: PropTypes.string,
    /**
     * Functionally disables the anchor. We discourage the use of this prop since it is difficult
     * to visually indicate that a link is disabled. Consider not rendering the link if it is not
     * interactive.
     */
    isDisabled: PropTypes.bool,
    /**
     * Page to navigate to when the anchor is clicked.
     */
    to: PropTypes.string,
    /**
     * Function to fire when clicking on the anchor. This should be used alongside the `to` prop.
     */
    onClick: PropTypes.func,
    /**
     * Icon from [Thumbprint Icons](/icons/) to render left of the text within `Link`.
     */
    iconLeft: PropTypes.node,
    /**
     * Icon from [Thumbprint Icons](/icons/) to render right of the text within `Link`.
     */
    iconRight: PropTypes.node,
    /**
     * Opens the URL in a new tab when clicked.
     */
    shouldOpenInNewTab: PropTypes.bool,
    /**
     * Sets the anchor’s text color.
     *
     * `inherit` will make the anchor inherit `color` from its parent.
     */
    theme: PropTypes.oneOf(['primary', 'secondary', 'tertiary', 'inherit']),
    /**
     * A selector hook into the React component for use in automated testing environments.
     */
    dataTest: PropTypes.string,
};

Link.defaultProps = {
    children: undefined,
    accessibilityLabel: undefined,
    isDisabled: false,
    iconLeft: null,
    iconRight: null,
    to: null,
    onClick: undefined,
    theme: 'primary',
    shouldOpenInNewTab: false,
    dataTest: undefined,
};

/**
 * Anchor link that visually looks like a button.
 */
const ThemedLink = React.forwardRef((props, ref) => (
    <Themed
        {...getCommonLinkProps(props)}
        icon={props.icon}
        theme={props.theme}
        size={props.size}
        width={props.width}
        ref={ref}
    />
));

ThemedLink.propTypes = {
    /**
     * Contents displayed within the button.
     */
    children: PropTypes.node,
    /**
     * Description of the link’s content. It is required if the link contains an icon and no
     * descriptive text.
     */
    accessibilityLabel: PropTypes.string,
    /**
     * Visually and functionally disables the button.
     */
    isDisabled: PropTypes.bool,
    /**
     * Page to navigate to when the anchor is clicked.
     */
    to: PropTypes.string,
    /**
     * Function to fire when clicking on the anchor. This should be used alongside the `to` prop.
     */
    onClick: PropTypes.func,
    /**
     * Opens the URL in a new tab when clicked.
     */
    shouldOpenInNewTab: PropTypes.bool,
    /**
     * Icon from [Thumbprint Icons](/icons/) to render within the
     * button. It must be one of the `small` icons.
     */
    icon: PropTypes.node,
    /**
     * Controls the button's background, text, and border theme.
     */
    theme: PropTypes.oneOf(['primary', 'secondary', 'tertiary', 'caution', 'solid']),
    /**
     * Changes the button's `line-height`, `padding`, `border-radius`, and `font-size`.
     */
    size: PropTypes.oneOf(['small', 'large']),
    /**
     * Themed links are as wide as the content that is passed in.  The `full` option will
     * expand the width to `100%` on all screens. `full-below-small` will expand the width to 100%
     * on devices smaller than [our `small` breakpoint](/tokens/#section-breakpoint).
     */
    width: PropTypes.oneOf(['auto', 'full', 'full-below-small']),
    /**
     * A selector hook into the React component for use in automated testing environments.
     */
    dataTest: PropTypes.string,
};

ThemedLink.defaultProps = {
    children: undefined,
    accessibilityLabel: undefined,
    isDisabled: false,
    shouldOpenInNewTab: false,
    theme: 'primary',
    size: 'large',
    width: 'auto',
    icon: null,
    to: null,
    onClick: undefined,
    dataTest: undefined,
};

export default Link;
export { ThemedLink };
