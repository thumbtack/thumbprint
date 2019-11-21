import React, { useState } from 'react';
import classNames from 'classnames';
import style from './index.module.scss';

const IosFullScreenModal = () => {
    const [active, setActive] = useState(false);
    return (
        <button
            className={classNames({
                [style.root]: true,
                [style.isActive]: active,
            })}
            onClick={() => setActive(!active)}
            type="button"
        >
            <div className={`${style.box} bg-white`}>A</div>
            <div className={`${style.box} ${style.box2} bg-gray-300`}>B</div>
        </button>
    );
};

export default IosFullScreenModal;
