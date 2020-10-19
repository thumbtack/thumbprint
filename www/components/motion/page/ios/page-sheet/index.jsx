import React, { useState } from 'react';
import classNames from 'classnames';
import style from './index.module.scss';

const IosPageSheet = () => {
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
            <div className={`${style.box} ${style.box1} bg-white`}>A</div>
            <div className={`${style.box} ${style.box2} bg-white br3`}>B</div>
        </button>
    );
};

export default IosPageSheet;
