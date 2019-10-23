import CMS from 'netlify-cms-app';
// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
import styles from '!css-loader!sass-loader!./preview.scss';

CMS.registerEditorComponent({
    id: 'figma',
    label: 'Figma',
    fields: [
        { name: 'id', label: 'Figma URL', widget: 'string' },
        { name: 'height', label: 'Height', widget: 'number', default: 500, min: 350 },
    ],
    // eslint-disable-next-line no-useless-escape
    pattern: /<iframe height="(\d*)" width="100%" src="https:\/\/www.figma.com\/embed\?embed_host=astra&url=(https:\/\/([\w\.-]+\.)?figma.com\/(file|proto)\/([0-9a-zA-Z]{22,128})(?:\/.*)?)" allowfullscreen frameborder="0"><\/iframe>$/,
    fromBlock: match => ({
        height: match[1],
        id: match[2],
    }),
    toBlock: obj =>
        `<iframe height="${obj.height}" width="100%" src="https://www.figma.com/embed?embed_host=astra&url=${obj.id}" allowfullscreen frameborder="0"></iframe>`,
    toPreview: obj =>
        `<iframe height="${obj.height}" width="100%" src="https://www.figma.com/embed?embed_host=astra&url=${obj.id}" allowfullscreen frameborder="0"></iframe>`,
});

CMS.registerPreviewStyle(styles.toString(), { raw: true });
