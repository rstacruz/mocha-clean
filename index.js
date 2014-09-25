/*
 * cleans up mocha stack traces.
 */

var started;

module.exports = function (options) {
  // load guard: don't redecorate.
  if (started) return;
  started = true;

  decorate(cleanStackTraces);

  /*
   * decorates mocha test functions.
   */

  function decorate (decorator) {
    decorateHandler('it', decorator);
    decorateHandler('specify', decorator);
  }

  /*
   * decorates an individual test handler function.
   */

  function decorateHandler (key, decorator) {
    var old = global[key];
    if (!old) return;

    function updated(name, fn) {
      return old.call(this, name, decorator(fn));
    }

    updated.only = function (name, fn) {
      return old.only.call(this, name, decorator(fn));
    };

    updated.skip = old.skip;

    global[key] = updated;
  }

  /*
   * decorator to clean up stack traces.
   */

  function cleanStackTraces (fn) {
    var slash = require('path').sep || '/';

    var showNodeModules = options && options.nodeModules;

    return function __mocha_internal__cleanStackTraces () {
      try {
        fn();
      } catch (e) {
        var cwd = process.cwd() + slash;
        var stack = e.stack.split('\n');

        stack = stack.reduce(function (list, line) {
          // supress node modules
          if (showNodeModules || ~line.indexOf('node_modules'))
            return list;

          // supress mocha internals
          if (~line.indexOf('node_modules' + slash + 'mocha'))
            return list;

          // node internals
          if (~line.indexOf('(timers.js:'))
            return list;

          // supress ourselves
          if (~line.indexOf('__mocha_internal__'))
            return list;

          line = line.replace(cwd, '');
          list.push(line);
          return list;
        }, []);

        e.stack = stack.join('\n');
        throw e;
      }
    };
  }
};
