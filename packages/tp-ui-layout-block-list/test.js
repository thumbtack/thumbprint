const sass = require('node-sass');

it('compiles correctly', () => {
    const css = sass
        .renderSync({ file: 'packages/tp-ui-layout-block-list/_index.scss' })
        .css.toString();
    expect(css).toMatchSnapshot();
});
