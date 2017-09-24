---
title: CSRF 跨站请求伪造
tags:
  - CSRF
  - HTTP
categories:
  - HTTP
date: 2017-09-23 18:36:37
---
# CSRF 跨站请求伪造

## 一、什么是 CSRF

引自维基百科：[跨站请求伪造](https://zh.wikipedia.org/wiki/%E8%B7%A8%E7%AB%99%E8%AF%B7%E6%B1%82%E4%BC%AA%E9%80%A0)

>跨站请求伪造（英语：Cross-site request forgery），也被称为 one-click attack 或者 session riding，通常缩写为 CSRF 或者 XSRF， 是一种挟制用户在当前已登录的Web应用程序上执行非本意的操作的攻击方法。跟跨网站脚本（XSS）相比，XSS 利用的是用户对指定网站的信任，CSRF 利用的是网站对用户网页浏览器的信任。

## 二、发起 CSRF 攻击

一个防御薄弱的站点，发起 CSRF 攻击特别容易，多数情况下利用浏览器自动加载某些资源的机制发起一个 CSRF 攻击。我们直接举个例子形象地说明 CSRF 攻击原理。

#### 举个栗子

![@检查 Referer 字段 | center](https://ws1.sinaimg.cn/large/889b2f7fgy1fjtn77s5amj207106twfg.jpg)

1. 比如你访问了一个银行网站 A，此时浏览器就有了你在此银行网站上登录的 cookie 记录。

2. 然后你因为某些不可描述的原因访问了某危险网站 B，这个网站有个 `<img>` 标签：( 浏览器加载资源的时候 `img` 标签中 `src` 记录的资源会自动加载 )
`<img src="http://www.examplebank.com/account=youraccount&amount=1000&payfor=Badman" >`

3. 但是，这个 `<img>` 标签的 `src` 属性不是一个图片资源的请求，而是向银行网站A 发起一个转账请求（上面 `<img>` 标签中 `src` 的意思是在银行 A 网站上从你的账户中转账 1000 给账户 Badman），恰好你的浏览器里保留了你登录银行网站 A 的 cookie，这样 `src` 内发起的请求就会得到响应，然后你的钱就没了 QAQ

4. 更可怕的是请求响应后可能继续触发某个 `delete` 转账记录的请求，这样你自己都不知道钱跑哪儿去了。

## 三、防御 CSRF

### 1、验证码机制

限制用户的某些敏感操作，通过添加验证码来识别是不是用户主动去发起这个请求，由于一定强度的验证码机器无法识别，因此危险网站不能伪造一个完整的请求。

优点：简单粗暴，低成本，可靠，能防范99.99%的攻击者。

缺点：对用户不友好。

### 2、检查  Referer 字段

`HTTP` 头中有一个 `Referer` 字段，这个字段用以标明请求来源于哪个地址。在处理敏感数据请求时，通常来说，`Referer` 字段应和请求的地址位于 [ 同一域名 ] 下。而如果是 `CSRF` 攻击传来的请求，`Referer` 字段会是包含恶意网址的地址，而不是 [ 同一域名 ] 之下，这时候服务器就能识别出恶意的访问。

这种办法简单易行，工作量低，仅需要在关键访问处增加一步校验。但这种办法也有其局限性，因其完全依赖浏览器发送正确的 `Referer` 字段。虽然 `http` 协议对此字段的内容有明确的规定，但并无法保证来访的浏览器的具体实现，亦无法保证浏览器没有安全漏洞影响到此字段。并且也存在攻击者攻击某些浏览器，篡改其`Referer` 字段的可能。

#### 举个栗子

![@检查 Referer 字段 | center](https://ws1.sinaimg.cn/large/889b2f7fgy1fjtn77s5amj207106twfg.jpg)

比如当你使用支付宝转账的时候，用户必须先登录支付宝网站，然后通过点击页面的的按钮来触发转账事件。

```http
http://zhifubao.com/withdraw?account=lyq&amount=10000&for=xxx
```

此时，转账请求的 `Referer` 值就是转账页面所在的 `URL`，通常是以 `zhifubao.com` 域名开头的地址，如果不是，服务器则拒绝请求。

此方法看似挺完美，实际上是这样的：
1. 兼容性不好：每个浏览器对于 `Referer` 的具体实现可能有差别。
2. 并不一定可靠：在一些古老的垃圾浏览器中， `Referer` 可以被篡改。
3. 对用户不友好：`Referer` 值会记录下用户的访问来源，有些用户认为这样会侵犯到他们自己的隐私权。因此有些用户可能会开启浏览器防止跟踪功能，不提供 `Referer` ，从而导致正常用户请求被拒绝。

所以，更多情况下我们都使用下面介绍的第三种方法：添加校验 `_csrf_token`

### 3、 添加校验 `token`

由于 `CSRF` 的本质在于攻击者欺骗用户去访问自己设置的地址，所以如果要求在访问敏感数据请求时，要求用户浏览器提供不保存在 `cookie` 中，并且攻击者无法伪造的数据作为校验，那么攻击者就无法再执行 `CSRF` 攻击。

这种数据通常是表单中的一个数据项。服务器将其生成并附加在表单中，其内容是一个伪乱数。

当客户端通过表单提交请求时，这个伪乱数也一并提交上去以供校验。

正常的访问时，客户端浏览器能够正确得到并传回这个伪乱数，而通过`CSRF` 传来的欺骗性攻击中，攻击者无从事先得知这个伪乱数的值，服务器端就会因为校验 `token` 的值为空或者错误，拒绝这个可疑请求。

#### 再举栗子

![@添加 _csrf_token | center](https://ws1.sinaimg.cn/large/889b2f7fgy1fjtn77s5amj207106twfg.jpg)

有一个 `anti-csrf-token` 方案， 具体过程如下：

服务端在收到路由请求时，生成一个随机数，在渲染请求页面时把随机数埋入页面

```javascript
// 一般埋入 form 表单内
<input type="hidden" name="_csrf_token" value="xxxx">
```

服务端设置 `setCookie` ，把该随机数作为 `cookie` 或者 `session` 种入用户浏览器
当用户发送 `GET` 或者 `POST` 请求时带上 `_csrf_token` 参数（对于 `Form` 表单直接提交即可，因为会自动把当前表单内所有的 `input ` 提交给后台，包括 `_csrf_token`）

后台在接受到请求后解析请求的 `cookie` 获取`_csrf_token` 的值，然后和用户请求提交的`_csrf_token` 做个比较，如果相等表示请求是合法的。

![@1688 网的 _csrf_token 设置 | center](http://oux9sg1nc.bkt.clouddn.com/17-9-23/56417055.jpg)

![@控制台查看 session | center](http://oux9sg1nc.bkt.clouddn.com/17-9-23/86150019.jpg)

PS：注意这里页面上设置的 `token` 和 `session` 里设置的 `token`  不直接相等，实际上是用了 MD5 包了一层，发送到后台后还是很容易计算的。

```bash
md5('1474357164624') === '4bd4e512b0fbd9357150649adadedd4e'
```

#### 注意事项：

使用 [ 校验 token ] 需要注意以下两点：

1. 先写结论：`Token 保存在 Session 中`

做个假设：`token 保存在 cookie 中`

 假如`Token` 保存在 `Cookie` 中，用户浏览器开了很多页面。在一些页面 `Token` 被使用消耗掉后新的 `Token` 会被重新种入，但那些老的 `Tab` 页面对应的 `HTML` 里还是老 `Token`。这会让用户觉得为啥几分钟前打开的页面不能正常提交？

2. 先写结论：尽量少用 `GET`

做个假设： `GET` 请求中携带 `token`

假如攻击者在我们的网站上传了一张图片，用户在加载图片的时候实际上是向攻击者的服务器发送了请求，这个请求会带有 `referer` 表示当前图片所在的页面的 url。 而如果使用 `GET` 方式接口的话这个 URL 就形如：

```http
https://xxxx.com/gift?giftId=aabbcc&_csrf_token=xxxxx
```

观察上面的 `GET` 请求，攻击者很容易就获取到用户的 `_csrf_token`，至少可以在短时间内使用这个 `token` 来操作其他 `GET` 接口。

## 参考资料

[慕课网：对于跨站伪造请求（CSRF）的理解和总结](http://www.imooc.com/article/13552)
[维基百科：跨站请求伪造](https://zh.wikipedia.org/zh/%E8%B7%A8%E7%AB%99%E8%AF%B7%E6%B1%82%E4%BC%AA%E9%80%A0)
[知乎：COOKIE和SESSION有什么区别？](https://www.zhihu.com/question/19786827)
[知乎：CSRF 是什么？ ](https://zhuanlan.zhihu.com/p/22521378)




