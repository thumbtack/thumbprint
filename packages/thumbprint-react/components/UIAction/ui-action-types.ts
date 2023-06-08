export type AnchorOrButton = HTMLAnchorElement | HTMLButtonElement;

export interface MouseEventProps<TElement extends AnchorOrButton> {
    /**
     * Function that will run when the target is clicked.
     */
    onClick?: (event: React.MouseEvent<TElement, MouseEvent>) => void;
    /**
     * Function that runs when the user hovers on the target.
     */
    onMouseEnter?: (event: React.MouseEvent<TElement, MouseEvent>) => void;
    /**
     * Function that runs when the user hovers on the target. Unlike `onMouseEnter`, `onMouseOver`
     * fires each time a child element receives focus.
     */
    onMouseOver?: (event: React.MouseEvent<TElement, MouseEvent>) => void;
    /**
     * Function that runs when the user hovers away from the target.
     */
    onMouseLeave?: (event: React.MouseEvent<TElement, MouseEvent>) => void;
    /**
     * Function that runs when the target receives focus.
     */
    onFocus?: (event: React.FocusEvent<TElement>) => void;
    /**
     * Function that runs when the target loses focus.
     */
    onBlur?: (event: React.FocusEvent<TElement>) => void;
}

export interface BaseAnchorProps extends MouseEventProps<HTMLAnchorElement> {
    href?: string;
    target: string;
    rel?: string;
    title?: string;
}

export interface AnchorInputProps extends MouseEventProps<HTMLAnchorElement> {
    isDisabled?: boolean;
    shouldOpenInNewTab?: boolean;
    to?: string;
    rel?: string;
    target?: string;
    title?: string;
}

export interface BaseButtonProps extends MouseEventProps<HTMLButtonElement> {
    /**
     * Buttons of type `submit` will submit a form when used within a `form` element.
     */
    type?: 'button' | 'submit';
}

export interface ButtonCommonProps<T extends AnchorOrButton> extends MouseEventProps<T> {
    children?: React.ReactNode;
    iconLeft?: React.ReactNode;
    iconRight?: React.ReactNode;
    isDisabled?: boolean;
    theme?: 'primary' | 'secondary' | 'tertiary' | 'inherit';
    type?: 'button' | 'submit';
    dataTest?: string;
    dataTestId?: string;
    accessibilityLabel?: string;
}

export interface AnchorCommonProps extends MouseEventProps<HTMLAnchorElement> {
    to?: string;
    target?: string;
    shouldOpenInNewTab?: boolean;
    children?: React.ReactNode;
    isDisabled?: boolean;
    rel?: string;
    dataTestId?: string;
    dataTest?: string;
    accessibilityLabel?: string;
    title?: string;
}
