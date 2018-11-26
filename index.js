let isPlainObject = require('lodash/isPlainObject')
let isArray = require('lodash/isArray')

function isPotentialAtom (obj) {
  return isPlainObject(obj) || isArray(obj)
}

module.exports = function atom (obj, fn) {
  if (obj && !isPotentialAtom(obj)) {
    throw new Error('Only plain objects and arrays can become atoms')
  }
  obj = obj || Object.create(null)

  let _atomCache = new Map()

  return new Proxy(obj, {
    get (obj, key) {
      let value = obj[key]
      if (isPotentialAtom(value)) {
        let _fn = (o, k, v) => fn(obj, `${key}.${k}`, v)
        let updatedCache = _atomCache.has(value)
          ? _atomCache
          : _atomCache.set(value, atom(value, _fn))
        return updatedCache.get(value)
      }
      return value
    },
    set (obj, key, value) {
      if (!(isArray(obj) && key === 'length')) {
        obj[key] = value
        fn(obj, key, value)
      }
      return true
    },
    deleteProperty (obj, key) {
      if (key in obj) {
        delete obj[key]
        fn(obj, key, undefined)
      }
      return true
    }
  })
}
