import React, { useState } from 'react';
import classNames from 'classnames';
import { Manager, Reference, Popper } from 'react-popper';
import startsWith from 'lodash/startsWith';

import * as tokens from '@thumbtack/thumbprint-tokens';

import ConditionalPortal from '../../utils/ConditionalPortal';
import canUseDOM from '../../utils/can-use-dom';
import useCloseOnEscape from '../../utils/use-close-on-escape';
import useFocusTrap from '../../utils/use-focus-trap';

import { TextButton } from '../Button/index.jsx';
import { Themed } from '../UIAction/index.jsx';
import { NavigationCloseTiny } from '../../icons/index.jsx';

import styles from './index.module.scss';

const Popover = ({
    children,
    launcher,
    onCloseClick,
    position = 'top',
    isOpen = false,
    container = 'body',
    accessibilityLabel = 'Popover',
}: PropTypes): JSX.Element => {
    // Appends the tooltip right before `</body>` when true. Used to prevent z-index and positioning
    // issues.
    const shouldDisplace = container === 'body';

    // Using `useState` instead of `useRef `to allow multiple refs. See Image for another example.
    const [wrapperEl, setWrapperEl] = useState();

    const shouldTrapFocus: boolean = canUseDOM && !!wrapperEl;
    const shouldBindEscListener: boolean = canUseDOM && isOpen;

    useCloseOnEscape(onCloseClick, shouldBindEscListener);
    useFocusTrap(wrapperEl, shouldTrapFocus);

    return (
        <Manager>
            <Reference>{({ ref }): any => launcher({ ref })}</Reference>
            <ConditionalPortal shouldDisplace={shouldDisplace}>
                {canUseDOM && (
                    <Popper
                        placement={position}
                        modifiers={{
                            offset: { offset: `0, ${tokens.tpSpace3}` },
                            preventOverflow: { boundariesElement: 'window' },
                        }}
                        positionFixed={false}
                    >
                        {({ ref: popperRef, style, placement, arrowProps }): JSX.Element => (
                            // Use tabIndex="-1" to allow programmatic focus (as initialFocus node
                            // for focus-trap) but not be tabbable by user.
                            <div
                                role="dialog"
                                aria-label={accessibilityLabel}
                                tabIndex={-1}
                                ref={(el: HTMLElement | null): void => {
                                    setWrapperEl(el);
                                    popperRef(el);
                                }}
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
                                        iconLeft={
                                            <NavigationCloseTiny
                                                className={styles.closeButtonIcon}
                                            />
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
                        )}
                    </Popper>
                )}
            </ConditionalPortal>
        </Manager>
    );
};

interface PropTypes {
    /**
     * Contents for the Popover. Usually a `PopoverTitle`, `PopoverBody`, and `PopoverPrimaryButton`
     */
    children: React.ReactNode;
    /**
     * A function that renders JSX and receives an object with `ref`.
     * All of these props must be added to the component within the render prop.
     */
    launcher: ({ ref }) => any;
    /**
     * Position of popover relative to the launcher.
     */
    position?:
        | 'top-start'
        | 'top'
        | 'top-end'
        | 'bottom-start'
        | 'bottom'
        | 'bottom-end'
        | 'left-start'
        | 'left'
        | 'left-end'
        | 'right-start'
        | 'right'
        | 'right-end';
    /**
     * Whether or not the popover is visible.
     */
    isOpen?: boolean;
    /**
     * Function called when the close button is clicked. You should cause this to set `isOpen=false`
     * in your parent component.
     */
    onCloseClick: () => void;
    /**
     * By default popovers will render right before the `</body>` tag.
     * Setting the `container` to `inline` causes the tooltip to remain where it was added to the
     * DOM.
     * This option is helpful to work around z-index and positioning issues.
     */
    container?: 'inline' | 'body';
    /**
     * Accessibility title used to describe the content of the popover to screen readers.
     */
    accessibilityLabel?: string;
}

export default Popover;

// === Sub-components ===

const PopoverTitle = ({ children }: { children: React.ReactNode }): JSX.Element => (
    <div className={styles.popoverTitle}>{children}</div>
);

const PopoverBody = ({ children }: { children: React.ReactNode }): JSX.Element => (
    <div className={styles.popoverBody}>{children}</div>
);

const PopoverPrimaryButton = ({
    children,
    onClick,
}: {
    children: string;
    onClick: () => void;
}): JSX.Element => (
    <Themed size="small" onClick={onClick} theme="popover-primary">
        {children}
    </Themed>
);

const PopoverSecondaryButton = ({
    children,
    onClick,
    to,
}: {
    /**
     * The text for this button.
     */
    children: string;
    /**
     * Function called when the button is clicked, or link to visit.
     */
    onClick: () => void;
    /**
     * Link to visit when the button is clicked. It will be opened in a new tab.
     */
    to?: string;
}): JSX.Element => (
    <Themed size="small" onClick={onClick} to={to} theme="popover-secondary" shouldOpenInNewTab>
        {children}
    </Themed>
);

export { PopoverTitle, PopoverBody, PopoverPrimaryButton, PopoverSecondaryButton };
