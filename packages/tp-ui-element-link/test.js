const sass = require('node-sass');

it('compiles correctly', () => {
    const css = sass.renderSync({ file: 'packages/tp-ui-element-link/_index.scss' }).css.toString();
    expect(css).toMatchSnapshot();
});
