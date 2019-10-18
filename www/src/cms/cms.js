import CMS from 'netlify-cms-app';
// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
import styles from '!css-loader!sass-loader!./preview.scss';

CMS.registerEditorComponent({
    id: 'figma',
    label: 'Figma',
    fields: [{ name: 'id', label: 'Figma URL', widget: 'string' }],
    // eslint-disable-next-line no-useless-escape
    pattern: /https:\/\/([\w\.-]+\.)?figma.com\/(file|proto)\/([0-9a-zA-Z]{22,128})(?:\/.*)?$/,
    fromBlock: match => ({
        id: match[0],
    }),
    toBlock: obj => obj.id,
    toPreview: obj =>
        `<iframe height="500" width="100%" src="https://www.figma.com/embed?embed_host=astra&url=${obj.id}" allowfullscreen></iframe>`,
});

CMS.registerPreviewStyle(styles.toString(), { raw: true });
