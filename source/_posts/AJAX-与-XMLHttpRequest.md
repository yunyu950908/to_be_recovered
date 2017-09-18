---
title: AJAX 与 XMLHttpRequest 入门
tags:
  - AJAX
  - XMLHttpRequest
categories:
  - javascript
date: 2017-09-14 01:13:03
---

## 一、 AJAX 简介

- AJAX 全称 AsynchronousJavascript+XML ==> 异步传输 + js + xml。

- 所谓异步，在这里简单地解释就是：向服务器发送请求的时候，我们不必等待结果，而是可以同时做其他的事情，等到有了结果我们可以再来处理这个事。这个很重要，如果不是这样的话，我们点完按钮，页面就会死在那里，其他的数据请求不会往下走了。这样比等待刷新似乎更加讨厌。

- 虽然提供异步通讯功能的组件默认情况下都是异步的，但它们也提供了同步选项，如果你好奇把那个默认参数为 `true` 的选项改为 `false` ，你的页面就会死在那里，等待请求结果返回之后再执行下一步操作。

- `xml` 只是一种数据格式，在这件事里并不重要，我们在更新一行字的时候理论上说不需要这个格式，但如果我们更新很多内容，那么格式化的数据可以使我们有条理地去实现更新。

- 目前大部分都是在用 `JSON` 这种格式来代替 `XML` 的，因为前者更加简洁，据说目前的解析速度也更快。

**总结：只要是 JS 调用异步通讯组件并使用格式化的数据来更新 web 页面上的内容或操作过程，那么我们用的方法就可算是 AJAX**

## 二、使用 AJAX

ok 看了上面的简介部分，是时候实际运用一波了，来来，把手伸出来

这里是一个简单的例子：
```javascript
// 定义一个存储请求 URL 地址的变量
var getWeather = "https://jirenguapi.applinzi.com/weather.php";
// 定义一个发送 AJAX 请求的函数
function sendAJAX(url){
    // 构造一个 XMLHttpRequest 实例
    var xhr = new XMLHttpRequest();
    // 调用open 方法创建一个新的 HTTP 请求，并指定此请求的方法、URL 等信息
    xhr.open("GET", url, true)
    // 调用 send 方法发送请求
    xhr.send()
    // 追踪 AJAX 请求状态
    xhr.onreadystatechange = function(){
        // 对应 readyState 值为4 表示请求完成
        if(xhr.readyState === 4){
            // 判断返回的 HTTP 状态码
            if(xhr.status === 200 || xhr === 304 ){
                // 把请求到的 JSON 格式字符串转换为 JSON 格式对象
                var yunyu = JSON.parse(xhr.responseText)
                // 控制台答应请求到的 JSON 对象
                console.log(yunyu)
            }else{
                console.log("没有拿到数据哦")
            }
        }
        xhr.onerror = function(){
            console.log("异常！异常！")
        }
    }
}
// 调用 sendAJAX 参数是最初定义的 URL
sendAJAX(getWeather)
```

请求成功后你的控制台可能会出现一个这样子的打印

