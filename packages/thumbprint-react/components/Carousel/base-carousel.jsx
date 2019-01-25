import React from 'react';
import PropTypes from 'prop-types';
import rotate from 'rotate-array';
import range from 'lodash/range';
import styles from './base-carousel.module.scss';

/**
 * This carousel is purposely as minimal as possible.
 */
class BaseCarousel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            /**
             * When animating, `prevSelectedIndex` is the value of `props.selectedIndex` before the
             * animation began. Once the animation is complete, it becomes the same as
             * `props.selectedIndex`.
             */
            prevSelectedIndex: props.selectedIndex,
            isAnimating: false,
        };

        this.setAnimating = this.setAnimating.bind(this);
    }

    componentDidUpdate(prevProps) {
        const { selectedIndex } = this.props;

        // Typical usage (don't forget to compare props):
        if (selectedIndex !== prevProps.selectedIndex) {
            this.setAnimating();
        }
    }

    setAnimating() {
        const { selectedIndex, animationDuration } = this.props;

        this.setState(
            {
                isAnimating: true,
            },
            () => {
                setTimeout(() => {
                    this.setState({
                        isAnimating: false,
                        prevSelectedIndex: selectedIndex,
                    });
                }, animationDuration);
            },
        );
    }

    reorder(items) {
        const { prevSelectedIndex } = this.state;

        // The `prevSelectedIndex` doesn't update until the animation is done, so we want to
        // use that ordering until the animation is complete.
        return rotate(items, -1 * Math.floor(prevSelectedIndex));
    }

    render() {
        const { children, selectedIndex, animationDuration, visibleCount, spacing } = this.props;
        const { isAnimating, prevSelectedIndex } = this.state;

        const itemWidth = 1 / visibleCount;

        // If `selectedIndex` is `1.5`, this value is `0.5`. This is used when the consumer wants
        // to partially display children.
        const fractionalIndexOffset = Math.abs(prevSelectedIndex - Math.floor(prevSelectedIndex));

        // The `adjustedIndex`, when animating, is the number of items to slide. If the value is
        // negative it means that we should slide to the left. It gets reset to `0` when the
        // animation is complete.
        const adjustedIndex = selectedIndex - prevSelectedIndex;

        // This is equal to `fractionalIndexOffset` in the resting state but changes while the
        // transition is occuring.
        const translateX = itemWidth * (adjustedIndex + fractionalIndexOffset) * -100;

        // An array of the flex order of the items.
        const orderedChildren = this.reorder(range(children.length));

        // Sometimes we need to duplicate the children so that the carousel can display properly.
        // This is especially needed when animating. Imagine that a 4-item card with 3 visible
        // items wants to animate 2 items to the right. Normally, this would require 5 items to
        // animate without displaying an empty spot. Since there are only 4 items, we temporarily
        // duplicate the `children` until the animation is complete.
        const shouldRenderDuplicateChildren = isAnimating;

        return (
            <div className={styles.root}>
                <ul
                    className={styles.wrapper}
                    style={{
                        transform: `translateX(${translateX}%)`,
                        transitionProperty: 'transform',
                        transitionDuration: isAnimating && `${animationDuration}ms`,
                        width: `calc(100% + ${spacing})`,
                    }}
                >
                    {React.Children.map(children, (child, i) => (
                        <li
                            key={i}
                            className={styles.item}
                            style={{
                                width: `${itemWidth * 100}%`,
                                paddingRight: spacing,
                                order: orderedChildren[i],
                            }}
                        >
                            {child}
                        </li>
                    ))}

                    {/* Temporary elements that appear to the left. */}
                    {shouldRenderDuplicateChildren &&
                        React.Children.map(children, (child, i) => (
                            <li
                                key={orderedChildren.length + i}
                                className={styles.item}
                                style={{
                                    width: `${itemWidth * 100}%`,
                                    paddingRight: spacing,
                                    order: orderedChildren[i] + orderedChildren.length,
                                    transform: `translateX(${children.length * -200}%)`,
                                }}
                            >
                                {child}
                            </li>
                        ))}

                    {/* Temporary elements that appear to the right. */}
                    {shouldRenderDuplicateChildren &&
                        React.Children.map(children, (child, i) => (
                            <li
                                key={orderedChildren.length + i * 2}
                                className={styles.item}
                                style={{
                                    width: `${itemWidth * 100}%`,
                                    paddingRight: spacing,
                                    order: (orderedChildren[i] + orderedChildren.length) * 2,
                                    transform: `translateX(${children.length * -100}%)`,
                                }}
                            >
                                {child}
                            </li>
                        ))}
                </ul>
            </div>
        );
    }
}

BaseCarousel.propTypes = {
    /**
     * The items that render horizontally within the carousel.
     */
    children: PropTypes.node.isRequired,
    /**
     * The index of the left-most item to display in the carousel. Supports whole numbers and
     * decimals.
     */
    selectedIndex: PropTypes.number,
    /**
     * The number of items that are visible at once.
     */
    visibleCount: PropTypes.number,
    /**
     * The amount space separating each item.
     */
    spacing: PropTypes.string,
    /**
     * The duration of the animation (in milliseconds).
     */
    animationDuration: PropTypes.number,
};

BaseCarousel.defaultProps = {
    selectedIndex: 0,
    visibleCount: 1,
    spacing: '0px',
    animationDuration: 400,
};

export default BaseCarousel;
