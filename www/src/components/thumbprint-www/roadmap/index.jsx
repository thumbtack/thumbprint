import React from 'react';
import classnames from 'classnames';
import sheetrock from 'sheetrock';
import styles from './index.module.scss';

class Roadmap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            roadmap: null,
        };
    }

    componentDidMount() {
        sheetrock({
            url:
                'https://docs.google.com/spreadsheets/d/1j0JCMK06S4fX5uKyEz9uLEdZxm6WaWQJQNA3KM9G9L4/edit#gid=0',
            reset: true,
            callback: (error, options, response) => {
                if (error) {
                    throw new Error(error);
                } else {
                    this.setState({
                        roadmap: response.rows,
                    });
                }
            },
        });
    }

    /* eslint-disable react/no-array-index-key */
    render() {
        const { roadmap } = this.state;

        return (
            <div>
                <table id="roadmap" className="w-100 mb5">
                    <tbody>
                        {roadmap &&
                            roadmap.map((row, i) => (
                                <tr key={i} className={styles.tr}>
                                    {row.cellsArray.map((col, j) => (
                                        <td
                                            key={j}
                                            className={classnames({
                                                [styles.td]: true,
                                                [styles.isQuarter]: col.startsWith('Q'),
                                                [styles.isProgress]: col === 'progress',
                                                [styles.isDone]: col === 'done',
                                            })}
                                        >
                                            {col}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Roadmap;
