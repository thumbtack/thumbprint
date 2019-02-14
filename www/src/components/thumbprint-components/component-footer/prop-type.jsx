import React from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash';
import { InlineCode } from '../../mdx';

const PropType = ({ type, value }) => {
    if (type === 'enum') {
        const enumValues = map(value, 'value');

        return (
            <pre className="black-300">
                <InlineCode theme="plain">{`oneOf([
  ${enumValues.join(',\n  ')},
]);`}</InlineCode>
            </pre>
        );
    }

    return (
        <span className="black-300">
            <InlineCode theme="plain">{type}</InlineCode>
        </span>
    );
};

PropType.propTypes = {
    type: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.object), PropTypes.string]),
};

PropType.defaultProps = {
    value: undefined,
};

export default PropType;
