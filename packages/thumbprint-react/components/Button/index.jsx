import React from 'react';
import PropTypes from 'prop-types';
import { Themed, Plain } from '../UIAction/index.jsx';

const getCommonProps = props => ({
    onClick: props.onClick,
    isDisabled: props.isDisabled,
    type: props.type,
    children: props.children,
    onMouseEnter: props.onMouseEnter,
    onFocus: props.onFocus,
    onMouseLeave: props.onMouseLeave,
    onBlur: props.onBlur,
    accessibilityLabel: props.accessibilityLabel,
    dataTest: props.dataTest,
});

const TextButton = React.forwardRef((props, ref) => (
    <Plain {...getCommonProps(props)} theme={props.theme} iconLeft={props.iconLeft} ref={ref} />
));

TextButton.propTypes = {
    /**
     * Contents displayed within the button.
     */
    children: PropTypes.node,
    /**
     * Icon from [Thumbprint Icons](/icons/) to render left of the text within `TextButton`.
     */
    iconLeft: PropTypes.node,
    /**
     * Visually and functionally disables the button. We discourage the use of this prop since it
     * is difficult to visually indicate that a link is disabled. Consider not rendering the
     * `TextButton` if it is not interactive.
     */
    isDisabled: PropTypes.bool,
    /**
     * Function that will run when the button is clicked on.
     */
    onClick: PropTypes.func,
    /**
     * Function that runs when the user hovers on the button.
     */
    onMouseEnter: PropTypes.func,
    /**
     * Function that runs when the button receives focus.
     */
    onFocus: PropTypes.func,
    /**
     * Function that runs when the user hovers away from the button.
     */
    onMouseLeave: PropTypes.func,
    /**
     * Function that runs when the button loses focus.
     */
    onBlur: PropTypes.func,
    /**
     * Description of the button’s content. It is required if the button has an icon and no
     * descriptive text.
     */
    accessibilityLabel: PropTypes.string,
    /**
     * Controls the button’s background, text, and border color.
     * `inherit` will make the button inherit `color` from its parent.
     */
    theme: PropTypes.oneOf(['primary', 'secondary', 'tertiary', 'inherit']),
    /**
     * Button’s of type `submit` will submit a form when used within a `form` element.
     */
    type: PropTypes.oneOf(['button', 'submit']),
    /**
     * A selector hook into the React component for use in automated testing environments.
     */
    dataTest: PropTypes.string,
};

TextButton.defaultProps = {
    children: undefined,
    isDisabled: false,
    iconLeft: null,
    theme: 'primary',
    onClick: null,
    onMouseEnter: undefined,
    onFocus: undefined,
    onMouseLeave: undefined,
    onBlur: undefined,
    type: 'button',
    accessibilityLabel: undefined,
    dataTest: undefined,
};

const Button = React.forwardRef((props, ref) => (
    <Themed
        {...getCommonProps(props)}
        icon={props.icon}
        isLoading={props.isLoading}
        theme={props.theme}
        size={props.size}
        width={props.width}
        ref={ref}
    />
));

Button.propTypes = {
    /**
     * Contents displayed within the button.
     */
    children: PropTypes.node,
    /**
     * Visually and functionally disables the button.
     */
    isDisabled: PropTypes.bool,
    /**
     * Boolean determining whether the button is in a loading state. When `true` the text will
     * we replaced with a loading animation and interaction will be disabled.
     */
    isLoading: PropTypes.bool,
    /**
     * Icon from [Thumbprint Icons](/icons/) to render within the button. It must be one of the
     * `small` icons.
     */
    icon: PropTypes.node,
    /**
     * Description of the button’s content. It is required if the button has an icon and no
     * descriptive text.
     */
    accessibilityLabel: PropTypes.string,
    /**
     * Button’s of type `submit` will submit a form when used within a `form` element.
     */
    type: PropTypes.oneOf(['button', 'submit']),
    /**
     * Function that will run when the button is clicked on.
     */
    onClick: PropTypes.func,
    /**
     * Function that runs when the user hovers on the button.
     */
    onMouseEnter: PropTypes.func,
    /**
     * Function that runs when the button receives focus.
     */
    onFocus: PropTypes.func,
    /**
     * Function that runs when the user hovers away from the button.
     */
    onMouseLeave: PropTypes.func,
    /**
     * Function that runs when the button loses focus.
     */
    onBlur: PropTypes.func,
    /**
     * Controls the button’s background, text, and border color.
     */
    theme: PropTypes.oneOf(['primary', 'secondary', 'caution', 'solid']),
    /**
     * Changes the button's `line-height`, `padding`, `border-radius`, and `font-size`.
     */
    size: PropTypes.oneOf(['small', 'large']),
    /**
     * `Button` components are as wide as the content that is passed in. The `full` option will
     * expand the width to `100%` on all screens. `full-below-small` will expand the width to 100%
     * on devices smaller than [our `small` breakpoint](/tokens/#section-breakpoint).
     */
    width: PropTypes.oneOf(['auto', 'full', 'full-below-small']),
    /**
     * A selector hook into the React component for use in automated testing environments.
     */
    dataTest: PropTypes.string,
};

Button.defaultProps = {
    children: undefined,
    type: 'button',
    isDisabled: false,
    isLoading: false,
    icon: undefined,
    onClick: undefined,
    onMouseEnter: undefined,
    onFocus: undefined,
    onMouseLeave: undefined,
    onBlur: undefined,
    theme: 'primary',
    size: 'large',
    width: 'auto',
    accessibilityLabel: undefined,
    dataTest: undefined,
};

export default Button;
export { TextButton };
