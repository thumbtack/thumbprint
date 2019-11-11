import React, { useState } from 'react';
import classNames from 'classnames';
import localStyle from './index.module.scss';
import sharedStyle from '../../shared.module.scss';

const IosFullScreenModal = () => {
    const [active, setActive] = useState(false);
    return (
        <button className={sharedStyle.root} onClick={() => setActive(!active)} type="button">
            <div
                className={classNames({
                    'h-100': true,
                    [localStyle.isActive]: active,
                })}
            >
                <div className={`${sharedStyle.box} bg-white`}>A</div>
                <div className={`${sharedStyle.box} ${localStyle.box2} bg-black white`}>B</div>
            </div>
        </button>
    );
};

export default IosFullScreenModal;
