---
title: 低版本IE支持HTML5
tags:
  - HTML5
  - IE
categories:
  - HTML
date: 2017-08-24 02:38:03
---

![@|center](https://ws1.sinaimg.cn/large/889b2f7fgy1fj7bdywogtj21hc0u0aj2.jpg)

# 如何让低版本的 IE 支持 HTML5新标签

## 1. 利用条件注释针对 `IE` 来调用这个 `JS` 文件。

`Opera`，`FireFox` 等其他非 `IE` 浏览器就会忽视这段代码，也不会存在 `http` 请求。
引用 `html5shiv.js` 文件，代码内容可以自己下载下来看。

[BootCDN-html5shiv](http://www.bootcdn.cn/html5shiv/)

```javascript
<!--[if lt IE 9]>
    <script src="bower_components/html5shiv/dist/html5shiv.js"></script>
<![endif]-->
```

将以上代码放到 `head` 标签区间，由于现在国内网络环境（你懂的QAQ），直接引入外部 `JS`会让网页打开非常慢，所以建议大家先下载到服务器上，再进行本地文件的引用。

[更多细节参考：The HTML5 Shiv](https://github.com/aFarkas/html5shiv)

## 2. 用JS创建元素，然后添加CSS属性：

```javascript
// 页面头部
(function () {
    var a = ['article', 'aside', 'details', 'figcaption', 'figure', 'footer', 'header', 'hgroup', 'nav', 'section'];
    for (var i = 0, j = a.length; i < j; i++) {
        document.createElement(a[i]);
    }
})();
```

同理，可以用类数组转为数组：

```javascript
// 页面头部
function createHtml5Mark() {
    // arguments 序列化成数组
    var args = Array.prototype.slice.call(arguments, 0);
    argLen = args.length,
        doc = document;
    // 循环数据创建元素
    for (var i = 0; i < argLen; i++) {
        doc.createElement(args[i]);
    }
}

createHtml5Mark('article', 'aside', 'details', 'figcaption', 'figure', 'footer', 'header', 'hgroup', 'nav', 'section');
```

最后，需要在CSS添加属性：

```css
section,article,nav,header,footer{display:block;}
```
（完）