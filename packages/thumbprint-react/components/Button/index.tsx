import React from 'react';
import { Themed, Plain } from '../UIAction/index';
import { BaseButtonProps, ButtonCommonProps, MouseEventProps } from '../UIAction/ui-action-types';

const getCommonProps = (
    props: ButtonCommonProps<HTMLButtonElement>,
): ButtonCommonProps<HTMLButtonElement> => ({
    onClick: props.onClick,
    isDisabled: props.isDisabled,
    type: props.type,
    children: props.children,
    onMouseEnter: props.onMouseEnter,
    onMouseOver: props.onMouseOver,
    onFocus: props.onFocus,
    onMouseLeave: props.onMouseLeave,
    onBlur: props.onBlur,
    accessibilityLabel: props.accessibilityLabel,
    dataTest: props.dataTest,
    dataTestId: props.dataTestId,
});

export function TextButton({
    children,
    iconLeft,
    iconRight,
    isDisabled = false,
    onClick,
    onMouseEnter,
    onMouseOver,
    onFocus,
    onMouseLeave,
    onBlur,
    accessibilityLabel,
    theme = 'primary',
    type = 'button',
    dataTest,
    dataTestId,
    innerRef,
}: TextButtonProps): JSX.Element {
    return (
        <Plain
            {...getCommonProps({
                onClick,
                isDisabled,
                type,
                children,
                onMouseEnter,
                onMouseOver,
                onFocus,
                onMouseLeave,
                onBlur,
                accessibilityLabel,
                dataTest,
                dataTestId,
            })}
            theme={theme}
            iconLeft={iconLeft}
            iconRight={iconRight}
            innerRef={innerRef}
        />
    );
}

export interface TextButtonProps extends MouseEventProps<HTMLButtonElement> {
    /**
     * Contents displayed within the button.
     */
    children?: React.ReactNode;
    /**
     * Icon from [Thumbprint Icons](/icons/) to render left of the text within `TextButton`.
     */
    iconLeft?: React.ReactNode;
    /**
     * Icon from [Thumbprint Icons](/icons/) to render right of the text within `TextButton`.
     */
    iconRight?: React.ReactNode;
    /**
     * Visually and functionally disables the button. We discourage the use of this prop since it
     * is difficult to visually indicate that a link is disabled. Consider not rendering the
     * `TextButton` if it is not interactive.
     */
    isDisabled?: boolean;
    /**
     * Description of the button’s content. It is required if the button has an icon and no
     * descriptive text.
     */
    accessibilityLabel?: string;
    /**
     * Controls the button’s background, text, and border color.
     * `inherit` will make the button inherit `color` from its parent.
     */
    theme?: 'primary' | 'secondary' | 'tertiary' | 'inherit';
    /**
     * Button’s of type `submit` will submit a form when used within a `form` element.
     */
    type?: 'button' | 'submit';
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

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            children,
            isDisabled = false,
            isLoading = false,
            icon,
            iconRight,
            accessibilityLabel,
            type = 'button',
            onClick,
            onMouseEnter,
            onMouseOver,
            onFocus,
            onMouseLeave,
            onBlur,
            theme = 'primary',
            size = 'large',
            width = 'auto',
            dataTest,
            dataTestId,
        }: ButtonProps,
        ref,
    ): JSX.Element => (
        <Themed
            {...getCommonProps({
                onClick,
                isDisabled,
                type,
                children,
                onMouseEnter,
                onMouseOver,
                onFocus,
                onMouseLeave,
                onBlur,
                accessibilityLabel,
                dataTest,
                dataTestId,
            })}
            icon={icon}
            iconRight={iconRight}
            isLoading={isLoading}
            theme={theme}
            size={size}
            width={width}
            innerRef={ref}
        />
    ),
);

export default Button;

export interface ButtonProps extends BaseButtonProps {
    /**
     * Contents displayed within the button.
     */
    children?: React.ReactNode;
    /**
     * Visually and functionally disables the button.
     */
    isDisabled?: boolean;
    /**
     * Boolean determining whether the button is in a loading state. When `true` the text will
     * we replaced with a loading animation and interaction will be disabled.
     */
    isLoading?: boolean;
    /**
     * Icon from [Thumbprint Icons](/icons/) to render left within the button. It must be one of the
     * `small` icons.
     */
    icon?: React.ReactNode;
    /**
     * Icon from [Thumbprint Icons](/icons/) to render right within the button. It must be one of the
     * `small` icons.
     */
    iconRight?: React.ReactNode;
    /**
     * Description of the button’s content. It is required if the button has an icon and no
     * descriptive text.
     */
    accessibilityLabel?: string;
    /**
     * Controls the button’s background, text, and border color.
     */
    theme?: 'primary' | 'secondary' | 'tertiary' | 'caution' | 'solid';
    /**
     * Changes the button's `line-height`, `padding`, `border-radius`, and `font-size`.
     */
    size?: 'small' | 'large';
    /**
     * `Button` components are as wide as the content that is passed in. The `full` option will
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
