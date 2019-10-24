interface ButtonProps {
    type: 'button' | 'submit';
    onClick?: () => void;
    onMouseEnter?: () => void;
    onMouseOver?: () => void;
    onFocus?: () => void;
    onMouseLeave?: () => void;
    onBlur?: () => void;
}

/**
 * Enable plain and themed `<button>` elements to share the same props.
 */
const getButtonProps = ({
    onClick,
    type = 'button',
    onMouseEnter,
    onMouseOver,
    onFocus,
    onMouseLeave,
    onBlur,
}: ButtonProps): ButtonProps => ({
    onClick,
    type,
    onMouseEnter,
    onMouseOver,
    onFocus,
    onMouseLeave,
    onBlur,
});

export default getButtonProps;
