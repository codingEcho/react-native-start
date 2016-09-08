

# ECMAScript 6

**完全来源于[阮一峰 ECMAScript 6入门](http://es6.ruanyifeng.com/#docs/module)**

## 1. let 和 const

### let

let所声明的变量，只在`let`命令所在的代码块内有效。

```javascript
{
  let a = 10;
  var b = 1;
}

a // ReferenceError: a is not defined.
b // 1
```

#### 不存在变量提升

```javascript
console.log(foo); // 输出undefined
console.log(bar); // 报错ReferenceError

var foo = 2;
let bar = 2;
```

#### 暂时性死区

只要块级作用域内存在`let`命令，它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响。

```javascript
if (true) {
  // TDZ开始
  tmp = 'abc'; // ReferenceError
  console.log(tmp); // ReferenceError

  let tmp; // TDZ结束
  console.log(tmp); // undefined

  tmp = 123;
  console.log(tmp); // 123
}
```

#### 不允许重复声明

```javascript
// 报错
function () {
  let a = 10;
  var a = 1;
}

// 报错
function () {
  let a = 10;
  let a = 1;
}
```

#### 块级作用域（{}）

```javascript
// IIFE写法
(function () {
  var tmp = ...;
  ...
}());

// 块级作用域写法
{
  let tmp = ...;
  ...
}
```

## const

`const` 声明一个**只读**常量一旦声明，常量的值就不能改变。

```javascript
const PI = 3.1415;
PI // 3.1415

PI = 3;
// TypeError: Assignment to constant variable.

const foo;
// SyntaxError: Missing initializer in const declaration

/**
 * 服务器开关
 * @type {boolean}
 */
const IsDebug = true;
/**
 * 生产服务器
 * @type {string}
 */
const PRODUCTION_HOST = 'www.scso.com';
/**
 * 测试服务器
 * @type {string}
 */
const PRODUCTION_HOST = '192.168.2.100';
/**
 * HTTP协议
 * @type {string}
 */
const HTTP = 'http://';
/**
 * 基本请求路径
 * @type {string}
 */
const BASE_URL = HTTP + (IsDebug ? TEST_HOST : PRODUCTION_HOST) + '/';

/* 不要这样写(这里存在块级作用域) */
if (IsDebug) {
  const BASE_URL = HTTP + TEST_HOST  + '/';
}

BASE_URL // Uncaught ReferenceError: BASE_URL is not defined
```



**const 声明对象和数组**

```javascript
// 声明对象
const foo = {};
foo.prop = 123;

foo.prop
// 123

foo = {}; // TypeError: "foo" is read-only
// 声明数组
const a = [];
a.push('Hello'); // 可执行
a.length = 0;    // 可执行
a = ['Dave'];    // 报错
```



## 变量的解构赋值

### 数组的解构赋值

ES6允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构（Destructuring）。

```javascript
var [a, b, c] = [1, 2, 3];
a // 1
b // 2
c // 3

let [foo, [[bar], baz]] = [1, [[2], 3]];
foo // 1
bar // 2
baz // 3

let [ , , third] = ["foo", "bar", "baz"];
third // "baz"

let [x, , y] = [1, 2, 3];
x // 1
y // 3

/* 延展符 */
let [head, ...tail] = [1, 2, 3, 4];
head // 1
tail // [2, 3, 4]

let [x, y, ...z] = ['a'];
x // "a"
y // undefined
z // []

/* 不完全解构 */
let [x, y] = [1, 2, 3];
x // 1
y // 2

let [a, [b], d] = [1, [2, 3], 4];
a // 1
b // 2
d // 4

/* 如果等号的右边不是数组（或者严格地说，不是可遍历的结构），那么将会报错。*/
// 报错
let [foo] = 1;
let [foo] = false;
let [foo] = NaN;
let [foo] = undefined;
let [foo] = null;
let [foo] = {};
```

#### 默认值

```javascript
let [x = 1, y = x] = [];     // x=1; y=1
let [x = 1, y = x] = [2];    // x=2; y=2
let [x = 1, y = x] = [1, 2]; // x=1; y=2
let [x = y, y = 1] = [];     // ReferenceErro
```

### 对象的解构赋值

数组按照下标索引进行匹配，对象按照名称进行匹配。

```javascript
var { foo, bar } = { foo: "aaa", bar: "bbb" };
foo // "aaa"
bar // "bbb"
// 等价于
var obj = {foo: "aaa", bar: "bbb"};
var foo = obj.foo;
var bar = obj.bar;

// 无序
var { name, age } = { age: 16, name: "Jane" };
name // Jane
age // 16

// 按照名称匹配
var { baz } = { foo: "aaa", bar: "bbb" };
baz // undefined
```

如果变量名与属性名不一致，必须写成下面这样：

```javascript
var { foo: baz } = { foo: 'aaa', bar: 'bbb' };
baz // "aaa"
foo // error: foo is not defined

let obj = { first: 'hello', last: 'world' };
let { first: f, last: l } = obj;
f // 'hello'
l // 'world'

// demo
var { id: studentId, name: studentName } = { id:'36',name:'武鸣'};
var { id: teacherId, name: teacherName } = { id:'36',name:'陈老师'};
// 新的变量名更具有语意性，不容易混淆
console.log('学生：',studentId,'#',studentName);
console.log('老师：',teacherId,'#',teacherName);

/* 错误的写法 */
let foo;
let {foo} = {foo: 1}; // SyntaxError: Duplicate declaration "foo"

let baz;
let {bar: baz} = {bar: 1}; // SyntaxError: Duplicate declaration "baz"
```

```javascript
var obj = {
  p: [
    'Hello',
    { y: 'World' }
  ]
};

var { p: [x, { y }] } = obj;
x // "Hello"
y // "World"
```

#### 对象结构赋值的默认值

```javascript
var {x = 3} = {};
x // 3

var {x, y = 5} = {x: 1};
x // 1
y // 5

var {x:y = 3} = {};
y // 3

var {x:y = 3} = {x: 5};
y // 5

var { message: msg = 'Something went wrong' } = {};
msg // "Something went wrong"

// 默认值生效的条件是，对象的属性值严格等于undefined。
var {x = 3} = {x: undefined};
x // 3

var {x = 3} = {x: null};
x // null
```

### 字符串的结构赋值

默认值生效的条件是，对象的属性值严格等于`undefined`。

```javascript
const [a, b, c, d, e] = 'hello';
a // "h"
b // "e"
c // "l"
d // "l"
e // "o"

let {length : len} = 'hello';
len // 5
```

### 数值和布尔值的解构赋值

```javascript
let {toString: s} = 123;
s === Number.prototype.toString // true

let {toString: s} = true;
s === Boolean.prototype.toString // true

// 说明：数值和布尔值的包装对象都有toString属性，因此变量s都能取到值
```

### 函数参数的解构赋值

```javascript
function move({x = 0, y = 0} = {}) {
  return [x, y];
}

move({x: 3, y: 8}); // [3, 8]
move({x: 3}); // [3, 0]
move({}); // [0, 0]
move(); // [0, 0]

[[1, 2], [3, 4]].map(([a, b]) => a + b);
// [ 3, 7 ]

// 注意，下面的写法会得到不一样的结果。

function move({x, y} = { x: 0, y: 0 }) {
  return [x, y];
}

move({x: 3, y: 8}); // [3, 8]
move({x: 3}); // [3, undefined]
move({}); // [undefined, undefined]
move(); // [0, 0]

// 上面代码是为函数move的参数指定默认值，而不是为变量x和y指定默认值，所以会得到与前一种写法不同的结果。


```

### 用途

变量的解构赋值用途很多。

**（1）交换变量的值**

```javascript
[x, y] = [y, x];
```

上面代码交换变量`x`和`y`的值，这样的写法不仅简洁，而且易读，语义非常清晰。

**（2）从函数返回多个值**

函数只能返回一个值，如果要返回多个值，只能将它们放在数组或对象里返回。有了解构赋值，取出这些值就非常方便。

```javascript
// 返回一个数组

function example() {
  return [1, 2, 3];
}
var [a, b, c] = example();

// 返回一个对象

function example() {
  return {
    foo: 1,
    bar: 2
  };
}
var { foo, bar } = example();
```

**（3）函数参数的定义**

解构赋值可以方便地将一组参数与变量名对应起来。

```javascript
// 参数是一组有次序的值
function f([x, y, z]) { ... }
f([1, 2, 3]);

// 参数是一组无次序的值
function f({x, y, z}) { ... }
f({z: 3, y: 2, x: 1});
```

**（4）提取JSON数据**

解构赋值对提取JSON对象中的数据，尤其有用。

```javascript
var jsonData = {
  id: 42,
  status: "OK",
  data: [867, 5309]
};

let { id, status, data: number } = jsonData;

console.log(id, status, number);
// 42, "OK", [867, 5309]
```

上面代码可以快速提取JSON数据的值。

**（5）函数参数的默认值**

```javascript
jQuery.ajax = function (url, {
  async = true,
  beforeSend = function () {},
  cache = true,
  complete = function () {},
  crossDomain = false,
  global = true,
  // ... more config
}) {
  // ... do stuff
};
```

指定参数的默认值，就避免了在函数体内部再写`var foo = config.foo || 'default foo';`这样的语句。

**（6）遍历Map结构**

任何部署了Iterator接口的对象，都可以用`for...of`循环遍历。Map结构原生支持Iterator接口，配合变量的解构赋值，获取键名和键值就非常方便。

```javascript
var map = new Map();
map.set('first', 'hello');
map.set('second', 'world');

for (let [key, value] of map) {
  console.log(key + " is " + value);
}
// first is hello
// second is world
```

如果只想获取键名，或者只想获取键值，可以写成下面这样。

```javascript
// 获取键名
for (let [key] of map) {
  // ...
}

// 获取键值
for (let [,value] of map) {
  // ...
}
```

**（7）输入模块的指定方法**

加载模块时，往往需要指定输入那些方法。解构赋值使得输入语句非常清晰。

```javascript
const { SourceMapConsumer, SourceNode } = require("source-map");
```



**React Native 的使用示例**

```javascript
// require
const { StyleSheet,Navigator } = require('react-native');
// import from
import { StyleSheet,Navigator } from 'react-native';
```

## 字符串的扩展

1. [字符的Unicode表示法](http://es6.ruanyifeng.com/#docs/string#字符的Unicode表示法)
2. [codePointAt()](http://es6.ruanyifeng.com/#docs/string#codePointAt())
3. [String.fromCodePoint()](http://es6.ruanyifeng.com/#docs/string#String.fromCodePoint())
4. [字符串的遍历器接口](http://es6.ruanyifeng.com/#docs/string#字符串的遍历器接口)
5. [at()](http://es6.ruanyifeng.com/#docs/string#at())
6. [normalize()](http://es6.ruanyifeng.com/#docs/string#normalize())
7. [includes(), startsWith(), endsWith()](http://es6.ruanyifeng.com/#docs/string#includes(), startsWith(), endsWith())
8. [repeat()](http://es6.ruanyifeng.com/#docs/string#repeat())
9. [padStart()，padEnd()](http://es6.ruanyifeng.com/#docs/string#padStart()，padEnd())
10. [模板字符串](http://es6.ruanyifeng.com/#docs/string#模板字符串)
11. [实例：模板编译](http://es6.ruanyifeng.com/#docs/string#实例：模板编译)
12. [标签模板](http://es6.ruanyifeng.com/#docs/string#标签模板)
13. [String.raw()](http://es6.ruanyifeng.com/#docs/string#String.raw())



### 字符串的遍历器接口

```javascript
for (let codePoint of 'foo') {
  console.log(codePoint)
}
// "f"
// "o"
// "o"
```

### includes(), startsWith(), endsWith()

- **includes()**：返回布尔值，表示是否找到了参数字符串。
- **startsWith()**：返回布尔值，表示参数字符串是否在源字符串的头部。
- **endsWith()**：返回布尔值，表示参数字符串是否在源字符串的尾部。

```javascript
var s = 'Hello world!';

s.startsWith('Hello') // true
s.endsWith('!') // true
s.includes('o') // true
// 这三个方法都支持第二个参数，表示开始搜索的位置。
var s = 'Hello world!';
// 从下标6(w)开始查找
s.startsWith('world', 6) // true
// 只查找前5个
s.endsWith('Hello', 5) // true
// 从下标6(w)开始查找
s.includes('Hello', 6) // false
```

### repeat()

重复某个字符

```javascript
'鹅'.repeat(3) // "鹅鹅鹅"
'hello'.repeat(2) // "hellohello"
'na'.repeat(0) // ""
// 小数，取整
//'na'.repeat(2.9) // "nana"

```

### padStart(),padEnd()

如果某个字符串不够指定长度，会在头部或尾部补全。`padStart`用于头部补全，`padEnd`用于尾部补全。

```javascript
'x'.padStart(5, 'ab') // 'ababx'
'x'.padStart(4, 'ab') // 'abax'

'x'.padEnd(5, 'ab') // 'xabab'
'x'.padEnd(4, 'ab') // 'xaba'
```

### 模板字符串

```javascript
// 普通字符串
`In JavaScript '\n' is a line-feed.`

// 多行字符串
`In JavaScript this is
 not legal.`

console.log(`string text line 1
string text line 2`);

// 字符串中嵌入变量
var name = "Bob", time = "today";
`Hello ${name}, how are you ${time}?`
```

## [正则的扩展](http://es6.ruanyifeng.com/#docs/regex)

##  数值（Number）的扩展

1. [二进制和八进制表示法](http://es6.ruanyifeng.com/#docs/number#二进制和八进制表示法)，ES6提供了二进制和八进制数值的新的写法，分别用前缀`0b`（或`0B`）和`0o`（或`0O`）表示。
2. [Number.isFinite(), Number.isNaN()](http://es6.ruanyifeng.com/#docs/number#Number.isFinite(), Number.isNaN())，`isFinite()`判断是否有限，`isNaN`判断是否为数值
3. [Number.parseInt(), Number.parseFloat()](http://es6.ruanyifeng.com/#docs/number#Number.parseInt(), Number.parseFloat())，ES6将全局方法`parseInt()`和`parseFloat()`，移植到Number对象上面，行为完全保持不变。
4. [Number.isInteger()](http://es6.ruanyifeng.com/#docs/number#Number.isInteger())，`Number.isInteger()`用来判断一个值是否为整数。需要注意的是，在JavaScript内部，整数和浮点数是同样的储存方法，所以3和3.0被视为同一个值。
5. [Number.EPSILON](http://es6.ruanyifeng.com/#docs/number#Number.EPSILON)，一个极小的常量
6. [安全整数和Number.isSafeInteger()](http://es6.ruanyifeng.com/#docs/number#安全整数和Number.isSafeInteger())
7. [Math对象的扩展](http://es6.ruanyifeng.com/#docs/number#Math对象的扩展)
8. [指数运算符](http://es6.ruanyifeng.com/#docs/number#指数运算符),新增了一个指数运算符（`**`）`var a=2**3; // 8`

## 数组的扩展

1. [Array.from()](http://es6.ruanyifeng.com/#docs/array#Array.from())
2. [Array.of()](http://es6.ruanyifeng.com/#docs/array#Array.of())
3. [数组实例的copyWithin()](http://es6.ruanyifeng.com/#docs/array#数组实例的copyWithin())
4. [数组实例的find()和findIndex()](http://es6.ruanyifeng.com/#docs/array#数组实例的find()和findIndex())
5. [数组实例的fill()](http://es6.ruanyifeng.com/#docs/array#数组实例的fill())
6. [数组实例的entries()，keys()和values()](http://es6.ruanyifeng.com/#docs/array#数组实例的entries()，keys()和values())
7. [数组实例的includes()](http://es6.ruanyifeng.com/#docs/array#数组实例的includes())
8. [数组的空位](http://es6.ruanyifeng.com/#docs/array#数组的空位)

### Array.from()

`Array.from`方法用于将两类对象转为真正的数组：类似数组的对象（array-like object）和可遍历（iterable）的对象（包括ES6新增的数据结构Set和Map）。

```java
// arguments对象
function foo() {
  var args = Array.from(arguments);
  // ...
}

// arguments对象
function foo() {
  var args = [...arguments];
}

Array.from('hello')
// ['h', 'e', 'l', 'l', 'o']

// 第二个参数，类似Map 
Array.from([1, 2, 3], (x) => x * x)
// [1, 4, 9]
```

### Array.of()

`Array.of`方法用于将一组值，转换为数组。

```javascript
Array.of(3, 11, 8) // [3,11,8]
Array.of(3) // [3]
Array.of(3).length // 1
```

###  数组实例的find()和findIndex()

```javascript
[1, 4, -5, 10].find((n) => n < 0)
// -5

[1, 5, 10, 15].find(function(value, index, arr) {
  return value > 9;
}) // 10
```

### 数组实例的entries()，keys()和values()

```javascript
for (let index of ['a', 'b'].keys()) {
  console.log(index);
}
// 0
// 1

for (let elem of ['a', 'b'].values()) {
  console.log(elem);
}
// 'a'
// 'b'

for (let [index, elem] of ['a', 'b'].entries()) {
  console.log(index, elem);
}
// 0 "a"
// 1 "b"
```

### 数组实例的includes()

```javascript
[1, 2, 3].includes(2);     // true
[1, 2, 3].includes(4);     // false
[1, 2, NaN].includes(NaN); // true

// 指定第二个参数从指定的下标索引开始查找
[1, 2, 3].includes(3, 3);  // false
[1, 2, 3].includes(3, -1); // true
```

## 函数的扩展

1. [函数参数的默认值](http://es6.ruanyifeng.com/#docs/function#函数参数的默认值)
2. [rest参数](http://es6.ruanyifeng.com/#docs/function#rest参数)
3. [扩展运算符](http://es6.ruanyifeng.com/#docs/function#扩展运算符)
4. [name属性](http://es6.ruanyifeng.com/#docs/function#name属性)
5. [箭头函数](http://es6.ruanyifeng.com/#docs/function#箭头函数)
6. [函数绑定](http://es6.ruanyifeng.com/#docs/function#函数绑定)
7. [尾调用优化](http://es6.ruanyifeng.com/#docs/function#尾调用优化)
8. [函数参数的尾逗号](http://es6.ruanyifeng.com/#docs/function#函数参数的尾逗号)

### 函数参数的默认值

```javascript
const TIME_OUT = 30*1000; // 30秒
function fetchRequest(url, params, method = 'POST', ms = TIME_OUT) {
        let requestBody = objectToQueryString(params),
            fetchOptions = {
                method: method,
                headers: REQUEST_HEADERS,
                body: requestBody,
            }, isOk, fetchPromise, timeoutPromise;

        timeoutPromise = new Promise(function (resolve, reject) {
            setTimeout(() => reject(new Response(2, ERROT_TYPE.timeout)), ms);
        });
}

function fetch(url, { params={},method = 'GET', ms = TIME_OUT } = {}) {
  console.log(method);
}

fetch('http://example.com');
```

**默认参数的位置应该是函数的尾参数**

## rest参数

```javascript
function add(...values) {
  let sum = 0;

  for (var val of values) {
    sum += val;
  }

  return sum;
}

add(2, 5, 3) // 10
```

```javascript
function push(array, ...items) {
  items.forEach(function(item) {
    array.push(item);
    console.log(item);
  });
}

var a = [];
push(a, 1, 2, 3)
```

注意，rest参数之后不能再有其他参数（即只能是最后一个参数），否则会报错。

```javascript
// 错误的写法
function(a,...b,c){
  
}
```

### 扩展运算符

扩展运算符（spread）是三个点（`...`）。它好比rest参数的逆运算，将一个数组转为用逗号分隔的参数序列。

```javascript
console.log(...[1, 2, 3])
// 1 2 3

console.log(1, ...[2, 3, 4], 5)
// 1 2 3 4 5

[...document.querySelectorAll('div')]
// [<div>, <div>, <div>]
```

该运算符主要用于函数调用。

```javascript
function push(array, ...items) {
  array.push(...items);
}

function add(x, y) {
  return x + y;
}

var numbers = [4, 38];
add(...numbers) // 42
```

### 扩展运算符的应用

**（1）合并数组**

扩展运算符提供了数组合并的新写法。

```javascript
// ES5
[1, 2].concat(more)
// ES6
[1, 2, ...more]

var arr1 = ['a', 'b'];
var arr2 = ['c'];
var arr3 = ['d', 'e'];

// ES5的合并数组
arr1.concat(arr2, arr3);
// [ 'a', 'b', 'c', 'd', 'e' ]

// ES6的合并数组
[...arr1, ...arr2, ...arr3]
// [ 'a', 'b', 'c', 'd', 'e' ]
```

**（2）与解构赋值结合**

扩展运算符可以与解构赋值结合起来，用于生成数组。

```javascript
// ES5
a = list[0], rest = list.slice(1)
// ES6
[a, ...rest] = list
```

下面是另外一些例子。

```javascript
const [first, ...rest] = [1, 2, 3, 4, 5];
first // 1
rest  // [2, 3, 4, 5]

const [first, ...rest] = [];
first // undefined
rest  // []:

const [first, ...rest] = ["foo"];
first  // "foo"
rest   // []
```

如果将扩展运算符用于数组赋值，只能放在参数的最后一位，否则会报错。

```javascript
const [...butLast, last] = [1, 2, 3, 4, 5];
// 报错

const [first, ...middle, last] = [1, 2, 3, 4, 5];
// 报错
```

**（3）函数的返回值**

JavaScript的函数只能返回一个值，如果需要返回多个值，只能返回数组或对象。扩展运算符提供了解决这个问题的一种变通方法。

```javascript
var dateFields = readDateFields(database);
var d = new Date(...dateFields);
```

上面代码从数据库取出一行数据，通过扩展运算符，直接将其传入构造函数`Date`。

**（4）字符串**

扩展运算符还可以将字符串转为真正的数组。

```javascript
[...'hello']
// [ "h", "e", "l", "l", "o" ]
```

上面的写法，有一个重要的好处，那就是能够正确识别32位的Unicode字符。

```javascript
'x\uD83D\uDE80y'.length // 4
[...'x\uD83D\uDE80y'].length // 3
```

上面代码的第一种写法，JavaScript会将32位Unicode字符，识别为2个字符，采用扩展运算符就没有这个问题。因此，正确返回字符串长度的函数，可以像下面这样写。

```javascript
function length(str) {
  return [...str].length;
}

length('x\uD83D\uDE80y') // 3
```

凡是涉及到操作32位Unicode字符的函数，都有这个问题。因此，最好都用扩展运算符改写。

```javascript
let str = 'x\uD83D\uDE80y';

str.split('').reverse().join('')
// 'y\uDE80\uD83Dx'

[...str].reverse().join('')
// 'y\uD83D\uDE80x'
```

上面代码中，如果不用扩展运算符，字符串的`reverse`操作就不正确。

**（5）实现了Iterator接口的对象**

任何Iterator接口的对象，都可以用扩展运算符转为真正的数组。

```javascript
var nodeList = document.querySelectorAll('div');
var array = [...nodeList];
```

上面代码中，`querySelectorAll`方法返回的是一个`nodeList`对象。它不是数组，而是一个类似数组的对象。这时，扩展运算符可以将其转为真正的数组，原因就在于`NodeList`对象实现了Iterator接口。

对于那些没有部署Iterator接口的类似数组的对象，扩展运算符就无法将其转为真正的数组。

```javascript
let arrayLike = {
  '0': 'a',
  '1': 'b',
  '2': 'c',
  length: 3
};

// TypeError: Cannot spread non-iterable object.
let arr = [...arrayLike];
```

上面代码中，`arrayLike`是一个类似数组的对象，但是没有部署Iterator接口，扩展运算符就会报错。这时，可以改为使用`Array.from`方法将`arrayLike`转为真正的数组。

**（6）Map和Set结构，Generator函数**

扩展运算符内部调用的是数据结构的Iterator接口，因此只要具有Iterator接口的对象，都可以使用扩展运算符，比如Map结构。

```javascript
let map = new Map([
  [1, 'one'],
  [2, 'two'],
  [3, 'three'],
]);

let arr = [...map.keys()]; // [1, 2, 3]
```

Generator函数运行后，返回一个遍历器对象，因此也可以使用扩展运算符。

```javascript
var go = function*(){
  yield 1;
  yield 2;
  yield 3;
};

[...go()] // [1, 2, 3]
```

上面代码中，变量`go`是一个Generator函数，执行后返回的是一个遍历器对象，对这个遍历器对象执行扩展运算符，就会将内部遍历得到的值，转为一个数组。

如果对没有`iterator`接口的对象，使用扩展运算符，将会报错。

```javascript
var obj = {a: 1, b: 2};
let arr = [...obj]; // TypeError: Cannot spread non-iterable object
```

### name 属性

获取函数的名字

### 箭头函数

ES6允许使用“箭头”（`=>`）定义函数。

```javascript
var f = v => v;
```

上面的箭头函数等同于：

```javascript
var f = function(v) {
  return v;
};
```

如果箭头函数不需要参数或需要多个参数，就使用一个圆括号代表参数部分。

```javascript
var f = () => 5;
// 等同于
var f = function () { return 5 };

var sum = (num1, num2) => num1 + num2;
// 等同于
var sum = function(num1, num2) {
  return num1 + num2;
};

// 箭头函数的一个用处是简化回调函数。

// 正常函数写法
[1,2,3].map(function (x) {
  return x * x;
});

// 箭头函数写法
[1,2,3].map(x => x * x);
另一个例子是

// 正常函数写法
var result = values.sort(function (a, b) {
  return a - b;
});

// 箭头函数写法
var result = values.sort((a, b) => a - b);
```

#### 使用注意点

箭头函数有几个使用注意点。

（1）函数体内的`this`对象，就是定义时所在的对象，而不是使用时所在的对象。

（2）不可以当作构造函数，也就是说，不可以使用`new`命令，否则会抛出一个错误。

（3）不可以使用`arguments`对象，该对象在函数体内不存在。如果要用，可以用Rest参数代替。

（4）不可以使用`yield`命令，因此箭头函数不能用作Generator函数。

## 函数绑定

箭头函数可以绑定`this`对象，大大减少了显式绑定`this`对象的写法（`call`、`apply`、`bind`）。但是，箭头函数并不适用于所有场合，所以ES7提出了“函数绑定”（function bind）运算符，用来取代`call`、`apply`、`bind`调用。虽然该语法还是ES7的一个[提案](https://github.com/zenparsing/es-function-bind)，但是Babel转码器已经支持。

函数绑定运算符是并排的两个双冒号（::），双冒号左边是一个对象，右边是一个函数。该运算符会自动将左边的对象，作为上下文环境（即this对象），绑定到右边的函数上面。

```javascript
foo::bar;
// 等同于
bar.bind(foo);

foo::bar(...arguments);
// 等同于
bar.apply(foo, arguments);

const hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn(obj, key) {
  return obj::hasOwnProperty(key);
}
```

如果双冒号左边为空，右边是一个对象的方法，则等于将该方法绑定在该对象上面。

```javascript
var method = obj::obj.foo;
// 等同于
var method = ::obj.foo;

let log = ::console.log;
// 等同于
var log = console.log.bind(console);
```

由于双冒号运算符返回的还是原对象，因此可以采用链式写法。

```javascript
// 例一
import { map, takeWhile, forEach } from "iterlib";

getPlayers()
::map(x => x.character())
::takeWhile(x => x.strength > 100)
::forEach(x => console.log(x));

// 例二
let { find, html } = jake;

document.querySelectorAll("div.myClass")
::find("p")
::html("hahaha");
```

登录

```javascript
	<Button
                    onPress={this.login.bind(this) }
                    disabled={true}
                    text='登录'
                    style={stylesheet.btn_txt_style}
                    containerStyle={stylesheet.btn_containerStyle}/>

                <TouchableOpacity style={stylesheet.forget_code_view}

                    onPress={() => {
                        super.push('ForgetPassword', ForgetPassword);
                    } }
                    >
                    <Text style={stylesheet.forget_code}>
                        忘记密码
                    </Text>
                </TouchableOpacity>
```



## 对象的扩展

1. [属性的简洁表示法](http://es6.ruanyifeng.com/#docs/object#属性的简洁表示法)
2. [属性名表达式](http://es6.ruanyifeng.com/#docs/object#属性名表达式)
3. [方法的name属性](http://es6.ruanyifeng.com/#docs/object#方法的name属性)
4. [Object.is()](http://es6.ruanyifeng.com/#docs/object#Object.is())
5. [Object.assign()](http://es6.ruanyifeng.com/#docs/object#Object.assign())
6. [属性的可枚举性](http://es6.ruanyifeng.com/#docs/object#属性的可枚举性)
7. [属性的遍历](http://es6.ruanyifeng.com/#docs/object#属性的遍历)
8. [__proto__属性，Object.setPrototypeOf()，Object.getPrototypeOf()](http://es6.ruanyifeng.com/#docs/object#__proto__属性，Object.setPrototypeOf()，Object.getPrototypeOf())
9. [Object.values()，Object.entries()](http://es6.ruanyifeng.com/#docs/object#Object.values()，Object.entries())
10. [对象的扩展运算符](http://es6.ruanyifeng.com/#docs/object#对象的扩展运算符)
11. [Object.getOwnPropertyDescriptors()](http://es6.ruanyifeng.com/#docs/object#Object.getOwnPropertyDescriptors())

## Promise

1. [Promise的含义](http://es6.ruanyifeng.com/#docs/promise#Promise的含义)
2. [基本用法](http://es6.ruanyifeng.com/#docs/promise#基本用法)
3. [Promise.prototype.then()](http://es6.ruanyifeng.com/#docs/promise#Promise.prototype.then())
4. [Promise.prototype.catch()](http://es6.ruanyifeng.com/#docs/promise#Promise.prototype.catch())
5. [Promise.all()](http://es6.ruanyifeng.com/#docs/promise#Promise.all())
6. [Promise.race()](http://es6.ruanyifeng.com/#docs/promise#Promise.race())
7. [Promise.resolve()](http://es6.ruanyifeng.com/#docs/promise#Promise.resolve())
8. [Promise.reject()](http://es6.ruanyifeng.com/#docs/promise#Promise.reject())
9. [两个有用的附加方法](http://es6.ruanyifeng.com/#docs/promise#两个有用的附加方法)
10. [应用](http://es6.ruanyifeng.com/#docs/promise#应用)

**概念：**

Promise是异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更合理和更强大。它由社区最早提出和实现，ES6将其写进了语言标准，统一了用法，原生提供了`Promise`对象。

所谓`Promise`，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。从语法上说，Promise是一个对象，从它可以获取异步操作的消息。Promise提供统一的API，各种异步操作都可以用同样的方法进行处理。

```javascript
function timeout(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms, '完成了');
  });
}

timeout(3*1000).then((value) => {
  console.log(value);
});
```



```javascript
	/**
     * 带超时的fetch请求
     * @param url URL
     * @param params 参数
     * @param method POST|GET
     * @param ms 超时时间 毫秒
     * @returns {Promise.<T>|Promise<T>}
     */
    fetchRequest: function (url, params, method = this.method.POST, ms = TIME_OUT) {
        let requestBody = objectToQueryString(params),
            fetchOptions = {
                method: method,
                headers: REQUEST_HEADERS,
                body: requestBody,
            }, isOk, fetchPromise, timeoutPromise;

        timeoutPromise = new Promise(function (resolve, reject) {
            setTimeout(() => reject(new Response(2, ERROT_TYPE.timeout)), ms);
        });

        fetchPromise = new Promise(function (resolve, reject) {
            fetch(url, fetchOptions).then((response) => {
                isOk = response.ok ? true : false;
                return response.text();
            }).then((responseText) => {
                isOk && (resolve(new Response(0, JSON.parse(responseText))));
                isOk || (reject(new Response(1, responseText)));
            }).catch((error) => {
                reject(new Response(3, error));
            });
        });

        console.log('[RequestUtil.fetchRequest]', url + '?' + 						objectToQueryString(params));
        return new Promise((resolve, reject) => {
            Promise.race([fetchPromise, timeoutPromise]).then(response => {
                resolve(response);
            }).catch(error => {
                console.log('[RequestUtil.fetchRequest.race]', error);
                // 返回构造为服务器返回的错误形式
                var errObj = new Response(0, { code: '1', msg: error.responseText });
                resolve(errObj);
            });
        });
    }


async getGoods(page, callback) {
            let data = null,
                res, result;
            res = await fetchRequest(url, params);
            res && (result = res.responseText);
            if (typeof result === 'object') {
                result.code === '0' && (data = result.data);
                result.code === '1' && (super.toastShort(result.msg));
            } else {
                super.toastShort('系统错误');
            }
            callback(data);
        }
    }
```



## [Async 函数](http://es6.ruanyifeng.com/#docs/async)

```javascript
async function main() {
  try {
    var val1 = await firstStep();
    var val2 = await secondStep(val1);
    var val3 = await thirdStep(val1, val2);

    console.log('Final: ', val3);
  }
  catch (err) {
    console.error(err);
  }
}
```

## Class

1. [Class基本语法](http://es6.ruanyifeng.com/#docs/class#Class基本语法)
2. [Class的继承](http://es6.ruanyifeng.com/#docs/class#Class的继承)
3. [原生构造函数的继承](http://es6.ruanyifeng.com/#docs/class#原生构造函数的继承)
4. [Class的取值函数（getter）和存值函数（setter）](http://es6.ruanyifeng.com/#docs/class#Class的取值函数（getter）和存值函数（setter）)
5. [Class的Generator方法](http://es6.ruanyifeng.com/#docs/class#Class的Generator方法)
6. [Class的静态方法](http://es6.ruanyifeng.com/#docs/class#Class的静态方法)
7. [Class的静态属性和实例属性](http://es6.ruanyifeng.com/#docs/class#Class的静态属性和实例属性)
8. [new.target属性](http://es6.ruanyifeng.com/#docs/class#new.target属性)
9. [Mixin模式的实现](http://es6.ruanyifeng.com/#docs/class#Mixin模式的实现)

### Class 基本语法

```javascript
// ES5
function Point(x, y) {
  this.x = x;
  this.y = y;
}

Point.prototype.toString = function () {
  return '(' + this.x + ', ' + this.y + ')';
};

var p = new Point(1, 2);

// ES6
//定义类
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }
}

// React Native
export default class Committee extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            title: this.props.title || Title,
            url: this.props.url || Pages.Committee.url
        };
    }

    render() {
        var webView = null;
        if (this.state.url) {
            webView = <WebView source={{uri: this.state.url}}/>
        }
        return (
            <View style={{flex: 1}}>
                <TopView title={this.state.title} navigator={this.props.navigator}/>
                {webView}
            </View>
        )
    }
}

```

### Class的继承

Class之间可以通过`extends`关键字实现继承，这比ES5的通过修改原型链实现继承，要清晰和方便很多。

```javascript
class ColorPoint extends Point {}
```

上面代码定义了一个`ColorPoint`类，该类通过`extends`关键字，继承了`Point`类的所有属性和方法。但是由于没有部署任何代码，所以这两个类完全一样，等于复制了一个`Point`类。下面，我们在`ColorPoint`内部加上代码。

```javascript
class ColorPoint extends Point {
  constructor(x, y, color) {
    super(x, y); // 调用父类的constructor(x, y)
    this.color = color;
  }

  toString() {
    return this.color + ' ' + super.toString(); // 调用父类的toString()
  }
}
```

### Class的静态方法

类相当于实例的原型，所有在类中定义的方法，都会被实例继承。如果在一个方法前，加上`static`关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。

```javascript
class Foo {
  static classMethod() {
    return 'hello';
  }
}

Foo.classMethod() // 'hello'

var foo = new Foo();
foo.classMethod()
// TypeError: foo.classMethod is not a function
```

### Module

1. [严格模式](http://es6.ruanyifeng.com/#docs/module#严格模式)
2. [export命令](http://es6.ruanyifeng.com/#docs/module#export命令)
3. [import命令](http://es6.ruanyifeng.com/#docs/module#import命令)
4. [模块的整体加载](http://es6.ruanyifeng.com/#docs/module#模块的整体加载)
5. [export default命令](http://es6.ruanyifeng.com/#docs/module#export default命令)
6. [模块的继承](http://es6.ruanyifeng.com/#docs/module#模块的继承)
7. [ES6模块加载的实质](http://es6.ruanyifeng.com/#docs/module#ES6模块加载的实质)
8. [循环加载](http://es6.ruanyifeng.com/#docs/module#循环加载)
9. [跨模块常量](http://es6.ruanyifeng.com/#docs/module#跨模块常量)
10. [ES6模块的转码](http://es6.ruanyifeng.com/#docs/module#ES6模块的转码)

```javascript
// CommonJS模块
let { stat, exists, readFile } = require('fs');

// 等同于
let _fs = require('fs');
let stat = _fs.stat, exists = _fs.exists, readfile = _fs.readfile;

// ES6模块
import { stat, exists, readFile } from 'fs';
```

### export

```javascript
// profile.js
export var firstName = 'Michael';
export var lastName = 'Jackson';
export var year = 1958;
// 等价于
// profile.js
var firstName = 'Michael';
var lastName = 'Jackson';
var year = 1958;

export {firstName, lastName, year};

// 导出函数
export function multiply(x, y) {
  return x * y;
};

// 重命名导出
function v1() { ... }
function v2() { ... }

export {
  v1 as streamV1,
  v2 as streamV2,
  v2 as streamLatestVersion
};
             
/* 需要特别注意的是，export命令规定的是对外的接口，必须与模块内部的变量建立一一对应关系。 */
// 报错
export 1;

// 报错
var m = 1;
export m;
               
// 写法一
export var m = 1;

// 写法二
var m = 1;
export {m};

// 写法三
var n = 1;
export {n as m};
```

### import 命令

使用`export`命令定义了模块的对外接口以后，其他JS文件就可以通过`import`命令加载这个模块（文件）

```javascript
// main.js

import {firstName, lastName, year} from './profile';

function setName(element) {
  element.textContent = firstName + ' ' + lastName;
}

// 使用别名
import { lastName as surname } from './profile';
```

### export default命令

从前面的例子可以看出，使用`import`命令的时候，用户需要知道所要加载的变量名或函数名，否则无法加载。但是，用户肯定希望快速上手，未必愿意阅读文档，去了解模块有哪些属性和方法。

为了给用户提供方便，让他们不用阅读文档就能加载模块，就要用到`export default`命令，为模块指定默认输出。

```javascript
// export-default.js
export default function () {
  console.log('foo');
}
```

上面代码是一个模块文件`export-default.js`，它的默认输出是一个函数。

其他模块加载该模块时，`import`命令可以为该匿名函数指定任意名字。

```javascript
// import-default.js
import customName from './export-default';
customName(); // 'foo'
```

上面代码的`import`命令，可以用任意名称指向`export-default.js`输出的方法，这时就不需要知道原模块输出的函数名。需要注意的是，这时`import`命令后面，不使用大括号。

`export default`命令用在非匿名函数前，也是可以的。

```javascript
// export-default.js
export default function foo() {
  console.log('foo');
}

// 或者写成

function foo() {
  console.log('foo');
}

export default foo;
```

上面代码中，`foo`函数的函数名`foo`，在模块外部是无效的。加载的时候，视同匿名函数加载。

下面比较一下默认输出和正常输出。

```javascript
/* export default 导出*/
// 导出
export default function crc32() {
  // ...
}
// 导入
import crc32 from 'crc32';



// 导出
export function crc32() {
  // ...
};
// 导入
import {crc32} from 'crc32';
```

上面代码的两组写法，第一组是使用`export default`时，对应的`import`语句不需要使用大括号；第二组是不使用`export default`时，对应的`import`语句需要使用大括号。

`export default`命令用于指定模块的默认输出。显然，一个模块只能有一个默认输出，因此**`export deault`命令只能使用一次**。所以，`import`命令后面才不用加大括号，因为只可能对应一个方法。

本质上，`export default`就是输出一个叫做`default`的变量或方法，然后系统允许你为它取任意名字。所以，下面的写法是有效的。

```javascript
// modules.js
function add(x, y) {
  return x * y;
}
export {add as default};
// 等同于
// export default add;

// app.js
import { default as xxx } from 'modules';
// 等同于
// import xxx from 'modules';
```

正是因为`export default`命令其实只是输出一个叫做`default`的变量，所以它后面不能跟变量声明语句。

```javascript
// 正确
export var a = 1;

// 正确
var a = 1;
export default a;

// 错误
export default var a = 1;
```

上面代码中，`export default a`的含义是将变量`a`的值赋给变量`default`。所以，最后一种写法会报错。

有了`export default`命令，输入模块时就非常直观了，以输入jQuery模块为例。

```javascript
import $ from 'jquery';
```

如果想在一条import语句中，同时输入默认方法和其他变量，可以写成下面这样。

```javascript
import customName, { otherMethod } from './export-default';

// React Native 使用实例
import React, {PropTypes} from 'react';
```

如果要输出默认的值，只需将值跟在`export default`之后即可。

```javascript
export default 42;
```

`export default`也可以用来输出类。

```javascript
// MyClass.js
export default class { ... }

// main.js
import MyClass from 'MyClass';
let o = new MyClass();
```

```javascript
// React Native

/**
 * GiftedListView上拉下拉组件
 */
import GiftedListView from '../../components/react-native-gifted-listview/GiftedListView';
/**
 * ViewPager左右滑动组件
 */
import ViewPager from '../../components/react-native-viewpager/ViewPager';
/**
 * TabBar 组件
 */
import TabBar from '../../components/react-native-xtabbar/TabBar';
/**
 * 文本输入框
 */
import TextInput from '../../components/TextInput';

export default {GiftedListView, ViewPager, TabBar, TextInput};
```

# 编程风格

1. [块级作用域](http://es6.ruanyifeng.com/#docs/style#块级作用域)
2. [字符串](http://es6.ruanyifeng.com/#docs/style#字符串)
3. [解构赋值](http://es6.ruanyifeng.com/#docs/style#解构赋值)
4. [对象](http://es6.ruanyifeng.com/#docs/style#对象)
5. [数组](http://es6.ruanyifeng.com/#docs/style#数组)
6. [函数](http://es6.ruanyifeng.com/#docs/style#函数)
7. [Map结构](http://es6.ruanyifeng.com/#docs/style#Map结构)
8. [Class](http://es6.ruanyifeng.com/#docs/style#Class)
9. [模块](http://es6.ruanyifeng.com/#docs/style#模块)
10. [ESLint的使用](http://es6.ruanyifeng.com/#docs/style#ESLint的使用)

本章探讨如何将ES6的新语法，运用到编码实践之中，与传统的JavaScript语法结合在一起，写出合理的、易于阅读和维护的代码。

多家公司和组织已经公开了它们的风格规范，具体可参阅[jscs.info](http://jscs.info/)，下面的内容主要参考了[Airbnb](https://github.com/airbnb/javascript)的JavaScript风格规范。

## 块级作用域

**（1）let取代var**

ES6提出了两个新的声明变量的命令：`let`和`const`。其中，`let`完全可以取代`var`，因为两者语义相同，而且`let`没有副作用。

```javascript
'use strict';

if (true) {
  let x = 'hello';
}

for (let i = 0; i < 10; i++) {
  console.log(i);
}
```

上面代码如果用`var`替代`let`，实际上就声明了两个全局变量，这显然不是本意。变量应该只在其声明的代码块内有效，`var`命令做不到这一点。

`var`命令存在变量提升效用，`let`命令没有这个问题。

```javascript
'use strict';

if(true) {
  console.log(x); // ReferenceError
  let x = 'hello';
}
```

上面代码如果使用`var`替代`let`，`console.log`那一行就不会报错，而是会输出`undefined`，因为变量声明提升到代码块的头部。这违反了变量先声明后使用的原则。

所以，建议不再使用`var`命令，而是使用`let`命令取代。

**（2）全局常量和线程安全**

在`let`和`const`之间，建议优先使用`const`，尤其是在全局环境，不应该设置变量，只应设置常量。这符合函数式编程思想，有利于将来的分布式运算。

```javascript
// bad
var a = 1, b = 2, c = 3;

// good
const a = 1;
const b = 2;
const c = 3;

// best
const [a, b, c] = [1, 2, 3];
```

`const`声明常量还有两个好处，一是阅读代码的人立刻会意识到不应该修改这个值，二是防止了无意间修改变量值所导致的错误。

所有的函数都应该设置为常量。

长远来看，JavaScript可能会有多线程的实现（比如Intel的River Trail那一类的项目），这时`let`表示的变量，只应出现在单线程运行的代码中，不能是多线程共享的，这样有利于保证线程安全。

## 字符串

静态字符串一律使用单引号或反引号，不使用双引号。动态字符串使用反引号。

```javascript
// bad
const a = "foobar";
const b = 'foo' + a + 'bar';

// acceptable
const c = `foobar`;

// good
const a = 'foobar';
const b = `foo${a}bar`;
const c = 'foobar';
```

## 解构赋值

使用数组成员对变量赋值时，优先使用解构赋值。

```javascript
const arr = [1, 2, 3, 4];

// bad
const first = arr[0];
const second = arr[1];

// good
const [first, second] = arr;
```

函数的参数如果是对象的成员，优先使用解构赋值。

```javascript
// bad
function getFullName(user) {
  const firstName = user.firstName;
  const lastName = user.lastName;
}

// good
function getFullName(obj) {
  const { firstName, lastName } = obj;
}

// best
function getFullName({ firstName, lastName }) {
}
```

如果函数返回多个值，优先使用对象的解构赋值，而不是数组的解构赋值。这样便于以后添加返回值，以及更改返回值的顺序。

```javascript
// bad
function processInput(input) {
  return [left, right, top, bottom];
}

// good
function processInput(input) {
  return { left, right, top, bottom };
}

const { left, right } = processInput(input);
```

## 对象

单行定义的对象，最后一个成员不以逗号结尾。多行定义的对象，最后一个成员以逗号结尾。

```javascript
// bad
const a = { k1: v1, k2: v2, };
const b = {
  k1: v1,
  k2: v2
};

// good
const a = { k1: v1, k2: v2 };
const b = {
  k1: v1,
  k2: v2,
};
```

对象尽量静态化，一旦定义，就不得随意添加新的属性。如果添加属性不可避免，要使用`Object.assign`方法。

```javascript
// bad
const a = {};
a.x = 3;

// if reshape unavoidable
const a = {};
Object.assign(a, { x: 3 });

// good
const a = { x: null };
a.x = 3;
```

如果对象的属性名是动态的，可以在创造对象的时候，使用属性表达式定义。

```javascript
// bad
const obj = {
  id: 5,
  name: 'San Francisco',
};
obj[getKey('enabled')] = true;

// good
const obj = {
  id: 5,
  name: 'San Francisco',
  [getKey('enabled')]: true,
};
```

上面代码中，对象`obj`的最后一个属性名，需要计算得到。这时最好采用属性表达式，在新建`obj`的时候，将该属性与其他属性定义在一起。这样一来，所有属性就在一个地方定义了。

另外，对象的属性和方法，尽量采用简洁表达法，这样易于描述和书写。

```javascript
var ref = 'some value';

// bad
const atom = {
  ref: ref,

  value: 1,

  addValue: function (value) {
    return atom.value + value;
  },
};

// good
const atom = {
  ref,

  value: 1,

  addValue(value) {
    return atom.value + value;
  },
};
```

## 数组

使用扩展运算符（...）拷贝数组。

```javascript
// bad
const len = items.length;
const itemsCopy = [];
let i;

for (i = 0; i < len; i++) {
  itemsCopy[i] = items[i];
}

// good
const itemsCopy = [...items];
```

使用Array.from方法，将类似数组的对象转为数组。

```javascript
const foo = document.querySelectorAll('.foo');
const nodes = Array.from(foo);
```

## 函数

立即执行函数可以写成箭头函数的形式。

```javascript
(() => {
  console.log('Welcome to the Internet.');
})();
```

那些需要使用函数表达式的场合，尽量用箭头函数代替。因为这样更简洁，而且绑定了this。

```javascript
// bad
[1, 2, 3].map(function (x) {
  return x * x;
});

// good
[1, 2, 3].map((x) => {
  return x * x;
});

// best
[1, 2, 3].map(x => x * x);
```

箭头函数取代`Function.prototype.bind`，不应再用self/_this/that绑定 this。

```javascript
// bad
const self = this;
const boundMethod = function(...params) {
  return method.apply(self, params);
}

// acceptable
const boundMethod = method.bind(this);

// best
const boundMethod = (...params) => method.apply(this, params);
```

简单的、单行的、不会复用的函数，建议采用箭头函数。如果函数体较为复杂，行数较多，还是应该采用传统的函数写法。

所有配置项都应该集中在一个对象，放在最后一个参数，布尔值不可以直接作为参数。

```javascript
// bad
function divide(a, b, option = false ) {
}

// good
function divide(a, b, { option = false } = {}) {
}
```

不要在函数体内使用arguments变量，使用rest运算符（...）代替。因为rest运算符显式表明你想要获取参数，而且arguments是一个类似数组的对象，而rest运算符可以提供一个真正的数组。

```javascript
// bad
function concatenateAll() {
  const args = Array.prototype.slice.call(arguments);
  return args.join('');
}

// good
function concatenateAll(...args) {
  return args.join('');
}
```

使用默认值语法设置函数参数的默认值。

```javascript
// bad
function handleThings(opts) {
  opts = opts || {};
}

// good
function handleThings(opts = {}) {
  // ...
}
```

## Map结构

注意区分Object和Map，只有模拟现实世界的实体对象时，才使用Object。如果只是需要`key: value`的数据结构，使用Map结构。因为Map有内建的遍历机制。

```javascript
let map = new Map(arr);

for (let key of map.keys()) {
  console.log(key);
}

for (let value of map.values()) {
  console.log(value);
}

for (let item of map.entries()) {
  console.log(item[0], item[1]);
}
```

## Class

总是用Class，取代需要prototype的操作。因为Class的写法更简洁，更易于理解。

```javascript
// bad
function Queue(contents = []) {
  this._queue = [...contents];
}
Queue.prototype.pop = function() {
  const value = this._queue[0];
  this._queue.splice(0, 1);
  return value;
}

// good
class Queue {
  constructor(contents = []) {
    this._queue = [...contents];
  }
  pop() {
    const value = this._queue[0];
    this._queue.splice(0, 1);
    return value;
  }
}
```

使用`extends`实现继承，因为这样更简单，不会有破坏`instanceof`运算的危险。

```javascript
// bad
const inherits = require('inherits');
function PeekableQueue(contents) {
  Queue.apply(this, contents);
}
inherits(PeekableQueue, Queue);
PeekableQueue.prototype.peek = function() {
  return this._queue[0];
}

// good
class PeekableQueue extends Queue {
  peek() {
    return this._queue[0];
  }
}
```

## 模块

首先，Module语法是JavaScript模块的标准写法，坚持使用这种写法。使用`import`取代`require`。

```javascript
// bad
const moduleA = require('moduleA');
const func1 = moduleA.func1;
const func2 = moduleA.func2;

// good
import { func1, func2 } from 'moduleA';
```

使用`export`取代`module.exports`。

```javascript
// commonJS的写法
var React = require('react');

var Breadcrumbs = React.createClass({
  render() {
    return <nav />;
  }
});

module.exports = Breadcrumbs;

// ES6的写法
import React from 'react';

const Breadcrumbs = React.createClass({
  render() {
    return <nav />;
  }
});

export default Breadcrumbs
```

如果模块只有一个输出值，就使用`export default`，如果模块有多个输出值，就不使用`export default`，不要`export default`与普通的`export`同时使用。

不要在模块输入中使用通配符。因为这样可以确保你的模块之中，有一个默认输出（export default）。

```javascript
// bad
import * as myObject './importModule';

// good
import myObject from './importModule';
```

如果模块默认输出一个函数，函数名的首字母应该小写。

```javascript
function makeStyleGuide() {
}

export default makeStyleGuide;
```

如果模块默认输出一个对象，对象名的首字母应该大写。

```javascript
const StyleGuide = {
  es6: {
  }
};

export default StyleGuide;
```

