# bind-late [![npm version](http://img.shields.io/npm/v/bind-late.svg?style=flat-square)](https://www.npmjs.org/package/bind-late)

> Late binding of [overridable] object properties.

[overridable]: https://github.com/valeriangalliat/make-overridable

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
