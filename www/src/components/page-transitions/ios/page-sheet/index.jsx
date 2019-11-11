import React, { useState } from 'react';
import classNames from 'classnames';
import localStyle from './index.module.scss';
import sharedStyle from '../../shared.module.scss';

const IosPageSheet = () => {
    const [active, setActive] = useState(false);
    return (
        <button className={sharedStyle.root} onClick={() => setActive(!active)} type="button">
            <div
                className={classNames({
                    'h-100': true,
                    [localStyle.isActive]: active,
                })}
            >
                <div className={`${sharedStyle.box} ${localStyle.box1} bg-white`}>A</div>
                <div className={`${sharedStyle.box} ${localStyle.box2} bg-white br3`}>B</div>
            </div>
        </button>
    );
};

export default IosPageSheet;
