var slash = require('path').sep || '/';
var Mocha = require('mocha');
var Runner = Mocha.Runner;

/*
 * monkey-patch Runner#fail to modify `err`.
 */

var old = Runner.prototype.fail;
Runner.prototype.fail = function (test, err) {
  err = __mocha_internal__cleanError(err);
  return old.call(this, test, err);
};

/*
 * cleans an error.
 */

function __mocha_internal__cleanError (e) {
  if (!e.stack) return e;
  var cwd = process.cwd() + slash;
  var stack = e.stack.split('\n');

  stack = stack.reduce(function (list, line) {
    // Strip out certain lines.
    if (isNodeModule(line) ||
      isMochaInternal(line) ||
      isNodeInternal(line) ||
      isMochaCleanInternal(line))
      return list;

    // Clean up cwd.
    line = line.replace(cwd, '');
    list.push(line);
    return list;
  }, []);

  e.stack = stack.join('\n');
  return e;
}

/*
 * detect if a line is from a 3rd-party module.
 */

function isNodeModule (line) {
  return (~line.indexOf('node_modules')) &&
    !process.env.SHOW_NODE_MODULES;
}

/*
 * detect stuff from mocha itself.
 * usually not needed, but if SHOW_NODE_MODULES is on, you probably wanna
 * supress this.
 */

function isMochaInternal (line) {
  return (~line.indexOf('node_modules' + slash + 'mocha'));
}

/*
 * detect stuff from this library.
 */

function isMochaCleanInternal (line) {
  return (~line.indexOf('__mocha_internal__'));
}

/*
 * detect internal node errors. Examples:
 *
 *   at Module._compile (module.js:439:25)
 *   at Object.Module._extensions..js (module.js:474:10)
 *   at Module.load (module.js:356:32)
 *   at Function.Module._load (module.js:312:12)
 *   at Module.require (module.js:364:17)
 *   at require (module.js:380:17)
 */

function isNodeInternal (line) {
  return (~line.indexOf('(timers.js:')) ||
    (~line.indexOf('(module.js:'));
}

/*
 * export for tests.
 */

exports.cleanError = __mocha_internal__cleanError;
