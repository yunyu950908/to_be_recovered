---
title: JS 事件模型（详细记录）
tags:
  - javascript
  - 事件模型
categories:
  - javascript
date: 2017-10-09 18:54:03
---

>JavaScript 与 HTML 的交互是通过事件实现的。JavaScript 采用异步事件驱动编程模型，当文档、浏览器、元素、或与之相关对象发生特定事情时，当前环境就会产生相应的事件。你可以使用 JavaScript 监听指定事件类型，当事件触发时调用指定方法。

## 一、事件

什么是事件？事件一般指的是某个行为，如：点击、鼠标移动、网页加载、图像加载等。

## 二、事件流

>事件流描述的是从页面中接收事件的顺序，比如有两个嵌套的 `div` ，点击了内层的 `div` , 这时候是内层 `div` 先触发 `click` 事件还是外层先触发？

![@点击 inner 灰色区域，先打印出的是 "inner" 还是 "outer" ?](https://ws1.sinaimg.cn/large/889b2f7fgy1fkce2mays1j204103y0si.jpg)

```javascript
const $ = function(selector){
  return document.querySelector(selector)
}

const inner = $(".inner")
const outer = $(".outer")

inner.addEventListener("click",()=>console.log("inner"),true)
outer.addEventListener("click",()=>console.log("outer"),true)

// 点击了 inner 区域，打印出来的顺序是什么？
```

下面介绍的三种事件模型将揭开谜题的真相。

（突然有种名侦探柯南的感觉~）

真実はいつも一つ！

### 1. 事件冒泡 x 事件捕获 x DOM 事件流

1. 事件冒泡：事件开始时由最具体的元素接收，然后从内向外、逐级向上传播到较为不具体的元素。
2. 事件捕获：不太具体的节点更早接收事件，而最具体的元素最后接收事件，和事件冒泡相反。
3. DOM 事件流：DOM2 级事件规定事件流包括三个阶段，按照顺序排列分别是：事件捕获阶段，目标阶段，事件冒泡阶段。

>**注意：**IE9 以下的 IE 浏览器 不支持 DOM事件流，只支持事件冒泡。（下文有说明）
>*你可以现在这里了解一些基本情况 [EventTarget.addEventListener() - Can I use](https://caniuse.com/#search=EventTarget.addEventListener)*

![@举个栗子](https://ws1.sinaimg.cn/large/889b2f7fgy1fjtn77s5amj207106twfg.jpg)

>某个地方出了抢劫事件，我们有多种处理方式：
>冒泡：村里先发现，报告给乡里，乡里报告到县城，县城报告给市里 ...
>捕获：市里先知道这事儿，然后交代给县城怎么处理，县城交给到乡里处理，乡里交给村里处理 ...

图片展示能更形象地表示事件流：

| @事件冒泡 | @事件捕获 | @DOM 事件流 |
| ---- | ---- | ---- |
| ![@事件冒泡](http://oux9sg1nc.bkt.clouddn.com/17-10-9/4728377.jpg) | ![@事件捕获](http://oux9sg1nc.bkt.clouddn.com/17-10-9/46684981.jpg) | ![@DOM 事件流](http://oux9sg1nc.bkt.clouddn.com/17-10-9/49104534.jpg) |

值得一提的是，

DOM 事件流可以控制事件触发的时机，DOM2 级 API `addEvenetListener` 指定可选参数 `useCapture` 的值，如果为 `true` 则在捕获阶段触发事件，如果为 `false` 则在冒泡阶段触发，该参数默认值为 `false`,因此默认的事件是在冒泡阶段触发的。

>*关于 `addEvenetListener` 的用法参考这里 [EventTarget.addEventListener() - MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener)*

相信看到这里，聪明的你就很容易明白开头代码的输出顺序了。

没错，就是：
```javascript
// "outer"
// "inner"
```

然后你可以尝试着把上述代码中的 `true` 改为 `false`，然后看看执行结果。

这里扣一张 w3.org 的图，图中正是 `捕获阶段 ==> 目标阶段 ==> 冒泡阶段` 的形象化展示。

![DOM 事件流](https://ws1.sinaimg.cn/large/889b2f7fgy1fkcgqopg8tj20qm0ptn0y.jpg)

>*这里是图片出处，W3C官方文档 [Event dispatch and DOM event flow - W3C](https://www.w3.org/TR/DOM-Level-3-Events/#event-flow)*

### 2. 停止事件冒泡/捕获

我们实际的业务中可能会遇到这样的场景：

>有一个 Dialog 弹出层，里面是个信息框，然后你点击信息框以外的区域会将该弹出层整个隐藏，你点击信息框内不会触发该隐藏事件。

![@Dialog](https://ws1.sinaimg.cn/large/889b2f7fgy1fkchvknoxrj204203xwea.jpg)

如果我们用一开始的代码,无论你让它在捕获阶段触发，还是在冒泡阶段触发，都无法达到业务需求：
```
function closeDialog(){this.style.display = "none"}
Dialog.addEventListener("click",closeDialog)
MsgBox.addEventListener("click",()=>console.log("MsgBox"))
```

那怎么办呢？这时候我们就要用到一个停止事件冒泡的方法 `stopPropagation`

>*[Event.stopPropagation() - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Event/stopPropagation)*

我们只需要在 `MsgBox` 的 `click` 事件上添加一句话，就能让事件在当前阶段停止冒泡，阻止了事件传递到外层的 `Dialog`:
```javascript
MsgBox.addEventListener("click",(event)=>{
  event.stopPropagation()
  console.log("MsgBox")
})
```

ok,这时候再点击 `MsgBox` 试试，事件不会冒泡到 `Dialog` ，便不会触发在 `Dialog` 上注册的 `click` 事件。

于是乎，我们又完成了一个业务需求。

### 3. 阻止默认事件

有些时候我们可能会希望阻止掉某些默认事件，比如 `a` 标签的跳转，`form` 表单的 `submit` 等，这时候我们就需要使用 `preventDefault` 方法阻止默认事件。

```javascript
tagA.addEventListener("click",e=>{
    e.preventDefault(); // 阻止了 a 标签的默认点击事件
    console.log("click <a/>")
})
```

>*如果事件可取消，则取消该事件，而不停止事件的进一步传播。 [event.preventDefault - MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/preventDefault)*

### 4. 事件代理

事件代理也是我们经常会应用到业务场景中的一种方法。比如现在有一个 `ul` 列表，一个 `button` 按钮，每次点击 `button` 会在 `ul` 中添加一个 `li` ，这个 `li` 上有一个 `click` 事件。

实现方法不唯一。

1. 在添加的 `li` 初始化的时候内联绑定 `onclick` 事件。
2. 每次添加完重新获取全部 `li`，然后进行事件绑定。
3. **事件代理：** 把事件注册在公共的父元素，触发的时候进行元素判断，确定是 `li` 后再执行方法。

```javascript
ul.addEventListener("click",event=>{
  console.log(event.target.tagName)
  if(event.target.tagName.toLowerCase() === "li"){
    console.log("触发 li 事件")
  }
})
```

## 三、事件处理程序

>事件处理程序也称之为事件侦听器（listener），事件就是用户或浏览器自身执行的某种动作。比如click、load、mouseover等，都是事件类型（俗称事件名称），而响应某个事件的方法就叫做事件处理程序或者事件监听器。
>也就是我们需要提前定义好某些事件发生了该怎么处理，这个过程叫做绑定事件处理程序，了解了这些，我们看看如何给元素添加事件处理程序

### 1. HTML 内联 处理

元素支持的每个事件都可以使用一个相应事件处理程序同名的HTML属性指定。这个属性的值应该是可以执行的 JavaScript 代码。

我们可以为一个 `button` 添加 `click` 事件处理程序：
```javascript
<input type="button" value="Click Here" onclick="console.log('clicked!')" />
```

在HTML事件处理程序中可以包含要执行的具体动作，也可以调用在页面其它地方定义的脚本,刚才的例子可以写成这样:
```javascript
<input type="button" value="Click Here" onclick="showMessage();" />
```

>**两个缺点:**在HTML中指定事件处理程序书写很方便，但是有两个缺点。
>1. 存在加载顺序问题。如果事件处理程序在 HTML 代码之后加载，用户可能在事件处理程序还未加载完成时就点击按钮之类的触发事件，存在时间差问题。
>2. 这样书写 HTML 代码和 JavaScript 代码紧密耦合，维护不方便。

### 2. JavaScript 处理

**1. DOM0 级事件处理程序**

>通过 JavaScript 指定事件处理程序就是把一个方法赋值给一个元素的事件处理程序属性。

```javascript
function showMsg(){console.log(this.tagName.toLowerCase() + "clicked!")}
btn.onclick = showMsg;
```

这样的事件处理程序被认为是元素的方法，事件处理程序在元素的作用域下运行，`this` 就是当前元素，所以点击 `button` 结果是：
```javascript
// button clicked!
```

这样还有一个好处，我们可以删除事件处理程序，只需把元素的 `onclick` 属性赋为 `null` 即可：
```javascript
btn.onclick = null;
```

**2. DOM2 级事件处理程序**

>DOM2级事件定义了两个方法用于处理指定和删除事件处理程序的操作：
>1. addEventListener
>2. removeEventListener

所有的 DOM 节点都包含这两个方法，并且它们都接受三个参数：
1. 事件类型
2. 事件处理方法
3. 布尔参数，如果是 `true` 表示在捕获阶段调用事件处理程序，如果是 `false`，则是在事件冒泡阶段处理

刚才的例子我们可以这样写：
```javascript
function showMsg(){console.log(this.tagName.toLowerCase() + "clicked!")}
// 绑定事件
btn.addEventListener("click",showMsg)
// 移除事件
btn.removeEventListener("click",showMsg)
```

如果只是这样的话，看起来与 DOM0 级事件没什么不同，而且写起来句子更长了。实际上 DOM2 级事件有不止一个好处，最明显的，在 DOM2 中我们可以为 `click` 事件添加多个处理程序：
```javascript
btn.addEventListener("click",function(){console.log("showMsg1")})
btn.addEventListener("click",function(){console.log("showMsg2")})
btn.addEventListener("click",function(){console.log("showMsg3")})
```

这样三个事件处理程序会在用户点击 `button` 后按照添加顺序依次执行。

通过 `addEventListener` 添加的事件处理程序只能通过 `removeEventListener` 移除，移除时参数与添加的时候相同，这就意味着刚才我们添加的匿名函数无法移除，因为匿名函数虽然方法体一样，但是指向的引用地址却不相同，所以移除的时候因无法获取对应引用地址而无法正确移除。

因此，更推荐的是这样的写法：
```javascript
function showMsg1(){console.log("showMsg1")}
function showMsg2(){console.log("showMsg2")}
function showMsg3(){console.log("showMsg3")}
btn.addEventListener("click",showMsg1)
btn.addEventListener("click",showMsg2)
btn.addEventListener("click",showMsg3)
btn.removeEventListener("click",showMsg1)
btn.removeEventListener("click",showMsg2)
btn.removeEventListener("click",showMsg3)
```

虽然代码可能变多了，但实际上逻辑结构更加清晰完整，代码也更易于维护。

>*[EventTarget.addEventListener() - MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener)*
>*[EventTarget.removeEventListener - MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/removeEventListener)*

## ++三、跨浏览器事件处理程序

还记得第二节中的这句话吗？

>**注意：**IE9 以下的 IE 浏览器 不支持 DOM事件流，只支持事件冒泡。（下文有说明）
>*你可以现在这里了解一些基本情况 [EventTarget.addEventListener() - Can I use](https://caniuse.com/#search=EventTarget.addEventListener)*

### 1. IE 浏览器

>IE9 以下并不支持 `addEventListener` 和 `removeEventListener` 方法，而是实现了两个类似的方法：
>1. attachEvent
>2. detachEvent

这两个方法都接收两个相同的参数：
1. 事件处理程序名称
2. 事件处理程序方法

由于IE9 以下的 IE 浏览器只支持事件冒泡，所以添加的程序会被添加到冒泡阶段。

使用 `attachEvent` 添加事件处理程序可以如下：
```javascript
function showThis(){console.log(this)}
btn.attachEvent("onclick",showThis)
```

>嗯？你以为这样就结束了？
>啧啧啧，IE 可没有想象中的那么容易驯服呢！
>这时候不出意外，打印出来的 `this` 是 `window`，而不是事件绑定的元素。
>emmmmm,这个问题一会儿再说。

使用 `attachEvent` 添加的事件处理程序可以通过 `detachEvent` 移除，条件也是相同的参数，匿名函数不能被移除:
```javascript
btn.detachEvent("onclick", showThis);
```

### 2. 兼容处理

>前面内容我们可以看到，在不同的浏览器下，添加和移除事件处理程序方式不相同，要想写出跨浏览器的事件处理程序，首先我们要了解不同的浏览器下处理事件处理程序的区别。

**`addEventListener` 和 `attachEvent` 的主要区别：**

| OOXX | `addEventListener` | `attachEvent` |
| ---- | ---- | ---- |
| 参数个数 | (事件类型,方法名,处理时机) | (事件处理函数名,方法名) |
| 第一个参数 | 事件类型（比如 `click`/`load`） | 事件处理函数名（比如 `onclick`/`onload`） |
| 作用域 | 作用域是元素本身，`this` 是 `触发元素` | 在全局变量内运行，`this` 是 `window` |
| 执行顺序 | 按照添加顺序执行 | 添加的多了之后顺序无规律 | 


了解了这四点区别后我们可以尝试写一个浏览器兼容性比较好的添加事件处理程序方法

emmmmm,这里直接借鉴大师的处理方式，jQuery创始人John Resig是这样做的：

**addEvent：**
```javascript
function addEvent(node, type, handler) {
    if (!node) return false;
    if (node.addEventListener) {
        node.addEventListener(type, handler, false);
        return true;
    }
    else if (node.attachEvent) {
        node['e' + type + handler] = handler;
        node[type + handler] = function() {
            node['e' + type + handler](window.event);
        };
        node.attachEvent('on' + type, node[type + handler]);
        return true;
    }
    return false;
}
```

>PS: 注意在 IE9 以下的 IE浏览器 的处理中巧妙地使用了闭包来处理 `this` 指向。当然方法不唯一，你当然可以用不同的方法去实现。

**removeEvent：**
```javascript
function removeEvent(node, type, handler) {
    if (!node) return false;
    if (node.removeEventListener) {
        node.removeEventListener(type, handler, false);
        return true;
    }
    else if (node.detachEvent) {
        node.detachEvent('on' + type, node[type + handler]);
        node[type + handler] = null;
    }
    return false;
}
```

>*更多详细说明移步这里： [Flexible Javascript Events - John Resig](https://johnresig.com/blog/flexible-javascript-events/)*

## 四、事件对象

>在触发 DOM 上的某个事件的时候会产生一个事件对象 `event`，这个对象包含着所有与事件有关的信息，包括产生事件的元素、事件类型等相关信息。所有浏览器都支持 `event` 对象，但支持方式不同。

### 1. 标准浏览器

之前的事件代理函数中就运用到了事件对象，类似于这样：
```javascript
ul.addEventListener("click",event=>{
  console.log(event)
})

// 点击 ul 后就会打印出这个 event 对象
```

`event` 对象包含与创建它的特定事件有关的属性和方法，触发事件的类型不同，可用的属性和方法也不同，但是所有事件都会包含一下属性和方法：

| 属性/方法             | 类型           | 读/写 | 说明                              |
|-------------------|--------------|-----|---------------------------------|
| bubbles           | Boolean      | 只读  | 事件是否冒泡                          |
| cancelable        | Boolean      | 只读  | 是否可以取消事件的默认行为                   |
| currentTarget     | Element      | 只读  | 事件处理程序当前处理元素                    |
| detail            | Integer      | 只读  | 与事件相关细节信息                       |
| eventPhase        | Integer      | 只读  | 事件处理程序阶段：1 捕获阶段，2 处于目标阶段，3 冒泡阶段 |
| preventDefault()  | Function     | 只读  | 取消事件默认行为                        |
| stopPropagation() | Function     | 只读  | 取消事件进一步捕获或冒泡                    |
| target            | Element      | 只读  | 事件的目标元素                         |
| type              | String       | 只读  | 被触发的事件类型                        |
| view              | AbstractView | 只读  | 与事件关联的抽象视图，等同于发生事件的window对象     |

在事件处理程序内部，`this` 始终等同于 `currentTarget` ，而 `target` 是事件的实际目标。

结合前面所说的 `stopPropagation()` 与 `preventDefault()` 的使用能进一步理解事件对象。

### 2. IE 浏览器

>访问IE中的 `event` 对象有几种不同的方式，取决于指定事件处理程序的方法。

1. 直接为DOM元素添加事件处理程序时，`event` 对象作为 `window` 对象的一个属性存在

这里通过 `window.event` 取得了 `event` 对象，并检测到了其类型：
```javascript
var handler = function () {
    var e = window.event;
    alert(e.type);
}
var btnClick = document.getElementById('btnClick');
btnClick.onclick = handler;
```

2. 通过 `attachEvent` 添加的事件处理程序，就会有一个 `event` 对象被传入事件处理程序中

```javascript
var handler = function (e) {
    alert(e.type);
}
var btnClick = document.getElementById('btnClick');
attachEvent(btnClick, handler);
```

>当然这时候也可以通过 `window` 对象访问 `event`

3. IE中所有的事件都包含以下属性方法

| 属性/方法        | 类型      | 读/写 | 说明                        |
|--------------|---------|-----|---------------------------|
| cancelBubble | Boolean | 读/写 | 默认为false，设置为true后可以取消事件冒泡 |
| returnValue  | Boolean | 读/写 | 默认为true，设为false可以取消事件默认行为 |
| srcElement   | Element | 只读  | 事件的目标元素                   |
| type         | String  | 只读  | 被触发的事件类型                  |

## ++四、跨浏览器的事件对象

>虽然 DOM 和 IE 的 `event` 对象不同，但基于它们的相似性，我们还是可以写出跨浏览器的事件对象方案

```javascript
function getEvent(e) {
    return e || window.event;
}

function getTarget(e) {
    return e.target || e.scrElement;
}

function preventDefault(e) {
    if (e.preventDefault)
        e.preventDefault();
    else
        e.returnValue = false;
}

function stopPropagation(e) {
    if (e.stopPropagation)
        e.stopPropagation();
    else
        e.cancelBubble = true;
}
```

## 五、自定义事件

>参考：
>*[EventTarget.dispatchEvent - MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/dispatchEvent)*
>*[CustomEvent - MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/CustomEvent)*

```javascript
var EventCenter = {
  on: function(type, handler){
    document.addEventListener(type, handler)
  },
  fire: function(type, data){
    return document.dispatchEvent(new CustomEvent(type, {
      detail: data
    }))
  }
}

EventCenter.on('hello', function(e){
  console.log(e.detail)
})

EventCenter.fire('hello', '你好')
```

>当然更多情况下我们会使用订阅发布模式封装一个事件中心：
>*[ 代码地址 ](https://github.com/yunyu950908/wheels/blob/master/design-patterns/(pub-sub)/index.html)*
>*[ 效果预览 ](http://wheels.liyu0906.cn/design-patterns/(pub-sub)/index.html)*

## 六、常用事件

>*详细事件参见这里 ：[HTML DOM 事件 - runoob.com](http://www.runoob.com/jsref/dom-obj-event.html)*

1. 鼠标事件
onmousedown, onmouseup, onclick, ondbclick, onmousewheel, onmousemove, onmouseover, onmouseout

2. 触摸事件
ontouchstart, ontouchend, ontouchmove

3. 键盘事件：
onkeydown, onkeyup, onkeypress

4. 页面相关事件：
onload, onmove(浏览器窗口被移动时触发), onresize(浏览器的窗口大小被改变时触发), onscroll(滚动条位置发生变化时触发)

5. 表单相关事件
onblur(元素失去焦点时触发)
onchange(元素失去焦点且元素内容发生改变时触发)
onfocus(元素获得焦点时触发),
onreset(表单中reset属性被激活时触发)
onsubmit(表单被提交时触发)
oninput(在input元素内容修改后立即被触发，兼容IE9+)

6. 编辑事件
onbeforecopy：当页面当前的被选择内容将要复制到浏览者系统的剪贴板前触发此事件；
onbeforecut：当页面中的一部分或者全部的内容将被移离当前页面[剪贴]并移动到浏览者的系统剪贴板时触发此事件；
onbeforeeditfocus：当前元素将要进入编辑状态；
onbeforepaste：内容将要从浏览者的系统剪贴板传送[粘贴]到页面中时触发此事件；
onbeforeupdate：当浏览者粘贴系统剪贴板中的内容时通知目标对象；
oncontextmenu：当浏览者按下鼠标右键出现菜单时或者通过键盘的按键触发页面菜单时触发的事件；
oncopy：当页面当前的被选择内容被复制后触发此事件；
oncut：当页面当前的被选择内容被剪切时触发此事件；
onlosecapture：当元素失去鼠标移动所形成的选择焦点时触发此事件；
onpaste：当内容被粘贴时触发此事件；
onselect：当文本内容被选择时的事件；
onselectstart：当文本内容选择将开始发生时触发的事件；

7. 拖动事件
ondrag：当某个对象被拖动时触发此事件 [活动事件]；
ondragdrop：一个外部对象被鼠标拖进当前窗口时触发；
ondragend：当鼠标拖动结束时触发此事件；
ondragenter：当对象被鼠标拖动的对象进入其容器范围内时触发此事件；
ondragleave：当对象被鼠标拖动的对象离开其容器范围内时触发此事件；
ondragover：当某被拖动的对象在另一对象容器范围内拖动时触发此事件；
ondragstart：当某对象将被拖动时触发此事件；
ondrop：在一个拖动过程中，释放鼠标键时触发此事件；

## 参考资料

*[EventTarget.addEventListener - Can I use](https://caniuse.com/#search=EventTarget.addEventListener)*
*[Event dispatch and DOM event flow - W3C](https://www.w3.org/TR/DOM-Level-3-Events/#event-flow)*
*[Event.stopPropagation() - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Event/stopPropagation)*
*[event.preventDefault - MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/preventDefault)*
*[EventTarget.addEventListener() - MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener)*
*[EventTarget.removeEventListener - MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/removeEventListener)*
*[Flexible Javascript Events - John Resig](https://johnresig.com/blog/flexible-javascript-events/)*
*[ pub/sub EventCenter ](https://github.com/yunyu950908/wheels/blob/master/design-patterns/)*
*[HTML DOM 事件 - runoob.com](http://www.runoob.com/jsref/dom-obj-event.html)*

（完）

