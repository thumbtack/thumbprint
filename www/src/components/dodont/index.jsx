import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { InputsThumbsUpSmall, InputsThumbsDownSmall } from '@thumbtack/thumbprint-icons';
import styles from './index.module.scss';

const DoDont = ({ type, children }) => (
    <div className="mb5">
        {type === 'do' && (
            <div className="flex items-center mb2">
                <InputsThumbsUpSmall />
                <div className="ml2 b">Do</div>
            </div>
        )}
        {type === 'dont' && (
            <div className="flex items-center mb2">
                <InputsThumbsDownSmall />
                <div className="ml2 b">Don’t</div>
            </div>
        )}

        <div
            className={classNames(`overflow-hidden ba b-gray-300 pa3 relative`, {
                [styles.dont]: type === 'dont',
            })}
        >
            {children}
        </div>
    </div>
);

DoDont.propTypes = {
    children: PropTypes.node,
    type: PropTypes.oneOf(['do', 'dont']).isRequired,
};

DoDont.defaultProps = {
    children: undefined,
};

export default DoDont;
