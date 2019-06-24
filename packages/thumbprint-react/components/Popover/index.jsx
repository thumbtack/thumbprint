import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Manager, Reference, Popper } from 'react-popper';
import FocusTrap from 'focus-trap-react';
import startsWith from 'lodash/startsWith';

import * as tokens from '@thumbtack/thumbprint-tokens';

import canUseDOM from '../../utils/can-use-dom';

import { TextButton } from '../Button/index.jsx';
import { Themed } from '../UIAction/index.jsx';
import { NavigationCloseTiny } from '../../icons/index.jsx';

import styles from './index.module.scss';

const ESC_KEY = 27;

// === Internal component ===

// Internal component only. Proptypes are defined for the main component `Popover` at the end of the
// file.
// eslint-disable-next-line react/prop-types
const PopoverContent = ({ position, isOpen, children, onCloseClick, accessibilityLabel }) => {
    return (
        <Popper
            placement={position}
            modifiers={{
                offset: { offset: `0, ${tokens.tpSpace3}` },
                preventOverflow: { boundariesElement: 'window' },
            }}
            positionFixed={false}
        >
            {({ ref: popperRef, style, placement, arrowProps }) => (
                <FocusTrap
                    // TODO(set this to `isOpen`)
                    active={false}
                    focusTrapOptions={{
                        clickOutsideDeactivates: false,
                        // Set initial focus to the popover content itself instead of focusing on the first
                        // focusable element by default.
                        // initialFocus: () => popperRef.current,
                    }}
                >
                    <div
                        ref={popperRef}
                        className={classNames({
                            [styles.root]: true,
                            [styles.open]: isOpen,
                        })}
                        style={style}
                        data-placement={placement}
                        role="dialog"
                        aria-label={accessibilityLabel}
                    >
                        {children}

                        <div className={styles.closeButton}>
                            <TextButton
                                accessibilityLabel="Close popover"
                                iconLeft={
                                    <NavigationCloseTiny className={styles.closeButtonIcon} />
                                }
                                theme="inherit"
                                onClick={onCloseClick}
                            />
                        </div>

                        <div
                            className={classNames({
                                [styles.nubbin]: true,
                                [styles.nubbinTop]: startsWith(placement, 'bottom'),
                                [styles.nubbinBottom]: startsWith(placement, 'top'),
                                [styles.nubbinLeft]: startsWith(placement, 'right'),
                                [styles.nubbinRight]: startsWith(placement, 'left'),
                            })}
                            ref={arrowProps.ref}
                            style={arrowProps.style}
                        />
                    </div>
                </FocusTrap>
            )}
        </Popper>
    );
};

// === Main export ===
const Popover = ({
    children,
    launcher,
    position,
    isOpen,
    onCloseClick,
    container,
    accessibilityLabel,
}) => {
    // Appends the tooltip right before `</body>` when true.
    const shouldDisplace = container === 'body';

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
    }, []);

    const popoverContent = (
        <PopoverContent
            position={position}
            isOpen={isOpen}
            onCloseClick={onCloseClick}
            accessibilityLabel={accessibilityLabel}
        >
            {children}
        </PopoverContent>
    );

    return (
        <Manager>
            <Reference>{({ ref }) => launcher({ ref })}</Reference>
            {canUseDOM &&
                (shouldDisplace
                    ? ReactDOM.createPortal(popoverContent, document.body)
                    : popoverContent)}
        </Manager>
    );
};

Popover.propTypes = {
    /**
     * Contents for the Popover. Usually a `PopoverTitle`, `PopoverBody`, and `PopoverPrimaryButton`
     */
    children: PropTypes.node.isRequired,
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
    isOpen: PropTypes.bool,
    /**
     * Function called when the close button is clicked. You should cause this to set `isOpen=false`
     * in your parent component
     */
    onCloseClick: PropTypes.func.isRequired,
    /**
     * By default popovers will render right before the `</body>` tag.
     * Setting the `container` to `inline` causes the tooltip to remain where it was added to the
     * DOM.
     * This option is helpful to work around z-index and positioning issues.
     */
    container: PropTypes.oneOf(['inline', 'body']),
    /**
     * Accessibility title used to describe the content of the popover to screen readers.
     */
    accessibilityLabel: PropTypes.string,
};

Popover.defaultProps = {
    isOpen: false,
    position: 'top',
    container: 'body',
    accessibilityLabel: 'Popover',
};

export default Popover;

// === Sub-components ===

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
    children: PropTypes.node.isRequired,
};

const PopoverPrimaryButton = ({ children, onClick }) => (
    <Themed size="small" onClick={onClick} theme="popover-primary">
        {children}
    </Themed>
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

const PopoverSecondaryButton = ({ children, onClick, to }) => (
    <Themed size="small" onClick={onClick} to={to} theme="popover-secondary" shouldOpenInNewTab>
        {children}
    </Themed>
);

PopoverSecondaryButton.propTypes = {
    /**
     * The text for this button.
     */
    children: PropTypes.string.isRequired,
    /**
     * Function called when the button is clicked, or link to visit.
     */
    onClick: PropTypes.func,
    /**
     * Link to visit when the button is clicked. It will be opened in a new tab.
     */
    to: PropTypes.string,
};

PopoverSecondaryButton.defaultProps = {
    onClick: undefined,
    to: undefined,
};

export { PopoverTitle, PopoverBody, PopoverPrimaryButton, PopoverSecondaryButton };
