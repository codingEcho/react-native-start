# JavaScript 快速一览 



```javascript

var x; // 定义一个名为x的变量
// 通过等号= 向变量赋值
x = 0; // 变量的值为0
x // => 输出0
// JavaScript 支持的数据类型
x = 1; // 数字
x = 0.01; // 数字
x = "hello world"; // 字符串
x = 'JavaScript'; // 字符串
x = true; // 布尔型
x = false; // 布尔型
x = null; // Null
x = undefined; // Undefined (类似null,都表示无值)

// JavaScript's 最重要的数据类型为对象(object)，对象由键值对集合组成
var App = {
  name:'惠生活',
  version:'1.0.0',
  author:['张三','李四','王五'],
  isRelease:true,
  history:[
    {
      version:'0.0.1',
      desc:'第一个版本'
    },
    {
      version:'0.0.2',
      desc:'第二个版本'
    },
  ]
};

// 属性的访问
var appVersion = App.version; // "惠生活"
var isRelease = App.isRelease; // true
var firstVersion = App.history[0].desc; // "第一个版本"
var firstAuthor = App.author[0]; // "张三"

App.company = '四川蜀信e';
App.company; // "四川蜀信e"
App.author.push('熊大'); // 4
App.author; // ["张三", "李四", "王五", "熊大"]
App.author.pop(); // 熊大

// 数组
var primes = [2, 3, 5, 7]; // 包含四个元素的数组，用中括号[]
primes[0]; // 2
primes.length; // 4
primes[primes.length-1]; // 7
primes[4] = 9;
primes[4] = 11;
var empty = [];
empty.length; // 0

// 包含对象的数组
var points = [ {x:0, y:0},
{x:1, y:1} ];

var data = {
trial1: [[1,2], [3,4]], trial2: [[2,3], [4,5]]
};
// 这也是数组
var complex=['熊大',true,false,1,3,['张三','李四','王五']];
```

##  常用的算术运算符

```javascript
// Operators act on values (the operands) to produce a new value. 
// 常用的算术运算符
3 + 2 // 5
3 - 2 // 1
3 * 2 // 6
3 / 2 // 1.5
var points = [ 
{x:0, y:0},
{x:1, y:1} ];
points[1].x - points[0].x; // 1
"3" + "2" // "32"

var count =0;
count++; 
count--; 
count +=2;
count *=3;
count; // 6

// 等于，不等于
var x = 2,
    y = 3;

x == y
x != y
x < y
x <= y
x > y
x >= y
"two" == "three"
"two" > "three"
false == (x > y)

// 逻辑操作符
(x == 2) && (y == 3) // true
(x > 3) || (y < 3) // false
 !(x == y) //true
```

### 注释（Comments）

```javascript
// 行内注释

/* 这也是一个注释 */ // 后面跟了另外一个注释

/*
* 多行注释(块注释)
*/
```

### 字面量（literal）

其实就是文本代码。因为javascript是一门解释性语言，代码解释执行，不需要编译。不像C或者java，会被编译程二进制码和字节码。

```javascript
var a = 12; // 数值
var b = 1.2; // 数值
var c = "hello world"; // 字符串
var d= 'Hi'; // 字符串
var isOk = true; 
var isKo =  false;
var reg = /javascript/gi; // 正则表达式
var obj = null; // null
```

###  标识符和保留字

```javascript
// 合法标识符
i 
my_variable_name
v13
_dummy
$str
// 甚至这些也是合法的
var sí = true; 
var π = 3.14;
```

**关键字**(不要使用以下的关键字定义变量)

```javascript
break case catch continue debugger default
delete function do if
else in
false instanceof finally new
return typeof switch var this void throw while true with
abstract boolean byte char class const
double enum export extends final float
goto native implements package import private int protected interface public long short
static
super synchronized throws transient volatile
for null try
// ES5
class const enum export extends import super
  
implements let private public yield interface package protected static

// 函数内
arguments eval
  
// 一些全局变量和函数
arguments
Array
Boolean
Date
decodeURI decodeURIComponent
encodeURI Infinity encodeURIComponent isFinite Error isNaN eval JSON EvalError Math Function NaN
Number
Object parseFloat parseInt RangeError ReferenceError
RegExp String SyntaxError TypeError undefined URIError
```

