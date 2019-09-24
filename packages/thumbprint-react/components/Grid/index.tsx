import React from 'react';
import classNames from 'classnames';
import warning from 'warning';

import styles from './index.module.scss';

const { Provider, Consumer } = React.createContext({
    gutter: 'normal',
    isWithinGrid: false,
});

interface ColumnPropTypes {
    /**
     * Column contents.
     */
    children?: React.ReactNode;
    /**
     * Default width of the column as a fraction of the grid out of 12, to be shown at all
     * breakpoints except those covered by the three optional props below.
     */
    base?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
    /**
     * Width of the column as a fraction of the grid out of 12, to be shown in viewports wider
     * than `small`.
     */
    aboveSmall?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
    /**
     * Width of the column as a fraction of the grid out of 12, to be shown in viewports wider
     * than `medium`.
     */
    aboveMedium?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
    /**
     * Width of the column as a fraction of the grid out of 12, to be shown in viewports wider
     * than `large`.
     */
    aboveLarge?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
    /**
     * A selector hook into the React component for use in automated testing environments.
     */
    dataTest?: string;
}

export function GridColumn({
    children,
    base = 12,
    aboveSmall,
    aboveMedium,
    aboveLarge,
    dataTest,
}: ColumnPropTypes): JSX.Element {
    return (
        <Consumer>
            {({ gutter, isWithinGrid }): JSX.Element => {
                warning(isWithinGrid, '`GridColumn` must be an immediate child of a `Grid`');

                return (
                    <div
                        className={classNames({
                            [styles.col]: true,
                            [styles.colWide]: gutter === 'wide',
                            [styles.colFlush]: gutter === 'flush',
                            [styles[`col${base}`]]: true,
                            [styles[`aboveSmallCol${aboveSmall}`]]: aboveSmall,
                            [styles[`aboveMediumCol${aboveMedium}`]]: aboveMedium,
                            [styles[`aboveLargeCol${aboveLarge}`]]: aboveLarge,
                        })}
                        data-test={dataTest}
                    >
                        {children}
                    </div>
                );
            }}
        </Consumer>
    );
}

interface GridPropTypes {
    /**
     * Grid contents.
     */
    children?: React.ReactNode;
    /**
     * Controls the amount of space between columns in the grid.
     */
    gutter?: 'normal' | 'wide' | 'flush';
    /**
     * A selector hook into the React component for use in automated testing environments.
     */
    dataTest?: string;
}

export function Grid({ children, gutter = 'normal', dataTest }: GridPropTypes): JSX.Element {
    return (
        <div
            className={classNames({
                [styles.grid]: true,
                [styles.gridWide]: gutter === 'wide',
                [styles.gridFlush]: gutter === 'flush',
            })}
            data-test={dataTest}
        >
            <Provider value={{ gutter, isWithinGrid: true }}>{children}</Provider>
        </div>
    );
}
