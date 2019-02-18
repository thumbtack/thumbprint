import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import noop from 'lodash/noop';
import { NavigationCloseSmall } from '../../icons/index.jsx';
import { TextButton } from '../Button/index.jsx';
import StickyFooter from './components/sticky-footer.jsx';
import Transition from './components/transition.jsx';
import ModalCurtain from '../ModalCurtain/index.jsx';
import styles from './index.module.scss';

const { Provider, Consumer } = React.createContext({
    stickyFooterContainerRef: null,
    setSticky: noop,
});

// These values are duplicated in the Sass.
const TRANSITION_OPEN_SPEED = 300;
const TRANSITION_CLOSE_SPEED = 250;

/**
 * `ModalDefaultAnimatedWrapper` is an exported component that we export for developers that want access to
 * `ModalDefault` without padding and a close button. We export it as a named export instead of
 * creating a `hasNoPadding` prop partly to discourage the use of `ModalDefault` without padding.
 *
 * This component uses `ModalCurtain` and includes the backdrop, transition, and white modal
 * wrapper that is available at a few widths.
 */
const ModalDefaultAnimatedWrapper = ({
    children,
    isOpen,
    onCloseClick,
    onCloseFinish,
    onOpenFinish,
    shouldCloseOnCurtainClick,
    width,
}) => (
    <Transition
        in={isOpen}
        timeout={{
            enter: TRANSITION_OPEN_SPEED,
            exit: TRANSITION_CLOSE_SPEED,
        }}
        onEntered={onOpenFinish}
        onExited={onCloseFinish}
    >
        {transitionStage => (
            <ModalCurtain stage={transitionStage} onCloseClick={onCloseClick}>
                {({ curtainClassName, curtainOnClick }) => (
                    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
                    <div
                        className={classNames({
                            [curtainClassName]: true,
                            [styles.curtain]: true,
                            [styles.curtainOpen]: isOpen,
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
                            })}
                        >
                            <div
                                className={classNames({
                                    [styles.container]: true,
                                })}
                            >
                                {children}
                            </div>
                        </div>
                    </div>
                )}
            </ModalCurtain>
        )}
    </Transition>
);

ModalDefaultAnimatedWrapper.propTypes = {
    /**
     * Content that appears within the modal.
     */
    children: PropTypes.node,
    /**
     * Function that fires to close the modal.
     */
    onCloseClick: PropTypes.func.isRequired,
    /**
     * Function that fires once the modal has opened and transitions have ended.
     */
    onOpenFinish: PropTypes.func,
    /**
     * Function that fires once the modal has closed and transitions have ended.
     */
    onCloseFinish: PropTypes.func,
    /**
     * Determines if the modal should close when clicking on the curtain, outside of the `children`.
     */
    shouldCloseOnCurtainClick: PropTypes.bool,
    /**
     * Should the modal appear open.
     */
    isOpen: PropTypes.bool,
    /**
     * Sets the max-width of the modal container.
     */
    width: PropTypes.oneOf(['narrow', 'medium', 'wide']),
};

ModalDefaultAnimatedWrapper.defaultProps = {
    children: undefined,
    onOpenFinish: undefined,
    onCloseFinish: undefined,
    isOpen: false,
    shouldCloseOnCurtainClick: true,
    width: 'medium',
};

const modalHeaderPropTypes = {
    /**
     * Content (usually a `ModalDefaultTitle` and `ModalDefaultDescription`) that appears at the top of the
     * modal.
     */
    children: PropTypes.node.isRequired,
};

const modalTitlePropTypes = {
    /**
     * Text that describes the modal contents. It is intended for use within the `ModalDefaultHeader`.
     */
    children: PropTypes.string.isRequired,
};

const modalDescriptionPropTypes = {
    /**
     * Text intended for use below a `ModalDefaultTitle` and within a `ModalDefaultHeader`.
     */
    children: PropTypes.node.isRequired,
};

const modalContentPropTypes = {
    /**
     * Content (usually a form) that makes up the main part of the modal.
     */
    children: PropTypes.node.isRequired,
};

const modalFooterPropTypes = {
    /**
     * Content (ususally buttons) to render within the footer.
     */
    children: PropTypes.node.isRequired,
    /**
     * Attaches the footer to the bottom of the modal below the small breakpoint.
     */
    isSticky: PropTypes.bool,
};

const modalFooterDefaultProps = {
    isSticky: false,
};

const modalDefaultPropTypes = {
    /**
     * Content that appears within the modal.
     */
    children: PropTypes.node,
    /**
     * Function that fires to close the modal.
     */
    onCloseClick: PropTypes.func.isRequired,
    /**
     * Function that fires once the modal has opened and transitions have ended.
     */
    onOpenFinish: PropTypes.func,
    /**
     * Function that fires once the modal has closed and transitions have ended.
     */
    onCloseFinish: PropTypes.func,
    /**
     * Determines if the close button should be rendered. This is generally discouraged and should
     * be used carefully. If used, the contents passed into the modal must contain a focusable
     * element such as a link or button.
     */
    shouldHideCloseButton: PropTypes.bool,
    /**
     * Determines if the modal should close when clicking on the curtain, outside of the `children`.
     */
    shouldCloseOnCurtainClick: PropTypes.bool,
    /**
     * Should the modal appear open.
     */
    isOpen: PropTypes.bool,
    /**
     * Sets the max-width of the modal container.
     */
    width: PropTypes.oneOf(['narrow', 'medium', 'wide']),
};

