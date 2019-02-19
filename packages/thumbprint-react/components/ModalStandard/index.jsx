import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ModalBase from '../ModalBase/index.jsx';
import styles from './index.module.scss';

const CloseIcon = p => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...p}>
        <path d="M21 4.46L19.54 3 12 10.54 4.46 3 3 4.46 10.54 12 3 19.54 4.46 21 12 13.46 19.54 21 21 19.54 13.46 12 21 4.46z" />
    </svg>
);

const ModalStandard = ({
    children,
    isOpen,
    onCloseClick,
    onCloseFinish,
    onOpenFinish,
    shouldCloseOnBackdropClick,
    shouldHideCloseButton,
    theme,
}) => (
    <ModalBase
        isOpen={isOpen}
        onCloseClick={onCloseClick}
        contentsMaxWidth="600px"
        shouldCloseOnBackdropClick={shouldCloseOnBackdropClick}
        onOpenFinish={onOpenFinish}
        onCloseFinish={onCloseFinish}
    >
        <div
            className={classnames({
                [styles.contents]: true,
                [styles.contentsBrand]: theme === 'brand',
            })}
        >
            {children}
            {shouldHideCloseButton === false && (
                <button onClick={onCloseClick} className={styles.closeButton} type="button">
                    <CloseIcon
                        className={classnames({
                            [styles.closeIcon]: true,
                            [styles.closeIconBrand]: theme === 'brand',
                        })}
                    />
                </button>
            )}
        </div>
    </ModalBase>
);

ModalStandard.propTypes = {
    /**
     * Content that appears above the Backdrop.
     */
    children: PropTypes.node,
    /**
     * Function that fires to close the modal.
     */
    onCloseClick: PropTypes.func.isRequired,
    /**
     * Function that fires once the modal has opened and transitions have ended.
     */
    onOpenFinish: PropTypes.func,
    /**
     * Function that fires once the modal has closed and transitions have ended.
     */
    onCloseFinish: PropTypes.func,
    /**
     * Determines if the modal should close when clicking on the Backdrop,
     * outside of the `children`.
     */
    shouldCloseOnBackdropClick: PropTypes.bool,
    /**
     * Determines if the close button should be rendered. This is generally discouraged and should
     * be used carefully. If used, the contents passed into the modal must contain a focusable
     * element such as a link or button.
     */
    shouldHideCloseButton: PropTypes.bool,
    /**
     * Should the Backdrop appear open.
     */
    isOpen: PropTypes.bool,
    /**
     * Sets the color of the background and close button.
     */
    theme: PropTypes.oneOf(['brand', 'faint']),
};

ModalStandard.defaultProps = {
    children: undefined,
    onOpenFinish: undefined,
    onCloseFinish: undefined,
    isOpen: false,
    theme: 'faint',
    shouldCloseOnBackdropClick: true,
    shouldHideCloseButton: false,
};

export default ModalStandard;
