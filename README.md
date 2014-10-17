Spicejs-ConnectN
===============

A simple and flexible implementation on the connect4 game http://en.wikipedia.org/wiki/Connect_Four.

This APP uses Spice.js (https://github.com/3den/spicejs) framework but the main logic is compleatly decoupled from any framework, so it can be used with any framework on nodejs or the browser.

## Try the APP

Just open `index.html` in you favorite browser, but I just tested it in chrome :P

## Tests

I am using Spice.js BDD framework, which is very minimal, promotes custom assertions and can run on nodejs or the browser.

To run the tests on the command line you can use make:

```
$ make
```

or run the node test manually:

```
$ node test/node.js
```

I you prefer, you can also run the tests on the browser, just open `test/index.html` and check the browser console.

## About the Code

The business logic of ConnectN is in `lib/connect_n.js` and it is fully tested in `test/connect_n_test.js`. The code should be simple to understand, it uses
prototypal inheritance instead of pseudo-classical.

In the `app` directory you will see the logic that depends on Spice and the DOM, even tho I love jQuery there was no need for it, yay!