## 数据类型

#### Number

JavaScript不区分整数和浮点数，统一用Number表示，以下都是合法的Number类型：

```javascript
123; // 整数123
0.456; // 浮点数0.456
1.2345e3; // 科学计数法表示1.2345x1000，等同于1234.5
-99; // 负数
NaN; // NaN表示Not a Number，当无法计算结果时用NaN表示
Infinity; // Infinity表示无限大，当数值超过了JavaScript的Number所能表示的最大值时，就表示为Infinity
```

计算机由于使用二进制，所以，有时候用十六进制表示整数比较方便，十六进制用0x前缀和0-9，a-f表示，例如：`0xff00`，`0xa5b4c3d2`，等等，它们和十进制表示的数值完全一样。

Number可以直接做四则运算，规则和数学一致：

```javascript
1 + 2; // 3
(1 + 2) * 5 / 2; // 7.5
2 / 0; // Infinity
0 / 0; // NaN
10 % 3; // 1
10.5 % 3; // 1.5
```

注意`%`是求余运算。

```javascript
// 整数字面量
// base-10(十进制)
0
3 
10000000

// base-16(16进制)
0xff // 15*16 + 15 = 255 (base 10) 
0xCAFE911

// base-8(8进制)
0377 // 3*64 + 7*8 + 7 = 255 (base 10)
// 浮点数字面量
3.14
2345.789
.333333333333333333
6.02e23 // 6.02 × 1023 1.4738223E-32 // 1.4738223 × 10−32

/* */
Math.pow(2,53) // => 9007199254740992: 2 to the power 53
Math.round(.6) // => 1.0: round to the nearest integer
Math.ceil(.6) // => 1.0: round up to an integer
Math.floor(.6) // => 0.0: round down to an integer
Math.abs(-5) // => 5: absolute value
Math.max(x,y,z) // Return the largest argument
Math.min(x,y,z) // Return the smallest argument
Math.random() // Pseudo-random number x where 0 <= x < 1.0
Math.PI // π: circumference of a circle / diameter
Math.E // e: The base of the natural logarithm
Math.sqrt(3) // The square root of 3
Math.pow(3, 1/3) // The cube root of 3
Math.sin(0) // Trigonometry: also Math.cos, Math.atan, etc.
Math.log(10) // Natural logarithm of 10
Math.log(100)/Math.LN10 // Base 10 logarithm of 100
Math.log(512)/Math.LN2  // Base 2 logarithm of 512
Math.exp(3) // Math.E cubed
```

```javascript
var x =.3 - .2;
var y =.2 - .1;
x == y // => false: the two values are not the same!
x == .1 // => false: .3-.2 is not equal to .1
y == .1 // => true: .2-.1 is equal to .1
```

#### Dates and Times(日期和时间)

```javascript
var then = new Date(2017, 0, 1); // The 1st day of the 1st month of 2017 
var later = new Date(2017, 0, 1,17, 10, 30); // Same day, at 5:10:30pm, local time
var now = new Date();  // The current date and time
var elapsed = now - then; // Date subtraction: interval in milliseconds
later.getFullYear() // => 2017
later.getMonth() // => 0: zero-based months
later.getDate() // => 1: one-based days
later.getDay() // => 5: day of week. 0 is Sunday 5 is Friday.
later.getHours() // => 17: 5pm, local time
later.getUTCHours() // hours in UTC time; depends on timezone
```

### 字符串

字符串是以单引号'或双引号"括起来的任意文本，比如`'abc'`，`"xyz"`等等。请注意，`''`或`""`本身只是一种表示方式，不是字符串的一部分，因此，字符串`'abc'`只有`a`，`b`，`c`这3个字符。

