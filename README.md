# bind-late [![npm version](http://img.shields.io/npm/v/bind-late.svg?style=flat-square)](https://www.npmjs.org/package/bind-late)

> Late binding of [overridable] object properties.

[overridable]: https://github.com/valeriangalliat/make-overridable

Description
-----------

Define an overridable object where special "late binded" functions will
be treated as lazy memoized properties.

All the functions in the object structure that are anonymous and take a
single `_` argument, are considered to be "late bindings". When the
property is accessed the first time, they are called with the final
overridden object as `_` parameter, and their return value is affected
to the property.

Nesting
-------

You can nest late binded objects. Late binded objects are not plain
objects and will not be recursively extended during an `override`, so
you need to extend them explicitely (this is often what you want,
since `override` would otherwise just copy your properties and not
rebuild the inner late binded object according to what you changed).

Example
-------

```js
const bindLate = require('bind-late')

const a = bindLate({
  a: 8,
  b: {
    c: 2,
    d: _ => _.a + _.b.c,
  },
  e: _ => _.b.d * 2,
})

a.b.d === 10 // 8 + 2
a.e === 20 // 10 * 2

const b = a.override({ a: 6 })

b.b.d === 8 // 6 + 2
b.e === 16 // 8 * 2

const c = b.override({
  b: { c: 6 },
  e: _ => _.b.d - 2,
})

c.b.d === 12 // 6 + 6
c.e === 10 // 12 - 2
```

You can also watch the [antisocial-auth source code][aa] for a more
concrete example, where everything is overridable thanks to bind-late.

[aa]: https://github.com/valeriangalliat/antisocial-auth/blob/master/src/index.js

Demo
----

See the [demo](demo) directory to see a functional example you can tweak
and play with.
