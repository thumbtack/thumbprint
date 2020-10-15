import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Text, GridColumn, Grid } from '@thumbtack/thumbprint-react';
import { InputsThumbsDownSmall, InputsThumbsUpSmall } from '@thumbtack/thumbprint-icons';

const SwatchUsage = ({ name, hex, doText, dontText, hasBorder }) => (
    <div className="mb3 bb b-gray-300 pb3">
        <Grid>
            <GridColumn aboveSmall={2}>
                <div className="flex mb2">
                    <div
                        style={{ background: hex }}
                        className={classNames(`w2 h2 mr2 br2`, {
                            // If empty swatch, hide it at small breakpoint
                            'ba b-gray-300': hasBorder,
                        })}
                    />
                    <Text size={2} className="b">
                        {name}
                    </Text>
                </div>
            </GridColumn>
            <GridColumn aboveSmall={5}>
                <Text size={2} className="flex items-center">
                    <span className="b mr2">Do</span> <InputsThumbsUpSmall />
                </Text>
                <Text size={2} className="black-300 mb2 s_mb0">
                    {doText}
                </Text>
            </GridColumn>
            <GridColumn aboveSmall={5}>
                <Text size={2} className="flex items-center">
                    <span className="b mr2">Don’t</span> <InputsThumbsDownSmall />
                </Text>
                <Text size={2} className="black-300">
                    {dontText}
                </Text>
            </GridColumn>
        </Grid>
    </div>
);

SwatchUsage.propTypes = {
    name: PropTypes.string.isRequired,
    hex: PropTypes.string.isRequired,
    doText: PropTypes.string.isRequired,
    dontText: PropTypes.string.isRequired,
    hasBorder: PropTypes.bool,
};

SwatchUsage.defaultProps = {
    hasBorder: undefined,
};

export default SwatchUsage;
