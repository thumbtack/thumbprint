import React, { useState } from 'react';
import { tpSpace3 } from '@thumbtack/thumbprint-tokens';
import assign from 'lodash/assign';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Manager, Reference, Popper } from 'react-popper';

import ConditionalPortal from '../../utils/ConditionalPortal.jsx';
import useCloseOnEscape from '../../utils/use-close-on-escape';
import canUseDOM from '../../utils/can-use-dom';

import styles from './index.module.scss';

// Timeout in milliseconds to wait before showing the tooltip after the user hovers. This prevents
// tooltips from flickering in and out when the user moves their cursor rapidly over the launcher.
// Higher values are more likely to prevent flickering, but increased the perceived lag when the
// user _is_ trying to open the tooltip.
const OPEN_TIMEOUT = 100;

class WhenChildrenChange extends React.Component {
    componentDidUpdate(prevProps) {
        const { children, do: doProp } = this.props;

        if (children !== prevProps.children) {
            doProp();
        }
        return null;
    }

    render() {
        const { children } = this.props;

        return children;
    }
}

WhenChildrenChange.propTypes = {
    children: PropTypes.node.isRequired,
    do: PropTypes.func.isRequired,
};

const doesWindowSupportTouch = () => typeof window !== 'undefined' && 'ontouchstart' in window;

export default function Tooltip({
    container,
    position,
    theme,
    zIndex,
    text,
    children,
    closeDelayLength,
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [openTimeout, setOpenTimeout] = useState(null);
    const [closeTimeout, setCloseTimeout] = useState(null);

    const show = () => {
        if (closeTimeout) {
            clearTimeout(closeTimeout);
        }

        setIsOpen(true);
    };

    const hide = () => {
        setIsOpen(false);
    };

    const onFocus = () => {
        if (!doesWindowSupportTouch()) {
            show();
        }
    };

    const onMouseEnter = () => {
        if (!doesWindowSupportTouch()) {
            // Trigger the tooltip to show after a small delay to prevent flickering.
            setOpenTimeout(setTimeout(show, OPEN_TIMEOUT));
        }
    };

    const onMouseLeave = () => {
        // By default this adds a small delay before closing to improve the user experience.
        setCloseTimeout(setTimeout(hide, closeDelayLength));

        if (openTimeout) {
            // When the mouse leaves we should clear any in-progress open timeouts, to prevent the
            // tooltip from showing after the user is no longer hovering over the launcher.
            clearTimeout(openTimeout);
        }
    };

    const onClick = () => {
        if (doesWindowSupportTouch()) {
            if (isOpen) {
                hide();
            } else {
                show();
            }
        }
    };

    useCloseOnEscape(hide, canUseDOM);

    // Appends the tooltip right before `</body>` when true.
    const shouldDisplace = container === 'body';

    return (
        <Manager>
            <Reference>
                {({ ref }) =>
                    children({
                        ref,
                        onMouseEnter,
                        onFocus,
                        onMouseLeave,
                        onBlur: hide,
                        onClick,
                        ariaLabel: text,
                    })
                }
            </Reference>

            <ConditionalPortal shouldDisplace={shouldDisplace}>
                {canUseDOM && isOpen && (
                    <Popper
                        placement={position}
                        modifiers={{
                            offset: { offset: `0, ${tpSpace3}` },
                            preventOverflow: { boundariesElement: 'window' },
                        }}
                        positionFixed={false}
                    >
                        {({ ref, style, placement, arrowProps, scheduleUpdate }) => (
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
                                onMouseEnter={show}
                                onMouseLeave={onMouseLeave}
                                onClick={event => {
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
                                <WhenChildrenChange do={scheduleUpdate}>{text}</WhenChildrenChange>
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

Tooltip.propTypes = {
    /**
     * A function that renders JSX and receives an object with `ref`, `onMouseEnter`, `onFocus`,
     * `onMouseLeave`, `onBlur`, `onClick`, and `ariaLabel`. All of these props must be added to
     * the component within the render prop.
     */
    children: PropTypes.func.isRequired,
    /**
     * Plain text that will appear within the tooltip. Links and formatted content are not allowed.
     */
    text: PropTypes.string.isRequired,
    /**
     * Controls the look of the tooltip.
     */
    theme: PropTypes.oneOf(['light', 'dark']),
    /**
     * Determines where the tooltip will attempt to position itself relative to the `children`. The
     * tooltip will reposition itself to fit within the contianer.
     */
    position: PropTypes.oneOf(['top', 'bottom']),
    /**
     * Number in milliseconds that determines how long to wait before closing the tooltip when the
     * `onMouseLeave` event fires. A small delay prevents the tooltip from closing if the user
     * moves their cursor from the button to the tooltip. This value should only be set to `0` when
     * two or more tooltip components are used near each other.
     */
    closeDelayLength: PropTypes.oneOf([0, 200]),
    /**
     * By default tooltips will render right before the `</body>` tag.
     *
     * Setting the `container` to `inline` causes the tooltip to remain where it was added to the
     * DOM.
     *
     * This option is helpful to work around z-index and positioning issues.
     */
    container: PropTypes.oneOf(['inline', 'body']),
    /**
     * Adds a `z-index` to the tooltip. Before using this prop, try to use `container="inline"`.
     */
    zIndex: PropTypes.number,
};

Tooltip.defaultProps = {
    theme: 'dark',
    position: 'top',
    container: 'body',
    zIndex: undefined,
    closeDelayLength: 200,
};
