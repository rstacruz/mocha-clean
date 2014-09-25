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
