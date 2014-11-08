var expect = require('chai').expect;
var mocha = require('./support/mocha');


describe('runinng', function () {
  describe('with -r .', function () {
    mocha('example/failure.js -R tap --require .');
    assertFailure();
    assertNoModules();

    it('reduces filenames', function () {
      expect(res.out).match(/\(example\/failure\.js:\d+:\d+\)/);
    });

    it('leaves messages alone', function () {
      expect(res.out).match(/ReferenceError: h is not defined/);
    });
  });

  describe('with -r brief', function () {
    mocha('example/failure.js -R tap --require ./brief');
    assertFailure();
    assertNoModules();

    it('reformats', function () {
      expect(res.out).match(/    example\/failure\.js:\d+:\d+: need/);
      expect(res.out).match(/    example\/failure\.js:\d+:\d+: help/);
      expect(res.out).match(/    example\/failure\.js:\d+:\d+: i/);
      expect(res.out).match(/    example\/failure\.js:\d+:\d+: somebody/);
      expect(res.out).match(/    example\/failure\.js:\d+:\d+: heeelp/);
    });

    it('leaves messages alone', function () {
      expect(res.out).match(/ReferenceError: h is not defined/);
    });
  });

  describe('with -r absolute_paths', function () {
    mocha('example/failure.js -R tap --require ./absolute_paths');
    assertFailure();

    it('includes full paths', function () {
      var fullpath = require('path').resolve('./example/failure.js');
      expect(res.out).include(fullpath);
    });
  });

  describe('with -r absolute_paths -r brief', function () {
    mocha('example/failure.js -R tap --require ./absolute_paths --require ./brief');
    assertFailure();
    assertNoModules();

    it('includes full paths', function () {
      var fullpath = require('path').resolve('./example/failure.js');
      expect(res.out).match(new RegExp('    ' + fullpath + ':\\d+:\\d+'));
    });
  });

  describe('with -r show_node_modules', function () {
    mocha('example/failure.js -R tap --require ./show_node_modules');
    assertFailure();
  });
});

function assertFailure() {
  it('fails', function () {
    expect(res.code).eql(1);
  });

  it('doesn\'t find other things', function () {
    expect(res.out).not.include('callFn');
    expect(res.out).not.include('Test.Runnable.run');
    expect(res.out).not.include('Runner.runTest');
    expect(res.out).not.include('Object._onImmediate');
    expect(res.out).not.include('processImmediate');
    expect(res.out).not.include('_immediateCallback');
  });
}

function assertNoModules() {
  it('has no node_modules', function () {
    expect(res.out).not.include('node_modules');
    expect(res.out).not.include('node_modules/mocha');
  });
}
