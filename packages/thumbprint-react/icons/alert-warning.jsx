import React from 'react';

const AlertWarning = props => (
    <svg {...props}>
        <path
            fillRule="evenodd"
            d="M13.9995633,19 C13.4475633,19 12.9995633,19.448 12.9995633,20 C12.9995633,20.552 13.4475633,21 13.9995633,21 C14.5515633,21 14.9995633,20.552 14.9995633,20 C14.9995633,19.448 14.5515633,19 13.9995633,19 M13.9995633,9 C13.4475633,9 12.9995633,9.448 12.9995633,10 L12.9995633,15.997 C12.9995633,16.549 13.4475633,16.997 13.9995633,16.997 C14.5515633,16.997 14.9995633,16.549 14.9995633,15.997 L14.9995633,10 C14.9995633,9.448 14.5515633,9 13.9995633,9 M23.6805633,21.827 C23.2555633,22.562 22.4925633,23 21.6395633,23 L6.36056325,23 C5.50756325,23 4.74456325,22.562 4.31956325,21.827 C3.89756325,21.099 3.89556325,20.228 4.31456325,19.498 L11.9535633,6.182 C12.3785633,5.442 13.1435633,5 13.9995633,5 C14.8565633,5 15.6215633,5.442 16.0465633,6.182 L23.6855633,19.498 C24.1035633,20.228 24.1025633,21.099 23.6805633,21.827 M25.4195633,18.503 L17.7805633,5.187 C16.9945633,3.818 15.5815633,3 13.9995633,3 C12.4165633,3 11.0045633,3.818 10.2195633,5.187 L2.57956325,18.503 C1.80156325,19.859 1.80556325,21.476 2.58856325,22.829 C3.37456325,24.188 4.78556325,25 6.36056325,25 L21.6395633,25 C23.2135633,25 24.6235633,24.188 25.4115633,22.829 C26.1945633,21.476 26.1985633,19.859 25.4195633,18.503"
        />
    </svg>
);

AlertWarning.defaultProps = {
    xmlns: 'http://www.w3.org/2000/svg',
    fill: 'currentColor',
    width: '28',
    height: '28',
    viewBox: '0 0 28 28',
};

export default AlertWarning;
