# Change Log
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

## [1.4.0] - 2020-08-18
### Changed
- [BREAKING CHANGE] Require Node.js engine v10 and higher
- Bump `eslint`, `jest`, and `through2`

## [1.3.0] - 2019-08-24
### Changed
- Bump `eslint-config-airbnb-base` and `eslint-plugin-jest` packages
- Update `index.js` to comply with new ESLint rules via `eslint . --fix`

## [1.2.1] - 2019-07-18
### Fixed
- Bump the Node.js engine to match the ES2017 syntax in this project

### Security
- Bump Lodash to version `4.17.15` to address vulnerability with `defaultsDeep`

## [1.2.0] - 2019-06-30
### Changed
- Replace Dependencies Status badge with Tidelift
- Manually update all dependencies with `npx npm-check-updates -u && npm i`

## [1.1.0] - 2018-11-07
### Changed
- Bump `through2` and `estlint-plugin-jest` packages

## [1.0.0] - 2018-11-04
### Added
- [BREAKING CHANGE] New API with options to specify a reporter and to exit with errors
- Custom commit message including a body for updating dependencies with Greenkeeper

### Changed
- Rewrote the entire plugin in ES6
- Replaced `chai`, `istanbul`, `mocha`, `proxyquire`, and `sinon` with `jest`
- Replaced `standard` with `eslint` and its related plugins
- Replaced the AngularJS Commit guideline with Conventional Commits
- Replaced `npm run watch` with `npm run test -- --watch`
- Updated contents and code examples in the `README` and `CONTRIBUTING` guides

### Removed
- [BREAKING CHANGE] Separate `reporter()` stream handler including the `'fail'` flag

## [0.7.0] - 2018-11-04
### Added
- Deprecation warning for version `1.0.0`
- Migration guide to the README

### Deprecated
- Separate `reporter()` stream handler including the `'fail'` flag

## [0.6.0] - 2018-08-05
### Added
- Greenkeeper to automatically keep dependencies up to date
- Ability to automatically run tests on change with `npm run watch`
- David `devDependencies` badge

### Changed
- Require packages using `proxyquire` instead of `mockery` in the unit tests
- Replace deprecated `gulp-util` with `fancy-log`, `plugin-error`, and `vinyl`
- Upgraded `coveralls`, `gulp`, and `mocha` due to vulnerabilities found by `npm audit`

### Fixed
- Update CONTRIBUTING list items to be in order
- Ignore all `*.pug` and `*.jade` files in this repository

## [0.5.1] - 2017-06-17
### Fixed
- Update README examples to adhere to StandardJS

## [0.5.0] - 2017-06-17
### Changed
- Bump Chai, Sinon, and StandardJS packages

## [0.4.1] - 2016-10-15
### Fixed
- Ensure unit tests can run in Windows
- Ensure Node.js engine is not limited to v5.x

## [0.4.0] - 2016-10-09
### Added
- Allow use of custom and external reporters

## [0.3.0] - 2016-06-13
### Added
- Allow use of `extend` in `pug-lint`

## [0.2.1] - 2016-05-03
### Fixed
- Bump version

## [0.2.0] - 2016-05-03
### Added
- Contributing guide
- npm badge

### Changed
- Bump StandardJS package

## [0.1.0] - 2016-04-10
### Added
- Initial release
