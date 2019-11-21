import React, { useState } from 'react';
import classNames from 'classnames';
import style from './index.module.scss';

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
        <div className={style.root}>
            <button
                className={classNames(`${style.box} ${style.box0} bg-white`, {
                    [style.isActive]: tab === 0,
                })}
                onClick={() => handleClick(0)}
                type="button"
            >
                A
            </button>
            <button
                className={classNames(`${style.box} ${style.box1} bg-gray-300`, {
                    [style.isActive]: tab === 1,
                })}
                onClick={() => handleClick(1)}
                type="button"
            >
                B
            </button>
            <button
                className={classNames(`${style.box} ${style.box2} bg-gray`, {
                    [style.isActive]: tab === 2,
                })}
                onClick={() => handleClick(2)}
                type="button"
            >
                C
            </button>
        </div>
    );
};

export default AndroidParentChild;
