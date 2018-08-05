/* eslint-disable no-unused-expressions */
/* eslint-env mocha */
var expect = require('chai').expect
var gutil = require('gulp-util')
var proxyquire = require('proxyquire')
var sinon = require('sinon')

describe('#reporter()', function () {
  var reporter
  var mockGulpUtil
  var mockReporter
  var stream

  describe('when the stream contains PugLinter errors', function () {
    var streamFile

    beforeEach(function () {
      streamFile = new gutil.File({
        base: 'base',
        contents: Buffer.from(''),
        cwd: __dirname,
        path: 'path.pug'
      })

      streamFile.pugLinter = {errors: [{message: 'some error'}]}
    })

    it('should print the error for default reporter', function () {
      mockGulpUtil = {log: sinon.stub()}

      reporter = proxyquire('../reporter', {'gulp-util': mockGulpUtil})

      stream = reporter()

      stream.write(streamFile)

      stream.end()

      expect(mockGulpUtil.log.calledWith('some error'))
        .to.be.ok
    })

    it('should report errors for named reporter', function () {
      funcReporter['@noCallThru'] = true

      function funcReporter (errors) {}

      mockReporter = sinon.spy(funcReporter)

      reporter = proxyquire(
        '../reporter',
        {'pug-mock-reporter': mockReporter}
      )

      stream = reporter('pug-mock-reporter')

      stream.write(streamFile)

      stream.end()

      expect(mockReporter.calledWith([{message: 'some error'}]))
        .to.be.ok
    })

    it('should report errors for function reporter', function () {
      var funcReporter = function (errors) {}

      var spy = sinon.spy(funcReporter)

      reporter = require('../reporter')

      stream = reporter(spy)

      stream.write(streamFile)

      stream.end()

      expect(spy.calledWith([{message: 'some error'}]))
        .to.be.ok
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

    it('should throw an error for fail reporter', function () {
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
    var streamFile

    beforeEach(function () {
      streamFile = new gutil.File({
        base: 'base',
        contents: Buffer.from(''),
        cwd: __dirname,
        path: 'path.pug'
      })
    })

    it('should print no errors for default reporter', function () {
      mockGulpUtil = {log: sinon.stub()}

      reporter = proxyquire('../reporter', {'gulp-util': mockGulpUtil})

      stream = reporter()

      stream.write(streamFile)

      stream.end()

      expect(mockGulpUtil.log.called)
        .to.not.be.ok
    })

    it('should report empty errors for function reporter', function () {
      var funcReporter = function (errors) {}

      var spy = sinon.spy(funcReporter)

      reporter = require('../reporter')

      stream = reporter(spy)

      stream.write(streamFile)

      stream.end()

      expect(spy.calledWith([]))
        .to.be.ok
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
