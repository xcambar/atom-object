/* eslint-env mocha */
const assert = require('assert')
const atom = require('./index')

describe('constructor', function () {
  it('only accepts objects or empty objects', function () {
    assert.ok(atom(), 'it works')
    assert.ok(atom({}), 'it works')
  })

  it('rejects other types', function () {
    assert.throws(() => atom('yay'))
    assert.throws(() => atom(true))
    assert.throws(() => atom(123))
  })

  it('returns an object', function () {
    assert.strictEqual(typeof atom(), 'object', 'the return value is an object')
  })
})

describe('reading property', function () {
  it('accesses values and properties', function () {
    let orig = { a: 123, b: { c: 'yay' } }
    let obj = atom(orig)
    assert.strictEqual(obj.a, 123)
    assert.strictEqual(obj.b.c, orig.b.c)
    assert.strictEqual(obj.d, undefined)
  })
})

describe('setting properties', function () {
  it('calls the function when a first-level property is changed', function () {
    let orig = { a: 123, b: { c: 'yay' } }
    let obj = atom(orig, function () {
      assert.ok(true, 'it has been called')
    })

    obj.d = 'youpi'
  })

  it('calls the function when a nth-level property is changed', function () {
    let orig = { a: 123, b: { c: { d: { e: [1, 2] } } } }
    let _c = 0
    let obj = atom(orig, function () {
      assert.ok(true, `it has been called ${++_c} times`)
    })

    obj.a = 'youpi'
    obj.b.d = 'youpi'
    obj.b.c.d.f = 'youpi'
    obj.b.c = false

    assert.ok(_c === 4, 'the number of calls is correct')
  })

  it('handles deletion of properties', function () {
    let orig = { a: 123, b: { c: true } }
    let _c = 0
    let obj = atom(orig, function () {
      assert.ok(true, `it has been called ${++_c} times`)
    })
    delete obj.a
    delete obj.b.c

    assert.ok(_c === 2, 'the number of calls is correct')
  })

  it('handles operations on arrays', function () {
    let orig = { b: { c: [1, 2] } }
    let _c = 0
    let obj = atom(orig, function () {
      assert.ok(true, `it has been called ${++_c} times`)
    })
    obj.b.c.push(5)
    assert.strictEqual(obj.b.c.length, 3)

    assert.ok(_c === 1, 'the number of calls is correct')
  })
})
