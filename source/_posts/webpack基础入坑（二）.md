---
title: webpack基础入坑（二）
date: 2017-08-22 19:30:03
tags:
  - webpack
categories:
  - javascript
  - webpack
---

![ webpack | center ](https://ws1.sinaimg.cn/large/889b2f7fgy1fishfcjd85j21g30orwmv.jpg)

# webpack基础入坑（二
>接上回

上回主要操作了指南的 Installation 与 GettingStarted 这两部分，这时候我们大概能猜出 webpack 的某些功能了：
1. 使用各种 loader 加载不同的资源
2. 把所有资源打包起来

## bundle.js

我们可以阅读一下最后生成的 `bundle.js`
（可以写几个简单的JS文件打包，参数部分看起来会更方便一些）
`bundle.js` 是一个并不复杂的自执行函数（每一行都有代码注释）容主要由两部分组成：
1. webpackBootstrap 函数入口，主体部分
打包的功能就在这部分，有兴趣的话可以看一下每一行的功能，大致就是把每个模块call一下，然后把模块保存到 `installedModules` 里，然后需要用到的时候可以直接调用。
2. 参数部分
传入一个数组，数组的每一项都是一个模块，每个模块都有一个独立的模块ID，模块需要其他依赖时直接通过模块ID来调用。

就此打住，这篇文章主题并不在讲 `bundle.js`。

---

## JS 压缩

webpack打包之后我们发现 `dist/bundle.js` 有800KB，因为我们引入了 `lodash` 和 `jQuery` 这两个库，但是并没有压缩代码，那么如何压缩呢？方法很多，其中最简单的一种就是使用 webpack 自带的压缩插件 UglifyJsPlugin：

我们修改一下 `npm scripts` 的配置，添加一个字段启动webpack的压缩功能：
```json
"build-p": "webpack -p"
```

重新运行命令打包文件，得到的 `bundle.js` 就是一个压缩过的文件。
- 更多使用方法参考这里：[UglifyJS](https://github.com/mishoo/UglifyJS2#usage)

```
npm run build-p
```

运行帮助命令查看 `-p` 参数的具体功能
```bash
./node_modules/.bin/webpack --help

# 找到如下介绍
-p        shortcut for --optimize-minimize --define process.env.NODE_ENV="production"
```

```bash
webpack -p
# 相当于以下命令
webpack --optimize-minimize --define process.env.NODE_ENV="'production'"
```
它会执行如下步骤：
1. 使用 UglifyJsPlugin 进行 JS 文件压缩
2. 运行 [LoaderOptionsPlugin](https://doc.webpack-china.org/plugins/loader-options-plugin/)
3. 设置 NodeJS 环境变量，触发某些 package 包，以不同的方式进行编译。

## 开发环境
每次改完代码都要运行一次打包命令是不是很烦人？没关系，webpack 肯定也考虑到了，于是乎我们就可以通过 webpack 自带的监听功能自动监听文件变动然后执行编译。

[Development](https://webpack.js.org/guides/development/) 这一章节就是专门介绍如何快速开发的。

### 1. 调整编辑器
首先，我们先拉到文章底部，按照它的要求调整我们的编辑器：
![@调整编辑器 | center](https://ws1.sinaimg.cn/large/889b2f7fgy1fivwqt4zttj20hz08vdgs.jpg)

### 2. Source Maps
调整好编辑器后我们再返回页面顶部，找到Source Maps
**功能：**
将编译后的代码映射回原始源代码，如果某个源文件中存在错误，source map会追踪到错误和警告在源代码中的原始位置，方便代码调试。
```diff
  var path = require('path');
  module.exports = {
    entry: './src/index.js',
+   devtool: 'inline-source-map',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
  };
```
故意改错源文件中的代码，然后运行 `npm run build` 打包，然后在浏览器控制台你会发现 `bundle.js` 的报错会指向源文件。
![@指向了源文件 foo.js | center](https://ws1.sinaimg.cn/large/889b2f7fgy1fivxaa8w8yj20d2048dg4.jpg)

### 3. Watch Mode
再修改一下 `npm scripts` 的配置，添加一个字段以启动监听模式：
```json
"watch": "webpack --watch"
```
运行 `npm run watch`
```bash
npm run watch
# 运行成功直接编译然后光标继续闪动表示监听中...
```
如果你想要退出，请按 `Ctrl+c`

好了现在我们试一下这个监听功能，我们随便修改一个文件内容，按 `Ctrl+s` 保存。

切换回命令行，你会发现 webpack 自动执行了编译操作。


### 4.  webpack-dev-server

此功能能够让你的浏览器自动刷新，是不是棒棒哒~（虽然很多编辑器也都有这个功能=。=）

按照老规矩，第一步添加修改 `npm scripts` 的配置，添加一个字段以启动开发服务器：
```json
"start": "webpack-dev-server --open"
```
修改 `webpack.config.js` ，在 `module.exports` 对象中添加一个字段 `devServer` ，告知 `webpack-dev-server` 将指定目录下的文件作为可访问文件。
```javascript
devServer: {
    contentBase: './'
},
```

运行 `npm run start` 启动服务器，然后浏览器就会自动打开 http://localhost:8080/ ，你会看到 `index.html` 页面。
```bash
npm run start
```

接下来如果我们改一下 `src/index.js`，你就会发现

1. `bundle.js` 自动打包
2. http://localhost:8080/ 自动刷新

注意：期间 `dist/bundle.js` 不会自动变化，在部署代码之前，依然要运行 `npm run build` 才行。

### 5. webpack-dev-middleware
功能与 `webpack-dev-server` 类似，新手入坑不建议使用 `webpack-dev-middleware`

（完）
