var gutil = require('gulp-util')
var throughObj = require('through2').obj

const PLUGIN_NAME = 'gulp-pug-linter'

var defaultReporter = function (errors) {
  if (errors.length) {
    var allErrors = errors.map(function (error) {
      return error.message
    }).join('\n\n')

    gutil.log(allErrors)
  }
}

var failReporter = function (errors) {
  if (errors.length) {
    var allErrors = errors.map(function (error) {
      return error.message
    }).join('\n\n')

    this.emit('error', new gutil.PluginError(PLUGIN_NAME, allErrors))
  }
}

var loadReporter = function (type) {
  if (type == null) {
    return defaultReporter
  }
  if (type === 'fail') {
    return failReporter
  }
  throw new gutil.PluginError(PLUGIN_NAME, type + ' is not a valid reporter')
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
