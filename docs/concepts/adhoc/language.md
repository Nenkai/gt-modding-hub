# Adhoc Language

!!! note

    This page is taken from GTAdhocToolchain's [wiki](https://github.com/Nenkai/GTAdhocToolchain/wiki).
    
    Assume we are starting from Javascript/Python, which is the closest to adhoc.

Most of the syntax has been figured out from (in order of advancements):

* Adhoc bytecode itself, which is pretty verbose
* [GTS Closed Beta](https://nenkai.github.io/gt-modding-hub/builds/gt7sp/#gt-sport-closed-beta-test-version), which had some leftover tinyweb scripts in source form
* GT Sport scripts, which had various asserts, by that point most of the language was figured out
* GT7, which has an adhoc compiler (albeit without its accompanying preprocessor), which helped figure out most if not all of the rest of the language such as list assignments. [Notes here](https://github.com/Nenkai/GTAdhocToolchain/blob/master/docs/GT7CompilerReverseEngineeringNotes.txt).

## Basic Things

Things you would expect but will mention just to be sure, the following trivial statements/expressions are allowed:

* Variables, only with the `var` keyword
* Bool literals
* Number literals (hex, binary, octal also supported, essentially the majority of the the [javascript spec](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Numbers_and_strings))
* `if`/`else if`/`else` statements
* Loop statements (`for`, `while`, `do` ... `while`) with `continue` or `break`
* Switch statements (with `case`/`default`)
* Arrays with `[]`
* Binary operators (`+`, `-`, `/`, `%`, `*`) and `**` (pow)
* Bitwise operators (`^`, `&`, `|`, `>>`, `<<`, etc)
* Unary operators (`!`, `~`, `-`, `+`, `++<variable>`, `<variable>++`, `<variable>--`, `--<variable>`)
* Logical operators (`||`, `&&`)
* Strings, essentially the majority of the [javascript spec](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Numbers_and_strings)

## Nulls: `null` = `nil`
Every dereferenced value is a `nil`, instead of a `null`.

So always check for `nil`.
```js
if (myVariable == nil)
    return;
```

## Modules, Classes, Attributes and Statics

### Modules & Statics
Modules have a completely different meaning in Adhoc. Think of them as C++ namespaces, they can be navigated to.

Classes also exist, and are used to *define* types that inherit from a base adhoc object.

Either of them supports functions **and** methods.

Methods are members of a class and requires an instance to be called. Functions are static.

```js
module MyModule
{
   function myFunction() { ... }
   method myMethod() { ... } // Note the keyword 'method'
}
```

For static variables, the keyword `static` is used. They are accessed in a C++ namespace manner, or through `[]` indexing:
```java
module StaticModule
{
  static PI = 3.14;
}

// Access static field
var pi = StaticModule::PI;

// Access a static field by name
var pi = StaticModule["PI"];

// Navigating through engine modules to call a function
pdistd::MPjson::Encode(/* ... */);
```

If you need to use something from the global modules/top-level and ignore current module scope, you can use the `::` operator prefix (similar to C++'s [scope resolution operator](https://learn.microsoft.com/en-us/cpp/cpp/scope-resolution-operator)):
```js
static x = 1;

function test_func()
{
    var x = 2;
    print ::x; // would print 1
}
```

### Attributes
Properties are called attributes in adhoc. They are defined with the `attribute` keyword, just like how you would declare a `var` or `static`.

* Without value: `attribute myAttribute` - Will be defaulted to `nil`
* With value: `attribute myAttribute = []`

!!! note

    Attributes with values are only supported in Adhoc Version 7 and above.

```java
class Dog
{
   attribute name;
}
```

Attributes can also be defined in modules.

### Class Constructors
Class constructors are defined with the `__init__` method identifier.
Local attributes are accessed using the `self` keyword.

```java
class Dog
{
   attribute name;
   
   method __init__(name)
   {
      self.name = name;
   }
}

var obj = MyObject("FooBar");
```

To access an attribute:
```js
var name = obj.name;
```

### Class Inheritance

The `:` token instead of `extends` in Javascript or Java.
```java
class BetterObject
{
  ...
}

class EvenBetterObject : BetterObject
{
 ...
}
```

### Module Constructors

!!! note

    Adhoc Version 12 and above, but only starting from GT6.

Module constructors are completely new in Adhoc. They are very rarely used, but these are mostly used for initializing UI widgets with user data or with UI method events.
They allow defining a constructor for any object that will run once the UI system sees a new object registered (i.e `appendChild` onto a composite)
```js
var myObject = someWidget.doCopy();
module (myObject)
{
   attribute myAttr;
   
   method onCancel()
   {
      // ...
   }
}

myObject.myAttr; // ❌ myAttr is not yet defined!
```

## Strings & Interpolation
There is only one type of string declaration, quotes.
```js
var str = "Hello world!";
var combinedStrings = "hello"
                      "world!";

var interpolated = "hello, %{name}!"; // Notice %, instead of $ in javascript.

// Multi-line strings with interpolation is also supported and will be automatically concatenated.
var interpolatedWith = "hello"
                       "world! "
                       "My name is %{name}!";
```

### Raw Strings

Adhoc supports C's [Raw String Literals](https://en.cppreference.com/w/cpp/language/string_literal.html).


!!! warn

    The toolchain does not support these yet.

```cpp
// equivalent to "\\n\\n\\n\\n"
var str = R"(\n\n\n\n)";

## Maps

!!! note

    Adhoc Version 11 and above.

Maps are Key/Value collections, similar to javascript's map or C#'s dictionaries. Adhoc supports them natively.

```js
var myMap = Map();
var myMap2 = [:]; // Shortcut to creation
var myMapWithElements = ["MyKey":"MyValue", "MyKey2": "MyValue2"]; // Creation with 2 pairs

myMap["hello"] = "world!";
myMap.getMapCount(); // 1
myMapWithElements.getMapCount(); // 2
```

## List Assignments (array/map deconstruction)
Adhoc has a neat new feature where arrays can be deconstructed into variables directly.

The `|` syntax is used.

```js
|var one, var two| = [1, 2];
// one = 1, two = 2
```

You can also assign into existing variables, module paths, or attributes:
```js
attribute myAttribute;
static MyModule
{
    static MyStatic;
}

|myAttrbibute, MyModule::MyStatic| = [1, 2];
```

This syntax also supports nested deconstruction using the `{` and `}` syntax within a list assignment (not ever used by the games, but it exists):
```js
|var one, {var two, var three}| = [1, [2, 3]];
// one = 1, two = 2, three = 3
```

You can also deconstruct one or multiple elements of an array, and the rest of the array into another variable, using the rest `...` syntax:
```js
|var one, var two...| = [1, 2, 3];
// one = 1, two = [2, 3]
```

### In Functions
This syntax is also supported in functions. If you define a function as:
```js
function myFunction({one, two})
{

}
```

And then call it as:
```js
myFunction([1, 2]);
```
`a` and `b` will be defined as variables of the function and can be used right away.

Note that the rest syntax `...` is still supported here.

## Labeled Loop Statements

[Like Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/label), Adhoc supports labeled statements. It is only supported on loop statements: `for`, `foreach`, `while` and `do..while`.

It is used as a better replacement to the [goto](https://en.wikipedia.org/wiki/Goto) keyword in C.

```js
main_loop: for(;;)
{
    for (var i = 0; i < 5; i++)
    {
        if (shouldExitCompletely)
            break main_loop;

        if (shouldContinueMainLoop)
            continue main_loop;
    }
}
```

## Foreach

!!! note

    Adhoc version 11 and above.

Adhoc supports `foreach` clauses.
```csharp
var arr = ["one", "two", "three"];
var combined;
foreach (var i in arr)
  combined += i + " ";

// combined = "one two three "
```

You can also deconstruct arrays/maps in a foreach using the previously mentioned list assignment:
```js
var map = ["Name": "Bob", "Age": 18];
foreach (|var key, var value| in map) // list assignment/deconstruction
{
    // ...
}
```

## Native Number Types

By default, number literals are integers, aka `Int`.

You can define various different types of number literals:
```js
var myInt = 1; // or Int(1);
var myUint = 1u; // or UInt(1), 1U
var myLong = 1l; // or Long(1), 1L
var myULong = 1ul; // or ULong(1), 1UL
var myFloat = 1.0; // or Float(1)
var myDouble = 1.0d; // or Double(1), 1.0D
var myByte = Byte(1); // signed byte
var myUByte = UByte(1);
var myShort = Short(1);
var myUShort = UShort(1);
```

`UInt`, `Long`, `ULong`, `Double` respectively are all natively built-in types starting from GT PSP Adhoc ontop of `Bool`, `Int`, `Float`.

!!! tip

    If you declare a number trivially that will not fit in a `Int`, it will be promoted to the larger integer size, i.e `10000000000` will be compiled as a `Long`.

## Imports
Imports are mostly used python-like.
```java
import main::*; // Imports/copies all modules from the specified module into the current one.
import myModule::myFunction; // Imports/copies a static/function into the current one.
import myModule::myStatic as obj; // Imports a static into an object.
```

## Preprocessor

Adhoc is closer to C in that regard, as it supports a preprocessor out of the box.

### Includes

C-type includes are supported.
```c
#include "projects/gt6/my_project/myinclude.ad"
```

### Defines/Macros
```c
// Trivial define
#define PI 3.14

// Macro
#define ADD(x,y) (x+y)
var val = ADD(5, 6)

// Multi-line macro
#define HELLO_WORLD() "hello" \
                      "world";
```

NOTE: Token concatenation `##` is not supported on this toolchain's preprocessor yet.

!!! note

    A list of builtin defines is available [here](https://github.com/Nenkai/GTAdhocToolchain/wiki/Builtin-Macros).

### Conditions
`#if`, `#ifdef`, `#elseif`, `#else`, `#endif` are supported.
```js
#ifdef DEBUG
  ...
#endif
```

## Function Gotchas

### Default function values

!!! note

    Adhoc version 7 and above.

```js
function myFunction(a = 5) 
{

}
```

### Captured Variables

Variables outside function expressions are captured.
```js
var myVariable = 0;
var myFunc = function (){
  return myVariable + 100;
}
```

### Arrow Functions

!!! warning

    **Arrow functions are not supported**, presumably for consistency. Always declare a function with the `function` keyword, and curly brackets.

### Rest Parameters

!!! note

    Adhoc version 7 and above.

Identical to javascript except the syntax is swapped around.
```js
function myFunction(args...) // Not ...args!
{
    ...
}
```

## Code allowed everywhere
Top level, in module or class bodies, code is allowed everywhere.

```js
module MyModule
{
    static myStaticArray = [];
    myStaticArray.push("hello world");
}
```

Module extensions are also allowed within function themselves.
```js
function myFunction()
{
    module main
    {
        // Anything put here will be part of the "main" module.
        // Declaring a static variable will make it belong to the "main" module.
    }
}
```

## Undefs
Undefs let you undefine functions or static symbols. Very rarely used.

```js
function myFunction()
{
   ...
}

undef myFunction; // "myFunction" is undefined, now nil if called.
```

## Operator Overloading
Adhoc supports fully overloading operators. Very rarely used, but supported.

```java
class OperatorOverloadClassTest
{
    attribute value = "";
    
    method __init__(val)
    {
        self.value = val;
    }

    method __add__(val) // Needs to be the internal label for a designated operator, in this case, __add__ = +
    {
       return OperatorOverloadClassTest(value + val);
    }
}
var obj = MyOperatorOverloadingClass();
obj += "hello world!";
// obj.value is now "hello world!"
```

List of operators & their names for overriding:

| Internal Name | Operator |
|---------------|----------|
| Constructor | `__init__` |
| Object Creation |  `__new__` |
| Super (?) | `__super__` |
| `()` (call) | `__call__`| 
| Finalizer | `__fini__` |
| `[]` (getter) | `__get_attr__` |
| `[]` (setter) | `__set_attr__` |
| `+` | `__add__`|
| `-` | `__sub__`|
| `*` | `__mul__`|
| `/` | `__div__`|
| `%` | `__mod__`|
| `**` | `__pow__`|
| `~` | `__invert__`|
| `&` | `__and__`|
| `\|` | `__or__` |
| `^` | `__xor__`|
| `@++` | `__post_incr__`|
| `@--` | `__post_decr__`|
| `++@` | `__pre_incr__`|
| `--@` | `__pre_decr__`|
| `==` | `__eq__`|
| `!=` | `__ne__`|
| `>=` | `__ge__`|
| `<=` | `__le__`|
| `<` | `__lt__`|
| `!` | `__not__`|
| `<<` | `__lshift__`|
| `>>` | `__rshift__`|
| `-@` | `__uminus__`|
| `+@` | `__uplus__`|

Maybe `__prototype__`, `__module__`, `__method__` based on GT7?

## Static Scopes
Static fields can be accessed from any module or class depth.

```js
module RootModule
{
  static sStaticField;

  module ChildModule
  {
    function setParentField()
    {
      sStaticfield = "hello world!";
    }
  }
}
```

## Async/Await

!!! note

    GT6 and above.

```js
async function myAsyncFunction() // Must mark as async
{
  var result = await getObject();
}
```

## Finalizer Statements
Finalizer statements allows running code once the current module is finalized/cleaned up. Rarely used.

```js
function func(context)
{
  CursorUtil::setCursor(context, "wait"); // Set cursor to waiting mode
  finally
  {
      // This will be executed once the module is finalized.
      // It will not execute immediately.
      CursorUtil::setCursor(context, "cursor_chrome");
  } 
}
```

It is also possible to clear an object's finalizer using the following syntax:

```js
finally my_object;
```

## Yield Statements
Mostly unknown, may be similar to unity's yield statement where the runtime waits for the next frame.

```js
function func(context)
{
  yield;
}
```

A value can also be passed to it (though purpose unknown):
```js
function func(context)
{
  yield 1;
}
```

## Requires
Requires allows importing all contents of a script onto the current one.
```js
require "MyScript.adc"
```

## Symbols
Similar to [Javascript's Symbols](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol), they are defined with single quotes.
```js
var symbol = 'my cool symbol';
```
## Variadic Function calls
Calling functions with their arguments being represented by an array can be called using the `call()` keyword:
```js
function sum(arg1, arg2)
{
   return arg1 + arg2;
}

// call(func, argument array) - NOTE: function or method must be script defined.
call(sum, [9, 10]); // 21
```

## Identifier Literals
Identifier literals allow defining identifiers with normally illegal characters incase you have to.

Mostly used for generated code. GT7's `DumpBuiltinModule` function uses this for instance.

```js
var `my totally valid identifier` = "hello world";

module `my module`
{

}
```

## Delegates

!!! note

    GT Sport and above.

```cs
function myFunc()
{
    return "hello world";
}

delegate myDelegate; // It is not possible to directly assign a function to a delegate
myDelegate = myFunc; // This will not override myDelegate with a function, rather assign a function to the delegate
return myDelegate(); // "hello world"
```

## Pass by reference
```c
function getXY(x_ref, y_ref) // Common practice is to add the `_ref` suffix OR (less common) `ref_` prefix.
{
   *x_ref = 1;
   *y_ref = 1;
}

var x, y;
getXY(&x, &y);

// x = 1, y = 1
```

Note that you can also pass attributes/statics i.e `&myobject.myattr` or even array elements i.e `&MyArray[0]`.

## Object Selectors

This feature seems to allow calling grabbing method/attribute references using the `.*` operator.

`scripts/gt5/UsedCarList.ad`

```js
method __get_elem__(i)
{
    return self.*attr_map[i];
}

method __set_elem__(i, val)
{
    self.*attr_map[i] = val;
}
```

`projects/gt5/arcade/CarRoot.ad`
```js
var delay_load_complete = method(context)
{
    self.Info::FadeEffect.start();
}

self.Info::tuner_logo.on_delay_load_complete = *self.*delay_load_complete;
```

## Pragmas

!!! warn

    The toolchain does not support these yet.

### `@include "<file_name>"`

Includes and compiles a specified source file into the current body.

```c
@include "test.ad";
// contents of test.ad is compiled into the current body
// test.ad is the root of the game volume contents (unless /APP_DATA or other mount points are used)
```

### `@exec { <code> }`

Executes adhoc code at compile time.
```c
@exec {
  // .. code that will be compiled at compile time
};
```

### `@use_strict`/`@no_strict`

Whether to use strict mode.

### `@push_strict <int/bool>`

Pushes a strict mode (mainly variable redeclaration checking)

### `@pop_strict`

Pops the current strict mode
```c
@pop_strict;
```

### `@undef <variable>`

Undefines any variable (compile-time)
```c
var i = 5;
@undef i
// i is now undefined, no extra instructions emitted
```

### `@import <module_path/*> [as <alias>];`

Compile time import.

### `@current_module <module_path>`

Sets the current module from the specified module path.

### `@dump <variable>`

Dumps/evaluates a variable and compiles it into the current body.

Compatible with just about any variable type including functions. Only exception is builtins modules.

```c
var i = 5;
@dump i
// Compiled script will evaluate i.
```
 
### `@<variable_type> <name>`

Defines a new variable. Valid types are:

* `@attribute`
* `@static`
* `@delegate`
* `@function`
* `@method`
* `@module`
* `@class`

## Optional Syntax

!!! note

    GT Sport and above.

GT Sport introduced the `JUMP_IF_NIL` and `LOGICAL_OPTIONAL` instructions, which implements the [Optional Chaining](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining) and [Nullish Coalescing](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing) features in adhoc.

```js
var myAttributeValue = myObject?.myAttribute;
if (myAttributeValue == nil)
    return;
```

Also works with arrays and object selectors:
```
var myValue = myObject?.*myVariable;
var myValue2 = myObject?["myAttributeName"];
```

Nullish coalescing works the same.
```js
var myValue = myString ?? "default";
```

## Not supported from javascript
* Anything modern ECMAScript-ish features (arguably not needed).
* `let`, `const` keywords are not implemented.
* `for..in` and `for..of` are replaced by the much more convenient `foreach`.
* `===`, `!==` operators
* Dynamic objects `var obj = {}`
* Everything else that hasn't been mentioned here.

