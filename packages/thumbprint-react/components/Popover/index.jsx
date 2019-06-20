import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { TextButton } from '../Button/index.jsx';
import { Themed, Plain } from '../UIAction/index.jsx';
import { NavigationCloseTiny } from '../../icons/index.jsx';

import styles from './index.module.scss';

const Popover = ({ children, nubbinPosition, isOpen, onCloseClick }) => (
    <div
        className={classNames({
            [styles.root]: true,
            [styles.open]: isOpen,
        })}
    >
        {children}

        <div className={styles.closeButton}>
            <TextButton
                accessibilityLabel="Close popover"
                iconLeft={<NavigationCloseTiny className={styles.closeButtonIcon} />}
                theme="inherit"
                onClick={onCloseClick}
            />
        </div>

        <div
            className={classNames({
                [styles.nubbin]: true,
                [styles.nubbinTop]: nubbinPosition === 'top',
                [styles.nubbinBottom]: nubbinPosition === 'bottom',
            })}
        />
    </div>
);

Popover.propTypes = {
    /**
     * Contents for the Popover. Usually a `PopoverTitle`, `PopoverBody`, and `PopoverPrimaryButton`.
     */
    children: PropTypes.node,
    /**
     * Position of the nubbin relative to the popover.
     * TODO(giles): add the other 10 positions here
     */
    nubbinPosition: PropTypes.oneOf(['top', 'bottom']),
    /**
     * Whether or not the popover is visible.
     */
    isOpen: PropTypes.bool.isRequired,
    /**
     * Function called when the close button is clicked. You should cause this to set `isOpen=false`
     * in your parent component
     */
    onCloseClick: PropTypes.func.isRequired,
};

Popover.defaultProps = {
    children: null,
    nubbinPosition: 'top',
};

const PopoverTitle = ({ children }) => <div className={styles.popoverTitle}>{children}</div>;

PopoverTitle.propTypes = {
    /**
     * A title for the popover.
     */
    children: PropTypes.string.isRequired,
};

const PopoverBody = ({ children }) => <div className={styles.popoverBody}>{children}</div>;

PopoverBody.propTypes = {
    /**
     * The body description text for the popover.
     */
    children: PropTypes.string.isRequired,
};

const PopoverPrimaryButton = ({ children, onClick }) => (
    <div className={styles.popoverButton}>
        <Themed size="small" onClick={onClick} theme="popover">
            {children}
        </Themed>
    </div>
);

PopoverPrimaryButton.propTypes = {
    /**
     * The text for this button.
     */
    children: PropTypes.string.isRequired,
    /**
     * Function called when the button is clicked.
     */
    onClick: PropTypes.func.isRequired,
};

const PopoverSecondaryButton = ({ children, onClick }) => (
    <div className={styles.popoverButton}>
        <Plain size="small" onClick={onClick} theme="secondary">
            {children}
        </Plain>
    </div>
);

PopoverSecondaryButton.propTypes = {
    /**
     * The text for this button.
     */
    children: PropTypes.string.isRequired,
    /**
     * Function called when the button is clicked.
     */
    onClick: PropTypes.func.isRequired,
};

export default Popover;

export { PopoverTitle, PopoverBody, PopoverPrimaryButton, PopoverSecondaryButton };
