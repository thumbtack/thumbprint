import React from 'react';
import PropTypes from 'prop-types';
import warning from 'warning';
import merge from 'lodash/merge';
import classNames from 'classnames';
import LoaderDots from '../LoaderDots/index.jsx';
import { InputRowContext } from '../InputRow/index.jsx';
import getAnchorProps from './get-anchor-props';
import getButtonProps from './get-button-props';
import styles from './themed.module.scss';

const loaderDotsTheme = {
    primary: 'inverse',
    secondary: 'brand',
    tertiary: 'muted',
};

const withIcon = (
    children: React.ReactNode,
    { icon }: { icon?: React.ReactNode },
): React.ReactNode => {
    if (!icon) {
        return children;
    }

    return (
        <span className={styles.flexCenter}>
            <span
                className={classNames({
                    [styles.iconContainer]: true,
                    [styles.iconContainerHasChildren]: children,
                })}
            >
                {icon}
            </span>
            {children}
        </span>
    );
};

const withLoader = (
    children: React.ReactNode,
    { isLoading, theme = 'primary' }: { isLoading?: boolean; theme?: string },
): React.ReactNode => {
    if (!isLoading) {
        return children;
    }

    return (
        <span className={styles.loaderContainer}>
            <span className={styles.absoluteCenter}>
                <LoaderDots theme={loaderDotsTheme[theme]} size="small" />
            </span>
            <span className={styles.hidden}>{children}</span>
        </span>
    );
};

const withFlexWrapper = (
    children: React.ReactNode,
    { size }: { size?: 'small' | 'large' },
): React.ReactNode => (
    <span
        className={classNames({
            [styles.flexWrapper]: true,
            [styles.flexWrapperSizeSmall]: size === 'small',
            [styles.flexWrapperSizeLarge]: size === 'large',
        })}
    >
        {children}
    </span>
);

const Themed = React.forwardRef<HTMLElement, PropTypes>(
    (props: PropTypes, ref): JSX.Element => {
        warning(
            props.children || props.accessibilityLabel || (props.icon && props.children),
            'The prop `accessibilityLabel` must be provided to the button or link when `icon` is provided but `children` is not. This helps users on screen readers navigate our content.',
        );

        const element = props.to ? 'a' : 'button';
        const elementProps = element === 'a' ? getAnchorProps(props) : getButtonProps(props);

        return (
            <InputRowContext.Consumer>
                {({ isWithinInputRow, isFirstInputRowChild, isLastInputRowChild }): JSX.Element =>
                    React.createElement(
                        element,
                        merge(
                            {},
                            {
                                disabled: props.isLoading || props.isDisabled,
                                className: classNames({
                                    [styles.themedButton]: true,
                                    [styles.themedButtonRoundedBordersLeft]:
                                        isFirstInputRowChild || !isWithinInputRow,
                                    [styles.themedButtonRoundedBordersRight]:
                                        isLastInputRowChild || !isWithinInputRow,
                                    [styles.themedButtonHasNoRightBorder]:
                                        isWithinInputRow && !isLastInputRowChild,
                                    [styles.themedButtonThemePrimary]: props.theme === 'primary',
                                    [styles.themedButtonThemeTertiary]: props.theme === 'tertiary',
                                    [styles.themedButtonThemeSecondary]:
                                        props.theme === 'secondary',
                                    [styles.themedButtonThemeCaution]: props.theme === 'caution',
                                    [styles.themedButtonThemeSolid]: props.theme === 'solid',
                                    [styles.themedButtonThemePopoverPrimary]:
                                        props.theme === 'popover-primary',
                                    [styles.themedButtonThemePopoverSecondary]:
                                        props.theme === 'popover-secondary',
                                    [styles.themedButtonWidthAuto]:
                                        props.width === 'auto' && !isWithinInputRow,
                                    [styles.themedButtonWidthFull]:
                                        props.width === 'full' || isWithinInputRow,
                                    [styles.themedButtonWidthFullBelowSmall]:
                                        props.width === 'full-below-small' && !isWithinInputRow,
                                }),
                                'aria-label': props.accessibilityLabel,
                                'data-test': props.dataTest,
                                ref,
                            },
                            elementProps,
                        ),
                        /**
                         * Call functions that can wrap the `children` in HTML and CSS that aligns
                         * icons with text, adds a loading indicator, and adds a flex wrapper to
                         * the button.
                         */
                        withFlexWrapper(withLoader(withIcon(props.children, props), props), props),
                    )
                }
            </InputRowContext.Consumer>
        );
    },
);

interface PropTypes {
    /**
     * Contents displayed within the button.
     */
    children?: React.ReactNode;
    /**
     * Boolean determining whether the button is disabled. When `true` it will appear visually
     * "greyed out" and not respond to interaction.
     */
    isDisabled?: boolean;
    /**
     * Boolean determining whether the button is in a loading state. When `true` the text will
     * we replaced with a loading animation and interaction will be disabled.
     */
    isLoading?: boolean;
    /**
     * Icon from [Thumbprint Icons](/icons/) to render within the button.
     */
    icon?: React.ReactNode;
    /**
     * Button's on type `submit` will submit a form when used within a `form`
     * element.
     */
    type?: 'button' | 'submit';
    /**
     * Page to navigate to when the anchor is clicked.
     */
    to?: string;
    /**
     * Opens the URL in a new tab when clicked.
     */
    shouldOpenInNewTab?: boolean;
    /**
     * Function that will run when the button is clicked on.
     */
    onClick?: () => void;
    /**
     * Function that runs when the user hovers on the button.
     */
    onMouseEnter?: () => void;
    /**
     * Function that runs when the user hovers on the button. Unlike `onMouseEnter`, `onMouseOver`
     * fires each time a child element receives focus.
     */
    onMouseOver?: () => void;
    /**
     * Function that runs when the button receives focus.
     */
    onFocus?: () => void;
    /**
     * Function that runs when the user hovers away from the button.
     */
    onMouseLeave?: () => void;
    /**
     * Function that runs when the button loses focus.
     */
    onBlur?: () => void;
    /**
     * Description of the button’s content. It is required if the button has an icon and no
     * descriptive text.
     */
    accessibilityLabel?: string;
    /**
     * Controls the button's background, text, and border color.
     */
    theme?:
        | 'primary'
        | 'secondary'
        | 'tertiary'
        | 'caution'
        | 'solid'
        | 'popover-primary'
        | 'popover-secondary';
    /**
     * Changes the button's `line-height`, `padding`, `border-radius`, and `font-size`.
     */
    size?: 'small' | 'large';
    /**
     * `Button` components are as wide as the content that is passed in. The `full` option will
     * expand the width to `100%` on all screens. `full-below-small` will expand the width to 100%
     * on devices smaller than [our `small` breakpoint](/tokens/#section-breakpoint).
     */
    width?: 'auto' | 'full' | 'full-below-small';
    /**
     * A selector hook into the React component for use in automated testing environments.
     */
    dataTest?: string;
}

// Themed.defaultProps = {
//     children: undefined,
//     type: 'button',
//     isDisabled: false,
//     isLoading: false,
//     icon: null,
//     to: null,
//     shouldOpenInNewTab: false,
//     onClick: null,
//     theme: 'primary',
//     size: 'large',
//     width: 'auto',
//     dataTest: undefined,
// };

export default Themed;
