import React, { useState, useEffect } from 'react';
import classNames from 'classnames';

import NoScroll from './components/no-scroll';

import useCloseOnEscape from '../../utils/use-close-on-escape';
import useFocusTrap from '../../utils/use-focus-trap';
import ConditionalPortal from '../../utils/ConditionalPortal';

import styles from './index.module.scss';

interface PropTypes {
    /**
     * Content that appears on top of the curtain. `children` is a [render
     * prop](https://reactjs.org/docs/render-props.html) and expects a function. The function
     * provided receives an object two properties:
     *
     * * `curtainClassName`: Handles positioning, z-index, opacity, overflow, and visibility.
     * Should be added to the `className` of the outermost element within the `children`.
     * * `curtainOnClick`: You can optionally add this prop to the `onClick` of an element within
     * `children`. This is typically used on to close a ModalCurtain when clicking on a dark
     * backdrop.
     *
     * The examples on this page include code samples that demonstrate real use of these props.
     */
    children?: ({
        curtainClassName,
        curtainOnClick,
    }: {
        curtainClassName: string;
        curtainOnClick: (event: React.MouseEvent<HTMLElement>) => void;
    }) => JSX.Element;
    /**
     * The four states that a modal can be in.
     *
     * * `exited` – Modal is fully closed
     * * `entering` – Modal is opening
     * * `entered` – Modal has fully open
     * * `exiting` – Modal is closing
     *
     * Modals that do not have transitions will only use the `entered` and `exited` stages.
     */
    stage?: 'entering' | 'entered' | 'exiting' | 'exited' | null;
    /**
     * Accessibility title used to describe the content of the modal to screen readers.
     */
    accessibilityLabel?: string;
    /**
     * Function that fires to close the modal.
     */
    onCloseClick: () => void;
    /**
     * Determines if the modal should close when pressing the escape key.
     */
    shouldCloseOnEscape?: boolean;
    /**
     * The element that should be focused when the modal opens. If omitted, the entire container
     * element of the modal is focused.
     */
    initialFocus?: HTMLElement | null;
}

export default function ModalCurtain({
    stage = 'exited',
    shouldCloseOnEscape = true,
    accessibilityLabel = 'Modal',
    initialFocus: initialFocusProp,
    onCloseClick,
    children,
}: PropTypes): JSX.Element {
    const [isClient, setIsClient] = useState<boolean>(false);
    const [wrapperEl, setWrapperEl] = useState<HTMLDivElement | null>(null);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const initialFocus = initialFocusProp || wrapperEl;

    const isEnteringOrEntered = stage === 'entering' || stage === 'entered';
    const shouldBindEscListener = isClient && shouldCloseOnEscape && isEnteringOrEntered;
    const shouldTrapFocus = isClient && !!initialFocus && stage === 'entered';
    const shouldDisableScrolling = isEnteringOrEntered;

    useCloseOnEscape(onCloseClick, shouldBindEscListener);
    useFocusTrap(wrapperEl, shouldTrapFocus, initialFocus);

    return (
        <ConditionalPortal shouldDisplace>
            {/* Use tabIndex="-1" to allow programmatic focus (as initialFocus node for focus-trap)
            but not be tabbable by user. */}
            <div
                role="dialog"
                aria-label={accessibilityLabel}
                tabIndex={-1}
                ref={(element): void => {
                    setWrapperEl(element);
                }}
            >
                {shouldDisableScrolling && <NoScroll />}

                {/* This component uses the render prop pattern. `children` expects a function and
                receives an object that contains `curtainOnClick` and `curtainClassName`.
                While using those two properties is optional, they provide helpful functionality. */}
                {children &&
                    children({
                        curtainOnClick: event => {
                            // Ensures that the click event happened on the element that has the
                            // `onClick`. This prevents clicks deep within `children` from bubbling
                            // up and closing the ModalCurtain.
                            if (event.target === event.currentTarget) {
                                onCloseClick();
                            }
                        },
                        curtainClassName: classNames({
                            [styles.root]: true,
                            [styles.rootOpen]: isEnteringOrEntered,
                        }),
                    })}
            </div>
        </ConditionalPortal>
    );
}
