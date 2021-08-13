import React from 'react';
import classNames from 'classnames';
import styles from './index.module.scss';

interface FilterChipProps {
    /**
     * The text to display inside the FilterChip.
     */
    text: string;
    /**
     * Determines if the FilterChip is selected, which changes the color.
     * The default is for the FilterChip to start in the unselected state.
     */
    isSelected?: boolean;
    /**
     * A function to be called whenever the selected state of the chip changes.
     */
    onClick: () => void;
}

export default function FilterChip({
    text,
    isSelected = false,
    onClick,
}: FilterChipProps): JSX.Element {
    return (
        <button
            className={classNames(
                styles.filterChip,
                'br-pill mr1 truncate no-underlin mb1 ph3 pv2 b',
                isSelected ? styles.filterChipSelected : styles.filterChipNotSelected,
            )}
            type="button"
            onClick={onClick}
            aria-pressed={isSelected}
        >
            {text}
        </button>
    );
}
