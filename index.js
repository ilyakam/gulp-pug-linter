var configFile = require('pug-lint/lib/config-file')
var PluginError = require('gulp-util').PluginError
var PugLint = require('pug-lint')
var throughObj = require('through2').obj

const PLUGIN_NAME = 'gulp-pug-linter'

function gulpPugLinter () {
  var config = configFile.load()
  var linter = new PugLint()

  /**
   * @name checkFile
   * @description Checks the given file for lint errors
   * @param {Object} file File chunk
   * @param {String} file.path File path
   * @returns {Array} List of error messages
   */
  function checkFile (file) {
    return linter.checkFile(file.path)
  }

  linter.configure(config)

  return throughObj(function (file, encoding, callback) {
    var errors

    if (file.isNull()) {
      return callback(null, file)
    } else if (file.isStream()) {
      return callback(
        new PluginError(PLUGIN_NAME, 'Streaming is not supported')
      )
    }

    errors = checkFile(file)

    file.pugLinter = {errors: errors}

    return callback(null, file)
  })
}

module.exports = gulpPugLinter
module.exports.reporter = require('./reporter')
