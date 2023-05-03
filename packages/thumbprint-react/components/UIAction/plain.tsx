import React from 'react';
import warning from 'warning';
import classNames from 'classnames';
import getAnchorProps from './get-anchor-props';
import getButtonProps from './get-button-props';
import styles from './plain.module.scss';
import { AnchorOrButton, MouseEventProps } from './ui-action-types';

export default function Plain<T extends AnchorOrButton>({
    children,
    isDisabled = false,
    to,
    iconLeft,
    iconRight,
    theme = 'primary',
    type = 'button',
    rel,
    target,
    shouldOpenInNewTab = false,
    onClick,
    onMouseEnter,
    onMouseOver,
    onFocus,
    onMouseLeave,
    onBlur,
    accessibilityLabel,
    dataTestId,
    dataTest,
    title,
    innerRef,
}: PlainProps<T>): JSX.Element {
    warning(
        children || accessibilityLabel || ((iconLeft || iconRight) && children),
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
        'data-testid': dataTestId,
        'data-test': dataTest,
    };

    if (to) {
        const eventProps = {
            onClick,
            onMouseEnter,
            onMouseOver,
            onFocus,
            onMouseLeave,
            onBlur,
        } as MouseEventProps<HTMLAnchorElement>;

        return (
            <a // eslint-disable-line jsx-a11y/anchor-has-content
                {...commonProps}
                {...getAnchorProps({
                    isDisabled,
                    target,
                    shouldOpenInNewTab,
                    to,
                    ...eventProps,
                    rel,
                    title,
                })}
                ref={innerRef as React.Ref<HTMLAnchorElement>}
            />
        );
    }

    const eventProps = {
        onClick,
        onMouseEnter,
        onMouseOver,
        onFocus,
        onMouseLeave,
        onBlur,
    } as MouseEventProps<HTMLButtonElement>;
    return (
        <button // eslint-disable-line react/button-has-type
            {...commonProps}
            {...getButtonProps({
                type,
                ...eventProps,
            })}
            ref={innerRef as React.Ref<HTMLButtonElement>}
        />
    );
}

interface PlainProps<T extends AnchorOrButton> extends MouseEventProps<T> {
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
     * The anchor `rel` attribute. Setting this value will add to any defalut values provided by
     * Thumbprint for the `rel` attribute.
     */
    rel?: string;
    /**
     * The anchor `target` attribute. Set this to `_blank` to open in a new tab, or to an arbitrary
     * string to open the link in an `<iframe>` with the same `name`.
     */
    target?: string;
    /**
     * Opens the URL in a new tab when clicked.
     */
    shouldOpenInNewTab?: boolean;
    children?: React.ReactNode;
    /**
     * Description of the button’s content. It is required if the button has an icon and no
     * descriptive text.
     */
    accessibilityLabel?: string;
    /**
     * A selector hook into the React component for use in automated testing environments.
     */
    dataTestId?: string;
    /**
     * A selector hook into the React component for use in automated testing environments.
     * @deprecated Deprecated in favor of the `dataTestId` prop
     */
    dataTest?: string;
    /**
     * Adds the `title` attribute to the element. This should be used infrequently since it's better
     * to use descriptive text in `children`.
     */
    title?: string;

    innerRef?: React.Ref<T>;
}
