/* eslint-env mocha */
var expect = require('chai').expect
var gutil = require('gulp-util')
var mockery = require('mockery')
var sinon = require('sinon')

describe('#reporter()', function () {
  var gulpUtil
  var reporter
  var stream

  describe('when the stream contains PugLinter errors', function () {
    var streamFile = new gutil.File({
      base: 'base',
      contents: new Buffer(''),
      cwd: __dirname,
      path: 'path.pug'
    })

    streamFile.pugLinter = {errors: [{message: 'some error'}]}

    it('should print the error', function () {
      gulpUtil = {log: function () {}}

      sinon.stub(gulpUtil)

      mockery.enable({
        useCleanCache: true,
        warnOnUnregistered: false
      })

      mockery.registerMock('gulp-util', gulpUtil)

      reporter = require('../reporter')

      stream = reporter()

      stream.write(streamFile)

      stream.end()

      expect(gulpUtil.log.calledWith('some error'))
        .to.be.ok

      gulpUtil.log.restore()

      mockery.disable()

      mockery.deregisterAll()
    })

    it('should throw an error for missing reporter', function () {
      function shouldThrowError () {
        reporter = require('../reporter')

        stream = reporter('missingReporter')

        stream.write(streamFile)

        stream.end()
      }

      expect(shouldThrowError)
        .to.throw('missingReporter is not a valid reporter')
    })

    it('should throw an error when set to fail', function () {
      function shouldThrowError () {
        reporter = require('../reporter')

        stream = reporter('fail')

        stream.write(streamFile)

        stream.end()
      }

      expect(shouldThrowError)
        .to.throw('some error')
    })
  })

  describe('when the stream does not contain PugLinter errors', function () {
    var streamFile = new gutil.File({
      base: 'base',
      contents: new Buffer(''),
      cwd: __dirname,
      path: 'path.pug'
    })

    it('should print no errors', function () {
      gulpUtil = {log: function () {}}

      sinon.stub(gulpUtil)

      mockery.enable({
        useCleanCache: true,
        warnOnUnregistered: false
      })

      mockery.registerMock('gulp-util', gulpUtil)

      reporter = require('../reporter')

      stream = reporter()

      stream.write(streamFile)

      stream.end()

      expect(gulpUtil.log.called)
        .to.not.be.ok

      gulpUtil.log.restore()

      mockery.disable()

      mockery.deregisterAll()
    })

    it('should throw an error for missing reporter', function () {
      function shouldThrowError () {
        reporter = require('../reporter')

        stream = reporter('missingReporter')

        stream.write(streamFile)

        stream.end()
      }

      expect(shouldThrowError)
        .to.throw('missingReporter is not a valid reporter')
    })

    it('should not throw an error for fail reporter', function () {
      function shouldNotThrowError () {
        reporter = require('../reporter')

        stream = reporter('fail')

        stream.write(streamFile)

        stream.end()
      }

      expect(shouldNotThrowError)
        .to.not.throw()
    })
  })
})
