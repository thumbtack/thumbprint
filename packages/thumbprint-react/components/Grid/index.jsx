import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import warning from 'warning';

import styles from './index.module.scss';

const { Provider, Consumer } = React.createContext();

const columnPropTypes = {
    /**
     * Column contents.
     */
    children: PropTypes.node,
    /**
     * Default width of the column as a fraction of the grid out of 12, to be shown at all
     * breakpoints except those covered by the three optional props below.
     */
    base: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
    /**
     * Width of the column as a fraction of the grid out of 12, to be shown in viewports wider
     * than `small`.
     */
    aboveSmall: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
    /**
     * Width of the column as a fraction of the grid out of 12, to be shown in viewports wider
     * than `medium`.
     */
    aboveMedium: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
    /**
     * Width of the column as a fraction of the grid out of 12, to be shown in viewports wider
     * than `large`.
     */
    aboveLarge: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
    /**
     * A selector hook into the React component for use in automated testing environments.
     */
    dataTest: PropTypes.string,
};

const columnDefaultProps = {
    children: undefined,
    base: 12,
    aboveSmall: undefined,
    aboveMedium: undefined,
    aboveLarge: undefined,
    dataTest: undefined,
};

// This lint rule is throwing an invalid error. Turning it off for now since the line causing the
// error will go away soon: https://github.com/thumbtack/thumbprint-archive/issues/1443
// eslint-disable-next-line react/prop-types
export function GridColumn({ children, base, aboveSmall, aboveMedium, aboveLarge, dataTest }) {
    return (
        <Consumer>
            {({ gutter, isWithinGrid } = {}) => {
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

GridColumn.propTypes = columnPropTypes;
GridColumn.defaultProps = columnDefaultProps;

const gridPropTypes = {
    /**
     * Grid contents.
     */
    children: PropTypes.node,
    /**
     * Controls the amount of space between columns in the grid.
     */
    gutter: PropTypes.oneOf(['normal', 'wide', 'flush']),
    /**
     * A selector hook into the React component for use in automated testing environments.
     */
    dataTest: PropTypes.string,
};

const gridDefaultProps = {
    children: undefined,
    gutter: 'normal',
    dataTest: undefined,
};

export function Grid({ children, gutter, dataTest }) {
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

Grid.propTypes = gridPropTypes;
Grid.defaultProps = gridDefaultProps;
