import React, { useState } from 'react';
import { tpSpace3 } from '@thumbtack/thumbprint-tokens';
import assign from 'lodash/assign';
import classNames from 'classnames';
import { Manager, Reference, Popper, RefHandler } from 'react-popper';

import { TextButton } from '../Button';
import ConditionalPortal from '../../utils/ConditionalPortal';
import useCloseOnEscape from '../../utils/use-close-on-escape';
import canUseDOM from '../../utils/can-use-dom';

import styles from './index.module.scss';

// Timeout in milliseconds to wait before showing the tooltip after the user hovers. This prevents
// tooltips from flickering in and out when the user moves their cursor rapidly over the launcher.
// Higher values are more likely to prevent flickering, but increased the perceived lag when the
// user _is_ trying to open the tooltip.
const OPEN_TIMEOUT = 100;

interface WhenChildrenChangePropTypes {
    children: React.ReactNode;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    do: () => any;
}

class WhenChildrenChange extends React.Component<WhenChildrenChangePropTypes> {
    componentDidUpdate(prevProps: WhenChildrenChangePropTypes): null {
        const { children, do: doProp } = this.props;

        if (children !== prevProps.children) {
            doProp();
        }
        return null;
    }

    render(): React.ReactNode {
        const { children } = this.props;

        return children;
    }
}

const doesWindowSupportTouch = (): boolean =>
    typeof window !== 'undefined' && 'ontouchstart' in window;

interface ChildrenPropTypes {
    ref: RefHandler;
    onMouseEnter: () => void;
    onFocus: () => void;
    onMouseLeave: () => void;
    onBlur: () => void;
    onClick: () => void;
    ariaLabel: string;
}

export interface TooltipProps {
    /**
     * A function that renders JSX and receives an object with `ref`, `onMouseEnter`, `onFocus`,
     * `onMouseLeave`, `onBlur`, `onClick`, and `ariaLabel`. All of these props must be added to
     * the component within the render prop.
     */
    children: (args: ChildrenPropTypes) => JSX.Element;
    /**
     * Plain text that will appear within the tooltip. Links and formatted content are not allowed.
     */
    text: string;
    /**
     * Tooltip cta in form of text button/link for rich tooltip
     */
    cta?:
        | {
              type: 'link';
              href: string;
              text: string;
              onClick?: () => void;
          }
        | {
              type: 'button';
              onClick: () => void;
              text: string;
          };
    /**
     * Controls the look of the tooltip.
     */
    theme?: 'light' | 'dark';
    /**
     * Determines where the tooltip will attempt to position itself relative to the `children`. The
     * tooltip will reposition itself to fit within the contianer.
     */
    position?: 'top' | 'bottom';
    /**
     * Number in milliseconds that determines how long to wait before closing the tooltip when the
     * `onMouseLeave` event fires. A small delay prevents the tooltip from closing if the user
     * moves their cursor from the button to the tooltip. This value should only be set to `0` when
     * two or more tooltip components are used near each other.
     */
    closeDelayLength?: 0 | 200;
    /**
     * By default tooltips will render right before the `</body>` tag.
     *
     * Setting the `container` to `inline` causes the tooltip to remain where it was added to the
     * DOM.
     *
     * This option is helpful to work around z-index and positioning issues.
     */
    container?: 'inline' | 'body';
    /**
     * Adds a `z-index` to the tooltip. Before using this prop, try to use `container="inline"`.
     */
    zIndex?: number;
    /**
     * Persist tooltip and not hide on click
     */
    persistTooltipOnClick?: boolean;
}

