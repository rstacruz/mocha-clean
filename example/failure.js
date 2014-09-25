/* run `mocha example` to try it out */

require('../index')();

it('this throws an error', function () {
  y();
});

function y() { somebody(); }
function i() { help(); }
function help() { h(); }
function need() { i(); }
function somebody() { need(); }
