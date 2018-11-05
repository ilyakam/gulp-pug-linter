# Contributing

Thank you for your interest in contributing to this project! Here's what you need to know to get started.

1. [Maintainers](#maintainers)
1. [Order of Operations](#order-of-operations)
1. [Getting Started](#getting-started)
   1. [Initial Setup](#initial-setup)
   1. [Testing the Plugin](#testing-the-plugin)
      1. [gulp](#gulp)
      1. [unit tests](#unit-tests)
1. [Changelog Guideline](#changelog-guideline)
1. [Commit Guideline](#commit-guideline)

## Maintainers

This project is currently being maintained by:

* Ilya Kaminsky ([@ilyakam](https://github.com/ilyakam/))

However, the project is being developed by the community. You're encouraged to create issues and to submit pull requests for bugfixes and features.

## Order of Operations

1. [Create an issue](https://github.com/ilyakam/gulp-pug-linter/issues/new)
1. Fork the repo
1. Write code and unit tests
1. [Run tests](#unit-tests) and maintain coverage at 100%
1. [Submit a pull request](https://github.com/ilyakam/gulp-pug-linter/compare)
1. Communicate in a timely manner while the PR is open

## Getting Started

### Initial Setup

1. Make sure that you have the latest version of `node` installed (`node -v`); tested using `v8.11.x`
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
    // gulpfile.js
    const gulp = require('gulp');
    const pugLinter = require('gulp-pug-linter');

    gulp.task('lint:template', () => (
      gulp
        .src('./*.pug')
        .pipe(pugLinter({ reporter: 'default' }))
    ));
    ```
1. Run `npm run dev`

#### unit tests

1. Run `npm run test -- --watch` and it will automatically rerun the tests on change

## Changelog Guideline

This project adheres to the [keep a changelog guideline](https://keepachangelog.com/).

## Commit Guideline

This project adheres to the [Conventional Commits guideline](https://www.conventionalcommits.org/) along with the Angular convention commit types.
