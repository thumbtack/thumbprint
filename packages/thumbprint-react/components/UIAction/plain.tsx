import React from 'react';
import warning from 'warning';
import classNames from 'classnames';
import getAnchorProps from './get-anchor-props';
import getButtonProps from './get-button-props';
import styles from './plain.module.scss';

const Plain = React.forwardRef<HTMLAnchorElement | HTMLButtonElement, PropTypes>(
    (
        {
            children,
            isDisabled = false,
            to,
            iconLeft,
            iconRight,
            theme = 'primary',
            type = 'button',
            shouldOpenInNewTab = false,
            onClick,
            onMouseEnter,
            onMouseOver,
            onFocus,
            onMouseLeave,
            onBlur,
            accessibilityLabel,
            dataTest,
        },
        ref,
    ): JSX.Element => {
        warning(
            children || accessibilityLabel || (iconLeft && children),
            'The prop `accessibilityLabel` must be provided to the button or link if `iconLeft` or `iconRight` are provided but `children` is not. This helps users on screen readers navigate our content.',
        );

        let newChildren = children;

        if (iconLeft || iconRight) {
            newChildren = (
                <span className={styles.flexCenter}>
                    {iconLeft}

                    {children && (
                        <span
                            className={classNames({
                                [styles.textContainer]: true,
                                [styles.textContainerLeft]: iconLeft,
                                [styles.textContainerRight]: iconRight,
                            })}
                        >
                            {children}
                        </span>
                    )}

                    {iconRight}
                </span>
            );
        }

        const commonProps = {
            disabled: isDisabled,
            children: newChildren,
            className: classNames({
                [styles.plain]: true,
                [styles.plainThemePrimary]: theme === 'primary',
                [styles.plainThemeSecondary]: theme === 'secondary',
                [styles.plainThemeTertiary]: theme === 'tertiary',
                [styles.plainThemeInherit]: theme === 'inherit',
            }),
            'aria-label': accessibilityLabel,
            'data-test': dataTest,
            ref,
        };

        if (to) {
            return (
                <a // eslint-disable-line jsx-a11y/anchor-has-content
                    {...commonProps}
                    {...getAnchorProps({ isDisabled, shouldOpenInNewTab, to, onClick })}
                    ref={ref as React.Ref<HTMLAnchorElement>}
                />
            );
        }

        return (
            <button // eslint-disable-line react/button-has-type
                {...commonProps}
                {...getButtonProps({
                    onClick,
                    type,
                    onMouseEnter,
                    onMouseOver,
                    onFocus,
                    onMouseLeave,
                    onBlur,
                })}
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
     * Icon from [Thumbprint Icons](/icons/) to render right of the text.
     */
    iconRight?: React.ReactNode;
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
    /**
     * Function that will run when the button is clicked on.
     */
    onClick?: (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>) => void;
    /**
     * Function that runs when the user hovers on the button.
     */
    onMouseEnter?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    /**
     * Function that runs when the user hovers on the button. Unlike `onMouseEnter`, `onMouseOver`
     * fires each time a child element receives focus.
     */
    onMouseOver?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    /**
     * Function that runs when the user hovers away from the button.
     */
    onMouseLeave?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    /**
     * Function that runs when the button receives focus.
     */
    onFocus?: (event: React.FocusEvent<HTMLButtonElement>) => void;
    /**
     * Function that runs when the button loses focus.
     */
    onBlur?: (event: React.FocusEvent<HTMLButtonElement>) => void;
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

export default Plain;
