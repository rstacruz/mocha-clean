describe('simple failure', function () {
  it('this throws an error', function () {
    heeelp();
  });
});

function heeelp() { somebody(); }
function i() { help(); }
function help() { h(); }
function need() { i(); }
function somebody() { need(); }
