# Contributing

Thank you for your interest in contributing to this project! Here's what you need to know to get started.

1. [Maintainers](#maintainers)
1. [Order of Operations](#order-of-operations)
1. [Getting Started](#getting-started)
  1. [Initial Setup](#initial-setup)
  1. [Testing the Plugin](#testing-the-plugin)
    1. [gulp](#gulp)
    1. [unit tests](#unit-tests)
1. [Commit Guidelines](#commit-guidelines)
  1. [Commit Message Format](#commit-message-format)
  1. [Revert](#revert)
  1. [Type](#type)
  1. [Scope](#scope)
  1. [Subject](#subject)
  1. [Body](#body)
  1. [Footer](#footer)

## Maintainers

This project is currently being maintained by:

* Ilya Kaminsky ([@ilyakam](https://github.com/ilyakam/))

However, the project is being developed by the community. You're encouraged to create issues and to submit pull requests for bugfixes and features.

## Order of Operations

1. [Create an issue](https://github.com/ilyakam/gulp-pug-linter/issues/new)
1. Fork the repo
1. Write code and unit tests [following the styleguide](http://standardjs.com/)
1. [Run tests](#unit-tests) and keep coverage at 100%
1. [Submit a pull request](https://github.com/ilyakam/gulp-pug-linter/compare)
1. Communicate in a timely manner while the PR is open

## Getting Started

### Initial Setup

1. Make sure that you have the latest version of `node` installed (`node -v`); tested using `v5.10.x`
1. Clone this repo `git clone git@github.com:ilyakam/gulp-pug-linter.git`
1. `cd gulp-pug-linter`
1. `npm install`

### Testing the Plugin

#### gulp

1. Pick a [rule](https://github.com/pugjs/pug-lint/blob/master/docs/rules.md) that you'd like to test
1. Create a `.pug-lint.json` file with the rule in place, e.g.:
  ```json
  {
    "disallowIdLiterals": true
  }
  ```

1. Create a folder with one or more `.pug` files that violate the rule
1. Create a `gulpfile.js` at the root of the repo, with the following code:
  ```js
  var gulp = require('gulp')
  var pugLinter = require('./')

  gulp.task('default', ['test'])

  gulp.task('test', function () {
    return gulp
      .src('./**/*.pug')
      .pipe(pugLinter()) // or .pipe(pugLinter('fail'))
      .pipe(pugLinter.reporter())
  })
  ```
1. Run `gulp`

#### unit tests

1. Run `npm run-script coverage`

## Commit Guidelines

The commit guidelines are borrowed straight from [AngularJS's Contributing Guide](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md#-git-commit-guidelines):

> ### Commit Message Format
> Each commit message consists of a **header**, a **body** and a **footer**.  The header has a special
> format that includes a **type**, a **scope** and a **subject**:

> ```
> <type>(<scope>): <subject>
> <BLANK LINE>
> <body>
> <BLANK LINE>
> <footer>
> ```

> The **header** is mandatory and the **scope** of the header is optional.

> Any line of the commit message cannot be longer 72 characters! This allows the message to be easier to read on GitHub as well as in various git tools.

> ### Revert
> If the commit reverts a previous commit, it should begin with `revert: `, followed by the header of the reverted commit. In the body it should say: `This reverts commit <hash>.`, where the hash is the SHA of the commit being reverted.

> ### Type
> Must be one of the following:

> * **feat**: A new feature
> * **fix**: A bug fix
> * **docs**: Documentation only changes
> * **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
> * **refactor**: A code change that neither fixes a bug nor adds a feature
> * **perf**: A code change that improves performance
> * **test**: Adding missing tests
> * **chore**: Changes to the build process or auxiliary tools and libraries such as documentation generation

> ### Scope
> The scope could be anything specifying place of the commit change.

> ### Subject
> The subject contains succinct description of the change:

> * use the imperative, present tense: "change" not "changed" nor "changes"
> * don't capitalize first letter
> * no dot (.) at the end

> ### Body
> Just as in the **subject**, use the imperative, present tense: "change" not "changed" nor "changes". The body should include the motivation for the change and contrast this with previous behavior. The more verbose, the better.

> ### Footer
> The footer should contain any information about **Breaking Changes** and is also the place to reference GitHub issues that this commit **Closes**.
