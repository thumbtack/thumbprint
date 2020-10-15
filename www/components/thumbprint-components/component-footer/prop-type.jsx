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

const InstanceOfPropType = ({ value }) => (
    <pre>
        <InlineCode theme="plain">{`instanceOf(${value})`}</InlineCode>
    </pre>
);

InstanceOfPropType.propTypes = {
    value: PropTypes.string.isRequired,
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
            This prop can be one of the following {value.length} types:
        </Text>

        <ul className={styles.unionPropType}>
            {value.map(type => (
                <li key={type.name}>
                    <PropType value={type.value} type={type.name} />
                </li>
            ))}
        </ul>
    </div>
);

UnionPropType.propTypes = {
    value: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
        }),
    ).isRequired,
};

const PropType = ({ type, value }) => {
    let component;

    if (type === 'enum') {
        component = <EnumPropType value={value} />;
    } else if (type === 'union') {
        component = <UnionPropType value={value} />;
    } else if (type === 'instanceOf') {
        component = <InstanceOfPropType value={value} />;
    } else {
        component = <DefaultPropType value={type} />;
    }

    return <div className="black-300">{component}</div>;
};

PropType.propTypes = {
    type: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.arrayOf(PropTypes.object),
        PropTypes.string,
    ]),
};

PropType.defaultProps = {
    value: undefined,
};

export default PropType;