```javascript
/*  字符串字面量 */
"" // The empty string: it has zero characters 'testing'
"3.14"
'name="myform"'
"Wouldn't you prefer O'Reilly's book?"
"This string\nhas two lines"
"π is the ratio of a circle's circumference to its diameter"

"two\nlines" // A string representing 2 lines written on one line
// A one-line string written on 3 lines. ECMAScript 5 only.
"one\ 
 long\ line"
 
/* 转义序列 */
 'You\'re right, it can\'t be a quote'
 
/* String 的常用方法 */
 var s = "hello, world"; // Start with some text.
 s.charAt(0) // => "h": the first character.
 s.charAt(s.length-1) // => "d": the last character.
 s.substring(1,4) // => "ell": the 2nd, 3rd and 4th characters. 
 s.slice(1,4) // => "ell": same thing
 s.slice(-3) // => "rld": last 3 characters 
 s.indexOf("l") // => 2: position of first letter l.
 s.lastIndexOf("l") // => 10: position of last letter l.
 s.indexOf("l", 3) // => 3: position of first "l" at or after 3
 s.split(", ") // => ["hello", "world"] split into substrings  
 s.replace("h", "H") // => "Hello, world": replaces all instances
 s.toUpperCase() // => "HELLO, WORLD"
 
 // ES5 你还可以这样玩
 s = "hello, world";
 s[0] // => "h" 
 s[s.length-1] // => "d"
 
 // 表达式匹配
var text = "testing: 1, 2, 3"; // Sample text
// Matches all instances of one or more digits 
var pattern = /\d+/g  
pattern.test(text) // => true: a match exists
text.search(pattern) // => 9: position of first match
text.match(pattern) // => ["1", "2", "3"]: array of all matches
text.replace(pattern, "#"); // => "testing: #, #, #"
text.split(/\D+/); // => ["","1","2","3"]: split on non-digits
```

#### 布尔值

布尔值和布尔代数的表示完全一致，一个布尔值只有`true`、`false`两种值，要么是`true`，要么是`false`，可以直接用`true`、`false`表示布尔值，也可以通过布尔运算计算出来：

```javascript
true; // 这是一个true值
false; // 这是一个false值
2 > 1; // 这是一个true值
2 >= 3; // 这是一个false值
```

`&&`运算是与运算，只有所有都为`true`，`&&`运算结果才是`true`：

```javascript
true && true; // 这个&&语句计算结果为true
true && false; // 这个&&语句计算结果为false
false && true && false; // 这个&&语句计算结果为false
```

`||`运算是或运算，只要其中有一个为`true`，`||`运算结果就是`true`：

```javascript
false || false; // 这个||语句计算结果为false
true || false; // 这个||语句计算结果为true
false || true || false; // 这个||语句计算结果为true
```

`!`运算是非运算，它是一个单目运算符，把`true`变成`false`，`false`变成`true`：

```javascript
! true; // 结果为false
! false; // 结果为true
! (2 > 5); // 结果为true
```

布尔值经常用在条件判断中，比如：

```javascript
var age = 15;
if (age >= 18) {
    alert('adult');
} else {
    alert('teenager');
}
```

```javascript
// 以下这些值都会转换为false
undefined 
null
0
-0
NaN
"" // the empty string
```

#### 比较运算符

当我们对Number做比较时，可以通过比较运算符得到一个布尔值：

```javascript
2 > 5; // false
5 >= 2; // true
7 == 7; // true
```

实际上，JavaScript允许对任意数据类型做比较：

```javascript
false == 0; // true
false === 0; // false
```

要特别注意相等运算符`==`。JavaScript在设计时，有两种比较运算符：

第一种是`==`比较，它会自动转换数据类型再比较，很多时候，会得到非常诡异的结果；

第二种是`===`比较，它不会自动转换数据类型，如果数据类型不一致，返回`false`，如果一致，再比较。

