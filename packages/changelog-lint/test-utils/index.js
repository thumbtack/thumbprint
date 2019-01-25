const remark = require('remark');
const reporterJSON = require('vfile-reporter-json');

module.exports = ({ rule, invalid, valid }) => {
    const lint = contents =>
        JSON.parse(
            reporterJSON(
                remark()
                    .use(rule)
                    .processSync(contents),
            ),
        )[0];

    expect.extend({
        toPassLint(received) {
            const results = lint(received);
            const passed = results.messages.length === 0;

            if (passed) {
                return {
                    message: () => `Expected \`${received}\` not to pass the linter.`,
                    pass: true,
                };
            }

            return {
                message: () => `Expected the following to pass the linter:

\`\`\`\

${received}
\`\`\`

It failed with the following errors:

${results.messages.map(error => `• [${error.ruleId}] ${error.reason}\n`)}
        `,
                pass: false,
            };
        },
    });

    invalid.forEach((scenario, i) => {
        test(`invalid case #${i} fails`, () => {
            expect(scenario).not.toPassLint();

            expect({
                input: scenario,
                output: lint(scenario).messages,
            }).toMatchSnapshot();
        });
    });

    valid.forEach((scenario, i) => {
        test(`valid case #${i} passes`, () => {
            expect(scenario).toPassLint();
        });
    });
};
