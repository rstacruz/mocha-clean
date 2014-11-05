var expect = require('chai').expect;
var err;

if (process.env.COVERAGE) {
  require('blanket')({
    pattern: require('path').resolve('./index.js')
  });
}

var cleanError = require('../index').cleanError;
var reorder = require('../index').reorderFilename;

describe('clean', function () {
  beforeEach(function () {
    try {
      (function () { poop(); })();
    } catch (e) {
      err = cleanError(e);
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

describe('reorder filenames', function () {
  it("works", function () {
    expect(reorder('    at foobar (file.js:1:2)'))
      .eql('    file.js:1:2: foobar');
  });

  it("knows indents", function () {
    expect(reorder('        at foobar (file.js:1:2)'))
      .eql('        file.js:1:2: foobar');
  });

  it("works without functions", function () {
    expect(reorder('    at file.js:1:2'))
      .eql('    file.js:1:2:');
  });

  it("treats native functions differently", function () {
    expect(reorder('    at Array.forEach (native)'))
      .eql('    [native]: Array.forEach');
  });
});

function poop() {
  undefinedThing();
}
