const assert = require('assert')
const bindLate = require('./')

const a = bindLate({
  a: 8,
  b: {
    c: 2,
    d: _ => _.a + _.b.c,
  },
  e: _ => _.b.d * 2,

  f: bindLate({
    g: _ => { throw new Error('Should never be called.') },
  }),
})

assert.equal(a.b.d, 10)
assert.equal(a.e, 20)

const b = a.override({ a: 6 })

assert.equal(b.b.d, 8)
assert.equal(b.e, 16)

const c = b.override({
  b: { c: 6 },
  e: _ => _.b.d - 2,
})

assert.equal(c.b.d, 12)
assert.equal(c.e, 10)
