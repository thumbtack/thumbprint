import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import NoScroll from './components/no-scroll.jsx';

import useCloseOnEscape from '../../utils/use-close-on-escape';
import useFocusTrap from '../../utils/use-focus-trap';
import ConditionalPortal from '../../utils/ConditionalPortal';

import styles from './index.module.scss';

const propTypes = {
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
    children: PropTypes.func,
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
    stage: PropTypes.oneOf(['entering', 'entered', 'exiting', 'exited']),
    /**
     * Accessibility title used to describe the content of the modal to screen readers.
     */
    accessibilityLabel: PropTypes.string,
    /**
     * Function that fires to close the modal.
     */
    onCloseClick: PropTypes.func.isRequired,
    /**
     * Determines if the modal should close when pressing the escape key.
     */
    shouldCloseOnEscape: PropTypes.bool,
};

const defaultProps = {
    children: undefined,
    accessibilityLabel: 'Modal',
    stage: 'exited',
    shouldCloseOnEscape: true,
};

export default function ModalCurtain({
    stage,
    shouldCloseOnEscape,
    accessibilityLabel,
    onCloseClick,
    children,
}) {
    const [isClient, setIsClient] = useState(false);
    const [wrapperEl, setWrapperEl] = useState(null);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const isEnteringOrEntered = stage === 'entering' || stage === 'entered';
    const shouldBindEscListener = isClient && shouldCloseOnEscape && isEnteringOrEntered;
    const shouldTrapFocus = isClient && wrapperEl && stage === 'entered';
    const shouldDisableScrolling = isEnteringOrEntered;

    useCloseOnEscape(onCloseClick, shouldBindEscListener);
    useFocusTrap(wrapperEl, shouldTrapFocus);

    return (
        <ConditionalPortal shouldDisplace>
            {/* Use tabIndex="-1" to allow programmatic focus (as initialFocus node for focus-trap)
            but not be tabbable by user. */}
            <div
                role="dialog"
                aria-label={accessibilityLabel}
                tabIndex="-1"
                ref={element => {
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

ModalCurtain.propTypes = propTypes;
ModalCurtain.defaultProps = defaultProps;
