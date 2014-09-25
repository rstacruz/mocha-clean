require('../index')();

var expect = require('chai').expect;
var err;

var cleanStackTraces = require('../index').cleanStackTraces;

describe('clean', function () {
  beforeEach(function () {
    try {
      cleanStackTraces(function () { poop(); })();
    } catch (e) {
      err = e;
    }
  });

  it('no cwd', function () {
    expect(err.stack).not.include(process.cwd());
  });

  it('has the error', function () {
    expect(err.stack).include('undefinedThing is not defined');
  });

  it('has the intermediate fn call', function () {
    expect(err.stack).include('poop');
  });

  it('has few lines', function () {
    var lines = err.stack.split('\n');
    expect(lines).have.length.gt(1);
    expect(lines).have.length.lt(5);
  });

  it('has this file in it without a path', function () {
    expect(err.stack).include('(test/test.js');
  });
});

function poop() {
  undefinedThing();
}
