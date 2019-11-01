# Contributing to Thumbprint

The Design Systems team welcomes contributions from all developers at Thumbtack. These contributions can range from small bug reports to brand new components and initiatives.

Here are a few ways to get started:

## File a bug or request a feature

Providing feedback is the easiest way to contribute to Thumbprint. You can do this by [creating an issue on GitHub](https://github.com/thumbtack/thumbprint/issues).

If you're a Thumbtack employee, you can also post on [#design-systems](https://teamsanfrancisco.slack.com/messages/C7FLM0ZGU/details/) for quick help.

## Contribute code to Thumbprint

There are two ways to contribute code back to Thumbprint:

1. **Tackle open GitHub issues:** Issues labeled as “[good first issue](https://github.com/thumbtack/thumbprint/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22)” or “[help wanted](https://github.com/thumbtack/thumbprint/issues?q=is%3Aopen+is%3Aissue+label%3A%22help+wanted%22)” are perfect for contributors that want to tackle small tasks.
2. **Propose and create a new React component:** Creating a React component allows contributors to dive-deep into component API design, testing, accessibility, and documentation. Please [create a GitHub issue](https://github.com/thumbtack/thumbprint/issues) to propose a new component. If the component is a good candidate for Thumbprint, we’ll schedule a kick-off meeting to discuss next steps.

Not sure if the component should be reusable? Take a look at the “[Where should a React component live](https://docs.google.com/a/thumbtack.com/document/d/1-EGijB_3mc49T_CSzWowNfhEKlwiTdZh8tqIx6URZys/edit?usp=sharing)” RFC (internal only).

## Developing Thumbprint locally

Use the following commands to run the Thumbprint documentation:

```bash
git clone git@github.com:thumbtack/thumbprint.git
cd thumbprint
node -v # This must be 8.x
yarn -v # This must be >= 1.4.2
yarn
yarn start
```

Then open [http://localhost:8090/](http://localhost:8090/) to see the docs. Take a look at [`www/README.md`](https://github.com/thumbtack/thumbprint/blob/master/www/README.md) to learn more.

### Working on Components, Atomic, or something else?

The Thumbprint codebase is a collection of packages that we version independently and publish to NPM. These packages live in [`packages/`](https://github.com/thumbtack/thumbprint/tree/master/packages). Take a look at the package's `README.md` for specific information about that package.

To add or remove NPM packages from code in `packages/`, `cd` into the package's folder (`cd packages/[package-name]`) and use `yarn add`, `yarn remove`, or `yarn upgrade`. Thumbprint uses [Yarn's workspaces feature](https://yarnpkg.com/lang/en/docs/workspaces/) to manage multiple `package.json` files in one codebase.

Our documentation source code lives in [`www/`](https://github.com/thumbtack/thumbprint/tree/master/www). Take a look at [`www/README.md`](https://github.com/thumbtack/thumbprint/blob/master/www/README.md) to learn more.

### Environment variables we use

-   `CODA_API_TOKEN` – This is an API token from Coda that we use to display the component statuses on `thumbprint.design/components/overview`. It is not required for local development. To get it, message a Design Systems team member on Slack and store the value as an environment variable in `www/.env`.

### Submitting a pull request

Here are a few things to keep in mind when creating a pull request:

-   **Testing:** Run `yarn test` locally to ensure that the build will pass. If the command fails because of [Jest snapshot tests](https://facebook.github.io/jest/docs/en/snapshot-testing.html), you will have to run `yarn test:jest -u` to update the snapshots. Review the changes to the snapshots to ensure that they are intended and include them in the code review.
-   **Changelog:**
    -   Most changes within `packages/`require updates to the package's `CHANGELOG.md` file. You can skip modifying the changelog if your commit only modifies this [list of ignored files](https://github.com/thumbtack/thumbprint/blob/master/lerna.json).
    -   Our changelogs follow the “[Keep a Changelog](http://keepachangelog.com/en/1.0.0/)” specification. Our version numbers follow [Semantic Versioning](https://semver.org/).
    -   You should not include the package’s new version number as part of your commit. That is done in the release process.

### Creating a new package

Create a new folder in `packages` with the following structure:

```
├── CHANGELOG.md
├── README.md
├── package.json
```

Thumbprint follows a [traditional GitHub workflow](https://guides.github.com/introduction/flow/). This means that you should work in a feature branch and submit a pull request when ready for code review.

### Releasing Thumbprint packages

[Learn how to release the Thumbprint packages and documentation](https://github.com/thumbtack/thumbprint/blob/master/RELEASING.md). This process is done by [Thumbprint maintainers](https://github.com/orgs/thumbtack/teams/design-systems/members) after your code has merged into `master`.

As always, reach out to [#design-systems](https://teamsanfrancisco.slack.com/messages/C7FLM0ZGU/details/) (internal to Thumbtack employees) or [create an issue](https://github.com/thumbtack/thumbprint/issues) if you have questions or feedback.
