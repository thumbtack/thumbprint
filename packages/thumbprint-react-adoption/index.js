#!/usr/bin/env node
const DependencyReport = require('@segment/dependency-report');
const countComponentInstances = require('./count-component-instances');

const report = new DependencyReport({
    files: ['../../../website/thumbprint/!(_scaffolds)/**/*.jsx'],
    package: '@thumbtack/thumbprint-react',
});

(async () => {
    const allResults = await report.run();
    const results = allResults.packages['@thumbtack/thumbprint-react'];

    const components = Object.keys(results.filepathsForExports).map(component => {
        const componentFiles = results.filepathsForExports[component];

        return {
            name: component,
            importCount: componentFiles.length,
            usageCount: componentFiles.reduce((acc, currentFile) => {
                return acc + countComponentInstances(component, currentFile);
            }, 0),
        };
    });

    // eslint-disable-next-line no-console
    console.log(components);
})();
