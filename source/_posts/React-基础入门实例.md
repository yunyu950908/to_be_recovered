---
title: React 基础入门实例
tags:
  - react
categories:
  - javascript
  - react
date: 2017-08-25 23:24:03
---

![@|center](https://ws1.sinaimg.cn/large/889b2f7fgy1fj7bfuhin3j21hc0u0gud.jpg)

# react 基本语法

## 一、ReactDOM.render()

`ReactDOM.render` 是 `React` 的最基本方法，用于将模板转为 `HTML` 语言，并插入指定的 `DOM` 节点。

```javascript
ReactDOM.render(
    <h1>Hello React</h1>,
    document.getElementById("example")
)
```

## 二、JSX 语法
`HTML` 语言直接写在 `JavaScript` 语言之中，不加任何引号，这就是 `JSX` 的语法，它允许 `HTML` 与 `JavaScript` 的混写.

`JSX` 的基本语法规则：
- 遇到 `HTML` 标签（以 `<` 开头），就用 `HTML` 规则解析；
- 遇到 `代码块` （以 `{` 开头），就用 `JavaScript` 规则解析。

```javascript
var names = ['傻龙', '大鳖', '大宝', '煜神'];

ReactDOM.render(
    <div>
        {
            // map会返回一个新数组，不对原数组产生影响,foreach不会产生新数组，
            // map因为返回数组所以可以链式操作，foreach不能
            names.map(function (name, index) {
                return <div key={index}>Hello {name}</div>
            })
        }
    </div>,
    document.getElementById('example')
)
```

`JSX` 允许直接在模板插入 `JavaScript` 变量。如果这个变量是一个数组，则会展开这个数组的所有成员，添加到模板，

```
var arr = [
    <h1>Hello world!</h1>,
    <h2>React is awesome</h2>,
];
ReactDOM.render(
    //如果这个变量是一个数组，JSX 会把它的所有成员，添加到模板
    <div>{arr}</div>,
    document.getElementById('example')
);
```

## 三、组件

`React` 允许将代码封装成组件（component），然后像插入普通 `HTML` 标签一样，在网页中插入这个组件。

`React.createClass()` 方法就用于生成一个组件类

```javascript
var HelloMessage = React.createClass({
    render: function () {
        return (
            //class 跟 for 是js的保留字，所以使用规则如下：
            <div className="thisIsClass" htmlFor='thisIsFor'>
                <h1>Hello {this.props.name}</h1>
            </div>
        )
    }
})

ReactDOM.render(
    <HelloMessage name="Albert"/>,
    document.getElementById("example")
)
```

上面代码中，变量 `HelloMessage` 就是一个组件类。
模板插入 `<HelloMessage />` 时，会自动生生成 `HelloMessage` 的一个实例。
- 所有组件类都必须有自己的 `render` 方法，用于输出组件。
- 注意，组件类的**第一个字母必须大写**，否则会报错，比如`HelloMessage`不能写成`helloMessage`。
- 另外，组件类**只能包含一个顶层标签**，否则也会报错。

组件的用法与原生的 `HTML` 标签完全一致，可以任意加入属性，比如 `<HelloMessage name="Albert">` ，就是 `HelloMessage` 组件加入一个 `name` 属性，值为 `Albert`。

组件的属性可以在组件类的 `this.props` 对象上获取，比如 `name` 属性就可以通过 `this.props.name` 读取。

因为 `class` 和 `for` 是 `JavaScript` 的保留字，所以添加组件属性时，有一个地方需要注意：
-  `class` 属性需要写成 `className` ；
-  `for` 属性需要写成 `htmlFor` ；

## 四、this.props.children
`this.props` 对象的属性与组件的属性一一对应，但是有一个例外，就是 `this.props.children` 属性。它表示组件的所有子节点。

```javascript
var NotesList = React.createClass({
    render: function () {
        return (
            <ol>
                {
                    //this.props.children 表示组件的所有子节点
                    React.Children.map(this.props.children, function (child) {
                        return <li>{child}</li>;
                    })
                }
            </ol>
        );
    }
});

ReactDOM.render(
    <NotesList>
        {/*以下就是组件的两个子节点*/}
        <span>hello</span>
        <span>world</span>
    </NotesList>,
    document.getElementById('example')
);
```

上面代码的 `NoteList` 组件有两个 `span` 子节点，它们都可以通过 `this.props.children` 读取

这里需要**注意**， `this.props.children` 的值有三种可能：
- 如果当前组件没有子节点，它就是 `undefined` ;
- 如果有一个子节点，数据类型是 `object` ；
- 如果有多个子节点，数据类型就是 `array` ；

**但是** ，好在 `React` 提供一个工具方法 `React.Children` 来处理 `this.props.children` 。

我们可以用 `React.Children.map` 来遍历子节点，而不用担心 `this.props.children` 的数据类型是 `undefined` 还是 `object`。

更多的 `React.Children` 的方法，请参考[官方文档](https://facebook.github.io/react/docs/react-api.html)。

## 五、PropTypes

组件的属性可以接受任意值，字符串、对象、函数等等都可以。有时，我们需要一种机制，验证别人使用组件时，提供的参数是否符合要求。

组件类的 `PropTypes` 属性，就是用来验证组件实例的属性是否符合要求。

```javascript
// 如果把引号去掉就是数值类型，就会报错
var data = "string!";

var MyTitle = React.createClass({
    PropTypes: {
        //通过 React.PropTypes 规定 title 接受值的类型
        title: React.PropTypes.string.isRequired
    },

    //设置组件属性的默认值
    getDefaultProps: function () {
        return {
            title: "hello world"
        }
    },

    render: function () {
        return <h1> {this.props.title} </h1>;
    }
});

ReactDOM.render(
    <MyTitle title={data}/>,
    document.getElementById('example')
);

```

上面的 `Mytitle` 组件有一个 `title` 属性。`PropTypes` 告诉 `React`，这个 `title` 属性是必须的，而且它的值**必须是字符串**。

此外，`getDefaultProps` 方法可以用来设置组件属性的默认值。

## 六、获取真实的DOM节点
组件并不是真实的 DOM 节点，而是存在于内存之中的一种数据结构，叫做虚拟 DOM （virtual DOM）。只有当它插入文档以后，才会变成真实的 DOM 。根据 React 的设计，所有的 DOM 变动，都先在虚拟 DOM 上发生，然后再将实际发生变动的部分，反映在真实 DOM上，这种算法叫做 DOM diff ，它可以极大提高网页的性能表现。

但是，有时需要从组件获取真实 DOM 的节点，这时就要用到 `ref` 属性

```javascript
var Component = React.createClass({
    handleClick: function () {
        //this.refs.[refName].[handler]
        this.refs.refName.focus()
    },
    render: function () {
        return (
            <div>
                {/* ref：为了从组件获取真实 DOM 节点 */}
                <input type="text" ref="refName" />
                <input type="button"
                       value="focus the text input"
                       onClick={this.handleClick} />
            </div>
        )
    }
});

ReactDOM.render(
    <Component />,
    document.getElementById("example")
)
```

`Component` 组件中的输入框用于获取用户的输入，这时就必须获取真实的 DOM 节点，虚拟 DOM 是拿不到用户输入的。为了做到这一点，文本输入框必须有一个 `ref` 属性，然后 `this.refs.[refName]` 就会返回这个真实的 DOM 节点。

需要注意的是，由于 `this.refs.[refName]` 属性获取的是真实 DOM ，所以必须等到虚拟 DOM 插入文档以后，才能使用这个属性，否则会报错。上面代码中，通过为组件指定 `Click` 事件的回调函数，确保了只有等到真实 DOM 发生 `Click` 事件之后，才会读取 `this.refs.[refName]` 属性。

## 七、this.state

组件免不了要与用户互动，React 的一大创新，就是将组件看成是一个状态机，一开始有一个初始状态，然后用户互动，导致状态变化，从而触发重新渲染 UI

```javascript
var LikeButton = React.createClass({
    getInitialState: function () {
        return {liked: false}
    },
    handleClick: function () {
        this.setState({liked: !this.state.liked})
    },
    render: function () {
        var text = this.state.liked ? "like" : "haven\'t liked";
        return (
            <p onClick={this.handleClick}>
                You {text} this. Click to toggle.
            </p>
        )
    }
})

ReactDOM.render(
    <LikeButton/>,
    document.getElementById('example')
);
```
上面代码是一个 `LikeButton` 组件，它的 `getInitialState` 方法用于定义初始状态，也就是一个对象，这个对象可以通过 `this.state` 属性读取。

当用户点击组件，导致状态变化，`this.setState` 方法就修改状态值，每次修改以后，自动调用 `this.render` 方法，再次渲染组件。

由于 `this.props` 和 `this.state` 都用于描述组件的特性，可能会产生混淆。一个简单的区分方法是，`this.props` 表示那些一旦定义，就不再改变的特性，而 `this.state` 是会随着用户互动而产生变化的特性。

## 八、表单

用户在表单填入的内容，属于用户跟组件的互动，所以**不能**用 `this.props` 读取。

```javascript
var Input = React.createClass({
    //初始化 this.state
    getInitialState: function () {
        return {value: "init"}
    },
    //setState 改变 this.state 的值
    //event.target.value 读取表单值
    handleChange: function (event) {
        this.setState({value: event.target.value})
    },
    render: function () {
        var value = this.state.value;
        return (
            <div>
                {/*回调函数触发*/}
                <input type="text" value={value} onChange={this.handleChange}/>
                <p>{value}</p>
            </div>
        )
    }
})

ReactDOM.render(
    <Input/>,
    document.getElementById('example')
);
```

上面代码中，文本输入框的值，不能用 `this.props.value` 读取，而要定义一个 `onChange` 事件的回调函数，通过 `event.target.value` 读取用户输入的值。

`textarea` 元素、`select`元素、`radio`元素都属于这种情况，更多介绍请参考[官方文档](http://facebook.github.io/react/docs/forms.html)。

## 九、组件的生命周期

组件的[生命周期](https://facebook.github.io/react/docs/working-with-the-browser.html#component-lifecycle)分成三个状态：
```javascript
- Mounting：已插入真实 DOM
- Updating：正在被重新渲染
- Unmounting：已移出真实 DOM
```

React 为每个状态都提供了两种处理函数，`will` 函数在进入状态之前调用，`did` 函数在进入状态之后调用，三种状态共计五种处理函数。
```javascript
- componentWillMount()
- componentDidMount()

- componentWillUpdate(object nextProps, object nextState)
- componentDidUpdate(object prevProps, object prevState)

- componentWillUnmount()
```

此外，React 还提供两种特殊状态的处理函数。

```javascript
- componentWillReceiveProps(object nextProps)：已加载组件收到新的参数时调用

- shouldComponentUpdate(object nextProps, object nextState)：组件判断是否重新渲染时调用
```

这些方法的详细说明，可以参[考官方文档]。(http://facebook.github.io/react/docs/component-specs.html#lifecycle-methods)

```javascript
var Hello = React.createClass({
    getInitialState: function () {
        return {
            opacity: 1
        };
    },
    //插入真实 DOM 之后调用
    componentDidMount: function () {
        this.timer = setInterval(function () {
            var opacity = this.state.opacity;
            opacity -= .05;
            if (opacity < .1) {
                opacity = 1;
            }
            this.setState({
                opacity: opacity
            });
            //bind(this) 绑定自定义函数的 this
        }.bind(this), 100)
    },
    render: function () {
        return (
            <div style={{opacity: this.state.opacity}}>
                Hello {this.props.name}
            </div>
        );
    },
});

ReactDOM.render(
    <Hello name="World"/>,
    document.getElementById("example")
)
```

上面代码在`Hello`组件加载以后，通过 `componentDidMount` 方法设置一个定时器，每隔100毫秒，就重新设置组件的透明度，从而引发重新渲染。

另外，组件的`style`属性的设置方式也值得注意，不能写成
```javascript
style="opacity:{this.state.opacity};"
```

而要写成
```javascript
style={{opacity: this.state.opacity}}
```

这是因为 [React 组件样式](https://facebook.github.io/react/tips/inline-styles.html) 一个对象，所以第一重大括号表示这是 JavaScript 语法，第二重大括号表示样式对象。

## 十、Ajax
组件的数据来源，通常是通过 Ajax 请求从服务器获取，可以使用 `componentDidMount` 方法设置 Ajax 请求，等到请求成功，再用 `this.setState` 方法重新渲染 UI

```javascript
// 定义一个 RepoList 组件
var RepoList = React.createClass({
	// 初始化 this.state
    getInitialState: function () {
        return {
            loading: true,
            error: null,
            data: null
        };
    },

	// 组件添加到真实 DOM 后调用
    componentDidMount() {
	    // 定义一个 promise
        this.props.promise.then(
	        // promise 延时成功
            value => {
	            // 改变 loading 状态，data 数据
                this.setState({loading: false, data: value})
            },
            // promise 延时失败 改变 loading 状态，error 数据
            error => this.setState({loading: false, error: error}));
    },

	// 渲染函数
    render: function () {
	    // promise pending ...
        if (this.state.loading) {
            return <span>Loading...</span>;
        }
        // promise reject!
        else if (this.state.error !== null) {
            return <span>Error: {this.state.error.message}</span>;
        }
        else {
	        // 成功请求到数据，添加到变量和标签中
            var repos = this.state.data.items;
            // 遍历 ajax 请求存储好的数据
            var repoList = repos.map(function (repo, index) {
	            // 循环创建jsx html 标签，返回保存到repoList
                return (
                    <li key={index}><a href={repo.html_url}>{repo.name}</a> ({repo.stargazers_count} stars)
                        <br/> {repo.description}</li>
                );
            });
            // 返回 创建 jsx html 标签并将 repolist 添加进去
            return (
                <main>
                    <h1>Most Popular JavaScript Projects in Github</h1>
                    <ol>{repoList}</ol>
                </main>
            );
        }
    }
});

// 插入 DOM
ReactDOM.render(
	// AJAX 请求数据
    <RepoList promise={$.getJSON('https://api.github.com/search/repositories?q=javascript&sort=stars')}/>,
    document.getElementById('example')
);
```

如果Promise对象正在抓取数据（pending状态），组件显示"正在加载"；如果Promise对象报错（rejected状态），组件显示报错信息；如果Promise对象抓取数据成功（fulfilled状态），组件显示获取的数据。

[参考：React 入门实例教程](http://www.ruanyifeng.com/blog/2015/03/react.html)