export default function Tooltip({
    container = 'body',
    position = 'top',
    theme = 'dark',
    zIndex,
    text,
    children,
    closeDelayLength = 200,
    persistTooltipOnClick,
    cta,
}: TooltipProps): JSX.Element {
    const [isOpen, setIsOpen] = useState<{
        isOpen: boolean;
        type?: 'click' | 'hover';
    }>({
        isOpen: false,
    });
    const [openTimeout, setOpenTimeout] = useState<number | undefined>(undefined);
    const [closeTimeout, setCloseTimeout] = useState<number | undefined>(undefined);

    const show = (type: 'click' | 'hover'): void => {
        if (closeTimeout) {
            window.clearTimeout(closeTimeout);
        }

        setIsOpen({
            isOpen: true,
            type,
        });
    };

    const hide = (): void => {
        setIsOpen({
            isOpen: false,
        });
    };

    const onFocus = (): void => {
        if (!doesWindowSupportTouch()) {
            show('hover');
        }
    };

    const onMouseEnter = (): void => {
        if (!doesWindowSupportTouch()) {
            // Trigger the tooltip to show after a small delay to prevent flickering.
            setOpenTimeout(window.setTimeout(() => show('hover'), OPEN_TIMEOUT));
        }
    };

    const onMouseLeave = (): void => {
        if (!(persistTooltipOnClick && isOpen.type === 'click')) {
            // By default this adds a small delay before closing to improve the user experience.
            setCloseTimeout(window.setTimeout(hide, closeDelayLength));

            if (openTimeout) {
                // When the mouse leaves we should clear any in-progress open timeouts, to prevent the
                // tooltip from showing after the user is no longer hovering over the launcher.
                clearTimeout(openTimeout);
            }
        }
    };

    const onClick = (): void => {
        if (doesWindowSupportTouch()) {
            if (isOpen.isOpen) {
                hide();
            } else {
                show('click');
            }
        } else if (persistTooltipOnClick) {
            // Keep tooltip opened in case of desktop when persistTooltipOnClick is true
            show('click');
        }
    };

    const onBlur = (): void => {
        // By default this adds a small delay before closing which gives time
        // to focus by keyboard tab inside tooltip content for rich tooltip.
        setCloseTimeout(window.setTimeout(hide, closeDelayLength));
    };

    useCloseOnEscape(hide, canUseDOM);

    // Appends the tooltip right before `</body>` when true.
    const shouldDisplace = container === 'body';

    return (
        <Manager>
            <Reference>
                {({ ref }): JSX.Element =>
                    children({
                        ref,
                        onMouseEnter,
                        onFocus,
                        onMouseLeave,
                        onBlur,
                        onClick,
                        ariaLabel: text,
                    })
                }
            </Reference>

            <ConditionalPortal shouldDisplace={shouldDisplace}>
                {canUseDOM && isOpen.isOpen && (
                    <Popper
                        placement={position}
                        modifiers={{
                            offset: { offset: `0, ${tpSpace3}` },
                            preventOverflow: { boundariesElement: 'window' },
                        }}
                        positionFixed={false}
                    >
                        {({ ref, style, placement, arrowProps, scheduleUpdate }): JSX.Element => (
                            // This function is documented within `react-popper`:
                            // https://github.com/FezVrasta/react-popper
                            // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
                            <div
                                role="tooltip"
                                data-test-id="tooltip"
                                className={classNames({
                                    [styles.tooltip]: true,
                                    [styles.tooltipDark]: theme === 'dark',
                                    [styles.tooltipLight]: theme === 'light',
                                })}
                                ref={ref}
                                style={assign({}, style, { zIndex })}
                                data-placement={placement}
                                onMouseEnter={(): void => show('hover')}
                                onMouseLeave={onMouseLeave}
                                onClick={(event): void => {
                                    // This is to ensure the default event propagation is stopped when the tooltip
                                    // is created by portals.
                                    // https://reactjs.org/docs/portals.html#event-bubbling-through-portals
                                    // https://github.com/facebook/react/issues/11387
                                    if (shouldDisplace) {
                                        event.stopPropagation();
                                    }
                                    // This is to ensure the tooltip would be closed if it's clicked in touch screen
                                    // devices so it could easier to be toggled off.
                                    if (doesWindowSupportTouch()) {
                                        hide();
                                    }
                                }}
                            >
                                {/* We need to let the popper instance know when the contents of the tooltip change,
                                so it can reposition itself.
                                https://github.com/thumbtack/thumbprint-archive/issues/1033 */}
                                <WhenChildrenChange do={scheduleUpdate}>
                                    <div
                                        // For rich tooltip, we need to clear closeTimeout while user focus on
                                        // tooltip cta in popover, to stay tooltip to be opened in case of keyboard tab.
                                        onFocus={(): void => {
                                            if (closeTimeout) {
                                                window.clearTimeout(closeTimeout);
                                            }
                                        }}
                                        // For rich tooltip, we need to hide tooltip popover,
                                        // to close tooltip in case of keyboard tab
                                        // went away from tooltip cta.
                                        onBlur={hide}
                                        className={styles.tooltipContent}
                                    >
                                        {text}
                                        <div>
                                            {cta && cta.type === 'link' && (
                                                <a
                                                    href={cta.href}
                                                    onClick={(): void => {
                                                        if (cta.onClick) {
                                                            cta.onClick();
                                                        }
                                                    }}
                                                >
                                                    {cta.text}
                                                </a>
                                            )}

                                            {cta && cta.type === 'button' && (
                                                <TextButton onClick={cta.onClick}>
                                                    {cta.text}
                                                </TextButton>
                                            )}
                                        </div>
                                    </div>
                                </WhenChildrenChange>
                                <div
                                    className={classNames({
                                        [styles.nubbin]: true,
                                        [styles.nubbinTop]: placement === 'top',
                                        [styles.nubbinBottom]: placement === 'bottom',
                                        [styles.nubbinDark]: theme === 'dark',
                                        [styles.nubbinLight]: theme === 'light',
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
}
