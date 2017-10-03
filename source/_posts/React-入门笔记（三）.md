---
title: React 入门笔记（三）
tags:
  - webpack
categories:
  - webpack
date: 2017-09-27 16:25:21
---
# React 入门笔记（三）

## 元素渲染

==> 不可变元素
==> 新建渲染替换

按需加载

---

## props

1. 对 `<Welcome name="Sara" />`元素调用了 `ReactDOM.render()` 方法。
2. `React` 将 `{name: 'Sara'}` 作为 `props` 传入并调用 `Welcome` 组件。
3. `Welcome` 组件将 `<h1>Hello, Sara</h1>` 元素作为结果返回。
4. `React DOM` 将 `DOM` 更新为 `<h1>Hello, Sara</h1>`

---

## 组件的返回值

组件的返回值只能有一个根元素。这也是我们要用一个 `<div>` 来包裹所有 `<Welcome />` 元素的原因。

---

## 抽离出更细小的，可复用的组件

---

## Props的只读性

React是非常灵活的，但它也有一个严格的规则：

所有的React组件必须像纯函数那样使用它们的props。

---

## 创建一个有状态的类

通过5个步骤将函数组件转换为类

1. 创建一个名称扩展为 `React.Component` 的ES6 类

2. 创建一个叫做 `render()` 的空方法

3. 将函数体移动到 `render()` 方法中

4. 在 `render()` 方法中，使用 `this.props` 替换 `props`

5. 删除剩余的空函数声明

---

让我们快速回顾一下发生了什么以及调用方法的顺序：

1) 当 `<Clock />` 被传递给 `ReactDOM.render()` 时，`React` 调用 `Clock` 组件的构造函数。 由于 `Clock` 需要显示当前时间，所以使用包含当前时间的对象来初始化 `this.state`。 我们稍后会更新此状态。

2) `React` 然后调用 `Clock` 组件的 `render()` 方法。这是 `React` 了解屏幕上应该显示什么内容，然后 `React` 更新 `DOM` 以匹配 `Clock` 的渲染输出。

3) 当 `Clock` 的输出插入到 `DOM` 中时，`React` 调用 `componentDidMount()` 生命周期钩子。 在其中，`Clock` 组件要求浏览器设置一个定时器，每秒钟调用一次 `tick()`。

4) 浏览器每秒钟调用 `tick()` 方法。 在其中，`Clock` 组件通过使用包含当前时间的对象调用 `setState()` 来调度UI更新。 通过调用 `setState()` ，`React` 知道状态已经改变，并再次调用 `render()` 方法来确定屏幕上应当显示什么。 这一次，`render()` 方法中的 `this.state.date` 将不同，所以渲染输出将包含更新的时间，并相应地更新`DOM`。

5) 一旦`Clock`组件被从`DOM`中移除，`React`会调用`componentWillUnmount()`这个钩子函数，定时器也就会被清除。

---

## 构造函数是唯一能够初始化 this.state 的地方。

状态更新可能是异步的
React 可以将多个setState() 调用合并成一个调用来提高性能。

[程墨：setState：这个API设计到底怎么样](https://zhuanlan.zhihu.com/p/25954470)

---

## 生命周期钩子可以控制状态更新

- Mount
1. constructor - 初始化props 和 state 
2. componentWillMount
3. render
4. componentDidMount

- update
1.  conponentWillReceiveProps(nextProps)
2.  shouldComponentUpdate(nextProps, nextState)
3.  componentWillUpdate()
4.  render()
5.  componentDidUpdate()

- unmount
1. componentWillUnmout

---

## 数据自顶向下流动

父组件或子组件都不能知道某个组件是有状态还是无状态，并且它们不应该关心某组件是被定义为一个函数还是一个类。

这就是为什么状态通常被称为局部或封装。 除了拥有并设置它的组件外，其它组件不可访问。

组件可以选择将其状态作为属性传递给其子组件

---

## 类的方法默认是不会绑定 this 

如果忘记绑定 this.handleClick 并把它传入 onClick, 当调用这个函数的时候 this 的值会是 undefined。

通常情况下，如果你没有在方法后面添加 () ，例如 onClick={this.handleClick}，你应该为这个方法绑定 this.


属性初始化器语法

回调函数中使用 箭头函数：然而如果这个回调函数作为一个属性值传入低阶组件，这些组件可能会进行额外的重新渲染


---

## 传入匿名回调的参数是当前的 state

```javascript
    this.setState(prevState => ({
      showWarning: !prevState.showWarning
    }));
```

在极少数情况下，你可能希望隐藏组件，即使它被其他组件渲染。让 render 方法返回 null 而不是它的渲染结果即可实现。

## 元素变量

使用变量来储存元素。它可以帮助你有条件的渲染组件的一部分，而输出的其他部分不会更改。
```javascript
	let button = null;
    if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick} />;
    } else {
      button = <LoginButton onClick={this.handleLoginClick} />;
    }

    return (
      <div>
        <Greeting isLoggedIn={isLoggedIn} />
        {button}
      </div>
    );
```

## 与运算符 &&
```javascript
return (
    <div>
      <h1>Hello!</h1>
      {unreadMessages.length > 0 &&
        <h2>
          You have {unreadMessages.length} unread messages.
        </h2>
      }
    </div>
  );
```


## 三目运算符
```javascript
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      The user is <b>{isLoggedIn ? 'currently' : 'not'}</b> logged in.
    </div>
  );
}
```


---

## 渲染多样的组件 ( 数组集合 )

元素的key只有在它和它的兄弟节点对比时才有意义。

数组元素中使用的key在其兄弟之间应该是独一无二的。然而，它们不需要是全局唯一的。

key会作为给React的提示，但不会传递给你的组件。如果您的组件中需要使用和key相同的值，请将其作为属性传递：


---

## 表单

```javascript
  handleChange(event) {
    this.setState({value: event.target.value});
  }
```

---

## 受控组件

由于 value 属性是在我们的表单元素上设置的，因此显示的值将始终为 React数据源上this.state.value 的值。由于每次按键都会触发 handleChange 来更新当前React的state，所展示的值也会随着不同用户的输入而更新。

使用"受控组件",每个状态的改变都有一个与之相关的处理函数。这样就可以直接修改或验证用户输入。

---

请注意，Coconut选项最初由于selected属性是被选中的。在React中，会在根select标签上而不是在当前的selected属性上使用value属性。

总之，`<input type="text">`, `<textarea>`, 和 `<select>` 都十分类似 - 他们都通过传入一个value属性来实现对组件的控制。

---

多个输入的解决方法
当你有处理多个受控的input元素时，你可以通过给每个元素添加一个name属性，来让处理函数根据 event.target.name的值来选择做什么。

---

## 状态提升 

单项数据流自上而下流动，类似二叉树

子组件可以同伙状态提升把自身状态绑定到公共的父组件

## refs

何时使用 Refs
下面是几个适合使用 refs 的情况：

1. 处理焦点、文本选择或媒体控制。
2. 触发强制动画。
3. 集成第三方 DOM 库

如果可以通过声明式实现，则尽量避免使用 refs。

例如，不要在 Dialog 组件上直接暴露 open() 和 close() 方法，最好传递 isOpen 属性。

