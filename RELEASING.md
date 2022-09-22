# Releasing packages

Thumbprint is a collection of small packages that are versioned independently and follow [Semantic Versioning](http://semver.org/). We use [Lerna](https://github.com/lerna/lerna) to automate most of the package release process, but there are still some manual steps.

## Who can publish to npm

The following users have credentials to publish packages to npm:

1. [Daniel O’Connor](https://github.com/danoc)
2. [Giles Lavelle](https://github.com/lavelle)

This list ordered based on experience releasing packages and contributing to Thumbprint.

## Check to see if you have credentials to publish to npm

Run `yarn npm whoami`. You’ll be able to publish packages if the user npm returns is a collaborator for the packages on [Thumbtack’s npm org](https://www.npmjs.com/org/thumbtack).

## How to publish

### Step 1

```
git checkout master && git pull
```

Checks out `master` and pulls latest code.

### Step 2

```
yarn updated
```

Shows which packages have unreleased changes.

#### Why is a private package appearing?

This command will occasionally list private packages such as `www`. It is a bug in Lerna, the tool we use to publish our packages. You can safely ignore the packages that are listed as private.

### Step 3

Open the `CHANGELOG.md` files for each package with unreleased changes.

For each package, add the new version number and the date above the list of unreleased changes. Use the [Semantic Versioning specification](https://semver.org/) to determine the new version number. The new version number will be based on the highest severity unreleased change.

#### What if one of these changelogs has no "Unreleased" changes?

It is possible that a developer forgot to add a changelog entry in their PR or, more likely, one of the package's dependencies is going to receive a version bump. A change to the `@thumbtack/thumbprint-scss` package, for example, will trigger a version bump in `@thumbtack/thumbprint-atomic` since Thumbprint Atomic depends on Thumbprint SCSS. In that case, add a new entry to the changelog that addresses the version bump in the dependency.

You should also look at the folder's git history to ensure that a developer did not forget to list their change in the changelog. If they did, you should go ahead and add the change to the changelog.

### Step 4

```
git add .
```

Stage all changes.

### Step 5

```
git commit -m "Update CHANGELOG for package release"
```

Commit all changes.

### Step 6

```
yarn publish
```

You'll be prompted to select the new version numbers for each package.

Use the version numbers that you chose in step #3.

#### Why is a private package appearing?

Private packages such as `www` will occasionally appear here. It is a bug in Lerna, the tool we use to publish our packages. Choose "Patch" for these packages.

## Deploying documentation

The documentation is automatically deployed to Netlify when a PR is merged into the `master` branch.

## Releasing beta versions of packages

Run `yarn npm whoami`. You’ll be able to publish if the user npm returns is a collaborator for the packages on [Thumbtack’s npm org](https://www.npmjs.com/org/thumbtack).

1. Run `git checkout [branch-name]` to navigate to the branch that contains the changes you'd like to release.
2. Navigate to the package with `cd packages/[package-name]`.
3. Edit the `version` in the package's `package.json` file. A package that is currently at `2.1.3` which includes a `Minor` beta change would become `2.2.0-beta.0`. If `2.2.0-beta.0` was already published, then increment the final digit. Save the file.
4. Run `yarn npm publish --tag beta`. It will use the version number you just added to `package.json`.
5. Undo the `package.json` version number change.
