import React from 'react';
import PropTypes from 'prop-types';
import warning from 'warning';
import classNames from 'classnames';
import getAnchorProps from './get-anchor-props';
import getButtonProps from './get-button-props';
import styles from './plain.module.scss';

const Plain = React.forwardRef((props, ref) => {
    warning(
        props.children || props.accessibilityLabel || (props.iconLeft && props.children),
        'The prop `accessibilityLabel` must be provided to the button or link if `iconLeft` is provided but `children` is not. This helps users on screen readers navigate our content.',
    );

    const children = props.iconLeft ? (
        <span className={styles.flexCenter}>
            {props.iconLeft}
            {props.children && <span className={styles.textContainer}>{props.children}</span>}
        </span>
    ) : (
        props.children
    );

    const commonProps = {
        disabled: props.isDisabled,
        children,
        className: classNames({
            [styles.plain]: true,
            [styles.plainThemePrimary]: props.theme === 'primary',
            [styles.plainThemeSecondary]: props.theme === 'secondary',
            [styles.plainThemeTertiary]: props.theme === 'tertiary',
            [styles.plainThemeInherit]: props.theme === 'inherit',
        }),
        'aria-label': props.accessibilityLabel,
        'data-test': props.dataTest,
        ref,
    };

    if (props.to) {
        // eslint-disable-next-line jsx-a11y/anchor-has-content
        return <a {...commonProps} {...getAnchorProps(props)} />;
    }

    // eslint-disable-next-line react/button-has-type
    return <button {...commonProps} {...getButtonProps(props)} />;
});

Plain.propTypes = {
    isDisabled: PropTypes.bool,
    /**
     * Page to navigate to when the anchor is clicked.
     */
    to: PropTypes.string,
    /**
     * Icon from [Thumbprint Icons](/icons/) to render left of the
     * text.
     */
    iconLeft: PropTypes.node,
    /**
     * Sets the text color.
     */
    theme: PropTypes.oneOf(['primary', 'secondary', 'tertiary', 'inherit']),
    /**
     * Opens the URL in a new tab when clicked.
     */
    shouldOpenInNewTab: PropTypes.bool,
    children: PropTypes.node,
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
     * A selector hook into the React component for use in automated testing environments.
     */
    dataTest: PropTypes.string,
};

Plain.defaultProps = {
    children: undefined,
    isDisabled: false,
    iconLeft: null,
    to: null,
    theme: 'primary',
    shouldOpenInNewTab: false,
    onClick: null,
    onMouseEnter: undefined,
    onFocus: undefined,
    onMouseLeave: undefined,
    onBlur: undefined,
    accessibilityLabel: undefined,
    dataTest: undefined,
};

export default Plain;
