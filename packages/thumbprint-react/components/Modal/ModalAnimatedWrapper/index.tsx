import React from 'react';
import classNames from 'classnames';
import * as tokens from '@thumbtack/thumbprint-tokens';
import styles from '../index.module.scss';
import Transition from '../components/transition';
import ModalCurtain from '../../ModalCurtain/index';

// These values are duplicated in the Sass.
const TRANSITION_OPEN_SPEED = tokens.tpDuration5;
const TRANSITION_CLOSE_SPEED = tokens.tpDuration4;

/**
 * `ModalAnimatedWrapper` is an exported component that we export for developers that want access to
 * `Modal` without padding and a close button. We export it as a named export instead of
 * creating a `hasNoPadding` prop partly to discourage the use of `Modal` without padding.
 *
 * This component uses `ModalCurtain` and includes the backdrop, transition, and white modal
 * wrapper that is available at a few widths.
 */
const ModalAnimatedWrapper = ({
    children,
    isOpen = false,
    onCloseClick,
    onCloseFinish,
    onOpenFinish,
    shouldCloseOnCurtainClick = true,
    width = 'medium',
    heightAboveSmall = 'auto',
    shouldPageScrollAboveSmall = true,
}: ModalAnimatedWrapperPropTypes): JSX.Element => (
    <Transition
        in={isOpen}
        timeout={{
            enter: TRANSITION_OPEN_SPEED,
            exit: TRANSITION_CLOSE_SPEED,
        }}
        onEntered={onOpenFinish}
        onExited={onCloseFinish}
    >
        {(transitionStage): JSX.Element => (
            <ModalCurtain stage={transitionStage} onCloseClick={onCloseClick}>
                {({ curtainClassName, curtainOnClick }): JSX.Element => (
                    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
                    <div
                        className={classNames({
                            [curtainClassName]: true,
                            [styles.curtain]: true,
                            [styles.curtainOpen]: isOpen,
                        })}
                    >
                        {/*
                            Extra nested <div> to prevent curtain's
                            bottom padding from being ignored in Firefox and Edge
                            (See #376 and https://github.com/w3c/csswg-drafts/issues/129)

                            onClick listener is attached to this innermost node
                            that constitutes curtain
                        */}
                        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
                        <div
                            className={classNames({
                                [styles.curtainInner]: true,
                                [styles.curtainInnerShouldPageScrollAboveSmall]: shouldPageScrollAboveSmall,
                            })}
                            onClick={shouldCloseOnCurtainClick ? curtainOnClick : undefined}
                            data-test="thumbprint-modal-curtain"
                        >
                            <div
                                className={classNames({
                                    [styles.wrapper]: true,
                                    [styles.wrapperOpen]: isOpen,
                                    [styles.wrapperWide]: width === 'wide',
                                    [styles.wrapperNarrow]: width === 'narrow',
                                    [styles.wrapperMedium]: width === 'medium',
                                    [styles.wrapperHeightMedium]: heightAboveSmall === 'medium',
                                    [styles.wrapperHeightTall]: heightAboveSmall === 'tall',
                                    [styles.wrapperShouldPageScrollAboveSmall]: shouldPageScrollAboveSmall,
                                })}
                                data-test="thumbprint-modal-wrapper"
                            >
                                <div
                                    className={classNames({
                                        [styles.container]: true,
                                    })}
                                    data-test="thumbprint-modal-container"
                                >
                                    {children}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </ModalCurtain>
        )}
    </Transition>
);

interface ModalAnimatedWrapperPropTypes {
    /**
     * Content that appears within the modal.
     */
    children?: React.ReactNode;
    /**
     * Function that fires to close the modal.
     */
    onCloseClick: () => void;
    /**
     * Function that fires once the modal has opened and transitions have ended.
     */
    onOpenFinish?: () => void;
    /**
     * Function that fires once the modal has closed and transitions have ended.
     */
    onCloseFinish?: () => void;
    /**
     * Determines if the modal should close when clicking on the curtain, outside of the `children`.
     */
    shouldCloseOnCurtainClick?: boolean;
    /**
     * Allows the page to scroll vertically at viewports larger than the small breakpoint. If
     * `false`, the modal will always be equal to or smaller than the viewport and the contents
     * of the modal will scroll, not the page itself.
     */
    shouldPageScrollAboveSmall?: boolean;
    /**
     * Should the modal appear open.
     */
    isOpen?: boolean;
    /**
     * Sets the max-width of the modal container.
     */
    width?: 'narrow' | 'medium' | 'wide';
    /**
     * Sets height of the modal container above small viewport.
     * If `auto` (default), the modal height will be determined by its content.
     * Otherwise, the modal height will be fixed at some constant px.
     */
    heightAboveSmall?: 'auto' | 'medium' | 'tall';
}

export default ModalAnimatedWrapper;
