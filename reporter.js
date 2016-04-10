var gutil = require('gulp-util')
var throughObj = require('through2').obj

const PLUGIN_NAME = 'gulp-pug-linter'

module.exports = function (hasToFail) {
  var errors = []

  return throughObj(function (file, encoding, callback) {
    if (file.pugLinter && file.pugLinter.errors.length) {
      errors = [].concat(errors, file.pugLinter.errors)
    }

    return callback(null, file)
  }, function (callback) {
    var allErrors

    if (errors.length) {
      allErrors = errors.join('\n\n')

      hasToFail
        ? this.emit('error', new gutil.PluginError(PLUGIN_NAME, allErrors))
        : gutil.log(allErrors)
    }

    return callback()
  })
}
