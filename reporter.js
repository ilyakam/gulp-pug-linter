var gutil = require('gulp-util')
var throughObj = require('through2').obj

const PLUGIN_NAME = 'gulp-pug-linter'

/**
 * @name defaultReporter
 * @description Logs all errors via `gulp-util`
 * @param {Array} errors Pug lint error objects with `message`
 */
var defaultReporter = function (errors) {
  var allErrors

  if (errors.length) {
    allErrors = errors.map(function (error) {
      return error.message
    }).join('\n\n')

    gutil.log(allErrors)
  }
}

/**
 * @name failReporter
 * @description Emits a plugin error including all Pug lint errors at once
 * @param {Array} errors Pug lint error objects with `message`
 */
var failReporter = function (errors) {
  var allErrors

  if (errors.length) {
    allErrors = errors.map(function (error) {
      return error.message
    }).join('\n\n')

    this.emit('error', new gutil.PluginError(PLUGIN_NAME, allErrors))
  }
}

/**
 * @name loadReporter
 * @description Returns an error reporter
 * @param {*} [type] 'fail' string to load a reporter that fails on error,
 *                   any function or string to load a custom module reporter,
 *                   or empty to load the default reporter.
 * @returns {Function} Error reporter that accepts an array of errors
 */
var loadReporter = function (type) {
  var reporter

  if (type == null) {
    return defaultReporter
  }

  if (type === 'fail') {
    return failReporter
  }

  if (typeof type === 'function') {
    reporter = type
  }

  if (typeof type === 'string') {
    try {
      reporter = require(type)
    } catch (error) {}
  }

  if (typeof reporter !== 'function') {
    throw new gutil.PluginError(PLUGIN_NAME, type + ' is not a valid reporter')
  }

  return reporter
}

module.exports = function (type) {
  var errors = []
  var reporter = loadReporter(type)

  return throughObj(function (file, encoding, callback) {
    if (file.pugLinter && file.pugLinter.errors.length) {
      errors = [].concat(errors, file.pugLinter.errors)
    }

    return callback(null, file)
  }, function (callback) {
    reporter.call(this, errors)

    return callback()
  })
}
