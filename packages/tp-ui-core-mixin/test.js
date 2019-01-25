const sass = require('node-sass');

it('compiles correctly', () => {
    const css = sass.renderSync({ file: 'packages/tp-ui-core-mixin/_index.scss' }).css.toString();
    expect(css).toMatchSnapshot();
});
