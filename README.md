# Atom Objects

Javascript being Javascript, it's very hard to get notifications when a nested property of an object is altered.

This library provides with a small interface to help developers deal with nested objects and their many updates.

## Before and after

```
// before
let state = { greeting: { standard: "hello" } }
state.greeting.standard = "hi"
// With basic constructs, how do you get to know, just by looking at `state`
// that it has been updated? You can't.
```

```
// now
let callback = function(obj, key, value) {
  console.log(`Update on key ${key} with value ${value}`)
}
let state = atom({ greeting: { standard: "hello" } }, callback)
state.greeting.standard = "hi"
// logs "Update on key greeting.standard with value hi"
```

With the `atom` implementation, every update, at every nested level, calls the callback so that the program
can act upon state updates accordingly.

## Compatibility

⚠️ This library uses `Proxy`, which is already available is most major browsers **except IE11**.

If you need IE11 support, this library is not for you.

# Usage

## Install

`$ npm install atom-object` (adapt accordingly if you're using yarn)

## Testing

* Clone the project
* `npm install` (or `yarn install`)
* `npm test` (or `yarn test`)

## Contributing

PRs are more than welcome, especially if they come up with new tests
to validate the changes.

## License

MIT