由于JavaScript这个设计缺陷，*不要*使用`==`比较，始终坚持使用`===`比较。

另一个例外是`NaN`这个特殊的Number与所有其他值都不相等，包括它自己：

```javascript
NaN === NaN; // false
```

唯一能判断`NaN`的方法是通过`isNaN()`函数：

```javascript
isNaN(NaN); // true
```

最后要注意浮点数的相等比较：

```javascript
1 / 3 === (1 - 2 / 3); // false
```

这不是JavaScript的设计缺陷。浮点数在运算过程中会产生误差，因为计算机无法精确表示无限循环小数。要比较两个浮点数是否相等，只能计算它们之差的绝对值，看是否小于某个阈值：

```javascript
Math.abs(1 / 3 - (1 - 2 / 3)) < 0.0000001; // true
```

#### null和undefined

`null`表示一个“空”的值，它和`0`以及空字符串`''`不同，`0`是一个数值，`''`表示长度为0的字符串，而`null`表示“空”。

在其他语言中，也有类似JavaScript的`null`的表示，例如Java也用`null`，Swift用`nil`，Python用`None`表示。但是，在JavaScript中，还有一个和`null`类似的`undefined`，它表示“未定义”。

JavaScript的设计者希望用`null`表示一个空的值，而`undefined`表示值未定义。事实证明，这并没有什么卵用，区分两者的意义不大。大多数情况下，我们都应该用`null`。`undefined`仅仅在判断函数参数是否传递的情况下有用。

```javascript
var a; //
a // undefined

var s = "test", n = 1, b = true; // A string, number, and boolean value.
var S = new String(s); // A String object
var N = new Number(n); // A Number object
var B = new Boolean(b); // A Boolean object
```



#### Array(数组)

数组是一组按顺序排列的集合，集合的每个值称为元素。JavaScript的数组可以包括任意数据类型。例如：

```javascript
[1, 2, 3.14, 'Hello', null, true];
```

上述数组包含6个元素。数组用`[]`表示，元素之间用`,`分隔。

另一种创建数组的方法是通过`Array()`函数实现：

```javascript
new Array(1, 2, 3); // 创建了数组[1, 2, 3]
```

然而，出于代码的可读性考虑，强烈建议直接使用`[]`。

数组的元素可以通过索引来访问。请注意，索引的起始值为`0`：

```javascript
var arr = [1, 2, 3.14, 'Hello', null, true];
arr[0]; // 返回索引为0的元素，即1
arr[5]; // 返回索引为5的元素，即true
arr[6]; // 索引超出了范围，返回undefined
```

#### Object(对象)

JavaScript的对象是一组由键-值组成的无序集合，例如：

```javascript
var person = {
    name: 'Bob',
    age: 20,
    tags: ['js', 'web', 'mobile'],
    city: 'Beijing',
    hasCar: true,
    zipcode: null
};
```

JavaScript对象的键都是字符串类型，值可以是任意数据类型。上述`person`对象一共定义了6个键值对，其中每个键又称为对象的属性，例如，`person`的`name`属性为`'Bob'`，`zipcode`属性为`null`。

要获取一个对象的属性，我们用`对象变量.属性名`的方式：

```javascript
person.name; // 'Bob'
person.zipcode; // null
```

## 原始变量和引用变量

```javascript
// 字符串
var s = "hello"; // Start with some lowercase text
s.toUpperCase(); // Returns "HELLO", but doesn't alter s
s // => "hello": the original string has not changed

// 对象，数组  
var o = { x:1 }; // Start with an object
o.x = 2; // Mutate it by changing the value of a property 
o.y = 3; // Mutate it again by adding a new property

var a = [1,2,3]; // Arrays are also mutable
a[0] = 0; // Change the value of an array element
a[3] = 4; // Add a new array element

var o ={x:1},p = {x:1}; // Two objects with the same properties
    o === p // => false: distinct objects are never equal 
var a =[],b = []; // Two distinct, empty arrays
    a === b // => false: distinct arrays are never equal
    
var a = []; // The variable a refers to an empty array.
var b = a; // Now b refers to the same array.
b[0] = 1; // Mutate the array referred to by variable b.
a[0] // => 1: the change is also visible through variable a.
a === b // => true: a and b refer to the same object, so they are equal.

var a = ['a','b','c']; // An array we want to copy
var b = [];  
// A distinct array we'll copy into
// For each index of a[]
// Copy an element of a into b
for(var i = 0; i < a.length; i++) { 
	b[i] = a[i];  
}

```

