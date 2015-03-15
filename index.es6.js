const assign = require('object-assign')
const isPlainObject = require('is-plain-object')
const lazy = require('lazy-object').defineLazyProperty
const makeOverridable = require('make-overridable')

const keys = (object, f) => {
  Object.keys(object).forEach(f)
  return object
}

const traverse = (object, f, root = object) =>
  keys(object, key => {
    const value = object[key]

    if (isPlainObject(value)) {
      traverse(value, f, root)
    } else {
      f(value, key, object)
    }
  })

const isUnderscored = f => f.toString().substr(0, 12) === 'function (_)'
const isLateBinding = x => x instanceof Function && isUnderscored(x)
function Dumb(object) { assign(this, object) }

const doBindLate = object =>
  traverse(object, (value, key, node) => {
    if (isLateBinding(value)) {
      lazy(node, key, () => value(object))
    }
  })

const bindLate = object =>
  doBindLate(new Dumb(object))

module.exports = makeOverridable(bindLate)
module.exports.bindLate = bindLate
