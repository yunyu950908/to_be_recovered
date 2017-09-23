---
title: HTTP 基础
tags:
  - HTTP
  - 报文
  - URL&URI
categories:
  - HTTP
date: 2017-09-22 07:35:21
---
## 一、HTTP 工作原理

### 1、HTTP 简介

借用维基百科的定义：[维基百科：超文本传输协议](https://zh.wikipedia.org/wiki/%E8%B6%85%E6%96%87%E6%9C%AC%E4%BC%A0%E8%BE%93%E5%8D%8F%E8%AE%AE)
超文本传输协议（英文：HyperText Transfer Protocol，缩写：HTTP）是一种用于分布式、协作式和超媒体信息系统的应用层协议。`HTTP` 是万维网数据通信的基础。

`HTTP` 是一个客户端终端（用户）和服务器端（网站）请求和应答的标准。`HTTP` 可以在任何互联网协议上，或其他网络上实现。`HTTP` 假定其下层协议提供可靠的传输。因此，任何能够提供这种保证的协议都可以被其使用。因此也就是其在 `TCP/IP` 协议族使用 `TCP` 作为其传输层。

### 2、HTTP 协议所在的协议层

在 `OSI` 七层模型 或 `TCP/IP` 四层模型中，`HTTP` 居于应用层，用于规定会话协议。

（如果不清楚两种模型，可以查看我的另一篇介绍这两个网络模型的文章）

### 3、HTTP 通讯过程（请求 / 响应）

1. 客户端连接到服务器
`HTTP` 客户端创建一个请求，打开一个端口（默认 80）， `HTTP` 服务器监听端口，双方建立一个`TCP` 连接。

2. 发送 `HTTP` 请求
通过 `TCP` 连接，客户端向服务器发送一个文本的请求报文。
一个请求报文由 `请求行`、`请求头部`、`空行` 和 `请求数据` 4部分组成。

3. 服务器接受请求并返回 `HTTP` 响应
服务器解析请求，定位请求资源。服务器将资源复本写到 `TCP` ，由客户端读取。
一个响应由 `状态行`、`响应头部`、`空行` 和 `响应数据` 4部分组成。

4. 释放 `TCP` 连接
服务器主动关闭释放 `TCP` 连接；客户端被动关闭释放 `TCP` 连接。

5. 客户端解析响应内容
客户端首先解析状态行，查看表明请求是否成功的`状态码`。然后解析每一个`响应头`响应头告知以下响应体为若干字节的文档和文档的字符集。客户端读取响应数据，根据响应告知的规定语法对其进行格式化，并在客户端显示。

### 4、HTTP协议的无状态性

`HTTP` 协议是无状态的（stateless）。

也就是说，同一个客户端第二次访问同一个服务器上的页面时，服务器无法知道这个客户端曾经访问过，服务器也无法分辨不同的客户端。

`HTTP` 的无状态特性简化了服务器的设计，使服务器更容易支持大量并发的 `HTTP` 请求。

### 5、持久连接

- `HTTP1.0` 使用的是非持久连接，客户端必须为每一个待请求的对象建立并维护一个新的连接。因为同一个页面可能存在多个对象，所以非持久连接可能使一个页面的下载变得十分缓慢，而且这种短连接增加了网络传输的负担。

- `HTTP1.1` 引入了持久连接，允许在同一个连接中存在多次数据请求和响应，即在持久连接情况下，服务器在发送完响应后并不关闭 `TCP` 连接，而客户端可以通过这个连接继续请求其他对象。


##  二、HTTP 协议和服务器交互的几种方法

HTTP最大的作用就是客户端发送请求，服务器给出响应，客户端想服务器发送请求的方式有很多

### 1. GET

`GET` 是最常用的方法，通常用于请求服务器发送某个资源

我们平时在浏览器输入网页地址，就是给服务器发送了一个 `GET` 请求，希望得到这个网页

### 2. HEAD

`HEAD` 方法和 `GET` 类似，但是在服务器的响应中没有资源的内容，只有资源的一些基本信息，主要用于：

- 在不获取资源的情况下获取资源信息（类型、大小等）
- 通过状态码产看资源是否存在
- 通过查看首部，测试资源是否被修改了

### 3. PUT

和 `GET` 从服务器获取资源相反，`PUT` 用于想服务器写入资源。PUT的语义就是让服务器用请求的主体部分创建一个请求URL命名的文档，如果存在就替换

当然处于安全原因，并不是所有的服务器都实现，RESTful API 使它有了用武之地

### 4. POST

`POST` 用于想服务器发送数据，通常用来支持 `HTML` 的表单（input、select、textarea），表单中的数据会被发送到服务器

### 5. TRACE

客户端发送一个请求的时候，这个请求可能会穿过防火墙、代理、网关和一些其它应用程序，没个中间节点都可能修改HTTP请求，`TRACE` 方法允许客户端在最终请求发往服务器的时候，看看它变成了什么样子

`TRACE` 请求会在目的服务器端发送一个“闭环”诊断，行程最后一站服务器会弹回一条` TRACE` 响应，并在响应主题中携带它收到的原始请求报文

### 6. DELETE

`DELETE` 方法用于要求服务器删除请求的URL，和PUT一样，服务器可能会不支持

### 7. OPTIONS

`OPTIONS` 方法用于请求 web服务器告知其支持的各种功能

## 三、状态码

完整的 `HTTP 1.1` 规范说明书来自于 `RFC 2616`，`HTTP 1.1` 的状态码被标记为新特性，用来表示请求的结果，状态码被分为五大类：

1. `100-199` 用于指定客户端应相应的某些动作。
2. `200-299` 用于表示请求成功。
3. `300-399` 用于已经移动的文件并且常被包含在定位头信息中指定新的地址信息。
4. `400-499` 用于指出客户端的错误。
5. `500-599` 用于支持服务器错误。

PS：你闲着无聊也可以手动指定返回的状态码 =。=

### 常见的状态码有以下几种：

1. 200	OK	一切正常，对GET和POST请求的应答文档跟在后面。

2. 301	Moved Permanently	客户请求的文档在其他地方，新的URL在Location头中给出，浏览器应该自动地访问新的URL。

3. 304	Not Modified	客户端有缓冲的文档并发出了一个条件性的请求（一般是提供If-Modified-Since头表示客户只想比指定日期更新的文档）。服务器告 诉客户，原来缓冲的文档还可以继续使用。

4. 403	Forbidden	资源不可用。服务器理解客户的请求，但拒绝处理它。通常由于服务器上文件或目录的权限设置导致。

5. 404	Not Found	无法找到指定位置的资源。这也是一个常用的应答。

6. 500	Internal Server Error	服务器遇到了意料不到的情况，不能完成客户的请求。

7. 503	Service Unavailable	服务器由于维护或者负载过重未能应答。例如，Servlet可能在数据库连接池已满的情况下返回503。服务器返回503时可以提供一个 Retry-After头。

[状态码详解常用对照表](http://tool.oschina.net/commons?type=5)

## 四、报文

`HTTP` 报文是在 `HTTP` 应用程序之间发送的数据块。这些数据块以一些文本形式的`元信息`开头，描述报文的内容及含义，后面跟着可选的数据部分

### 1、报文组成

HTTP 报文是简单的格式化数据块，没个报文都包含一条来自客户端的请求或者一条来自服务器的响应，由3个部分组成

1.  对报文进行描述的起始行 —— `start line`
2.  包含属性的首部块 —— `header`
3.  可选的包含数据的主体部分 —— `body`
```
HTTP/1.0 200 OK
content-type: text/plain
content-length: 19

Hi, I'm a message
```

起始行和首部就是由行分隔的 `ASCII` 文本，主题是一个可选的数据块，可能是文本、二进制或者空

### 2、 语法

`HTTP` 报文分为两类

- **请求报文：**

向web服务器请求一个动作

```
<method><request-URL><version>
<headers>

<entity-body>
```

- **响应报文：**

讲请求结果返回给客户端

```
<version><status><reason-phrase>
<headers>

<entity-body>
```

首部和方法配合，共同决定了服务器和客户端能做什么，下面是一些常见的报文字段：

### 3、报文示例

- **请求头的格式和作用**
```bash
# 请求起始行 start line
# POST 表示请求方法
# URL 指明了请求访问的资源对象
# HTTP/1.1 即请求协议与版本号
POST https://jscode.me/message-bus/917f95b18b8841138ea51ea1af878f72/poll?dlp=t HTTP/1.1
```

- **首部的格式和作用**
```bash
# 接下来是可选的请求首部字段 header
# HOST 接收请求的服务器的主机名和端口号
Host: jscode.me
# Connection 客户端和服务器是否保持连接
Connection: keep-alive
# Content-Length 主体的长度
Content-Length: 371
#  Origin 指示了请求来自于哪个站点,该首部用于 CORS 请求或者 POST 请求
Origin: https://jscode.me
# X-CSRF-Token 防止 CSRF 跨站脚本攻击
X-CSRF-Token: 42oPwTGaqQN3SRcAnjz3D1MeFBnADDw6j3hS95WprB00lx93vLop6DIqTTtRRPZ8PXeNlv4yWtmgiGALNbY/qQ==
# User-Agent 识别发起请求的用户代理软件的应用类型、操作系统、软件开发商以及版本号
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.79 Safari/537.36
# Content-Type 主体的MIME
Content-Type: application/x-www-form-urlencoded; charset=UTF-8
# Accept 告诉服务器能够发送那些媒体类型
Accept: application/json, text/javascript, */*; q=0.01
# Referer 提供了包含当前请求URI的文档的URL，告诉服务器自己来源
Referer: https://jscode.me/t/http/288
# Accept-Encoding 告诉服务器能够发送那些编码
Accept-Encoding: gzip, deflate, br
# Accept-Language 告诉服务器能够发送那些语言
Accept-Language: zh-CN,zh;q=0.8
# Cookie 客户端字符串
Cookie: _t=23a29867bd9011b80730c50692ee0db3;
```

- **主体的格式和作用**
```bash
# 体 body 与请求首部 header 之间要空一行( 必须 )

# ( 可选 )请求主体 body
# 任何自定义的内容
videoId=2257
```

### 4、常用首部字段

- **通用首部**

客户端和服务器都可以实用的就是通用首部

| 首部 | 描述 |
| --- | --- |
| Connection | 客户端和服务器是否保持连接 |
| Date | 日期，报文创建时间 |
| Update | 给出了发送端可能想要升级使用新版本或协议 |
| Via | 显示了报文经过的中间节点（代理、网关） |
| Trailer | 如果报文采用分块传输编码方式，可以利用这个首部列出位于报文trailer部分的首部集合 |
| Trailer-Encoding | 告诉接收端对报文采用什么编码格式 |
| Cache-Control | 随报文传送缓存指示 |
| Pragma | 早期的随报文传送指示方式 |

- **请求首部**

| 首部 | 描述 |
| --- | --- |
| Client-IP | 客户端IP |
| From | 客户端邮件地址 |
| Host | 接收请求的服务器的主机名和端口号 |
| Referer | 提供了包含当前请求URI的文档的URL，告诉服务器自己来源 |
| User—Agent | 发起请求的客户端应用程序 |
| Accept | 告诉服务器能够发送那些媒体类型 |
| Accept-Charset | 告诉服务器能够发送那些字符集 |
| Accept-Encoding | 告诉服务器能够发送那些编码 |
| Accept-Language | 告诉服务器能够发送那些语言 |
| Expect | 允许客户端列出请求所要求的服务器行为 |
| If-Match | 如果ETag和文档当前ETag匹配，就获取文档 |
| If-Modified-Since | 除非在某个指定日期之后修改过，否则限制这个请求 |
| If-None-Match | 如果ETag和当前文档ETag不符合，获取资源 |
| If-Range | 允许对文档否个范围内的条件请求 |
| If-Unmodified-Since | 在某个指定日期之后没有修改过，否则现在请求 |
| Cookie | 客户端字符串 |

- **响应首部**

| 首部 | 描述 |
| --- | --- |
| Age | 响应持续时间 |
| Server | 服务器应用软件名称和版本 |
| Allow | 列出了可用的请求方法 |
| Location | 告诉客户端实在在哪里，用于定向 |
| Content-Base | 解析主体中相对URL的基础URL |
| Content-Encoding | 主体编码格式 |
| Content-Language | 解析主体时适用的语言 |
| Content-Length | 主体的长度或尺寸 |
| Content-Location | 资源实际位置 |
| Content-MD5 | 主体的MD5校验和 |
| Content-Range | 在整个资源中此实体部分的字节范围 |
| Content-Type | 主体的MIME |
| ETag | 主体的实体标记 |
| Expires | 过期时间 |
| Last-Modified | 实体最后一次修改时间 |

## 五、URI 与 URL

- **URI：**统一资源标识符（Uniform Resource Identifier)，表示某一具体的互联网资源。

- **URL：**统一资源定位符( Uniform Resource Locator )，URI 的子集，表示资源的地点（通过位置描述资源）。

举个例子：
这是一个完整的 URI 地址：
```http
https://user:pass@www.example.cn:443/dir1/dir2/index.html?uid=1#ch1
```

现在我们拆分一下：

| 拆解                  | 释义      |
|-----------------------|-----------|
| https://              | 协议方案名     |
| user:pass@            | （可选）登录信息  |
| www.example.cn        | 服务器地址     |
| :443                  | （可选）端口号   |
| /dir1/dir2/index.html | 带层次的文件路径  |
| ?uid=1                | （可选）查询字符串 |
| #ch1                  | （可选）片段标识符 |

现在我们知道了通用的 URI 大概由9部分组成：
```http
<scheme>://<user>:<password>@<host>:<port>/<path>/<params>?<query>#<hash>
```

去除可选部分的 URI 可以长这样（度娘首页）
```http
https://www.baidu.com/index.html
```


理解 URI 和 URL 的区别，我们引入 URN 这个概念：
```bash
URI = Universal Resource Identifier 统一资源标志符
URL = Universal Resource Locator 统一资源定位符
URN = Universal Resource Name 统一资源名称
```
![@URI = URL + URN | center](https://pic2.zhimg.com/50/f66f9f573436858aeeb2ac3da732f5a9_hd.png)

不清楚 URL 与 URI 的区别？
[知乎：HTTP 协议中 URI 和 URL 有什么区别？](https://www.zhihu.com/question/21950864)
[Stack Overflow：What is the difference between a URI, a URL and a URN?](https://stackoverflow.com/questions/176264/what-is-the-difference-between-a-uri-a-url-and-a-urn)
[维基百科：统一资源标志符](https://zh.wikipedia.org/wiki/%E7%BB%9F%E4%B8%80%E8%B5%84%E6%BA%90%E6%A0%87%E5%BF%97%E7%AC%A6)

## 其他

更多 HTTP 相关的内容可以参考：
[HTTP - MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTTP)

（完）