### 类型转换

| Value              | String            | Number | Boolean | Object                |
| ------------------ | ----------------- | ------ | ------- | --------------------- |
| undefined          | "undefined"       | NaN    | false   | throws TypeError      |
| null               | "null"            | 0      | false   | throws TypeError      |
| true               | "true"            | 1      | ——      | new Boolean(true)     |
| false              | "false"           | 0      | ——      | new Boolean(false)    |
| ""(empty string)   | ——                | 0      | false   | new String("")        |
| "1.2"              | ——                | 1.2    | true    | new String("1.2")     |
| "one"              | ——                | NaN    | true    | new String("one")     |
| 0                  | "0"               | ——     | false   | new Number(0)         |
| -0                 | "-0"              | ——     | false   | new Number(-0)        |
| NaN                | "NaN"             | ——     | false   | new Number(NaN)       |
| Infinity           | "Infinity"        | ——     | true    | new Number(Infinity)  |
| -Infinity          | "-Infinity"       | ——     | true    | new Number(-Infinity) |
| 1(非0，有穷)           | "1"               | ——     | true    | new Number(1)         |
| {}（任何对象）           | "[object Object]" |        | true    | ——                    |
| []（空数组）            | ""                | 0      | true    | ——                    |
| [9]                | "9"               | 9      | true    | ——                    |
| ['a']              | 使用join()方法        | NaN    | true    | ——                    |
| function(){}（任意函数） | 输出函数体             | NaN    | true    | ——                    |



#### 类型转换

```javascript
/* 隐式转换 */
null==undefined // These two values are treated as equal.
"0"==0              // String convert to a number before comparing.
0==false           // Boolean convert to number before comparing.
"0"==false       // Both operands convert to numbers before comparing.

(1) "==="(strice equality operator)在比较两种类型时恒等于在不会执行转换
(2) if(undefined) 并不意味著 undefined==false
在if语句中undefined转换为false,但是在==操作中undfined不会转换为布尔类型

if(undefined)
if(0)
if(-0)
if(NaN)
if("")
if(null) {
 //在上面的if语句中上面个值都会转换为false 也称为“假值”（falsy value)
}

/* 显示转换 */
Number("3") // => 3
String(false) // => "false" Or use false.toString() 
Boolean([]) // => true
Object(3) // => new Number(3)

/* 运算符转换 */
x + "" // Same as String(x)
+x // Same as Number(x).You may also see x-0
!!x // Same as Boolean(x). Note double !

/* 数值转其它进制 */
var n = 17;
binary_string = n.toString(2); // Evaluates to "10001"
octal_string = "0" + n.toString(8); // Evaluates to "021"
hex_string = "0x" + n.toString(16); // Evaluates to "0x11"

parseInt("3 blind mice") // => 3
parseFloat(" 3.14 meters") // => 3.14
parseInt("-12.34") // => -12
parseInt("0xFF") // => 255
parseInt("0xff") // => 255
parseInt("-0XFF") // => -255
parseFloat(".1") // => 0.1
parseInt("0.1") // => 0
parseInt(".1") // => NaN: integers can't start with "." 
parseFloat("$72.47");// => NaN: numbers can't start with "$"
// 可选的第二个参数
parseInt("11", 2); // => 3 (1*2 + 1)
parseInt("ff", 16); // => 255 (15*16 + 15)
parseInt("zz", 36); // => 1295 (35*36 + 35)
parseInt("077", 8); // => 63 (7*8 + 7)
parseInt("077", 10); // => 77 (7*10 + 7)
```



