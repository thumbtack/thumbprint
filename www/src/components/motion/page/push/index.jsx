import React, { useState } from 'react';
import classNames from 'classnames';
import style from './index.module.scss';

const Push = () => {
    const [active, setActive] = useState(false);
    return (
        <button className={style.root} onClick={() => setActive(!active)} type="button">
            <div
                className={classNames({
                    'flex h-100': true,
                    [style.wrap]: true,
                    [style.isActive]: active,
                })}
            >
                <div className={`${style.box} bg-white`}>A</div>
                <div className={`${style.box} bg-gray-300`}>B</div>
            </div>
        </button>
    );
};

export default Push;
