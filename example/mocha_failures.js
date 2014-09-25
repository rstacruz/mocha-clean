describe('mocha failures', function () {
  it('done with non-error', function (done) {
    done(1);
  });

  it('done called multiple times', function (done) {
    done();
    done();
  });
});
