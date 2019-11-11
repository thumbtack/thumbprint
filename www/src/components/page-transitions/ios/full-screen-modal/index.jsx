import React, { useState } from 'react';
import classNames from 'classnames';
import localStyle from './index.module.scss';
import sharedStyle from '../../shared.module.scss';

const IosFullScreenModal = () => {
    const [active, setActive] = useState(false);
    return (
        <button
            className={classNames({
                [sharedStyle.root]: true,
                [localStyle.isActive]: active,
            })}
            onClick={() => setActive(!active)}
            type="button"
        >
            <div className={`${sharedStyle.box} bg-white`}>A</div>
            <div className={`${sharedStyle.box} ${localStyle.box2} bg-black white`}>B</div>
        </button>
    );
};

export default IosFullScreenModal;
