---
title: '手写一个 bind '
tags:
  - javascript
categories:
  - javascript
date: 2017-09-28 22:53:16
---

## 一、了解 bind

[Function.prototype.bind() - MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)

语法：
```javascript
fun.bind(thisArg[, arg1[, arg2[, ...]]])
```

描述：
`bind()` 方法创建一个新的函数, 当被调用时，将其 `this` 关键字设置为提供的值，在调用新函数时，在任何提供之前提供一个给定的参数序列。


MDN 把 bind 描述的很清楚，总结一下大概有以下三个特性：

1. 返回值：`bind()` 方法返回一个新函数。
2. this：新函数的 `this` 是调用 `bind` 的第一个参数，并且该参数不能被重写。
3. 偏函数：`bind()` 方法的第 2~N 个参数。当 `bind` 返回的函数被调用时，这些参数将置于实参之前传递。

用代码解释上面三句话：

首先是第一句话跟第二句话，很明显 `bind` 之后 `this` 不能被改写。
```javascript
var obj1 = {name: "Albert"}
var obj2 = {name: "Overwatch"}

function sayName(){console.log(this.name)}

var b1 = sayName.bind(obj1)
var b2 = sayName.bind(obj1).bind(obj2)
var b3 = sayName.bind(obj1).call(obj2) // => Albert

b1() // Albert
b2() // Albert
```

然后是第三句话，同样能明显看出其传参规则。
```javascript
function getInfo(){ console.log(arguments) }

var b4 = getInfo.bind(null,"Albert","male")

b4(23)
```

查看控制台打印出的 `arguments` 参数，结果一目了然。
![@console.log(arguments)](https://ws1.sinaimg.cn/large/889b2f7fgy1fk5ae63hpaj20da03fglo.jpg)

## 二、实现 bind

1. 我用了 `that` 暂存了调用对象
2. 存起 `_bind` 方法从第二项开始的 `arguments` 
3. 把返回函数的 `arguments` 与 `2.` 中存的 `arguments` 拼接（`2.` 在前）
4. 执行返回函数的时候绑定调用对象的上下文与参数并执行

```javascript
Function.prototype._bind = function(ctx){
  var that = this;
  var args = Array.prototype.slice.call(arguments,1);
  return function(){
    var args2 = Array.prototype.slice.call(arguments);
    var all = args.concat(args2);
    return that.apply(ctx,all)
  }
}
```

验证一下自定义的 `_bind`
```javascript
var obj1 = {name: "Albert"}
var obj2 = {name: "Overwatch"}

function sayName(){console.log(this.name)}

var b1 = sayName._bind(obj1)
var b2 = sayName._bind(obj1)._bind(obj2)
var b3 = sayName._bind(obj1).call(obj2) // => Albert

b1() // Albert
b2() // 

function getInfo(){ console.log(arguments) }

var b4 = getInfo.bind(null,"Albert","male")

b4(23) // "Albert", "male", 23
```

结果与原生的一样，貌似看起来没什么问题，但肯定不如原生的实现严谨，如果这个实现有问题的话还请告知博主~谢谢大佬~

有兴趣的小伙伴可以移步 [ Function.prototype.bind() - MDN ](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind) 查看其 `Polyfill` 写法

（完）