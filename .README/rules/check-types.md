### `check-types`

Reports invalid types.

By default, ensures that the casing of native types is the same as in this list:

```
undefined
null
boolean
number
string
object
Array
Function
Date
RegExp
```

#### Options

`check-types` allows one option:

- An option object:
  - with the key `noDefaults` to insist that only the supplied option type
    map is to be used, and that the default preferences (such as "string"
    over "String") will not be enforced.
  - with the key `unifyParentAndChildTypeChecks` to treat
    `settings.jsdoc.preferredTypes` keys the same whether they are of the form
    `SomeType` or `SomeType<>`. If this is `false` or unset, the former
    will only apply to types which are not parent types/unions whereas the
    latter will only apply for parent types/unions.

See also the documentation on `settings.jsdoc.preferredTypes` which impacts
the behavior of `check-types`.



#### Why not capital case everything?

Why are `boolean`, `number` and `string` exempt from starting with a capital letter? Let's take `string` as an example. In Javascript, everything is an object. The string Object has prototypes for string functions such as `.toUpperCase()`.

Fortunately we don't have to write `new String()` everywhere in our code. Javascript will automatically wrap string primitives into string Objects when we're applying a string function to a string primitive. This way the memory footprint is a tiny little bit smaller, and the [GC](https://en.wikipedia.org/wiki/Garbage_collection_(computer_science)) has less work to do.

So in a sense, there two types of strings in Javascript; `{string}` literals, also called primitives and `{String}` Objects. We use the primitives because it's easier to write and uses less memory. `{String}` and `{string}` are technically both valid, but they are not the same.

```js
new String('lard') // String {0: "l", 1: "a", 2: "r", 3: "d", length: 4}
'lard' // "lard"
new String('lard') === 'lard' // false
```

To make things more confusing, there are also object literals and object Objects. But object literals are still static Objects and object Objects are instantiated Objects. So an object primitive is still an object Object.

However, `Object.create(null)` objects are not `instanceof Object`, however, so
in the case of this Object we lower-case to indicate possible support for
these objects.

Basically, for primitives, we want to define the type as a primitive, because that's what we use in 99.9% of cases. For everything else, we use the type rather than the primitive. Otherwise it would all just be `{object}`.

In short: It's not about consistency, rather about the 99.9% use case. (And some
functions might not even support the objects if they are checking for identity.)

type name | `typeof` | check-types | testcase
--|--|--|--
**Array** | object | **Array** | `([]) instanceof Array` -> `true`
**Function** | function | **function** | `(function f () {}) instanceof Function` -> `true`
**Date** | object | **Date** | `(new Date()) instanceof Date` -> `true`
**RegExp** | object | **RegExp** | `(new RegExp(/.+/)) instanceof RegExp` -> `true`
Object | **object** | **object** | `({}) instanceof Object` -> `true` but `Object.create(null) instanceof Object` -> `false`
Boolean | **boolean** | **boolean** | `(true) instanceof Boolean` -> **`false`**
Number | **number** | **number** | `(41) instanceof Number` -> **`false`**
String | **string** | **string** | `("test") instanceof String` -> **`false`**

|||
|---|---|
|Context|`ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`|
|Tags|`class`, `constant`, `enum`, `implements`, `member`, `module`, `namespace`, `param`, `property`, `returns`, `throws`, `type`, `typedef`, `yields`|
|Aliases|`constructor`, `const`, `var`, `arg`, `argument`, `prop`, `return`, `exception`|
|Closure-only|`package`, `private`, `protected`, `public`, `static`|
|Options|`noDefaults`, `unifyParentAndChildTypeChecks`|
|Settings|`preferredTypes`|

<!-- assertions checkTypes -->
