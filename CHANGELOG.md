# Change Log
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]
### Added
- Greenkeeper to automatically keep dependencies up to date
- Ability to automatically run tests on change with `npm run watch`

### Changed
- Require packages using `proxyquire` instead of `mockery` in the unit tests
- Replace deprecated `gulp-util` with `fancy-log`, `plugin-error`, and `vinyl`

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
- Ensure Node engine is not limited to v5.x

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
