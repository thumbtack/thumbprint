import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Popper } from 'react-popper';
import startsWith from 'lodash/startsWith';

import { tpSpace3 } from '@thumbtack/thumbprint-tokens';

import { TextButton } from '../Button/index.jsx';
import { Themed } from '../UIAction/index.jsx';
import { NavigationCloseTiny } from '../../icons/index.jsx';

import styles from './index.module.scss';

const ESC_KEY = 27;

const Popover = ({ children, target, position, isOpen, onCloseClick }) => {
    const handleKeyUp = event => {
        if (event.keyCode === ESC_KEY) {
            onCloseClick();
        }
    };

    useEffect(() => {
        document.addEventListener('keyup', handleKeyUp);
        return () => {
            document.removeEventListener('keyup', handleKeyUp);
        };
    });

    return (
        <Popper
            referenceElement={target && target.current ? target.current : target}
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
    );
};

Popover.propTypes = {
    /**
     * Contents for the Popover. Usually a `PopoverTitle`, `PopoverBody`, and `PopoverPrimaryButton`.
     */
    children: PropTypes.node,
    /**
     * An HTML DOM node or `ref` with `.current`.
     */
    target: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
    ]).isRequired,
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
