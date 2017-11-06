---
title: CSS3：transition
tags:
  - CSS
  - transition
categories:
  - CSS
date: 2017-10-11 12:40:07
---

>CSS3 的动画有两种：
>1. @keyframe + animation
>2. transition
>本文仅作为 transition 的使用笔记，如有错误还请指出。

## 一、我最初认识的 transition

>相信大家也都用过 transition 这个属性，操作简单方便，能做出很多常见的过渡效果，棒棒哒~ 但是，最近在用 transition 的时候却发现这个属性的每一个参数都还是蛮重要的，需要做一次笔记记录一下。

本文大致内容：
0. 速记属性
1. transition 属性分解
2. DOM style 对象中的 transition
3. DOM event 对象中的 transitionend
4. 参考资料

### 1. 速记属性

>*先看一眼兼容性问题 [CSS3 Transitions - caniuse](https://caniuse.com/#search=Transitions)*

最初，只是稍微了解过一些 transition 的使用，而且用的都是速记属性，什么是速记属性呢？类似于这样：
```css
transition: width 1s linear 0.5s;
```

上面这句话的意思是对于 `元素宽度` 的变化，`延迟 0.5 秒` 后 `用 1 秒` 时间 `匀速过渡`

emmmmm...看样子还是挺简单的嘛~

但是当我用 JS 操作过渡属性的时候就会发现，只用速记属性的自己根本不知道每一项的写法啊，还有我想在过渡结束后触发一个回调，怎么样才能判断过渡有木有结束呢？

嗯，这才是本文记录要解决的主要问题。

## 二、transition 属性分解

>*最详细的属性分解：[CSS Transitions - W3C](https://www.w3.org/TR/css3-transitions/)*

首先看一下 `transition` 的语法：
```css
transition: property duration timing-function delay;
```

然后我们再根据上面的语法分解 `property`、`duration`、`timing-function`、`delay`这四项，当我们清楚这四项到底是什么玩意儿的时候，对这个 `transition` 就有一个初步的了解了。

### 1. transition-property

>transition-property 指定 transition 效果应用于指定的 CSS 属性变化

语法：
```css
transition-property: none | all | property;
```

1. 如果不想让任何属性使用当前设置的过渡效果，可以这样：
```css
transition-property: none;
```

2. 如果想让所有属性使用当前设置的过渡效果，可以这样：
```css
transition-property: all;
```

3. 当然还阔以指定某个特定的属性使用当前的过渡效果：
```css
transition-property: width;
transition-property: transform;
```

应用多个 CSS 属性名称列表的过渡效果，可以将列表以逗号分隔：
```css
transition-property: width, height, transform;
```

### 2. transition-duration

>transition-duration 指定过渡效果需要多少时间才能完成（以秒或毫秒计）
>注意：建议始终指定 transition-duration 属性，否则持续时间为 0 ， transition 不会有任何效果。

语法：
```css
transition-duration: time;
```

比如我想让一个元素在 5秒 内从 宽度 50px 过渡到 宽度 500px:
```css
div{
  width: 50px;
  height: 500px;
  background: lightseagreen;
  transition-property: width;
  transition-duration: 5s;
}

div:hover{
  width: 500px;
}
```

这个很简单，就是时间设置。

### 3. transition-timing-function
>transition-timing-function 指定 transition 效果的 转速曲线
>*W3C 对这个 转速曲线 有详细解释，但稍微有点复杂，可以参考这里 [transition-timing-function - MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transition-timing-function)*

简单的来说，这个属性用于指定 过渡的速度（或者说是过渡的效果）

语法：
```css
transition-timing-function: linear|ease|ease-in|ease-out|ease-in-out|cubic-bezier(n,n,n,n);
```

| 值                     | 描述                                                      |
|-----------------------|---------------------------------------------------------|
| linear                | 规定以相同速度开始至结束的过渡效果（等于 cubic-bezier(0,0,1,1)）。            |
| ease                  | 规定慢速开始，然后变快，然后慢速结束的过渡效果（cubic-bezier(0.25,0.1,0.25,1)）。 |
| ease-in               | 规定以慢速开始的过渡效果（等于 cubic-bezier(0.42,0,1,1)）。              |
| ease-out              | 规定以慢速结束的过渡效果（等于 cubic-bezier(0,0,0.58,1)）。              |
| ease-in-out           | 规定以慢速开始和结束的过渡效果（等于 cubic-bezier(0.42,0,0.58,1)）。        |
| cubic-bezier(n,n,n,n) | 在 cubic-bezier 函数中定义自己的值。可能的值是 0 至 1 之间的数值。             |

这个 `transition-timing-function` 看起来挺复杂，实际上就是速记属性的第三个值，日常情况我们只使用默认定义好的那几个值：
```css
/* 自行画五个 div 感受下效果 */
.div1 {transition-timing-function: linear;}
.div2 {transition-timing-function: ease;}
.div3 {transition-timing-function: ease-in;}
.div4 {transition-timing-function: ease-out;}
.div5 {transition-timing-function: ease-in-out;}
```

>*对立方贝塞尔曲线感兴趣的可以戳这里 [ 贝塞尔曲线扫盲 ](http://www.html-js.com/article/1628)*

### 4. transition-delay	定义transition效果开始的时候

>最后一个 transition-delay 用于指定触发过渡后延迟多久开始过渡过程（值为 秒S或 毫秒ms）

语法：
```css
transition-delay: time;
```

跟 `transition-duration` 很相似，但一个是 `过渡持续时间`，一个是 `延迟开始过渡时间`，不要搞混了哦。

比如我想延迟 2秒 后开始一个持续 5秒 的过渡：
```css
transition-delay: 2s;
transition-duration: 5s;
```

好了，属性分解完了。

你以为这样就结束了？图样图森破 (╥﹏╥)

下面继续看 DOM 操作中的 transition

## 三、DOM style 对象中的 transition

>有时候我们会用 JS 去操作元素的样式，这个时候我们实际上是给 DOM style 对象的属性赋值，针对 transition 的话基本上只是写法上稍有区别。（JS 使用驼峰命名）

*注意驼峰写法，接收值为字符串，不要忘记单位，知道设置与返回。其他问题不大。*

### 0. transition

首先，速记属性，与 CSS 完全一样，（此处省略几个字 =。=）

### 1. transitionProperty

指定过渡效果的 CSS 属性的名称，其他一样。

### 2. transitionDuration

**设置** 或 **返回** 完成过渡效果需要花费的时间，同样以秒或毫秒计。

*注意：不要漏写单位，之前少写单位排查的时候感觉自己像个智障少年。*

### 3. transitionTimingFunction

**设置** 或 **返回** 过渡效果的速度曲线。

### 4. transitionDelay

**设置** 或 **返回** 过渡效果何时开始。

## 四、DOM event 对象中的 transitionend

>了解了以上内容后已经可以解决大部分使用 transition 的场景，但有时候需要让某个 DOM 元素在过渡结束后触发一个回调，怎么判断过渡结束呢？

如果你不知道 DOM 事件对象中的 `transitionend` 事件，处理起来可能比较麻烦一些，但是使用了`transitionend` 事件，你可以这样：
```javascript
function logMsg(){console.log("dispatch event transitionend!")}
div.addEventListener("transitionend",logMsg)
```

>*transitionend 事件兼容性 [ pageTransitionEvent- caniuse ](https://caniuse.com/#search=PageTransitionEvent)*

## 参考

*[CSS Transitions - W3C](https://www.w3.org/TR/css3-transitions/)*
*[CSS Transitions - MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Transitions)*
*[transitionend - MDN](https://developer.mozilla.org/en-US/docs/Web/Events/transitionend)*
*[HTML DOM Style 对象 - RUNBBO.COM](http://www.runoob.com/jsref/dom-obj-style.html)*

( 完 )