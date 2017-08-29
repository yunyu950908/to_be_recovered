---
title: React 生命周期（Lifecycle）
tags:
  - react
  - 生命周期
categories:
  - react
date: 2017-08-27 14:54:52
---
# React 生命周期（Lifecycle）

[参考：The Component Lifecycle](https://facebook.github.io/react/docs/react-component.html#the-component-lifecycle)

React 的生命周期包括三个阶段：
```bash
1. mount（挂载）
2. update（更新）
3. unmount（移除）
```

## mount

`mount` 就是第一次让组件出现在页面中的过程。这个过程的关键就是 render 方法。React 会将 render 的返回值（一般是虚拟 DOM，也可以是 DOM 或者 null）插入到页面中。

这个过程会暴露几个钩子（hook）方便你往里面加代码：

```javascript
1. constructor()
2. componentWillMount()
3. render()
4. componentDidMount()
```
![@mount | center](https://ws1.sinaimg.cn/large/889b2f7fgy1fix4zaxn30j21v0110hci.jpg)


## update

`mount` 之后，如果数据有任何变动，就会来到 `update` 过程，这个过程有 5 个钩子：

```javascript
// - 我要读取 props 啦！
componentWillReceiveProps(nextProps)

// - 请问要不要更新组件？true / false
shouldComponentUpdate(nextProps, nextState) 

// - 我要更新组件啦！
componentWillUpdate() 

// - 更新！
render() 

// - 更新完毕啦！
componentDidUpdate() 
```

##unmount

当一个组件将要从页面中移除时，会进入 `unmount` 过程，这个过程就一个钩子：

```javascript
// - 我要死啦！
componentWillUnmount()
```
你可以在这个组件死之前做一些清理工作。

## 总结

一般情况下只在这几个钩子里 `setState`：
```javascript
componentWillMount()
componentDidMount()
componentWillReceiveProps(nextProps, nextState) 
componentDidUpdate()
```

[参考：React lifecycle cheatsheet](https://gist.github.com/bvaughn/923dffb2cd9504ee440791fade8db5f9)







