---
title: 手写一个 new 操作符
tags:
  - javascript
  - 原型链
categories:
  - javascript
date: 2017-10-03 15:57:45
---

>原型链必备知识，记录一下。

先来看看 new 操作符干了什么事情

```javascript
function F(name,age){
  this.name = name;
  this.age = age;
}

F.prototype = {
  getInfo: function(){
    console.log("name: " + this.name)
    console.log("age: " + this.age)
  }
}

var f = new F("Albert",23)

f.getInfo()

console.log(f)
```

下面是 控制台 log 出的 小f 的内容：

![ @console.log(f) ](https://ws1.sinaimg.cn/large/889b2f7fgy1fk54xwa9s4j207k03oglk.jpg)

现在我们大概可以知道 new 的时候大概做了这么几件事

1. 生成了一个新对象
2. 设置了新对象的原形指向构造函数的原形
3. 设置构造函数实例对象的属性（绑定 this）

知道了 new 操作符暗地里做的苟且之事之后就很容易把这货写出来

```javascript
function myNew(F,...args){
  var obj = Object.create(F.prototype); // 使用指定的原型对象及其属性去创建一个新的对象
  F.apply(obj,args); // 绑定 this 到obj, 设置 obj 的属性
  return obj; // 返回实例
}
```

现在来试一下

```javascript
function FF(a,b){
  this.a = a;
  this.b = b;
}

FF.prototype.test = function(){
  console.log(this.a+" success "+this.b)
}

var ff = myNew(FF,"Am I","?")

ff.test()

console.log(ff)

```

看一眼控制台，貌似没什么问题。。

![ @console.log(ff) ](https://ws1.sinaimg.cn/large/889b2f7fgy1fk572yg1slj207703jmx3.jpg)

emmmmmmm, 一个简易的 new 操作符就实现了，当然不是太严谨，没有控制它传进来的 F ，其他有问题的请一定告诉我。

（完）