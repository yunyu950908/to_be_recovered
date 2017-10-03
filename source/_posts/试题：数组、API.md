---
title: '试题：数组、API'
tags:
  - 数组
  - 试题
  - javascript
categories:
  - javascript
  - 试题
date: 2017-09-06 12:32:51
---

![@ | center](https://ws1.sinaimg.cn/large/889b2f7fgy1fjek1gv39wj20sg0iy131.jpg)

## 试题：数组、API

>试题来源：https://www.nowcoder.com/
>注意：答题器不支持ES6语法

## 前排提示
尽量用不同的 API 去实现题目需求，这样才能更快掌握更多的 API
参考 API 都在这里：[JavaScript 标准库：Array](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)

**前排提示x2：一定要注意 API 的返回值！**

## 1. 查找数组元素位置
找出元素 item 在给定数组 arr 中的位置
如果数组中存在 item，则返回元素在数组中的位置，否则返回 -1

```javascript
function indexOf(arr, item){
	/* your code here */
}
```

|输入|[ 1, 2, 3, 4 ], 3|
|---|---|
|输出|2|

- indexOf + map
```javascript
function indexOf(arr, item) {
    if(Array.prototype.indexOf){
        return arr.indexOf(item)
    }else{
        var index;
        arr.map(function(e,i){
            if(e === item){
                index = i;
            }
        })
        return index;
    }
    return -1;
}
```

## 2. 数组求和
计算给定数组 arr 中所有元素的总和
数组中的元素均为 Number 类型

```javascript
function sum(arr) {
	/* your code here */
}
```

|输入|[ 1, 2, 3, 4 ]|
|---|---|
|输出|10|

- 递归 + slice
```javascript
function sum(arr) {
	var len = arr.length;
    if(len === 0){
        return 0;
    }else if(len === 1){
        return arr[0];
    }else{
        return arr[0] + sum(arr.slice(1))
    }
}
```

- reduce
```javascript
function sum(arr) {
	return arr.reduce(function(prev,curr,idx,arr){
        return prev + curr;
    })
}
```

## 3. 移除数组中的元素
移除数组 arr 中的所有值与 item 相等的元素。不要直接修改数组 arr，结果返回新的数组

```javascript
function remove(arr, item) {
	/* your code here */
}
```

|输入|[1, 2, 3, 4, 2], 2|
|---|---|
|输出|[1, 3, 4]|

- filter
```javascript
function remove(arr,item){
	return arr.filter(function(e){
		return e !== item;
	})
}
```

- slice + splice
```javascript
function remove(arr,item){
	var newArr = arr.slice(0);
    for(var i=0,len=newArr.length; i<len; i++){
        if(newArr[i]===item){
			newArr.splice(i,1) // PS：这样会改变后面每一项的索引，当然有更好的写法
            i--;
        }
    }
    return newArr;
}
```

## 4. 移除数组中的元素
移除数组 arr 中的所有值与 item 相等的元素，直接在给定的 arr 数组上进行操作，并将结果返回

```javascript
function removeWithoutCopy(arr, item) {
	/* your code here */
}
```

|输入|[1, 2, 2, 3, 4, 2, 2], 2|
|---|---|
|输出|[1, 3, 4]|

- while
```javascript
function removeWithoutCopy(arr, item) {
	while(arr.indexOf(item)!==-1){
        arr.splice(arr.indexOf(item),1)
    }
    return arr;
}
```

## 5. 添加元素
在数组 arr 末尾添加元素 item。不要直接修改数组 arr，结果返回新的数组


```javascript
function append(arr, item) {
	/* your code here */
}
```

|输入|[1, 2, 3, 4],  10|
|---|---|
|输出|[1, 2, 3, 4, 10]|

- concat
```javascript
function append(arr, item) {
	return arr.concat(item)
}
```

## 6. 删除数组最后一个元素
删除数组 arr 最后一个元素。不要直接修改数组 arr，结果返回新的数组

```javascript
function truncate(arr) {
	/* your code here */
}
```

|输入|[1, 2, 3, 4]|
|---|---|
|输出|[1, 2, 3]|

- pop + slice
```javascript
function truncate(arr) {
	var newArr = arr.slice(0);
    newArr.pop();
    return newArr;
}
```

## 7. 在数组开头添加元素
在数组 arr 开头添加元素 item。不要直接修改数组 arr，结果返回新的数组

```javascript
function prepend(arr, item) {
	/* your code here */
}
```

|输入|[1, 2, 3, 4], 10|
|---|---|
|输出|[1, 2, 3, 4], 10|

- slice + unshift
```javascript
function prepend(arr, item) {
    var newArr = arr.slice(0)
    newArr.unshift(item)
    return newArr
}
```

## 8. 删除数组第一个元素
删除数组 arr 第一个元素。不要直接修改数组 arr，结果返回新的数组

```javascript
function curtail(arr) {
	/* your code here */
}
```

|输入|[1, 2, 3, 4]|
|---|---|
|输出|[2, 3, 4]|

- concat + shift
```javascript
function curtail(arr) {
	var newArr = arr.concat()
    newArr.shift()
    return newArr
}
```

## 9. 数组合并
合并数组 arr1 和数组 arr2。不要直接修改数组 arr，结果返回新的数组

```javascript
function concat(arr1, arr2) {
	/* your code here */
}
```

|输入|[1, 2, 3, 4], ['a', 'b', 'c', 1]|
|---|---|
|输出|[1, 2, 3, 4, 'a', 'b', 'c', 1]|

- slice + push +apply
```javascript
function concat(arr1, arr2) {
	var newArr = arr1.slice(0);
    Array.prototype.push.apply(newArr,arr2);
    return newArr;
}
```

## 10. 在数组中间添加元素
在数组 arr 的 index 处添加元素 item。不要直接修改数组 arr，结果返回新的数组

```javascript
function insert(arr, item, index) {
	/* your code here */
}
```

|输入|[1, 2, 3, 4], 'z', 2|
|---|---|
|输出|[1, 2, 'z', 3, 4]|

- slice + splice
```javascript
function insert(arr, item, index) {
    var newArr = arr.slice(0);
    newArr.splice(index,0,item);
    return newArr;
}
```

## 11. 计数
统计数组 arr 中值等于 item 的元素出现的次数


```javascript
function count(arr, item) {
	/* your code here */
}
```

|输入|[1, 2, 4, 4, 3, 4, 3], 4|
|---|---|
|输出|3|

- filter
```javascript
function count(arr, item) {
	var newArr = arr.filter(function(e){
        return e === item;
    });
    return newArr.length;
}
```

## 12. 查找重复元素

```javascript
function duplicates(arr) {
	/* your code here */
}
```

|输入|[1, 2, 4, 4, 3, 3, 1, 5, 3]|
|---|---|
|输出|[1, 3, 4]|

- indexOf + lastIndexOf
```javascript
function duplicates(arr) {
	var newArr = [];
    arr.forEach(function(e,i){
        if(newArr.indexOf(e)===-1 && arr.indexOf(e)!==-1 && arr.indexOf(e)!== arr.lastIndexOf(e)){
            newArr.push(e);
        }
    })
    return newArr;
}
```

## 13. 求二次方
为数组 arr 中的每个元素求二次方。不要直接修改数组 arr，结果返回新的数组

```javascript
function square(arr) {
	/* your code here */
}
```

|输入|[1, 2, 3, 4]|
|---|---|
|输出|[1, 4, 9, 16]|

- map
```javascript
function square(arr) {
	return arr.map(function(e){
        return e*e
    })
}
```

## 14. 查找元素位置
在数组 arr 中，查找值与 item 相等的元素出现的所有位置

```javascript
function findAllOccurrences(arr, target) {
	/* your code here */
}
```

|输入|'abcdefabc','a'|
|---|---|
|输出|[0,6]|

- forEach + || + push
```javascript
function findAllOccurrences(arr, target) {
var temp = [];
    arr.forEach(function(e,i){
        e !== target || temp.push(i);
    });
    return temp;
}
```

## 总结

以上 14 道数组类型的题目，按照本文的解题思路走下来，通过参考 [MDN 文档](https://developer.mozilla.org/zh-CN/)，你可能学习掌握了以下 API ：

- 以下所有数组 API 你都可以在这里找到：[JavaScript 标准库：Array](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)

1. Array.length
2. Array.prototype.concat()
3. Array.prototype.filter()
4. Array.prototype.forEach()
5. Array.prototype.indexOf()
6. Array.prototype.lastIndexOf()
7. Array.prototype.map()
8. Array.prototype.pop()
9. Array.prototype.push()
10. Array.prototype.reduce()
11. Array.prototype.shift()
12. Array.prototype.slice()
13. Array.prototype.splice()
14. Array.prototype.unshift()
15. [Function.prototype.apply()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)

（完）