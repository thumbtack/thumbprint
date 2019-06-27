import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import canUseDOM from './can-use-dom';

/**
 * Component to conditionally portal a component to the end of the <body> if a certain condition is
 * true. Also automatically guards against trying to use portals in SSR where `document` is not
 * defined.
 */
export default function ConditionalPortal({ shouldDisplace, children }) {
    return canUseDOM && shouldDisplace ? ReactDOM.createPortal(children, document.body) : children;
}

ConditionalPortal.propTypes = {
    shouldDisplace: PropTypes.bool,
    children: PropTypes.node.isRequired,
};

ConditionalPortal.defaultProps = {
    shouldDisplace: false,
};
