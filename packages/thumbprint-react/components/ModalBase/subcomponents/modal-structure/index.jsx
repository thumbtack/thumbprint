import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import noScroll from 'no-scroll';
import FocusTrap from 'focus-trap-react';
import ModalContents from '../modal-contents/index.jsx';
import styles from './index.module.scss';

const ESC_KEY = 27;

const toggleScrolling = isOpen => {
    if (isOpen) {
        noScroll.on();
    } else {
        noScroll.off();
    }
};

export default class ModalStructure extends React.Component {
    constructor(props) {
        super(props);

        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.toggleKeyDownListener = this.toggleKeyDownListener.bind(this);
        this.state = {
            keyDownListenerRegistered: false,
        };

        const { shouldAnimate } = this.props;

        /**
         * Duration of the modal's transition on open and close. This value is duplicated in the
         * Sass.
         */
        this.TRANSITION_SPEED = shouldAnimate ? 500 : 0;
    }

    componentDidMount() {
        const { isOpen, shouldCloseOnEscape } = this.props;

        this.toggleKeyDownListener(isOpen, shouldCloseOnEscape);

        if (isOpen) {
            // Only disable scrolling on `componentDidMount` if the modal should immediately open
            // once it is mounted. Turning off the scroll lock if it has never been enabled may
            // cause the page to jump.
            toggleScrolling(isOpen);
        }
    }

    componentWillUpdate(nextProps) {
        const { isOpen, onOpenFinish, onCloseFinish, shouldCloseOnEscape } = this.props;

        // Enable or disable the background scrolling if the `isOpen` prop has changed.
        if (isOpen !== nextProps.isOpen) {
            toggleScrolling(nextProps.isOpen);

            // Set timeouts that match out transition speed. This allows us to fire functions when
            // our transitions are complete and the modal is entirely opened or closed.
            if (nextProps.isOpen === true && onOpenFinish) {
                setTimeout(onOpenFinish, this.TRANSITION_SPEED);
            } else if (nextProps.isOpen === false && onCloseFinish) {
                setTimeout(onCloseFinish, this.TRANSITION_SPEED);
            }
        }

        // Add or remove the `ESC` key listener when `isOpen` or `shouldCloseOnEscape` changes.
        if (isOpen !== nextProps.isOpen || shouldCloseOnEscape !== nextProps.shouldCloseOnEscape) {
            this.toggleKeyDownListener(nextProps.isOpen, nextProps.shouldCloseOnEscape);
        }
    }

    componentWillUnmount() {
        this.toggleKeyDownListener(false, false);
        toggleScrolling(false);
    }

    handleKeyDown(event) {
        const { onCloseClick } = this.props;

        if (event.keyCode === ESC_KEY) {
            event.preventDefault();
            onCloseClick(event);
        }
    }

    /**
     * Adds or removes an event listener for `keyDown`. This is used to close the modal on `ESC`.
     * @param {boolean} isOpen
     * @param {boolean} shouldCloseOnEscape
     */
    toggleKeyDownListener(isOpen, shouldCloseOnEscape) {
        const { keyDownListenerRegistered } = this.state;

        if (isOpen && shouldCloseOnEscape && !keyDownListenerRegistered) {
            document.addEventListener('keydown', this.handleKeyDown);
            this.setState({ keyDownListenerRegistered: true });
        } else if (keyDownListenerRegistered) {
            document.removeEventListener('keydown', this.handleKeyDown);
            this.setState({ keyDownListenerRegistered: false });
        }
    }

    render() {
        const {
            assistiveTitle,
            backdropPadding,
            children,
            contentsMaxWidth,
            isOpen,
            onCloseClick,
            shouldAnimate,
            shouldCloseOnBackdropClick,
        } = this.props;

        return (
            <FocusTrap active={isOpen}>
                <div
                    className={classnames(styles.modalStructureBackdrop, {
                        [styles.modalStructureBackdropOpen]: isOpen,
                        [styles.modalStructureBackdropAnimated]: shouldAnimate,
                    })}
                    style={{ padding: backdropPadding }}
                >
                    <ModalContents
                        contentsMaxWidth={contentsMaxWidth}
                        onCloseClick={onCloseClick}
                        disableOnClickOutside={!isOpen || !shouldCloseOnBackdropClick}
                        isOpen={isOpen}
                        shouldAnimate={shouldAnimate}
                        role="dialog"
                        aria-label={assistiveTitle}
                    >
                        {children}
                    </ModalContents>
                </div>
            </FocusTrap>
        );
    }
}

ModalStructure.propTypes = {
    /**
     * Content that appears on top of the backdrop.
     */
    children: PropTypes.node,
    /**
     * Should the backdrop appear open.
     */
    isOpen: PropTypes.bool,
    /**
     * Accessibility title used to describe the content of the modal to screen readers.
     */
    assistiveTitle: PropTypes.string,
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
     * Animate when opening and closing the modal.
     */
    shouldAnimate: PropTypes.bool,
    /**
     * Determines if the modal should close when clicking on the backdrop, outside of the content.
     */
    shouldCloseOnBackdropClick: PropTypes.bool,
    /**
     * Determines if the modal should close when pressing the escape key.
     */
    shouldCloseOnEscape: PropTypes.bool,
    /**
     * Amount of space separating the contents from the backdrop.
     */
    backdropPadding: PropTypes.oneOf([0, '48px 20px']),
    /**
     * The max width of the container that wraps the contents of the modal.
     */
    contentsMaxWidth: PropTypes.string,
};

ModalStructure.defaultProps = {
    children: undefined,
    isOpen: false,
    assistiveTitle: 'Modal',
    onOpenFinish: undefined,
    onCloseFinish: undefined,
    backdropPadding: '48px 20px',
    contentsMaxWidth: '100%',
    shouldAnimate: true,
    shouldCloseOnBackdropClick: true,
    shouldCloseOnEscape: true,
};
