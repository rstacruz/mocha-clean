/*
 * mocha test helper
 *
 *     mocha('-R tap example/failure.js');
 *
 *     it('works', function () {
 *       res.code
 *       res.out
 *       res.err
 *     });
 */

function mocha (args) {
  before(function (next) {
    runMocha(args, function (result) {
      global.res = result;
      next();
    });
  });
}

/*
 * test runner helper
 */

function runMocha (args, fn) {
  var spawn = require('child_process').spawn;
  var child = spawn('./node_modules/.bin/mocha', args.split(' '));

  var result = {
    out: '',
    err: '',
    code: null
  };

  child.stdout.on('data', function (data) {
    result.out += data;
  });

  child.stderr.on('data', function (data) {
    result.out += data;
  });

  child.on('close', function (code) {
    result.code = code;
    fn(result);
  });
}

module.exports = mocha;
