import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import noop from 'lodash/noop';

import { NavigationCloseSmall } from '../../icons/index.jsx';
import { TextButton } from '../Button/index';
import StickyFooter from './components/sticky-footer';
import ModalAnimatedWrapper from './ModalAnimatedWrapper';

import styles from './index.module.scss';

type StickyContext = {
    stickyFooterContainerRef: React.RefObject<HTMLDivElement> | null;
    setSticky: (isSticky: boolean) => void;
};

const { Provider, Consumer } = React.createContext<StickyContext>({
    stickyFooterContainerRef: null,
    setSticky: noop,
});

interface ModalHeaderPropTypes {
    /**
     * Content (usually a `ModalTitle` and `ModalDescription`) that appears at the top of the
     * modal.
     */
    children: React.ReactNode;
}

interface ModalTitlePropTypes {
    /**
     * Text that describes the modal contents. It is intended for use within the `ModalHeader`.
     */
    children: string;
}

interface ModalDescriptionPropTypes {
    /**
     * Text intended for use below a `ModalTitle` and within a `ModalHeader`.
     */
    children: React.ReactNode;
}

interface ModalContentPropTypes {
    /**
     * Content (usually a form) that makes up the main part of the modal.
     */
    children: React.ReactNode;
}

interface ModalContentFullBleedPropTypes {
    /**
     * Content (usually a form) that makes up the main part of the modal.
     */
    children: React.ReactNode;
    /**
     * Allows the React `className` prop to be passed through to the rendered element.
     */
    className?: string;
    /**
     * Allows the React `style` prop to be passed through to the rendered element.
     */
    style?: React.CSSProperties;
}

interface ModalFooterPropTypes {
    /**
     * Content (ususally buttons) to render within the footer.
     */
    children: React.ReactNode;
    /**
     * Attaches the footer to the bottom of the modal below the small breakpoint.
     */
    isSticky?: boolean;
}

interface ModalPropTypes {
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
     * Determines if the close button should be rendered. This is generally discouraged and should
     * be used carefully. If used, the contents passed into the modal must contain a focusable
     * element such as a link or button.
     */
    shouldHideCloseButton?: boolean;
    /**
     * Determines if the modal should close when clicking on the curtain, outside of the `children`.
     */
    shouldCloseOnCurtainClick?: boolean;
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

const ModalHeader = ({ children }: ModalHeaderPropTypes): JSX.Element => (
    <div className={styles.modalHeader}>{children}</div>
);

const ModalTitle = ({ children }: ModalTitlePropTypes): JSX.Element => (
    <div className={styles.modalTitle}>{children}</div>
);

const ModalDescription = ({ children }: ModalDescriptionPropTypes): JSX.Element => (
    <div className={styles.modalDescription}>{children}</div>
);

const ModalContent = ({ children }: ModalContentPropTypes): JSX.Element => (
    <div className={styles.modalContent}>{children}</div>
);

const ModalContentFullBleed = ({
    children,
    className = '',
    style = {},
}: ModalContentFullBleedPropTypes): JSX.Element => (
    <div className={classNames(className, styles.modalContentFullBleed)} style={style}>
        {children}
    </div>
);

class ModalFooter extends React.Component<ModalFooterPropTypes, { isClient: boolean }> {
    constructor(props: ModalFooterPropTypes) {
        super(props);

        this.state = {
            isClient: false,
        };
    }

    componentDidMount(): void {
        this.setState({
            isClient: true,
        });
    }