### 变量声明

变量的概念基本上和初中代数的方程变量是一致的，只是在计算机程序中，变量不仅可以是数字，还可以是任意数据类型。

变量在JavaScript中就是用一个变量名表示，变量名是大小写英文、数字、`$`和`_`的组合，且不能用数字开头。变量名也不能是JavaScript的关键字，如`if`、`while`等。申明一个变量用`var`语句，比如：

```javascript
var a; // 申明了变量a，此时a的值为undefined
var $b = 1; // 申明了变量$b，同时给$b赋值，此时$b的值为1
var s_007 = '007'; // s_007是一个字符串
var Answer = true; // Answer是一个布尔值true
var t = null; // t的值是null
```

变量名也可以用中文，但是，请不要给自己找麻烦。

在JavaScript中，使用等号`=`对变量进行赋值。可以把任意数据类型赋值给变量，同一个变量可以反复赋值，而且可以是不同类型的变量，但是要注意只能用`var`申明一次，例如：

```javascript
var a = 123; // a的值是整数123
a = 'ABC'; // a变为字符串
```

这种变量本身类型不固定的语言称之为动态语言，与之对应的是静态语言。静态语言在定义变量时必须指定变量类型，如果赋值的时候类型不匹配，就会报错。例如Java是静态语言，赋值语句如下：

```javascript
int a = 123; // a是整数类型变量，类型用int申明
a = "ABC"; // 错误：不能把字符串赋给整型变量
```

和静态语言相比，动态语言更灵活，就是这个原因。

请不要把赋值语句的等号等同于数学的等号。比如下面的代码：

```javascript
var x = 10;
x = x + 2;
```

如果从数学上理解`x = x + 2`那无论如何是不成立的，在程序中，赋值语句先计算右侧的表达式`x + 2`，得到结果`12`，再赋给变量`x`。由于`x`之前的值是`10`，重新赋值后，`x`的值变成`12`。

#### strict模式(严格模式)

JavaScript在设计之初，为了方便初学者学习，并不强制要求用`var`申明变量。这个设计错误带来了严重的后果：如果一个变量没有通过`var`申明就被使用，那么该变量就自动被申明为全局变量：

```javascript
i = 10; // i现在是全局变量
```

在同一个页面的不同的JavaScript文件中，如果都不用`var`申明，恰好都使用了变量`i`，将造成变量`i`互相影响，产生难以调试的错误结果。

使用`var`申明的变量则不是全局变量，它的范围被限制在该变量被申明的函数体内（函数的概念将稍后讲解），同名变量在不同的函数体内互不冲突。

为了修补JavaScript这一严重设计缺陷，ECMA在后续规范中推出了strict模式，在strict模式下运行的JavaScript代码，强制通过`var`声明变量，未使用`var`申明变量就使用的，将导致运行错误。

启用strict模式的方法是在JavaScript代码的第一行写上：

```javascript
'use strict';
```

这是一个字符串，不支持strict模式的浏览器会把它当做一个字符串语句执行，支持strict模式的浏览器将开启strict模式运行JavaScript。

来测试一下你的浏览器是否能支持strict模式：

```javascript
'use strict';
// 如果浏览器支持strict模式，
// 下面的代码将报ReferenceError错误:
abc = 'Hello, world';
alert(abc);
```

**注意：变量先声明，再使用；使用var声明变量（ES6还可以使用const、let分别表示常量和局部变量）**

```javascript
var i;
var sum;
// 单var模式
var i,sum;
```

### 变量的作用域

