---
title: React 入门笔记（一）
tags:
  - react
  - 笔记
categories:
  - javascript
  - react
date: 2017-09-24 00:58:28
---
# React 入门笔记（一）

>入门笔记，没有排版格式。

## jsx

-  数组 插入

```javascript
let jsx3 = ['i','love','react'].map((name) => {
    return <div>{name}</div>
});
render(
    <div>{jsx3}</div>,
     RootDom
);
```


---

## component 

- `pure functional component` 从不修改它的 `props`

```javascript
//  * pure functional components 
const A = (props)=>{
    return <div>{props.gender } + {props.name}</div>
};
render(<A gender='male' name='slashhuang'/>,RootDom);
```

- `class component` 必须有 `render` 方法

```javascript
// CALSS COMPONENT
class FirstComponent extends Component{
    constructor(){
        super();
        this.state = {
            b: 1
        }
    }
    render(){
        return (
            <div>
                I am a component
                {this.state.b}
            </div>);
    }
 };

render(<FirstComponent />,RootDom);
```

---

## 组件的生命周期：

1. componentWillMount
2. render
3. componentDidMount
4. shouldComponentUpdate
5. componentWillUpdate
6. render
7. componentDidUpdate

**常用的生命周期：**
1. componentDidMount
2. componentWillReceiveProps
3. shouldComponentUpdate

---

## props

- children

- `{/*<A a='1'> ==> props = {a:'1'}*/}`

```javascript
class Welcome extends Component {
  render() {
    return <div>{this.props.gender } + {this.props.name}</div>
  }
}

class ChildComponent extends Component{
    render(){
        return (
        <div>
            {this.props.children}
            <Welcome gender='male' name='slashhuang' />
        </div>);
    }
 };
render(<ChildComponent>我是个孩子</ChildComponent>,RootDom);

```

---

## state + props

- setState 异步操作，setState后会自动做一些优化操作 然后进入队列 更新状态

```javascript
class PropState extends Component{
    constructor(){
        super();
        this.state={a:'I am state'}
    }
    click(){
        /**
         * setState ==> 本组件重新render
         */
        this.setState({
            a:'我更新啦 哈哈哈'
        })
    }
    render(){
        return <div onClick={()=>this.click()}>
                {this.state.a}
                <A name= {this.state.a} />
              </div>
    }
 };
const A = (props) => {
    return <div>{props.name}</div>
}
render(<PropState/>,RootDom);
```

---

## 总结：

```javascript
JSX： xml in javascript
1. tagName
2. attributes(props)
3. children
```

```javascript
组件化：
1. 函数式组建: props ==> JSX ; 
2. 类组件：class A extendx Component
```

```javascript
1. 数据源： state + props
2. 更新数据：setState
```

( 完 )