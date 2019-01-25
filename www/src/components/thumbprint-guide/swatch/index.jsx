import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Text } from '@thumbtack/thumbprint-react';
import styles from './index.module.scss';
import { InlineCode } from '../../mdx';

const Swatch = ({ name, hex, isCore, hasBorder }) => (
    <div
        className={classNames(`s_col-2 mb3`, {
            // If empty swatch, hide it at small breakpoint
            'dn s_db': name === undefined,
        })}
    >
        <div
            className={classNames(`h3 br2 flex ${styles.root}`, {
                // If empty swatch or white add border
                'ba b-gray-300': hasBorder,
            })}
            style={{ background: hex }}
        />
        {name && (
            <Text size={3} elementName="span">
                <InlineCode theme="plain">{name}</InlineCode>
                {isCore && ( // If a core color, add an indicator
                    <InlineCode theme="plain">
                        {'('}c{')'}
                    </InlineCode>
                )}
            </Text>
        )}
    </div>
);

Swatch.propTypes = {
    isCore: PropTypes.bool,
    name: PropTypes.node,
    hex: PropTypes.node,
    hasBorder: PropTypes.bool,
};

Swatch.defaultProps = {
    isCore: undefined,
    name: undefined,
    hex: undefined,
    hasBorder: undefined,
};

export default Swatch;
