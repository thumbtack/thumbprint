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
    headerText?: [string, string];
    description?: [string, string];
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

export function DoDontSideBySide({
    examples,
    headerText,
    description,
}: DoDontPropTypes): JSX.Element {
    return (
        <Grid gutter="wide">
            {map(examples, (example, index) => (
                <GridColumn aboveSmall={6}>
                    <div className="flex mt3 mb3 flex-column">
                        <div className="flex mb2">
                            {isOdd(index) ? (
                                <InputsThumbsUpSmall className={`${styles.iconDo}`} />
                            ) : (
                                <InputsThumbsDownSmall className={`${styles.iconDont}`} />
                            )}
                            <div
                                className={classNames('ml2 b', {
                                    [`${styles.do}`]: isOdd(index),
                                    [`${styles.dont}`]: !isOdd(index),
                                })}
                            >
                                {headerText ? (
                                    <span>{headerText[index]}</span>
                                ) : (
                                    <span>{isOdd(index) ? 'Do' : "Don't"}</span>
                                )}
                            </div>
                        </div>
                        <div
                            className={classNames('ba b-gray-300 pa3 black-300', {
                                [`${styles.doHeader}`]: isOdd(index),
                                [`${styles.dontHeader}`]: !isOdd(index),
                            })}
                        >
                            {example}
                        </div>
                        {description ? (
                            <Text size={2} className="black-300 pt2">
                                {description[index]}
                            </Text>
                        ) : null}
                    </div>
                </GridColumn>
            ))}
        </Grid>
    );
}

export function DoDontTable({ examples, headerText, description }: DoDontPropTypes): JSX.Element {
    return (
        <table className={`mb3 mt3 ${styles.isTable}`}>
            <thead>
                <tr>
                    <th className="pa3 v-top">
                        <div className={`flex items-center pb2 black-300 ${styles.tableDoHeader}`}>
                            <InputsThumbsUpSmall className={`${styles.iconDo}`} />
                            <div className="ml2 b">{headerText ? headerText[0] : 'Do'}</div>
                        </div>
                    </th>
                    <th className="pa3 dont bl b-white v-top">
                        <div
                            className={`flex items-center pb2 black-300 ${styles.tableDontHeader}`}
                        >
                            <InputsThumbsDownSmall className={`${styles.iconDont}`} />
                            <div className="ml2 b">{headerText ? headerText[1] : "Don't"}</div>
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody>
                {map(examples, example => (
                    <tr>
                        <td className="pa3 bb b-gray-300 black-300 v-top">
                            <Text size={1} className="black-300">
                                {example[0]}
                            </Text>
                        </td>
                        <td className="pa3 bb b-gray-300 black-300 v-top">
                            <Text size={1} className="black-300">
                                {example[1]}
                            </Text>
                        </td>
                    </tr>
                ))}
                (
                {description ? (
                    <tr>
                        <td>{description[0]}</td>
                        <td>{description[1]}</td>
                    </tr>
                ) : null}
                )
            </tbody>
        </table>
    );
}
