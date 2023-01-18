import React from 'react';
import classNames from 'classnames';
import { map } from 'lodash';
import { InputsThumbsUpSmall, InputsThumbsDownSmall } from '@thumbtack/thumbprint-icons';
import { Grid, GridColumn, Text } from '@thumbtack/thumbprint-react';
import styles from './index.module.scss';

interface DoDontCrossOutPropTypes {
    children: React.ReactNode;
    type?: 'do' | 'dont';
}

interface DoDontPropTypes {
    examples: [];
}

// helper function to dermine which item in the iteration is a do (odd) and don't (even)
const isOdd = (value: number): boolean => {
    return value % 2 === 0;
};

export default function DoDont({ type, children }: DoDontCrossOutPropTypes): JSX.Element {
    return (
        <div
            className={classNames('mb5 mt3', {
                [styles[`${type}`]]: true,
            })}
        >
            {type === 'do' && (
                <>
                    <div className="flex items-center mb2">
                        <InputsThumbsUpSmall />
                        <div className="ml2 b">Do</div>
                    </div>
                    <div className="overflow-hidden ba b-gray-300 pa3">{children}</div>
                </>
            )}
            {type === 'dont' && (
                <>
                    <div className="flex items-center mb2">
                        <InputsThumbsDownSmall />
                        <div className="ml2 b">Don’t</div>
                    </div>
                    <div className="overflow-hidden ba b-gray-300 pa3 relative">{children}</div>
                </>
            )}
        </div>
    );
}

export function DoDontSideBySide({ examples }: DoDontPropTypes): JSX.Element {
    return (
        <Grid gutter="wide">
            {map(examples, (example, index) => (
                <GridColumn aboveSmall={6}>
                    <div
                        className={`flex mb3 flex-column ${styles.coloredHeading} ${
                            isOdd(index) ? `${styles.do}` : `${styles.dont}`
                        }`}
                    >
                        <div className="flex mb2">
                            {isOdd(index) ? (
                                <InputsThumbsUpSmall className={`${styles.icon}`} />
                            ) : (
                                <InputsThumbsDownSmall className={`${styles.icon}`} />
                            )}
                            <div className={`ml2 b ${isOdd(index) ? 'do' : 'dont'}`}>
                                {isOdd(index) ? 'Do' : "Don't"}
                            </div>
                        </div>
                        <div className={`ba b-gray-300 pa3 ${styles.content}`}>{example}</div>
                    </div>
                </GridColumn>
            ))}
        </Grid>
    );
}

export function DoDontTable({ examples }: DoDontPropTypes): JSX.Element {
    return (
        <table className={`mb3 mt3 ${styles.isTable}`}>
            <thead>
                <tr>
                    <th>
                        <div className={`flex items-center pb2 ${styles.do}`}>
                            <InputsThumbsUpSmall className={`${styles.icon}`} />
                            <div className="ml2 b">Do</div>
                        </div>
                    </th>
                    <th className="dont bl b-white">
                        <div className={`flex items-center pb2 ${styles.dont}`}>
                            <InputsThumbsDownSmall className={`${styles.icon}`} />
                            <div className="ml2 b">Don’t</div>
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody>
                {map(examples, example => (
                    <tr>
                        <td className="pa2 bb b-gray-300">
                            <Text size={1} className="black-300">
                                {example[0]}
                            </Text>
                        </td>
                        <td className="pa2 bb b-gray-300">
                            <Text size={1} className="black-300">
                                {example[1]}
                            </Text>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
