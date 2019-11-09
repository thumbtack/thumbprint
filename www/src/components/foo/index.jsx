import React, { useState } from 'react';
import classNames from 'classnames';

const IosPush = () => {
    const [active, setActive] = useState(false);
    return (
        <button
            className={classNames(`pa4`, {
                yellow: active,
            })}
            onClick={() => setActive(!active)}
            type="button"
        >
            iosPush
        </button>
    );
};

export default IosPush;
