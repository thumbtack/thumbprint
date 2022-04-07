import React from 'react';
import classNames from 'classnames';
import styles from './index.module.scss';

export interface FilterChipProps {
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
     * Icon from [Thumbprint Icons](/icons/) to render within the
     * chip. It must be one of the tiny icons.
     */
    icon?: React.ReactNode;
    /**
     * A function to be called whenever the selected state of the chip changes.
     */
    onClick: () => void;
}

export default function FilterChip({
    text,
    isSelected = false,
    icon,
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
            <div className="flex items-center">
                {icon && <span className={styles.iconWrap}>{icon}</span>}
                {text}
            </div>
        </button>
    );
}
