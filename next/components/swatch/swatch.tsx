import React from 'react';

export default function Swatch({ value }: { value: string }): JSX.Element | null {
    const declaration = value;
    const styles = 'w1 h1 ml1 ml2 dib relative top-3';

    if (declaration.includes('#')) {
        const hex = declaration.match(/#[a-zA-Z0-9]+/);
        return <span className={styles} style={hex ? { background: hex[0] } : {}} />;
    }

    return null;
}
