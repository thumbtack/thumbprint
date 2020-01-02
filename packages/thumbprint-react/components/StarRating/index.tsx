import React from 'react';
import PropTypes from 'prop-types';
import times from 'lodash/times';
import noop from 'lodash/noop';
import classNames from 'classnames';
import styles from './index.module.scss';

// Total number of stars
const MAX_NUM_STARS = 5;

interface PropTypes {
    /**
     * Number from 0-5 at increments of 0.5. Numbers between these steps will be rounded.
     */
    rating: number;
    /**
     * Number from 0-5 at increments of 1. `hoverRating` trumps `rating` with respect to star
     * highlighting.
     */
    hoverRating?: 0 | 1 | 2 | 3 | 4 | 5;
    /**
     * The size of the component when rendered
     */
    size?: 'small' | 'medium' | 'large';
    /**
     * Function that is called when a user clicks on a star. The function is supplied a single
     * parameter?: the value of the clicked star.
     */
    onStarClick?: (value: number) => void;
    /**
     * Function that is called when a user hovers over a star. The function is supplied a single
     * parameter?: the value of the hovered star.
     */
    onStarHover?: (value: number) => void;
    /**
     * Function that is called when a user mouses away from the `StarRating` component
     */
    onMouseLeave?: () => void;
}

export default function StarRating({
    size = 'small',
    hoverRating = 0,
    rating = 0,
    onStarClick = noop,
    onStarHover = noop,
    onMouseLeave = noop,
}: PropTypes): JSX.Element {
    // Determine if instance is interactive.
    const isInteractive = onStarClick !== noop || onStarHover !== noop;

    // Use hoverRating if present, otherwise round rating to whole (3) or half number (3.5)
    const ratingValue = hoverRating || Math.round(rating * 2) / 2;

    // aria-label text
    const ariaStarText = ratingValue === 1 ? 'star' : 'stars';
    const ariaLabel = `${ratingValue} ${ariaStarText} out of ${MAX_NUM_STARS} star rating`;

    return (
        <div
            className={classNames(styles.root, {
                [styles.small]: size === 'small',
                [styles.large]: size === 'large',
                [styles.medium]: size === 'medium',
            })}
            data-star={ratingValue}
            aria-label={ariaLabel}
            onMouseLeave={onMouseLeave}
            role={isInteractive ? undefined : 'img'}
        >
            {isInteractive && (
                <div className={styles.rateInputsWrap}>
                    {times(MAX_NUM_STARS, index => (
                        // eslint-disable-next-line jsx-a11y/label-has-for, jsx-a11y/label-has-associated-control
                        <label
                            className={styles.rateLabel}
                            key={index}
                            onMouseEnter={(): void => onStarHover(index + 1)}
                        >
                            <input
                                className={styles.rateInput}
                                type="radio"
                                name="rating"
                                value={index + 1}
                                onClick={(): void => onStarClick(index + 1)}
                            />
                            {index === 0 ? `${index + 1} star` : `${index + 1} stars`}
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
}
