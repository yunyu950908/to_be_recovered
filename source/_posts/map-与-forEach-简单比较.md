---
title: map 与 forEach 简单比较
tags:
  - javascript
  - 数组
categories:
  - 数组
date: 2017-09-04 09:57:20
---

![@ | center ](https://ws1.sinaimg.cn/large/889b2f7fgy1fj7ayadcafj21hc0u0u0y.jpg)

## map 与 forEach 简单比较

>参考资料：
[MDN文档：Array.prototype.forEach()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)
[MDN文档：Array.prototype.map()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map)

## 结论

先写结论：
1. `forEach` 不会产生新数组，返回值 `undefined`
2. `map` 会返回一个新数组，不对原数组产生影响
3. `map` 因为返回新数组，所以可以链式操作（可操作性强）
4. 速度 `forEach` > `map` > `for`
（网上有说`map` > `forEach` 然而测试结果并不是）

## 一、Array.prototype.forEach()

`forEach()` 方法对数组的每个元素执行一次提供的函数。

### 语法：

```javascript
array.forEach(callback(currentValue, index, array){
    //do something
}, this)

array.forEach(callback[, thisArg])
```

**参数：**

- `callback`
为数组中每个元素执行的函数，该函数接收三个参数：

 - `currentValue(当前值)`
数组中正在处理的当前元素。

 - `index(索引)`
数组中正在处理的当前元素的索引。

 - `array`
forEach()方法正在操作的数组。

- `thisArg可选`
可选参数。当执行回调 函数时用作this的值(参考对象)。

- `返回值`
undefined.

**使用：**

示例1：注意 `callback` 和 `返回值`
```javascript
const arr = [1,2,3,"a","b","c"]
let _arr = arr.forEach((e,i,arr)=>{
	console.log(e) // 1, 2, 3, "a","b","c"
	console.log(i) // 0, 1, 2, 3, 4, 5
	console.log(arr) // 输出6次 [1, 2, 3, "a", "b", "c"]
})
console.log(_arr) // undefined
```
1、对数组的每一项都调用一次 `callback` 回调函数；
2、总是返回值 `undefined`

示例2：可选参数 `thisArg`
```javascript
class Calculate{
	constructor(x,y){
		this.x = 0;
		this.y = 0;
	}
	sum(array){
		array.forEach(function(e){
			this.x += e;
			++this.y;
		},this)
		console.log(this); // 指向该构造函数
	}
}

const obj = new Calculate();
obj.sum([1,2,3,4]);

console.log(obj.x) // 10
console.log(obj.y) // 4
```
1、`thisArg` 参数 (this) 传给了`forEach()`
2、每次调用时，它都被传给 `callback` 函数，作为它的`this`值

示例3：`forEach()` 不会在迭代之前创建数组的副本
```javascript
const words = ["one","two","three","four"];
words.forEach((word)=>{
	console.log(word); // "one","two","four"
	if(word === "two"){
		words.shift(); // "two"输出完后删除了第一项，索引改变
	}
})
```
遍历 `two` 后，整个数组的第一个项被移除了，导致所有剩余项索引 `-1`，而下一次执行回调遍历的那一项索引依旧 `+1`，所以`three`被跳过了。

## Array.prototype.map()

`map()` 方法创建一个新数组，其结果是该数组中的每个元素都调用一个提供的函数后返回的结果。

### 语法：

```javascript
let array = arr.map(function callback(currentValue, index, array) {
    // Return element for new_array
}[, thisArg])
```

**参数：**

- `callback`
生成新数组元素的函数，使用三个参数：
 - `currentValue`
callback 的第一个参数，数组中正在处理的当前元素。
  - `index`
callback 的第二个参数，数组中正在处理的当前元素的索引。
 - `array`
callback 的第三个参数，map 方法被调用的数组。
- `thisArg`
可选的。执行 callback 函数时 使用的this 值。
- `返回值`（与 `forEach` 最大的不同点）
一个新数组，每个元素都是回调函数的结果。

**使用：**

示例1：`map` 方法返回处理后的数组，不修改原数组
```javascript
const numbers = [1, 4, 9];
let roots = numbers.map(Math.sqrt);
// roots的值为[1, 2, 3], numbers的值仍为[1, 4, 9]
```

示例2：格式化数组中的对象
```javascript
const kvArray = [{key: 1, value: 10},
               {key: 2, value: 20},
               {key: 3, value: 30}];

let reformattedArray = kvArray.map(function(obj) {
   let rObj = {};
   rObj[obj.key] = obj.value;
   return rObj;
});

// reformattedArray = [{key: 1, value: 10}, {key: 2, value: 20}, {key: 3, value: 30}];
```

示例3：在类数组集合上调用，利用 `call` 改变 `this` 指向
```javascript
const oLis = document.querySelectorAll("ul li");
let arrOlis = Array.prototype.map.call(oLis，function(e){
	return e.value;
})
```

示例4：反转字符串，原理同上（示例3）；链式调用（返回新数组）
```javascript
const str = "12345";
let _str = Array.prototype.map.call(str,x=>{
	return x;
}).reverse().join("");
// _str = "54321";
// str = "12345";
```

## 性能对比

```javascript
let arr1 = [];
for(let i=0; i<50000; i++){
  arr1.push(i)
}
const start = Date.now()

// forEach ==> 2ms ~ 3ms
// let arr2 = [];
// arr1.forEach((e)=>arr2.push(e*2))

// map ==> 10ms ~ 13ms
// let arr2 = arr1.map(e=>return e*2)

// for ==> 20ms ~ 26ms
// let arr2 = [];
// for(let i = 0;i<arr1.length;i++){
//   arr2[i] = arr1[1]
// }

const end = Date.now()
console.log(end-start)
```

通过以上的代码测试，速度方面 `forEach` > `map` > `for`

**但是** 由于前端处理数据的局限性，速度并不是我们实际使用考虑的因素，实际情况是：
1. 代码量：`map` > `forEach` > `for`
2. 代码量：`map` > `forEach` > `for`
3. 代码量：`map` > `forEach` > `for`

综上，如果出于 `代码量` 和 `链式调用` 的需求，用 `map` 可能会更好一些。

（完）

