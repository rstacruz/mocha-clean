# mocha-clean

Cleans up [mocha] test stack traces.

Ever find it hard to read this? Me too.

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

This is better:

```
  1) Test:
     ReferenceError: someKey is not defined
      at myFunction (test/test:7:1)
      at test/test.js:24:5
```

It strips away mocha internals, node_modules, absolute paths (based on cwd), and 
other unneccessary cruft.

How? It monkey-patches `it()` (and all its cousins) to decorate the test 
functions. This decorator will catch any exception thrown and scrub out 
`err.stack`.

## Usage

```sh
npm i --save-dev mocha-clean
```

Add this to the beginning of your tests:

```js
require('mocha-clean')();
```

By default, this also removes anything under `node_modules`.
To disable this behavior, use this:

```js
require('mocha-clean')({ showNodeModules: true });
```

## Thanks

MIT Licensed

[mocha]: http://visionmedia.github.io/mocha
