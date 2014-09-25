# mocha-clean

Cleans up mocha tests.

## Why

It turns this:

```
  1) Test:
     ReferenceError: someKey is not defined
      at Context.<anonymous> (/Users/rsc/Projects/mocha-clean/test/test.js:24:5)
      at callFn (/Users/rsc/Projects/mocha-clean/node_modules/mocha/lib/runnable.js:249:21)
      at Test.Runnable.run (/Users/rsc/Projects/mocha-clean/node_modules/mocha/lib/runnable.js:242:7)
      at Runner.runTest (/Users/rsc/Projects/mocha-clean/node_modules/mocha/lib/runner.js:373:10)
      at /Users/rsc/Projects/mocha-clean/node_modules/mocha/lib/runner.js:451:12
      at next (/Users/rsc/Projects/mocha-clean/node_modules/mocha/lib/runner.js:298:14)
      at /Users/rsc/Projects/mocha-clean/node_modules/mocha/lib/runner.js:308:7
      at next (/Users/rsc/Projects/mocha-clean/node_modules/mocha/lib/runner.js:246:23)
      at Object._onImmediate (/Users/rsc/Projects/mocha-clean/node_modules/mocha/lib/runner.js:275:5)
      at processImmediate [as _immediateCallback] (timers.js:330:15)
```

Into this:

```
  1) Test:
     ReferenceError: someKey is not defined
      at myFunction (test/test:7:1)
      at test/test.js:24:5
```

It strips away mocha internals, node_modules, absolute paths (based on cwd), and 
other unneccessary cruft.

## Usage

```js
// add this to the beginning of your tests:
require('mocha-clean')();
```

By default, this also removes anything under `node_modules`.
To disable this behavior, use this:

```js
require('mocha-clean')({ showNodeModules: true });
```

## Thanks

MIT
