
/* run `mocha example/async.js` to try it out */

require('../index')();

it('async fail', function (next) {
  setTimeout(function () {
    y();
  }, 1);
});
