import React from 'react';

const AlertCheck = props => (
    <svg {...props}>
        <path
            fillRule="evenodd"
            d="M21.5994,6.2001 C21.1604,5.8681 20.5324,5.9591 20.2014,6.4001 L11.8204,17.5751 L7.6244,14.2191 C7.1944,13.8741 6.5654,13.9451 6.2184,14.3751 C5.8734,14.8061 5.9454,15.4361 6.3744,15.7811 L12.1804,20.4251 L21.7994,7.6001 C22.1314,7.1581 22.0414,6.5311 21.5994,6.2001"
        />
    </svg>
);

AlertCheck.defaultProps = {
    xmlns: 'http://www.w3.org/2000/svg',
    fill: 'currentColor',
    width: '28',
    height: '28',
    viewBox: '0 0 28 28',
};

export default AlertCheck;
