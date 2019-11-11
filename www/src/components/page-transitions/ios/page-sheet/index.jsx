import React, { useState } from 'react';
import classNames from 'classnames';
import localStyle from './index.module.scss';
import sharedStyle from '../../shared.module.scss';

const IosPageSheet = () => {
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
            <div className={`${sharedStyle.box} ${localStyle.box1} bg-white`}>A</div>
            <div className={`${sharedStyle.box} ${localStyle.box2} bg-white br3`}>B</div>
        </button>
    );
};

export default IosPageSheet;
