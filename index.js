var slash = require('path').sep || '/';
var Mocha = require('mocha');
var Runner = Mocha.Runner;

/*
 * monkey-patch Runner#fail to modify `err`
 */

var old = Runner.prototype.fail;
Runner.prototype.fail = function (test, err) {
  err = __mocha_internal__cleanError(err);
  old.call(this, test, err);
};

/*
 * cleans an error
 */

function __mocha_internal__cleanError (e) {
  if (!e.stack) return e;
  var cwd = process.cwd() + slash;
  var stack = e.stack.split('\n');

  stack = stack.reduce(function (list, line) {
    // supress node modules
    if (~line.indexOf('node_modules') && !process.env.SHOW_NODE_MODULES)
      return list;

    // supress mocha internals
    if (~line.indexOf('node_modules' + slash + 'mocha'))
      return list;

    // node internals
    if ((~line.indexOf('(timers.js:')) ||
        (~line.indexOf('(module.js:')))
      return list;

    // supress ourselves
    if (~line.indexOf('__mocha_internal__'))
      return list;

    line = line.replace(cwd, '');
    list.push(line);
    return list;
  }, []);

  e.stack = stack.join('\n');
  return e;
}

/*
 * export for tests
 */

exports.cleanError = __mocha_internal__cleanError;
