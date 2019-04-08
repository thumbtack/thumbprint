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
}) => ({
    onClick,
    type,
    onMouseEnter,
    onMouseOver,
    onFocus,
    onMouseLeave,
    onBlur,
});

export default getButtonProps;
