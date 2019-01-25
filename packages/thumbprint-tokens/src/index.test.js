const { processFiles } = require('./index');

it('outputted CommonJS matches snapshot', () => {
    const output = processFiles();
    expect(output.cjs).toMatchSnapshot();
});

it('outputted ES module matches snapshot', () => {
    const output = processFiles();
    expect(output.es).toMatchSnapshot();
});

it('outputted SCSS matches snapshot', () => {
    const output = processFiles();
    expect(output.scss).toMatchSnapshot();
});
