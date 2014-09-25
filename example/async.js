/* run `mocha example/async.js` to try it out */
describe('fail', function () {
  it('sync fail', function () {
    y();
  });

  it('async fail', function (done) {
    setTimeout(function () {
      asyncFailure();
      done();
    }, 1);
  });
});
