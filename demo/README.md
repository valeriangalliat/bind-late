Demo
====

> Demo project for [bind-late] usage.

[bind-late]: https://github.com/valeriangalliat/bind-late

Description
-----------

This project shows how to leverage bind-late to make a fully
customizable library, from the usual configuration options to the core
functions.

The demo API is about [stateless][db-network] token verification; it
will encrypt some data with a randomly (or not) generated key, encode it
and display it with some configuration options. The verification
function is not provided, but it could be easily implemented by
decrypting the token, checking the data and current time for expiration.

[db-network]: http://lucumr.pocoo.org/2013/11/17/my-favorite-database/

* [`index.js`](index.js) is the actual library code. Notice how the
  default configuration values and the actual library functions
  (`requestKey` and `displayKey`) are in the same object? This means
  everything can be redefined thanks to the [overridable] design
  pattern. Because of late binding, all values that depend on other
  values will be computed with the final tuned object.

[overridable]: https://github.com/valeriangalliat/make-overridable

* [`crypto.js`](crypto.js) and [`util.js`](util.js) contains helper
  functions used by `index.js`. Nothing important for the understanding
  here.

* [`test.js`](test.js) is the demo code, using the `index.js` API and
  showing how to override the configuration object (remember
  **everything** is in the configuration object).

Usage
-----

Example output is given in `test.js` comments, but you can run the demo
yourself:

```js
npm install
npm start
```