```javascript
var scope = "global"; // Declare a global variable
function checkscope() {
	var scope = "local"; // Declare a local variable with the same name
  return scope; // Return the local value, not the global one
} 

checkscope(); // => "local"

// demo2
scope = "global"; // Declare a global variable, even without var.
function checkscope2() {
	scope = "local"; // Oops! We just changed the global variable.
	myscope = "local"; // This implicitly declares a new global variable.
  	return [scope, myscope]; // Return two values.
} 

checkscope2() // => ["local", "local"]: has side effects!
scope // => "local": global variable has changed.
myscope // => "local": global namespace cluttered up.

```

#### 函数作用域和变量提升

```javascript
var scope = "global"; 
function f() {
console.log(scope); // Prints "undefined", not "global"
var scope = "local"; // Variable initialized here, but defined everywhere  console.log(scope); // Prints "local"
}

function f() {
var scope; // Local variable is declared at the top of the function 
console.log(scope); // It exists here, but still has "undefined" value
scope = "local"; // Now we initialize it and give it a value  
console.log(scope);  // And here it has the value we expect
}


```

## 表达式和操作符

### 对象和数组的初始化

```javascript
var s = {name:'xiaoming',age:13};
var students=[s,{name:'lilei',age:12}];

var sparseArray = [1,,,,5]; // [1,undefined,undefined,undefined,5]
```

### 函数定义

```javascript
// This function returns the square of the value passed to it. 
var square = function(x) { 
  return x * x; 
}

function add(x,y){
  return x + y;
}

// 调用
var a = square(3);
var sum = add(1,3);
```

### 操作符

逗号操作符还可以用于赋值，在用于赋值时，逗号操作符会返回表达式中的最后一项，

如下面的例子：

```javascript
var num=(5,1,4,8,0); //num的值为0
```



```javascript
// typeof 
if(typeof 1 === 'number'){
  console.log('1 is a number');
}

// delete
var a={name:'lilei',age:23,height:'175cm'};
delete a.height;
a // {name:'lilei',age:23}

/* in */
var point = { x:1, y:1 }; // Define an object
"x" in point // => true: object has property named "x"
"z" in point // => false: object has no "z" property.
"toString" in point // => true: object inherits toString method

var data = [7,8,9]; // An array with elements 0, 1, and 2
"0" in data // => true: array has an element "0"
1 in data // => true: numbers are converted to strings
3 in data // => false: no element 3

/* instanceof*/
var d = new Date();  // Create a new object with the Date() constructor
d instanceof Date; // Evaluates to true; d was created with Date()
d instanceof Object; // Evaluates to true; all objects are instances of Object
d instanceof Number; // Evaluates to false; d is not a Number object

var a = [1, 2, 3]; // Create an array with array literal syntax
a instanceof Array; // Evaluates to true; a is an array
a instanceof Object; // Evaluates to true; all arrays are objects
a instanceof RegExp; // Evaluates to false; arrays are not regular expressions

```

| x            | typeof x    |
| ------------ | ----------- |
| undefined    | "undefined" |
| null         | "object"    |
| true 或 false | "boolean"   |
| 数值或NaN       | "number"    |
| 字符串          | "string"    |
| 函数           | "function"  |

### 逻辑表达式

```javascript
// 逻辑与(&&) 或(||) 非(!),可以用以下写法来代替 if(){}else{}
var isDebugEnabled = true;
isDebugEnabled && (console.log('开启DEBUG模式'));
isDebugEnabled || (console.log('未开启DEBUG模式'));
if(!isDebugEnabled){
  // ...
}
```

## 语句

```javascript
var 
function(){
  
}
// 条件
if
else if
switch
// 循环
while
do/while
for
for in // 遍历对象

// 跳转
break
continue
return 
throw 
try/catch/finally
```

## 对象

### 原型

```javascript
function Student(name,age){
  this.name = name;
  this.age = age;
}

Student.prototype.sayHi = function(){
  console.log('大家好，我是'+this.name+'，我今年'+this.age);
};

var s1 = new Student('张珊',12),
    s2 = new Student('李思',12);

s1.sayHi(); // 大家好，我是张珊，我今年12
s2.sayHi(); // 大家好，我是李思，我今年12
```

