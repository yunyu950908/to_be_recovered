---
title: HTML5入坑简单概览
tags:
  - HTML5
categories:
  - HTML
date: 2017-08-24 02:35:08
---

![@|center](https://ws1.sinaimg.cn/large/889b2f7fgy1fj7beqzyc1j21hc0u0aid.jpg)

# HTML5 概览
>本文概览：
>HTML5 新特性；
>标签的变化；
>属性的变化；
>新增的标签


## HTML5是什么？
>HTML5是超文本标记语言的第五次重大修改，2014年10月29日标准规范制定完成。

### 设计目的
- `HTML5` 的设计目的是为了在移动设备上支持多媒体。新的语法特征被引进以支持这一点，如 `video` 、`audio` 和 `canvas` 标记。
- `HTML5` 还引进了新的功能，可以真正改变用户与文档的交互方式，包括：
1. 新的解析规则增强了灵活性
2. 新属性
3. 淘汰过时的或冗余的属性
4. 一个HTML5文档到另一个文档间的拖放功能
5. 离线编辑
6. 信息传递的增强
7. 详细的解析规则
8. 多用途互联网邮件扩展（MIME）和协议处理程序注册
9. 在SQL数据库中存储数据的通用标准（Web SQL）

## 有哪些新特性？
[MDN-HTML5](https://developer.mozilla.org/zh-CN/docs/Web/Guide/HTML/HTML5)
### 1. 语义特性
`HTML5` 赋予网页更好的意义和结构。更加丰富的标签将随着对 [RDFa](https://baike.baidu.com/item/RDFa)，微数据与微格式等方面的支持，构建对程序、对用户都更有价值的数据驱动的Web。

### 2. 本地存储特性
基于 `HTML5` 开发的网页APP拥有更短的启动时间，更快的联网速度，这些全得益于 `HTML5 APP Cache` ，以及本地存储功能。`Indexed DB`（HTML5本地存储最重要的技术之一）和 [API 说明文档](https://developer.mozilla.org/zh-CN/docs/Web/API/IndexedDB_API)。

### 3. 设备兼容特性
从 [Geolocation](https://developer.mozilla.org/zh-CN/docs/Web/API/Geolocation) 功能的API文档公开以来，`HTML5` 为网页应用开发者们提供了更多功能上的优化选择，带来了更多体验功能的优势。
`HTML5` 提供了前所未有的数据与应用接入开放接口。使外部应用可以直接与浏览器内部的数据直接相连，例如视频影音可直接与microphones及摄像头相联。

### 4. 连接特性
更有效的连接工作效率，使得基于页面的实时聊天，更快速的网页游戏体验，更优化的在线交流得到了实现。`HTML5` 拥有更有效的服务器推送技术，[Server-Sent Events](https://developer.mozilla.org/zh-CN/docs/Server-sent_events/Using_server-sent_events) 和 [WebSocket](https://developer.mozilla.org/zh-CN/docs/Web/API/WebSocket) 就是其中的两个特性，这两个特性能够帮助我们实现服务器将数据“推送”到客户端的功能。

### 5. 网页多媒体特性
- 支持网页端的 [audio](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/audio) 、[video](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/video) 等多媒体功能。
- 三维、图形及特效特性（Class: 3D, Graphics & Effects）
- 基于 `SVG`、`Canvas`、`WebGL` 及`CSS3` 的 `3D` 功能，用户会惊叹于在浏览器中，所呈现的惊人视觉效果。

### 6. 性能与集成特性
没有用户会永远等待你的`Loading` —— `HTML5`会通过 `XMLHttpRequest2` 等技术，解决以前的跨域等问题，帮助您的Web应用和网站在多样化的环境中更快速的工作。

### 7. CSS3特性
在不牺牲性能和语义结构的前提下，`CSS3` 中提供了更多的风格和更强的效果。此外，较之以前的Web排版，Web的开放字体格式（WOFF）也提供了更高的灵活性和控制性。

## 关于标签

### 1. 标签变化
1. `DOCTYPE`
```
<!DOCTYPE html>
```

2. 文档编码
```
<meta charset="UTF-8" />
```

3. 标签结尾
- 在 `HTML5` 中对于一些标签不再是必要的：
（但是建议每个标签都要结束）
`li` , `dt` , `dd` , `p` , `rt` , `rp` , `optgroup` , `option` , `colgroup` , `thead` , `tbody` , `tfoot` , `tr` , `td` , `th`
- 自结束的标签最后的 `/` 也不再必要
`img` , `input` , `br` , `hr` 等

### 2. 属性变化

**2.1 具有 `boolean` 值的属性**
对于具有 `boolean` 值的属性，例如 `disable` 和 `readonly` 等，只写属性不写属性值时，其默认值为 `true`
```
<!-- 以下三条 checked 全部为选中状态 -->
<input type="checkbox" checked >
<input type="checkbox" checked="checked" >
<input type="checkbox" checked="" >
```

**2.2 省略属性值的引号**
属性值可以用单引号或者双引号，在属性值不包括 `<`、`>`、`=`、`'`、`"`时可以忽略引号
```
<!-- 这里的text就省略了引号 -->
<input type=text >
```

**2.3 `input` 新增 `type`**
注意：日期与时间相关的 `type` 目前均存在bug
[MDN：HTML元素参考-input](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input)
```
<!-- 提交表单会自动验证是否为邮箱、电话、URL -->
<input type="email">
<input type="tel">
<input type="url">

<!-- 非数字无法输入 -->
<input type="number">

<!-- 一个指示范围的横向滚动条 -->
<input type="range">

<!-- 搜索框 -->
<input type="search">

<!-- 日期与时间（不建议使用） -->
<input type="date">
<input type="month">
<input type="week">
<input type="time">
<input type="datetime-local">
```

**2.4 移除的元素**
- 能被CSS替代的元素
`basefont` , `big` , `center` , `font` , `s` , `u` , `tt` ,`strike`
- 不再使用frame框架
`frame` , `frameset` , `noframes`
- 其它
`rb` => `ruby`
`acronym` => `abbr`
`dir` => `ul`
`isindex` => `input`
`listing` => `pre`
`xmp` => `code`
`nextid` => `CUIDS`
`plaintext` => `text/plain`

**2.5 新增属性**
- 全局属性
`contentEditable` , `designMode` , `hidden` , `spellcheck` , `tabindex`
- 表单相关
`autofocus` , `placeholder` , `form` , `required` , `novalidate`
`formaction` , `formenctype` , `formmethod` , `formtarget` , `formnovalidate`
- 链接相关
`a`和`area`新增`media`
`link`新增`sizes`属性
`base`新增`target`属性
`area`新增`hreflang`和`rel`
- 其它
`ol`新增`reversed`
`meta`新增`charset`
`menu`新增` type和label`
`style`新增`scoped`
`script`新增`async`
`html`新增`manifest`
`iframe`新增`sandbox， seamless， srcdoc`

**2.6 废弃属性**
[废弃的元素和属性](http://www.cnblogs.com/TomXu/archive/2011/12/17/2269168.html)

### 3. 新增标签

| 元素 | 描述 |
| --- | --- |
| canvas | 标签定义图形，比如图表和其他图像。该标签基于 JavaScript 的绘图 API |
| audio | 定义音频内容 |
| video | 定义视频（video 或者 movie） |
| source | 定义多媒体资源 `<video>` 和`<audio>` |
| embed | 定义嵌入的内容，比如插件 |
| track | 为诸如 `<video>` 和 `<audio>` 元素之类的媒介规定外部文本轨道 |
| datalist | 定义选项列表。与 input 元素配合使用该元素，来定义 input 可能的值 |
| keygen | 规定用于表单的密钥对生成器字段 |
| output | 定义不同类型的输出，比如脚本的输出 |
| article | 定义页面正文内容 |
| aside | 定义页面内容之外的内容 |
| bdi | 设置一段文本，使其脱离其父元素的文本方向设置 |
| command | 定义命令按钮，比如单选按钮、复选框或按钮 |
| details | 用于描述文档或文档某个部分的细节 |
| dialog | 定义对话框，比如提示框 |
| summary | 标签包含 details 元素的标题 |
| figure | 规定独立的流内容（图像、图表、照片、代码等等） |
| figcaption | 定义 `<figure>` 元素的标题 |
| footer | 定义 section 或 document 的页脚 |
| header | 定义了文档的头部区域 |
| mark | 定义带有记号的文本 |
| meter | 定义度量衡。仅用于已知最大和最小值的度量 |
| nav | 导航 |
| progress | 定义任何类型的任务的进度 |
| ruby | 定义 ruby 注释（中文注音或字符） |
| rt | 定义字符（中文注音或字符）的解释或发音 |
| rp | 在 ruby 注释中使用，定义不支持 ruby 元素的浏览器所显示的内容 |
| section | 定义文档中的节（section、区段） |
| time | 定义日期或时间 |
| wbr | 规定在文本中的何处适合添加换行符 |

## 参考
1. [w3school：HTML 参考手册](http://www.w3school.com.cn/tags/)
2. [MDN：HTML5](https://developer.mozilla.org/zh-CN/docs/Web/Guide/HTML/HTML5)
2. [MDN：HTML5 标签列表](https://developer.mozilla.org/zh-CN/docs/Web/Guide/HTML/HTML5/HTML5_element_list)
4. [HTML5 学习笔记简明版](http://www.cnblogs.com/TomXu/archive/2011/12/17/2269168.html)
5. [知乎：HTML5 到底是什么？](https://www.zhihu.com/question/19812140)

（完）

