---
title: React 入门笔记（二）
tags:
  - react
  - 笔记
categories:
  - react
date: 2017-09-24 17:55:42
---
# React 入门笔记（二）

>笔记概要：
>1. CND 引用跑起一个 hello world react 实例；
>2. webpack 搭建一个撸React 的开发环境；

---

>基础模块：
>1. babel-cli
>2. babel-preset-react
>3. react
>4. react-dom
>5. babel-preset-es2015
>6. babel-loader

---

>开发模块：
>1. html-webpack-plugin
>2. webpack-dev-server
>3. HMR 热替换 + react-hot-loader

>其他模块：根据自己需求添加 如 devtool : "source-map" 等

---

## 零、初探

新建一个入口文件

新建一个js ==> hello world

引入 CDN

```
<script src="https://unpkg.com/react@15/dist/react.min.js"></script>
<script src="https://unpkg.com/react-dom@15/dist/react-dom.min.js"></script>
```

npm 安装 babel ==> babel-cli babel-preset-react

npm script ==> ./node_modules/.bin/babel --presets react src --out-dir build --watch

## 一、webpack 构建开发环境

### 1. 安装基础模块

已有模块：
babel-cli
babel-preset-react

```json
"build": "./node_modules/.bin/babel --presets react src --out-dir build --watch"
```

继续安装：
react
react-dom
babel-preset-es2015
babel-loader

- `.babelrc` 配置，管理 babel
```json
{
  "presets":[
    ["es2015",{"modules":false}],
    "react"
  ]
}
```

npm script ==> "dev":"webpack --config webpack.dev.js"

- `webpack.dev.js`
```javascript
const path = require("path");
const root = __dirname;

module.exports = {
    // 入口文件
    entry: path.resolve(root, "src/main.js"),
    // 出口文件
    output: {
        filename: "bundle.js",
        path: path.resolve(root, "dist")
    },
    // loaders
    module: {
        rules: [
            {
                test: /\.js[x]?$/,
                use: ["babel-loader"],
                exclude: /node_modules/
            },
        ]
    }
}
```

这个时候已经能跑起来了，但是不够自动化，下面再给 webpack 新增一些配置

### 2. html-webpack-plugin

说明书：https://doc.webpack-china.org/plugins/html-webpack-plugin
```javascript
// 引入html-webpack-plugin
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  // ...
  // 其他配置保持不变
  // ...
  plugins: [
    new HtmlWebpackPlugin({
      title: 'React Demo',
      template: path.resolve(root, 'template.html')
    })
  ]
}
```


### 3. webpack-dev-server

说明书：https://doc.webpack-china.org/guides/development/#-webpack-dev-server
```javascript
module.exports = {
    // 入口文件
    entry: [
        "webpack-dev-server/client",
        path.resolve(root, "src/main.js")
    ],
    // 出口文件
    output: {
        filename: "bundle.js",
        path: path.resolve(root, "dist"),
        publicPath: "/"
    },
    devServer: {
        contentBase: path.resolve(root, "dist"),
        publicPath: "/",
        port: "3030",
        historyApiFallback: true
    },
```

package.json
```json
    "dev": "webpack-dev-server --config webpack.dev.js"
```

## HMR 热替换

说明书：https://doc.webpack-china.org/guides/hot-module-replacement
### .babelrc
```json
{
  "presets":[
    ["es2015",{"modules":false}],
    "react"
  ],
  "plugins":[
    "react-hot-loader/babel"
  ]
}
```

### react-hot-loader

安装模块 ==> npm i -D react-hot-loader

说明书：https://github.com/gaearon/react-hot-loader

修改 webpack.dev.js
```javascript
    entry: [
        "react-hot-loader/patch",
        "webpack-dev-server/client",
        "webpack/hot/only-dev-server",
        path.resolve(root, "src/main.js")
    ],
    //
    // 其他没变
    //
    devServer: {
        hot: true,
        contentBase: path.resolve(root, "dist"),
        publicPath: "/",
        port: "3030",
        historyApiFallback: true
    },
    //
    // 其他没变
    //
    plugins: [
        new HtmlWebpackPlugin({
            title: "React Demo",
            template: path.resolve(root, "template.html")
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ]
```


main.js
```javascript
import React from 'react'
import ReactDOM from 'react-dom'
import {AppContainer} from 'react-hot-loader'
import App from './App'

const render = (App) => {
    ReactDOM.render(
        <AppContainer>
            <App/>
        </AppContainer>,
        document.getElementById('app')
    )
};

render(App);

if (module.hot) {
    module.hot.accept('./App', () => render(App))
}
```

然后修改 App.js 里的内容自己调试

（完）