import React from 'react';
import clamp from 'lodash/clamp';
import isNumber from 'lodash/isNumber';
import times from 'lodash/times';
import noop from 'lodash/noop';
import classNames from 'classnames';
import * as tokens from '@thumbtack/thumbprint-tokens';
import styles from './index.module.scss';

// Total number of stars
const MAX_NUM_STARS = 5;

// Smallest increment we render
const PRECISION = 0.5;

const StarIcon = (p: React.SVGAttributes<SVGElement>): JSX.Element => (
    <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...p}>
        <path d="M8 0c-.29675 0-.54325.1998361-.62.4733224L5.8065 5.333235H.64c-.35675 0-.64.3104371-.64.670142 0 .2199454.11.4165137.27675.533399C.38 6.6066557 4.45 9.5800656 4.45 9.5800656s-1.56325 4.8000874-1.5935 4.8767541c-.02325.0698798-.03975.1467978-.03975.2264808 0 .3599563.28975.6500328.6465.6500328.13675 0 .26325-.0432349.37-.1163825L8 12.1832131s4.07325 2.9668743 4.16675 3.0337377c.10625.0731476.23325.1163825.36975.1163825.35675 0 .64675-.2933442.64675-.6500328 0-.079683-.0165-.156601-.04-.2264808-.03-.0766667-1.593-4.8767541-1.593-4.8767541s4.0695-2.9734099 4.173-3.0432896C15.89 6.4198907 16 6.2233224 16 6.0001093c0-.3564372-.27675-.6668743-.6335-.6668743H10.2L8.61975.4733224C8.54325.1998361 8.2965 0 8 0" />
    </svg>
);

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
     * parameter?: the index of the clicked star.
     */
    onStarClick?: (index: number) => void;
    /**
     * Function that is called when a user hovers over a star. The function is supplied a single
     * parameter?: the index of the hovered star.
     */
    onStarHover?: (index: number) => void;
    /**
     * Function that is called when a user mouses away from the `StarRating` component
     */
    onMouseLeave?: () => void;
}

export default function StarRating({
    rating,
    hoverRating = 0,
    size = 'small',
    onStarClick = noop,
    onStarHover = noop,
    onMouseLeave = noop,
}: PropTypes): JSX.Element {
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
                        onClick={(): void => onStarClick(index + 1)}
                        onMouseEnter={(): void => onStarHover(index + 1)}
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
                        onClick={(): void => onStarClick(index + 1)}
                        onMouseEnter={(): void => {
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
