import React, { useState } from 'react';
import classNames from 'classnames';
import localStyle from './index.module.scss';
import sharedStyle from '../../shared.module.scss';

const IosPush = () => {
    const [active, setActive] = useState(false);
    return (
        <button className={sharedStyle.root} onClick={() => setActive(!active)} type="button">
            <div
                className={classNames({
                    'flex h-100': true,
                    [localStyle.wrap]: true,
                    [localStyle.isActive]: active,
                })}
            >
                <div className={`${sharedStyle.box} bg-white`}>A</div>
                <div className={`${sharedStyle.box} bg-gray-300`}>B</div>
            </div>
        </button>
    );
};

export default IosPush;
