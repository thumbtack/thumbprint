import React from 'react';
import PropTypes from 'prop-types';
import { Text } from '@thumbtack/thumbprint-react';
import { InlineCode } from '../../mdx';
import styles from './prop-type.module.scss';

const EnumPropType = ({ value }) => {
    const enumValues = value.map(valObj => valObj.value);

    return (
        <pre>
            <InlineCode theme="plain">{`oneOf([
  ${enumValues.join(',\n  ')},
])`}</InlineCode>
        </pre>
    );
};

EnumPropType.propTypes = {
    value: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string.isRequired,
        }),
    ).isRequired,
};

const DefaultPropType = ({ value }) => <InlineCode theme="plain">{value}</InlineCode>;

DefaultPropType.propTypes = {
    value: PropTypes.string.isRequired,
};

const UnionPropType = ({ value }) => (
    <div>
        <Text size={1} className="mb1">
            This prop has {value.length} types:
        </Text>
        <ul className={styles.unionPropType}>
            {value.map(type => {
                let component;

                if (type.name === 'enum') {
                    component = <EnumPropType value={type.value} />;
                } else {
                    component = <DefaultPropType value={type.name} />;
                }

                return <li key={type.name}>{component}</li>;
            })}
        </ul>
    </div>
);

UnionPropType.propTypes = {
    value: PropTypes.shape({
        name: PropTypes.string.isRequired,
        value: PropTypes.array,
    }).isRequired,
};

const PropType = ({ type, value }) => {
    let component;

    if (type === 'enum') {
        component = <EnumPropType value={value} />;
    } else if (type === 'union') {
        component = <UnionPropType value={value} />;
    } else {
        component = <DefaultPropType value={type} />;
    }

    return <div className="black-300">{component}</div>;
};

PropType.propTypes = {
    type: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.object), PropTypes.string]),
};

PropType.defaultProps = {
    value: undefined,
};

export default PropType;