    render(): JSX.Element | null {
        const { isClient } = this.state;
        const { isSticky, children } = this.props;

        if (!isClient) {
            return null;
        }

        return (
            <Consumer>
                {({ stickyFooterContainerRef, setSticky }): JSX.Element => {
                    // When `isSticky` is true, the `ModalFooter` must change its position in the
                    // DOM so that it is fixed at the bottom of the modal on small viewports. We
                    // use React's Context API so that it is a property of the `ModalFooter`
                    // component and not the `Modal` API.
                    //
                    // `stickyFooterContainerRef` is the DOM element where the sticky footer will
                    // render. `setSticky` is a function that updates the state in `Modal`,
                    // changing the CSS to make the contents scroll and the footer fixed at the
                    // bottom.
                    if (
                        !isSticky ||
                        stickyFooterContainerRef === null ||
                        stickyFooterContainerRef.current === null
                    ) {
                        return <div className={styles.modalFooterFluid}>{children}</div>;
                    }

                    // We have to create a separate component here because `setSticky` updates
                    // state in `Modal` and state updates are not allowed within `render`.
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

interface ModalStateTypes {
    hasStickyFooter: boolean;
    stickyFooterContainerRef: React.RefObject<HTMLDivElement> | null;
}

class Modal extends React.Component<ModalPropTypes, ModalStateTypes> {
    constructor(props: ModalPropTypes) {
        super(props);

        this.state = {
            hasStickyFooter: false,
            stickyFooterContainerRef: React.createRef<HTMLDivElement>(),
        };
        this.setSticky = this.setSticky.bind(this);
    }

    setSticky(newVal: boolean): void {
        const { hasStickyFooter } = this.state;

        if (newVal !== hasStickyFooter) {
            this.setState({
                hasStickyFooter: newVal,
            });
        }
    }

    render(): JSX.Element {
        const {
            children,
            isOpen = false,
            onCloseClick,
            onCloseFinish,
            onOpenFinish,
            shouldCloseOnCurtainClick = true,
            shouldHideCloseButton = false,
            width = 'medium',
            heightAboveSmall = 'auto',
        } = this.props;

        const { hasStickyFooter, stickyFooterContainerRef } = this.state;

        return (
            <ModalAnimatedWrapper
                onCloseClick={onCloseClick}
                onOpenFinish={onOpenFinish}
                onCloseFinish={onCloseFinish}
                shouldCloseOnCurtainClick={shouldCloseOnCurtainClick}
                isOpen={isOpen}
                width={width}
                heightAboveSmall={heightAboveSmall}
                // We allow the modal to grow taller than the page only if there is no sticky
                // footer. This means that the page can scroll vertically when the modal contents
                // are tall enough. If we have a sticky footer, we prevent the modal from getting
                // taller than the viewport so that the footer can always appear at the bottom.
                // In this case, the inside of the modal itself will scroll vertically as needed.
                shouldPageScrollAboveSmall={!hasStickyFooter}
            >
                <Provider
                    value={{
                        stickyFooterContainerRef,
                        setSticky: this.setSticky,
                    }}
                >
                    <div className={styles.contents}>
                        {/*
                            Extra nested <div> to prevent bottom padding from being ignored
                            in Firefox and Edge
                            (See #376 and https://github.com/w3c/csswg-drafts/issues/129)
                        */}
                        <div
                            className={classNames(styles.contentsPadding, {
                                [styles.contentsPaddingNotSticky]: !hasStickyFooter,
                            })}
                        >
                            {children}
                        </div>
                    </div>
                    {/*
                        If a user uses `<ModalFooter isSticky />`, it gets
                        moved here with React portals.
                    */}
                    <div ref={stickyFooterContainerRef} />
                    {/*
                        The close button is last in the DOM so that it is
                        not focused first by the focus trap. We visually
                        position it at the top with flexbox.
                    */}
                    <div
                        className={classNames({
                            [styles.closeButton]: true,
                            [styles.closeButtonNotSticky]: !hasStickyFooter,
                        })}
                    >
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
            </ModalAnimatedWrapper>
        );
    }
}

export default Modal;
export {
    ModalHeader,
    ModalTitle,
    ModalDescription,
    ModalContent,
    ModalContentFullBleed,
    ModalFooter,
    ModalAnimatedWrapper,
};
