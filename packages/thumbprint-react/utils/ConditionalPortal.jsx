import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

/**
 * Component to conditionally portal a component to the end of the <body> if a certain condition is
 * true. For example, we can't use portals in SSR.
 */
export default function ConditionalPortal({ shouldDisplace, children }) {
    return shouldDisplace ? ReactDOM.createPortal(children, document.body) : children;
}

ConditionalPortal.propTypes = {
    shouldDisplace: PropTypes.bool.isRequired,
    children: PropTypes.node,
};

ConditionalPortal.defaultProps = {
    children: undefined,
};
