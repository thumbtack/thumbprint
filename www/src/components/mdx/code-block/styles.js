import styles from './index.module.scss';

const previewThemes = {
    dark: 'bg-black b-black',
    light: 'bg-gray-200 b-gray-300',
    white: 'bg-white b-gray-300',
};

const classes = {
    // Border color is defined by the theme above.
    preview: `pa4 mb1 ba bw-2 br2 ${styles.preview}`,
    codeContainer: `br2 bg-gray-200 mb4 ${styles.codeContainer}`,
};

export { previewThemes, classes };
