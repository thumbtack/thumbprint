import React, { useState } from 'react';
import classNames from 'classnames';
import localStyle from './index.module.scss';
import sharedStyle from '../../shared.module.scss';

const AndroidFullPage = () => {
    const [tab, setTab] = useState(0);
    return (
        <div className={`${sharedStyle.root} bg-white`}>
            <div
                className={classNames('ba bw-2 b-green bg-white', {
                    [sharedStyle.box]: true,
                    [localStyle.box]: true,
                    [localStyle.isActive]: tab === 0,
                })}
            />
            <div
                className={classNames('ba bw-2 b-blue bg-white', {
                    [sharedStyle.box]: true,
                    [localStyle.box]: true,
                    [localStyle.isActive]: tab === 1,
                })}
            />
            <div
                className={classNames('ba bw-2 b-red bg-white', {
                    [sharedStyle.box]: true,
                    [localStyle.box]: true,
                    [localStyle.isActive]: tab === 2,
                })}
            />
            <div className={`${localStyle.nav} bg-white flex w-100 bt b-gray`}>
                <button
                    className={classNames('flex-1 flex items-center justify-center', {
                        [localStyle.button]: true,
                        b: tab === 0,
                    })}
                    onClick={() => setTab(0)}
                    type="button"
                >
                    A
                </button>
                <button
                    className={classNames('flex-1 flex items-center justify-center bl br b-gray', {
                        [localStyle.button]: true,
                        b: tab === 1,
                    })}
                    onClick={() => setTab(1)}
                    type="button"
                >
                    B
                </button>
                <button
                    className={classNames('flex-1 flex items-center justify-center', {
                        [localStyle.button]: true,
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
