---
title: JS判断数据类型
tags:
  - javascript
categories:
  - javascript
date: 2017-09-10 17:17:15
---

# JS判断数据类型

>本文摘要：
列举了常用的数据类型检查方法、应用场景及使用技巧。

## 1、JavaScript 数据类型

最新的 ECMAScript 标准定义了 7 种数据类型，主要分类两大类：

- 第一类：Primitive ( 原始类型 )
 - boolean
 - null
 - undefined
 - number
 - string
 - symbol ( ES6 )

- 第二类：Object ( 对象类型 )
 - Object ( Object , Array , RegExp , Function , etc.)

**类型区分**

- 原始类型：直接将值传递给变量
- 对象类型：将一个堆内存中的引用( 如 0xFFFF ) 传给变量

( 如果正在看文章的你对类型区分不太了解，请自行查阅补充 )

## 2、判断数据类型的方法

### 方法一：`typeof` 操作符

`typeof` 是一个最简单的判断数据类型的操作符。

语法：`typeof()` 在 `()` 中填入你想判断类型的数据。
返回值："boolean" , "string" , "number" , "undefined" , "symbol" , "object"

示例：
```javascript
typeof(123) // "number"
typeof("string") // "string"
typeof(true) // "boolean"
typeof(Symbol()) // "symbol"
```
emmmmm...如果你只看这几个示例好像 `typeof` 并没有什么问题，但实际上`typeof` 这货比较 `呆萌` ，实际使用中往往得不到你想要的结果。示例请看下表：
( 如果你对此表抱有疑问，请自行前往控制台输入 )

**注：
JavaScript 标准文档中定义: `[[Class]]` 的值只可能是下面字符串中的一个： `Arguments`, `Array`, `Boolean`, `Date`, `Error`, `Function`, `JSON`, `Math`, `Number`, `Object`, `RegExp`, `String`.**

- Value : typeof 操作符运算的值
- Type : typeof 操作符运算的结果
- Class : 对象内部属性 `[[Class]]` 的值

| Value | Class | Type |
| --- | --- | --- |
| "foo" | String | string |
| new String("foo") | String | object |
| 1.2 | Number | number |
| new Number(1.2) | Number | object |
| true | Boolean | boolean |
| new Boolean(true) | Boolean | object |
| new Date() | Date | object |
| new Error() | Error | object |
| [1,2,3] | Array | object |
| new Array(1, 2, 3) | Array | object |
| new Function("") | Function | function |
| /abc/g | RegExp | object |
| new RegExp("meow") | RegExp | object |
| {} | Object | object |
| new Object() | Object | object |

通过以上测试可以发现，用 `typeof` 操作符判断数据类型的时候，在大多数情况下都返回 "object"，所以呆萌的 `typeof` 或许不是你想要的那种精明能干的操作符。

### 方法二：`instanceof` 操作符

`instanceof` 操作符用来比较两个操作数据的构造函数。

语法：`<case> instanceof <Constructor>`
返回值：`true` / `false`

`instanceof` 操作符只有在比较自定义的对象时才有意义。 如果用来比较内置类型，将会和 typeof 操作符 一样用处不大

**比较自定义对象**
```javascript
function Foo() {}
function Bar() {}
Bar.prototype = new Foo();

new Bar() instanceof Bar; // true
new Bar() instanceof Foo; // true

// 如果仅仅设置 Bar.prototype 为函数 Foo 本身，而不是 Foo 构造函数的一个实例
Bar.prototype = Foo;
new Bar() instanceof Foo; // false
```

**比较内置类型**
```javascript
new String('foo') instanceof String; // true
new String('foo') instanceof Object; // true

'foo' instanceof String; // false
'foo' instanceof Object; // false
```

**注意：**
`instanceof` 用来比较属于不同 JavaScript 上下文的对象（比如，浏览器中不同的文档结构）时将会出错， 因为它们的构造函数不会是同一个对象。

### 方法三：终极必杀技 `Object.prototype.toString`

对象的类定义：
JavaScript 标准文档只给出了一种获取 `[[Class]]` 值的方法，那就是使用 `Object.prototype.toString`

同样使用上面 `typeof` 判断类型表中 `Value` 字段的值，这次我们使用 `Object.prototype.toString`

```javascript
function checkDataType(val){
    return Object.prototype.toString.call(val)
}

checkDataType("foo") // => "[object String]"
checkDataType(new String("foo") ) // => "[object String]"
checkDataType(1.2) // => "[object Number]"
checkDataType(new Number(1.2) ) // => "[object Number]"
checkDataType(true) // => "[object Boolean]"
checkDataType(new Boolean(true) ) // => "[object Boolean]"
checkDataType(new Date()) // => "[object Date]"
checkDataType(new Error() ) // => "[object Error]"
checkDataType([1,2,3] ) // => "[object Array]"
checkDataType(new Array(1, 2, 3)) // => "[object Array]"
checkDataType(new Function("")) // => "[object Function]"
checkDataType(/abc/g) // => "[object RegExp]"
checkDataType(new RegExp("meow")) // => "[object RegExp]"
checkDataType({}) // => "[object Object]"
checkDataType(new Object()) // => "[object Object]"
```

当然，如果你可以通过 `slice` 让返回值变得简短一点，通过 `toLowerCase` 变成我们熟悉的小写类型。
```javascript
function checkDataType(val){
    return Object.prototype.toString.call(val).slice(8,-1).toLowerCase()
}

checkDataType("foo") // => "string"
```

## 3、结论
当检测一个对象类型的时候，建议使用 `Object.prototype.toString` 方法；通过以上对比可以发现，这是唯一一个靠谱的判断数据类型的方法。
正如上面表格所示，`typeof` 的一些返回值在标准文档中并未定义，所以它可能会给你一个意料之外的答案。而 `instanceof` 操作符应仅用来比较同一个 JavaScript 上下文 ( 文档 ) 中的自定义对象。

## 参考资料

[ JavaScript 数据类型和数据结构 ](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Data_structures)

[ JavaScript-Garden ](http://bonsaiden.github.io/JavaScript-Garden)

[ 表达式和运算符 - typeof ](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/typeof)

[ 表达式和运算符 - instanceof ](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/instanceof)

[ Object.prototype.toString() ](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/toString)

