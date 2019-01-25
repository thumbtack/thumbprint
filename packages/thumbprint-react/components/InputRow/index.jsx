import React from 'react';
import PropTypes from 'prop-types';
import warning from 'warning';
import styles from './index.module.scss';

const propTypes = {
    /**
     * Form fields to display.
     */
    children: PropTypes.node.isRequired,
    /**
     * An array of numbers (or `null`) that reflect the ratio of the widths of the `children`.
     *
     * Examples:
     *
     * * `[1, null]`: the first child takes up as much space as possible
     * * `[1, 1, 1]`: splits the width evenly between three elements
     * * `[1, 2, 1]`: the first and third child have the same width. The middle child is twice as
     * wide as its siblings.
     *
     * The length of the array should be the same as the number of children.
     */
    widthRatios: PropTypes.arrayOf(PropTypes.number),
    /**
     * A selector hook into the React component for use in automated testing environments.
     */
    dataTest: PropTypes.string,
};

const defaultProps = {
    widthRatios: undefined,
    dataTest: undefined,
};

// Components that import `InputRowContext` from this package will have access to this object. They
// will then be able to know when their component is being used within an `InputRow` as well as
// whether it is the first of last child.
const InputRowContext = React.createContext({
    isWithinInputRow: false,
    isFirstInputRowChild: false,
    isLastInputRowChild: false,
});

const InputRow = ({ widthRatios, children, dataTest }) => {
    const widthLength = widthRatios && widthRatios.length;
    const numChildren = React.Children.count(children);

    warning(
        !widthLength || widthLength === numChildren,
        `The length of prop \`width\` (${widthLength}) must match the number of children (${numChildren}) passed to \`InputRow\`.`,
    );

    warning(
        numChildren > 1,
        `The \`InputRow\` component expects more than one child within the \`children\` prop. ${numChildren} received.`,
    );

    return (
        <div className={styles.root} data-test={dataTest}>
            {React.Children.map(children, (child, i) => (
                <div style={{ flex: widthRatios ? widthRatios[i] : undefined }}>
                    <InputRowContext.Provider
                        value={{
                            isWithinInputRow: true,
                            isFirstInputRowChild: i === 0,
                            isLastInputRowChild: i + 1 === numChildren,
                        }}
                    >
                        {child}
                    </InputRowContext.Provider>
                </div>
            ))}
        </div>
    );
};

InputRow.propTypes = propTypes;

InputRow.defaultProps = defaultProps;

export default InputRow;

export { InputRowContext };