const modalDefaultDefaultProps = {
    children: undefined,
    onOpenFinish: undefined,
    onCloseFinish: undefined,
    isOpen: false,
    shouldHideCloseButton: false,
    shouldCloseOnCurtainClick: true,
    width: 'medium',
};

const ModalDefaultHeader = ({ children }) => <div className={styles.modalHeader}>{children}</div>;

ModalDefaultHeader.propTypes = modalHeaderPropTypes;

const ModalDefaultTitle = ({ children }) => <div className={styles.modalTitle}>{children}</div>;

ModalDefaultTitle.propTypes = modalTitlePropTypes;

const ModalDefaultDescription = ({ children }) => (
    <div className={styles.modalDescription}>{children}</div>
);

ModalDefaultDescription.propTypes = modalDescriptionPropTypes;

const ModalDefaultContent = ({ children }) => <div className={styles.modalContent}>{children}</div>;

ModalDefaultContent.propTypes = modalContentPropTypes;

class ModalDefaultFooter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isClient: false,
        };
    }

    componentDidMount() {
        this.setState({
            isClient: true,
        });
    }

    render() {
        const { isClient } = this.state;
        const { isSticky, children } = this.props;

        if (!isClient) {
            return null;
        }

        return (
            <Consumer>
                {({ stickyFooterContainerRef, setSticky }) => {
                    // When `isSticky` is true, the `ModalDefaultFooter` must change it's position in the
                    // DOM so that it is fixed at the bottom of the modal on small viewports. We
                    // use React's Context API so that it is a property of the `ModalDefaultFooter`
                    // component and not the `ModalDefault` API.
                    //
                    // `stickyFooterContainerRef` is the DOM element where the sticky footer will
                    // render. `setSticky` is a function that updates the state in `ModalDefault`,
                    // changing the CSS to make the contents scroll and the footer fixed at the
                    // bottom.
                    if (!isSticky) {
                        return <div className={styles.modalFooterFluid}>{children}</div>;
                    }

                    // We have to create a separate component here because `setSticky` updates
                    // state in `ModalDefault` and state updates are not allowed within `render`.
                    // Moving it to a separate component allows us to call it within
                    // `componentDidMount`.
                    // https://blog.kentcdodds.com/answers-to-common-questions-about-render-props-a9f84bb12d5d#6a05
                    return ReactDOM.createPortal(
                        <StickyFooter setSticky={setSticky}>{children}</StickyFooter>,
                        stickyFooterContainerRef.current,
                    );
                }}
            </Consumer>
        );
    }
}

ModalDefaultFooter.propTypes = modalFooterPropTypes;
ModalDefaultFooter.defaultProps = modalFooterDefaultProps;

class ModalDefault extends React.Component {
    constructor(props) {
        super(props);

        this.stickyFooterContainerRef = React.createRef();
        this.state = {
            hasStickyFooter: false,
        };
        this.setSticky = this.setSticky.bind(this);
        this.activeTimeout = null;
    }

    setSticky(newVal) {
        const { hasStickyFooter } = this.state;

        if (newVal !== hasStickyFooter) {
            this.setState({
                hasStickyFooter: newVal,
            });
        }
    }

    render() {
        const {
            children,
            isOpen,
            onCloseClick,
            onCloseFinish,
            onOpenFinish,
            shouldCloseOnCurtainClick,
            shouldHideCloseButton,
            width,
        } = this.props;

        const { hasStickyFooter } = this.state;

        return (
            <ModalDefaultAnimatedWrapper
                onCloseClick={onCloseClick}
                onOpenFinish={onOpenFinish}
                onCloseFinish={onCloseFinish}
                shouldCloseOnCurtainClick={shouldCloseOnCurtainClick}
                isOpen={isOpen}
                width={width}
            >
                <Provider
                    value={{
                        stickyFooterContainerRef: this.stickyFooterContainerRef,
                        setSticky: this.setSticky,
                    }}
                >
                    <div
                        className={classNames({
                            [styles.contents]: true,
                            [styles.contentsSticky]: hasStickyFooter,
                        })}
                    >
                        {children}
                    </div>
                    {/*
                        If a user uses `<ModalDefaultFooter isSticky />`, it gets
                        moved here with React portals.
                    */}
                    <div ref={this.stickyFooterContainerRef} />
                    {/*
                        The close button is last in the DOM so that it is
                        not focused first by the focus trap. We visually
                        position it at the top with flexbox.
                    */}
                    <div className={styles.closeButton}>
                        {shouldHideCloseButton === false && (
                            <TextButton
                                accessibilityLabel="Close modal"
                                iconLeft={
                                    <NavigationCloseSmall className={styles.closeButtonIcon} />
                                }
                                onClick={onCloseClick}
                                theme="inherit"
                            />
                        )}
                    </div>
                </Provider>
            </ModalDefaultAnimatedWrapper>
        );
    }
}

ModalDefault.propTypes = modalDefaultPropTypes;
ModalDefault.defaultProps = modalDefaultDefaultProps;

export default ModalDefault;
export {
    ModalDefaultHeader,
    ModalDefaultTitle,
    ModalDefaultDescription,
    ModalDefaultContent,
    ModalDefaultFooter,
    ModalDefaultAnimatedWrapper,
};
