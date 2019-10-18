/**
 * The default export of `netlify-cms-app` is an object with all of the Netlify CMS
 * extension registration methods, such as `registerWidget` and
 * `registerPreviewTemplate`.
 */
import CMS from 'netlify-cms-app';

CMS.registerPreviewStyle('https://unpkg.com/picnic@6.5.1/picnic.min.css');

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
