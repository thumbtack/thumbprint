import React, { useState } from 'react';
import classNames from 'classnames';
import style from './index.module.scss';

const AndroidFullPage = () => {
    const [tab, setTab] = useState(0);
    return (
        <div className={`${style.root} bg-white`}>
            <div
                className={classNames('ba bw-2 b-green bg-white', {
                    [style.box]: true,
                    [style.isActive]: tab === 0,
                })}
            />
            <div
                className={classNames('ba bw-2 b-blue bg-white', {
                    [style.box]: true,
                    [style.isActive]: tab === 1,
                })}
            />
            <div
                className={classNames('ba bw-2 b-red bg-white', {
                    [style.box]: true,
                    [style.isActive]: tab === 2,
                })}
            />
            <div className={`${style.nav} bg-white flex w-100 bt b-gray`}>
                <button
                    className={classNames('flex-1 flex items-center justify-center', {
                        [style.button]: true,
                        b: tab === 0,
                    })}
                    onClick={() => setTab(0)}
                    type="button"
                >
                    A
                </button>
                <button
                    className={classNames('flex-1 flex items-center justify-center bl br b-gray', {
                        [style.button]: true,
                        b: tab === 1,
                    })}
                    onClick={() => setTab(1)}
                    type="button"
                >
                    B
                </button>
                <button
                    className={classNames('flex-1 flex items-center justify-center', {
                        [style.button]: true,
                        b: tab === 2,
                    })}
                    onClick={() => setTab(2)}
                    type="button"
                >
                    C
                </button>
            </div>
        </div>
    );
};

export default AndroidFullPage;
