import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import onClickOutside from 'react-onclickoutside';
import isFunction from 'lodash/isFunction';
import styles from './index.module.scss';

class ModalContents extends React.Component {
    constructor(props) {
        super(props);

        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    handleClickOutside(event) {
        const { onCloseClick } = this.props;

        if (isFunction(onCloseClick)) {
            onCloseClick(event);
        }
    }

    render() {
        const { isOpen, shouldAnimate, contentsMaxWidth, children } = this.props;

        return (
            <div
                className={classnames(styles.modalContents, {
                    [styles.modalContentsOpen]: isOpen,
                    [styles.modalContentsAnimated]: shouldAnimate,
                })}
                style={{ maxWidth: contentsMaxWidth }}
            >
                {children}
            </div>
        );
    }
}

ModalContents.propTypes = {
    /**
     * Function that fires to close the modal.
     */
    onCloseClick: PropTypes.func,
    /**
     * Content inside the modal.
     */
    children: PropTypes.node,
    /**
     * The max width of the container that wraps the contents of the modal.
     */
    contentsMaxWidth: PropTypes.string.isRequired,
    /**
     * Used by `react-onclickoutside` to indicate if the modal should close
     * when clicking outside of it. If `true`, this prevents backdrop clicks
     * from closing the modal.
     */
    disableOnClickOutside:
        // eslint-disable-next-line react/no-unused-prop-types
        PropTypes.oneOfType([
            // This should be passed in as a boolean. `func` is also listed because
            // onClickOutside`'s HOC changes it to a function.
            PropTypes.bool,
            PropTypes.func,
        ]),
    /**
     * Should the modal contents be visible.
     */
    isOpen: PropTypes.bool,
    /**
     * Animate when opening and closing the modal.
     */
    shouldAnimate: PropTypes.bool,
};

ModalContents.defaultProps = {
    onCloseClick: undefined,
    children: null,
    disableOnClickOutside: undefined,
    isOpen: false,
    shouldAnimate: true,
};

export default onClickOutside(ModalContents);
