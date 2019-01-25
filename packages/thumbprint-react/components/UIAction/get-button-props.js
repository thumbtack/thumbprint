/**
 * Enable plain and themed `<button>` elements to share the same props.
 */
const getButtonProps = ({
    onClick,
    type = 'button',
    onMouseEnter,
    onFocus,
    onMouseLeave,
    onBlur,
}) => ({
    onClick,
    type,
    onMouseEnter,
    onFocus,
    onMouseLeave,
    onBlur,
});

export default getButtonProps;
