import React from 'react';
import PropTypes from 'prop-types';
import styles from './sticky-footer.module.scss';

/**
 * This component exists because `this.props.setSticky` updates state and React doesn't allow state
 * updates within `render`. The parent component (ModalDefaultFooter) receives `setSticky` within render
 * (with the Context API), so it's not possible to access the function within its lifecycle hooks.
 * https://blog.kentcdodds.com/answers-to-common-questions-about-render-props-a9f84bb12d5d#6a05
 */
class StickyFooter extends React.Component {
    componentDidMount() {
        const { setSticky } = this.props;
        setSticky(true);
    }

    render() {
        const { children } = this.props;

        return <div className={styles.root}>{children}</div>;
    }
}

StickyFooter.propTypes = {
    children: PropTypes.node.isRequired,
    setSticky: PropTypes.func,
};

StickyFooter.defaultProps = {
    setSticky: undefined,
};

export default StickyFooter;
