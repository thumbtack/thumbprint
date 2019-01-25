import React from 'react';
import PropTypes from 'prop-types';
import clamp from 'lodash/clamp';
import isNumber from 'lodash/isNumber';
import times from 'lodash/times';
import noop from 'lodash/noop';
import classNames from 'classnames';
import * as tokens from '@thumbtack/thumbprint-tokens';
import StarIcon from './static/star.svg';
import styles from './index.module.scss';

// Total number of stars
const MAX_NUM_STARS = 5;

// Smallest increment we render
const PRECISION = 0.5;

function StarRating({ rating, hoverRating, onStarClick, onStarHover, size, onMouseLeave }) {
    const clampedRating = clamp(rating, 0, MAX_NUM_STARS);
    const roundedRating = Math.round(clampedRating / PRECISION) * PRECISION;
    const ratio = (hoverRating || roundedRating) / MAX_NUM_STARS;

    // Only add title text if the stars are not clickable. Otherwise, it is confusing because the
    // title text will not match the index of the star that is being hovered on.
    // https://github.com/thumbtack/thumbprint-archive/issues/894
    const titleText =
        onStarClick !== noop ? undefined : `${roundedRating} out of ${MAX_NUM_STARS} star rating`;

    return (
        <div
            className={classNames({
                [styles.root]: true,
                [styles.rootSizeSmall]: size === 'small',
                [styles.rootSizeMedium]: size === 'medium',
                [styles.rootSizeLarge]: size === 'large',
                [styles.rootIsClickable]: onStarClick !== noop,
            })}
            title={titleText}
        >
            {/*
                Putting these first because it's positioned as absolute so that it's
                presence isn't counted
            */}
            <div
                className={`${styles.row} ${styles.rowGold}`}
                data-test-id="star-row-gold"
                onMouseLeave={onMouseLeave}
                style={{ width: isNumber(ratio) ? `${ratio * 100}%` : undefined }}
            >
                {times(MAX_NUM_STARS, index => (
                    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
                    <div
                        key={index}
                        className={classNames({
                            [styles.starContainerSmall]: size === 'small',
                            [styles.starContainerMedium]: size === 'medium',
                            [styles.starContainerLarge]: size === 'large',
                        })}
                        onClick={() => onStarClick(index + 1)}
                        onMouseEnter={() => onStarHover(index + 1)}
                    >
                        <StarIcon
                            fill={tokens.tpColorYellow}
                            className={classNames({
                                [styles.starSVG]: true,
                                [styles.starSVGSizeSmall]: size === 'small',
                                [styles.starSVGSizeMedium]: size === 'medium',
                                [styles.starSVGSizeLarge]: size === 'large',
                            })}
                        />
                    </div>
                ))}
            </div>

            <div className={styles.row} data-test-id="star-row-gray" onMouseLeave={onMouseLeave}>
                {times(MAX_NUM_STARS, index => (
                    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
                    <div
                        key={index}
                        className={classNames({
                            [styles.starContainerSmall]: size === 'small',
                            [styles.starContainerMedium]: size === 'medium',
                            [styles.starContainerLarge]: size === 'large',
                        })}
                        onClick={() => onStarClick(index + 1)}
                        onMouseEnter={() => {
                            onStarHover(index + 1);
                        }}
                    >
                        <StarIcon
                            fill={tokens.tpColorGray}
                            className={classNames({
                                [styles.starSVG]: true,
                                [styles.starSVGSizeSmall]: size === 'small',
                                [styles.starSVGSizeMedium]: size === 'medium',
                                [styles.starSVGSizeLarge]: size === 'large',
                            })}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

StarRating.propTypes = {
    /**
     * Number from 0-5 at increments of 0.5. Numbers between these steps will be rounded.
     */
    rating: PropTypes.number.isRequired,
    /**
     * Number from 0-5 at increments of 1. `hoverRating` trumps `rating` with respect to star
     * highlighting.
     */
    hoverRating: PropTypes.number,
    /**
     * The size of the component when rendered
     */
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    /**
     * Function that is called when a user clicks on a star. The function is supplied a single
     * parameter: the index of the clicked star.
     */
    onStarClick: PropTypes.func,
    /**
     * Function that is called when a user hovers over a star. The function is supplied a single
     * parameter: the index of the hovered star.
     */
    onStarHover: PropTypes.func,
    /**
     * Function that is called when a user mouses away from the `StarRating` component
     */
    onMouseLeave: PropTypes.func,
};

StarRating.defaultProps = {
    hoverRating: 0,
    size: 'small',
    onStarClick: noop,
    onStarHover: noop,
    onMouseLeave: noop,
};

export default StarRating;
