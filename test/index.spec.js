/* eslint-disable no-unused-expressions */
/* eslint-env mocha */
var expect = require('chai').expect
var proxyquire = require('proxyquire')
var sinon = require('sinon')
var Vinyl = require('vinyl')

describe('gulp-pug-linter', function () {
  var stream

  describe('when the stream contents are irrelevant', function () {
    var configFile
    var gulpPugLinter

    beforeEach(function () {
      configFile = {load: sinon.stub()}

      gulpPugLinter = proxyquire('../index', {
        'pug-lint/lib/config-file': configFile
      })

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
    var mockPugLint

    beforeEach(function () {
      mockPugLint = sinon.stub().returns({
        checkFile: sinon.stub().returns([]),
        configure: sinon.stub()
      })

      gulpPugLinter = proxyquire('../index', {'pug-lint': mockPugLint})

      file = new Vinyl({
        base: 'base',
        contents: Buffer.from(''),
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
    var mockPugLint

    beforeEach(function () {
      mockPugLint = sinon.stub().returns({
        checkFile: sinon.stub().returns([{message: 'some error'}]),
        configure: sinon.stub()
      })

      gulpPugLinter = proxyquire('../index', {'pug-lint': mockPugLint})

      file = new Vinyl({
        base: 'base',
        contents: Buffer.from(''),
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
          .to.deep.include({message: 'some error'})
      })
    })
  })
})
