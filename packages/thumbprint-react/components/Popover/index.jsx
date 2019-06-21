import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Manager, Reference, Popper } from 'react-popper';
import startsWith from 'lodash/startsWith';

import { tpSpace3 } from '@thumbtack/thumbprint-tokens';

import { TextButton } from '../Button/index.jsx';
import { Themed } from '../UIAction/index.jsx';
import { NavigationCloseTiny } from '../../icons/index.jsx';

import styles from './index.module.scss';

const Popover = ({ children, launcher, position, isOpen, onCloseClick }) => (
    <Manager>
        <Reference>{({ ref }) => launcher({ ref })}</Reference>
        <Popper
            placement={position}
            modifiers={{
                offset: { offset: `0, ${tpSpace3}` },
                preventOverflow: { boundariesElement: 'window' },
            }}
            positionFixed={false}
        >
            {({ ref, style, placement, arrowProps }) => (
                <div
                    ref={ref}
                    className={classNames({
                        [styles.root]: true,
                        [styles.open]: isOpen,
                    })}
                    style={style}
                    data-placement={placement}
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
                            [styles.nubbinTop]: startsWith(position, 'bottom'),
                            [styles.nubbinBottom]: startsWith(position, 'top'),
                            [styles.nubbinLeft]: startsWith(position, 'right'),
                            [styles.nubbinRight]: startsWith(position, 'left'),
                        })}
                        ref={arrowProps.ref}
                        style={arrowProps.style}
                    />
                </div>
            )}
        </Popper>
    </Manager>
);

Popover.propTypes = {
    /**
     * Contents for the Popover. Usually a `PopoverTitle`, `PopoverBody`, and `PopoverPrimaryButton`.
     */
    children: PropTypes.node,
    /**
     * A function that renders JSX and receives an object with `ref`.
     * All of these props must be added to the component within the render prop.
     */
    launcher: PropTypes.func.isRequired,
    /**
     * Position of popover relative to the launcher.
     */
    position: PropTypes.oneOf([
        'top-start',
        'top',
        'top-end',
        'bottom-start',
        'bottom',
        'bottom-end',
        'left-start',
        'left',
        'left-end',
        'right-start',
        'right',
        'right-end',
    ]),
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
    position: 'top',
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
        <Themed size="small" onClick={onClick} theme="popover-primary">
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
        <Themed size="small" onClick={onClick} theme="popover-secondary">
            {children}
        </Themed>
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