![ @初尝 AJAX | center ](https://ws1.sinaimg.cn/large/889b2f7fgy1fjnstxewlmj20fx03waa9.jpg)

如果跟以上截图一样的，说明你请求成功了，怎么样 484很简单 `(*^▽^*)`

emmmm，当然也可能出现其他打印，比如请求不成功的时候,或者是一些其他问题，同时会返回其他对应的状态码。

- 关于状态码的问题，可以移步这里 [ HTTP 状态码详解 ](http://tool.oschina.net/commons?type=5)

当然，上面的例子还有其他写法，比如这样：
```javascript
function sendAJAX(url){
    var xhr = new XMLHttpRequest()
    xhr.open("GET", url, true)
    xhr.send()
    xhr.onload = function () {
        if ((xhr.status ===200 ) || xhr.status === 304) {
            console.log(JSON.parse(xhr.responseText))
        } else {
            console.log("服务器异常")
        }
    }
    xhr.onerror = function () {
        console.log("服务器异常")
    }
}
```

ok，简单了解了 AJAX 的写法之后我们来看一下它的核心部分 XMLHttpRequest

## 三、XMLHttpRequest
> XMLHttpRequest 是 AJAX 的核心部分，上面所说的 AJAX 其实只是一种技术方案，并不是一种新技术。通常所说的 AJAX 请求，实际上是使用 XMLHttpRequest 对象来发送一个 AJAX 请求。

现在我们看另一种发送请求的方法 `POST`

```javascript
function sendAJAX() {
    var xhr = new XMLHttpRequest()
// 可选，设置xhr请求的超时时间
    xhr.timeout = 3000;
    xhr.open('POST', '/register', true)
    xhr.send('username=yunyu&password=123456')

    xhr.onload = function (e) {
        if ((xhr.status === 200 ) || xhr.status === 304) {
            console.log(this.responseText)
        }
    }
// 可选
    xhr.ontimeout = function (e) {
        console.log('请求超时')
    }

// 可选
    xhr.onerror = function (e) {
        console.log('连接失败')
    }
// 可选
    xhr.upload.onprogress = function (e) {
        //如果是上传文件，可以获取上传进度
    }
}
```
当然，以上内容还只是 `xhr` 对象的冰山一角，有兴趣的同学可以看文末的参考资料，里面有详细的 `XMLHttpRequest` 描述。

### 1、获取 response 数据

`xhr` 提供了3个属性来获取请求返回的数据，分别是：`xhr.response`、`xhr.responseText`、`xhr.responseXML`

**xhr.response**
- 默认值：空字符串""
- 当请求完成时，此属性才有正确的值
- 请求未完成时，此属性的值可能是 `""` 或者 `null` ，具体与 `xhr.responseType` 有关：
当 `responseType` 为 `""` 或 `"text"` 时，值为 `""` ；`responseType` 为其他值时，值为 `null`

### 2、追踪请求当前的状态

`xhr` 对象有个只读属性 `readyState` , 这个属性可追踪到共 5 种可能值，分别对应 `xhr` 状态的不同阶段。每次 `xhr.readyState` 的值发生变化时，都会触发 `xhr.onreadystatechange` 事件，我们可以在这个事件中进行相关状态判断。

| 值 | 状态 | 描述 |
| :----: | :----: | :----: |
| `0` | `UNSENT` (初始状态，未打开) | 此时 `xhr` 对象被成功构造，`open()` 方法还未被调用 |
| `1` | `OPENED` (已打开，未发送) | `open()` 方法已被成功调用，`send()` 方法还未被调用。注意：只有 `xhr` 处于 `OPENED` 状态，才能调用 `xhr.setRequestHeader()` 和 `xhr.send()`,否则会报错 |
| `2` | `HEADERS_RECEIVED` (已获取响应头) |  `send()` 方法已经被调用, 响应头和响应状态已经返回 |
| `3` | `LOADING` (正在下载响应体) | 响应体(`response entity body`)正在下载中，此状态下通过 `xhr.response` 可能已经有了响应数据 |
| `4` | `DONE`  (整个数据传输过程结束) | 整个数据传输过程结束，不管本次请求是成功还是失败 |

### 3、通过控制台调试

- 通过打断点的方式，在 `Source` 观察源文件的数据变动。

- 最右边有个 `watch` ， `readyState` 状态变更时候， 会显示 `xhr` 对象相应的数据和状态的变动。

![@控制台调试 | center](https://ws1.sinaimg.cn/large/889b2f7fgy1fjo19spvnlj20qh098ta8.jpg)

### 4、发一个同步请求

`xhr` 默认发的是异步请求，但也支持发同步请求（当然实际开发中应该尽量避免使用）。到底是异步还是同步请求，由 `xhr.open()` 传入的 async 参数决定。

```javascript
// open 语法 参数
open(method, url [, async = true [, username = null [, password = null]]])
```

- method: 请求的方式，如GET/POST/HEADER等，这个参数不区分大小写
```javascript
xhr.open("GET", url)
xhr.open("POST", url)
```

- url: 请求的地址，可以是相对地址如example.php，这个相对是相对于当前网页的url路径；也可以是绝对地址如 http://www.example.com/example.php
```javascript
xhr.open("GET", "../../example.php")
xhr.open("GET", "http://www.example.com/example.php")
```

- async: 默认值为 true，即为异步请求，若设置为 false，则为同步请求
```javascript
xhr.open("GET", "../../example.php", true)
xhr.open("GET", "http://www.example.com/example.php", false)
```

### 5、实际使用

实际上以上内容已经包含了大部分的使用情况，你可以根据自己的需求进一步封装成一个 AJAX 组件，或者也可以使用现成的 jQuery 封装的 AJAX 组件 （jQuery.ajax()），两者功能是一样的。

当然，如果你对这方面比较感兴趣的话，我想你一定不想错过 `fetch` API ，它简化了 AJAX 的操作代码，但能够一丝不苟的做着同样的工作。但是，它目前依然只是一个实验中的功能，目前在浏览器的兼容方面还不是特别理想。

[ Fetch API - MDN ](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API)

以上，就是 AJAX 和 XMLHttpRequest 的常用玩法，其他更具体更细节的玩法可以在以下的参考资料中学习了解。

## 参考资料

[XMLHttpRequest Level 2 使用指南 - 阮一峰](http://www.ruanyifeng.com/blog/2012/09/xmlhttprequest_level_2.html)

[ XMLHttpRequest - MDN ](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest)

[ Using XMLHttpRequest - MDN ](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest)

[ AJAX tutorial ](http://www.tutorialspoint.com/ajax/index.htm)

[ 你真的会使用XMLHttpRequest吗？ - ruoyiqing ](https://segmentfault.com/a/1190000004322487)


