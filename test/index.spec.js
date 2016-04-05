/* eslint-env mocha */
var expect = require('chai').expect
var linter = require('../index')

describe('#hello()', function () {
  var hello

  before(function () {
    hello = linter.hello
  })

  it('should return world', function () {
    expect(hello())
      .to.equal('world')
  })
})
