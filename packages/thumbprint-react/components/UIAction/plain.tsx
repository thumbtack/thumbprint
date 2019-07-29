import React from 'react';
import warning from 'warning';
import classNames from 'classnames';
import getAnchorProps from './get-anchor-props';
import getButtonProps from './get-button-props';
import styles from './plain.module.scss';

const Plain = React.forwardRef<HTMLElement, PropTypes>(
    (props, ref): JSX.Element => {
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
            return (
                <a // eslint-disable-line jsx-a11y/anchor-has-content
                    {...commonProps}
                    {...getAnchorProps(props)}
                    ref={ref as React.Ref<HTMLAnchorElement>}
                />
            );
        }

        return (
            <button // eslint-disable-line react/button-has-type
                {...commonProps}
                {...getButtonProps(props)}
                ref={ref as React.Ref<HTMLButtonElement>}
            />
        );
    },
);

interface PropTypes {
    isDisabled?: boolean;
    /**
     * Page to navigate to when the anchor is clicked.
     */
    to?: string;
    /**
     * Icon from [Thumbprint Icons](/icons/) to render left of the text.
     */
    iconLeft?: React.ReactNode;
    /**
     * Sets the text color.
     */
    theme?: 'primary' | 'secondary' | 'tertiary' | 'inherit';
    /**
     * Button’s of type `submit` will submit a form when used within a `form` element.
     */
    type?: 'button' | 'submit';
    /**
     * Opens the URL in a new tab when clicked.
     */
    shouldOpenInNewTab?: boolean;
    children?: React.ReactNode;
    onClick?: () => void;
    /**
     * Function that runs when the user hovers on the button.
     */
    onMouseEnter?: () => void;
    /**
     * Function that runs when the user hovers on the button. Unlike `onMouseEnter`, `onMouseOver`
     * fires each time a child element receives focus.
     */
    onMouseOver?: () => void;
    /**
     * Function that runs when the button receives focus.
     */
    onFocus?: () => void;
    /**
     * Function that runs when the user hovers away from the button.
     */
    onMouseLeave?: () => void;
    /**
     * Function that runs when the button loses focus.
     */
    onBlur?: () => void;
    /**
     * Description of the button’s content. It is required if the button has an icon and no
     * descriptive text.
     */
    accessibilityLabel?: string;
    /**
     * A selector hook into the React component for use in automated testing environments.
     */
    dataTest?: string;
}

// Plain.defaultProps = {
//     isDisabled: false,
//     iconLeft: null,
//     to: null,
//     theme: 'primary',
//     shouldOpenInNewTab: false,
//     onClick: null,
// };

export default Plain;
