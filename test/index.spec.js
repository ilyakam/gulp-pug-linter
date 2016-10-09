/* eslint-env mocha */
var expect = require('chai').expect
var gutil = require('gulp-util')
var mockery = require('mockery')
var sinon = require('sinon')

describe('gulp-pug-linter', function () {
  var configFile
  var stream

  beforeEach(function () {
    configFile = {load: function () {}}

    sinon.spy(configFile, 'load')

    sinon.mock(configFile)

    mockery.enable({
      useCleanCache: true,
      warnOnUnregistered: false
    })

    mockery.registerMock('pug-lint/lib/config-file', configFile)
  })

  afterEach(function () {
    mockery.disable()

    mockery.deregisterAll()
  })

  describe('when the stream contents are irrelevant', function () {
    var gulpPugLinter

    beforeEach(function () {
      gulpPugLinter = require('../index')

      stream = gulpPugLinter()
    })

    afterEach(function () {
      stream.end()
    })

    it('should load the configuration file', function () {
      expect(configFile.load.called)
        .to.be.ok
    })

    describe('when file is null', function () {
      var nullFile = {isNull: function () { return true }}

      it('should pass the file', function () {
        stream.on('data', function (data) {
          expect(data)
            .to.equal(nullFile)
        })

        stream.write(nullFile)
      })
    })

    describe('when file is a stream', function () {
      var streamFile = {
        isNull: function () { return false },
        isStream: function () { return true }
      }

      it('should throw an error', function () {
        stream.on('error', function (err) {
          expect(err.message)
            .to.equal('Streaming is not supported')
        })

        stream.write(streamFile)
      })
    })
  })

  describe('when there are no errors', function () {
    var file
    var gulpPugLinter
    var PugLint

    beforeEach(function () {
      var PugLintStub = {
        checkFile: function () { return [] },
        configure: function () {}
      }

      PugLint = function () { return PugLintStub }

      sinon.mock(PugLintStub)

      mockery.registerMock('pug-lint', PugLint)

      gulpPugLinter = require('../index')

      file = new gutil.File({
        base: 'base',
        contents: new Buffer(''),
        cwd: __dirname,
        path: 'path.pug'
      })

      stream = gulpPugLinter()
    })

    afterEach(function () {
      stream.write(file)

      stream.end()
    })

    it('should finish processing the file', function () {
      stream.on('data', function (processedFile) {
        expect(processedFile)
          .to.exist
      })
    })

    it('should stream a file that contains no errors', function () {
      stream.on('data', function (processedFile) {
        expect(processedFile.pugLinter.errors)
          .to.be.empty
      })
    })
  })

  describe('when there are errors', function () {
    var file
    var gulpPugLinter
    var PugLint

    beforeEach(function () {
      var PugLintStub = {
        checkFile: function () { return [{message: 'some error'}] },
        configure: function () {}
      }

      PugLint = function () { return PugLintStub }

      sinon.mock(PugLintStub)

      mockery.registerMock('pug-lint', PugLint)

      gulpPugLinter = require('../index')

      file = new gutil.File({
        base: 'base',
        contents: new Buffer(''),
        cwd: __dirname,
        path: 'path.pug'
      })

      stream = gulpPugLinter()
    })

    afterEach(function () {
      stream.write(file)

      stream.end()
    })

    it('should stream a file that contains errors', function () {
      stream.on('data', function (processedFile) {
        expect(processedFile.pugLinter.errors)
          .to.contain({message: 'some error'})
      })
    })
  })
})
