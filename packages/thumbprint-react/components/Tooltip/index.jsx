import React from 'react';
import ReactDOM from 'react-dom';
import { tpSpace3 } from '@thumbtack/thumbprint-tokens';
import assign from 'lodash/assign';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Manager, Reference, Popper } from 'react-popper';
import styles from './index.module.scss';

const ESC_KEY = 27;

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

const PositionedTooltip = ({
    position,
    theme,
    show,
    onMouseLeave,
    zIndex,
    shouldDisplace,
    hide,
    children,
    supportsTouch,
}) => (
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
                    // This is to ensure the default event propagation is
                    // stopped when the tooltip is created by portals.
                    // https://reactjs.org/docs/portals.html#event-bubbling-through-portals
                    // https://github.com/facebook/react/issues/11387
                    if (shouldDisplace) {
                        event.stopPropagation();
                    }
                    // This is to ensure the tooltip would be closed if it's
                    // clicked in touch screen devices so it could easier
                    // to be toggled off.
                    if (supportsTouch) {
                        hide();
                    }
                }}
            >
                {/*
                        We need to let the popper instance know when the contents of the
                        tooltip change, so it can reposition itself.
                        https://github.com/thumbtack/thumbprint-archive/issues/1033
                     */}
                <WhenChildrenChange do={scheduleUpdate}>{children}</WhenChildrenChange>
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
);

PositionedTooltip.propTypes = {
    children: PropTypes.string.isRequired,
    show: PropTypes.func.isRequired,
    hide: PropTypes.func.isRequired,
    position: PropTypes.string.isRequired,
    theme: PropTypes.string.isRequired,
    onMouseLeave: PropTypes.func.isRequired,
    shouldDisplace: PropTypes.bool.isRequired,
    supportsTouch: PropTypes.bool.isRequired,
    zIndex: PropTypes.number,
};

PositionedTooltip.defaultProps = {
    zIndex: undefined,
};

export default class Tooltip extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            isClient: false,
        };

        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onFocus = this.onFocus.bind(this);

        this.closeTimeout = null;
    }

    componentDidMount() {
        this.setState({
            // Allows us to only render the tooltip on the client. It wont work with SSR since
            // there is no document. Pattern comes from these pages:
            // https://reactjs.org/docs/react-dom.html#hydrate
            // https://github.com/facebook/react/issues/11169
            isClient: true,
        });
    }

    componentWillUnmount() {
        this.hide();
    }

    onMouseLeave() {
        const { closeDelayLength } = this.props;

        // By default this adds a small delay before closing to improve the user experience.
        this.closeTimeout = setTimeout(this.hide, closeDelayLength);
    }

    onMouseEnter() {
        if (!doesWindowSupportTouch()) {
            this.show();
        }
    }

    onFocus() {
        if (!doesWindowSupportTouch()) {
            this.show();
        }
    }

    onClick() {
        const { isOpen } = this.state;

        if (doesWindowSupportTouch()) {
            if (isOpen) {
                this.hide();
            } else {
                this.show();
            }
        }
    }

    hide() {
        this.setState(
            {
                isOpen: false,
            },
            () => {
                document.removeEventListener('keyup', this.handleKeyUp);
            },
        );
    }

    show() {
        if (this.closeTimeout) {
            clearTimeout(this.closeTimeout);
        }

        this.setState(
            {
                isOpen: true,
            },
            () => {
                document.addEventListener('keyup', this.handleKeyUp);
            },
        );
    }

    handleKeyUp(event) {
        if (event.keyCode === ESC_KEY) {
            this.hide();
        }
    }

    render() {
        const { container, position, theme, zIndex, text, children } = this.props;
        const { isClient, isOpen } = this.state;

        // Appends the tooltip right before `</body>` when true.
        const shouldDisplace = container === 'body';

        const positionedTooltip = isClient && (
            <PositionedTooltip
                show={this.show}
                hide={this.hide}
                onMouseLeave={this.onMouseLeave}
                position={position}
                theme={theme}
                shouldDisplace={shouldDisplace}
                supportsTouch={doesWindowSupportTouch()}
                zIndex={zIndex}
            >
                {text}
            </PositionedTooltip>
        );

        return (
            <Manager>
                <Reference>
                    {({ ref }) =>
                        children({
                            ref,
                            onMouseEnter: this.onMouseEnter,
                            onFocus: this.onFocus,
                            onMouseLeave: this.onMouseLeave,
                            onBlur: this.hide,
                            onClick: this.onClick,
                            ariaLabel: text,
                        })
                    }
                </Reference>

                {positionedTooltip &&
                    isOpen &&
                    (shouldDisplace
                        ? ReactDOM.createPortal(positionedTooltip, document.body)
                        : positionedTooltip)}
            </Manager>
        );
    }
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
