const lazy = require('lazy-object').defineLazyProperty
const makeOverridable = require('make-overridable')
const traverse = require('traverse')

const isUnderscored = f => f.toString().substr(0, 12) === 'function (_)'
const isLateBinding = x => x instanceof Function && isUnderscored(x)

const bindLate = object =>
  traverse(object).forEach(function (value) {
    if (isLateBinding(value)) {
      lazy(this.parent.node, this.key, () => value(object))
    }
  })

module.exports = makeOverridable(bindLate)
module.exports.bindLate = bindLate
