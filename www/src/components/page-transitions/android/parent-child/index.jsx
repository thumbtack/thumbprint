import React, { useState } from 'react';
import classNames from 'classnames';
import localStyle from './index.module.scss';
import sharedStyle from '../../shared.module.scss';

const AndroidParentChild = () => {
    const [tab, setTab] = useState(null);

    const handleClick = num => {
        if (tab !== num) {
            setTab(num);
        } else {
            setTab(null);
        }
    };

    return (
        <div className={sharedStyle.root}>
            <button
                className={classNames(
                    `${sharedStyle.box} ${localStyle.box} ${localStyle.box0} flex items-center justify-center bg-white`,
                    {
                        [localStyle.isActive]: tab === 0,
                    },
                )}
                onClick={() => handleClick(0)}
                type="button"
            >
                A
            </button>
            <button
                className={classNames(
                    `${sharedStyle.box} ${localStyle.box} ${localStyle.box1} flex items-center justify-center bg-gray-300`,
                    {
                        [localStyle.isActive]: tab === 1,
                    },
                )}
                onClick={() => handleClick(1)}
                type="button"
            >
                B
            </button>
            <button
                className={classNames(
                    `${sharedStyle.box} ${localStyle.box} ${localStyle.box2} flex items-center justify-center bg-gray`,
                    {
                        [localStyle.isActive]: tab === 2,
                    },
                )}
                onClick={() => handleClick(2)}
                type="button"
            >
                C
            </button>
        </div>
    );
};

export default AndroidParentChild;
