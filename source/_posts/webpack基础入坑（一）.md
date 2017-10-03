---
title: webpack基础入坑（一）
date: 2017-08-22 00:44:00
tags:
  - webpack
categories:
  - javascript
  - webpack
---
![ webpack | center ](https://ws1.sinaimg.cn/large/889b2f7fgy1fishfcjd85j21g30orwmv.jpg)

# webpck 基础入坑（一）

## 安装
这里有webpack发布的所有版本：
[https://github.com/webpack/webpack/releases](https://github.com/webpack/webpack)

当然你也可以直接通过 `npm` 命令安装：
```bash
npm install --save-dev webpack
```
如果你要体验最新版本的webpack请使用以下命令安装：
```bash
npm install webpack@beta
```



## 文档
Google 搜索 webpack 第一条结果：
[https://webpack.github.io/](https://webpack.github.io/)

页面中指明了三个链接：
1. [documentation - 文档](http://webpack.js.org/)
所有功能的罗列，文档一般**不是**按照从易到难的顺序给出，但是肯定包含的几乎所有功能的介绍。
2. [introducation - 介绍](http://webpack.js.org/concepts)
简单说明了 webpack 的作用和基本概念。
3. [tutorial - 教程](http://webpack.js.org/get-started/)
比较容易上手，教你一步一步自学 webpack

需要中文的小伙伴请点这里：
[https://doc.webpack-china.org/](https://doc.webpack-china.org/)

## 实践（抄写）
点开 [tutorial - 教程](http://webpack.js.org/get-started/) ，然后一行一行地复制里面的命令：
```bash
# 新建并进入 webpack-demo 目录
mkdir webpack-demo && cd webpack-demo
# npm 初始化一个 package.json
npm init -y
# 安装 webpack 作为开发依赖
npm install --save-dev webpack
```
ps: 安装过慢请自行切换国内淘宝源

---

按教程上说的做
```bash
# 新建一个index.hrml
touch index.html
# 新建一个src文件夹
mkdir src
# 在src文件夹内新建一个index.js
cd src && touch index.js
```

现在你的目录结构是这样的：
```bash
webpack-demo
|- package.json
|- index.html
|- /src
  |- index.js
```

---

ok，咱们继续抄
```javascript
function component() {
  var element = document.createElement('div');

  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  return element;
}

document.body.appendChild(component());
```
注意上面代码中的 ` _.join` ，这个 `_` 实际上是 `lodash` 暴露的全局变量。

---

编辑 `webpack-demo` 目录下的 `index.html`
```
<html>
  <head>
    <title>Getting Started</title>
    <script src="https://unpkg.com/lodash@4.16.6"></script>
  </head>
  <body>
    <script src="./src/index.js"></script>
  </body>
</html>
```
为了使用 `lodash`，`HTML` 使用 `script` 引入了 `lodash v4.16.6`。

---

教程里说这样引用逼格太低，我们可以用更高端的方法引入
安装 `lodash` 为必要依赖
```bash
# 请先确保命令行当前所在目录是 webpack-demo
npm install --save lodash
# 上面命令可以简写成 npm i -S lodash
```
好了，`lodash` 的源代码已经下载到 `./node_modules/lodash/` 目录中。

然后在 `src/index.js` 的第一行添加
```javascript
import _ from 'lodash';
// 然后是function component () {
```
意思是从 `lodash` 里得到默认导出，并将默认导出命名为 `_`，这个 `_` 可以换成任何一个其他的变量名。

然后按照教程说的把 `index.html` 也改了
```diff
  <html>
   <head>
     <title>Getting Started</title>
-    <script src="https://unpkg.com/lodash@4.16.6"></script>
   </head>
   <body>
-    <script src="./src/index.js"></script>
+    <script src="./dist/bundle.js"></script>
   </body>
  </html>
```

然后命令行输入：
```bash
./node_modules/.bin/webpack app/index.js dist/bundle.js
```
```bash
# 如果你是全局安装的webpack直接运行以下代码
webpack app/index.js dist/bundle.js
```
在浏览器中打开 `index.html`，如果你看到'Hello webpack' 说明运行成功。

---

这是目前的文件结构：
```bash
|- src
  |- index.js
|- dist
  |- bundle.js
|- index.html
|- node_modules/
|- package.json
```

1. `./node_modules/.bin/webpack app/index.js dist/bundle.js` 将 `src/index.js` 转化成 `dist/bundle.js`
2. `index.html` 引用的是 `dist/bundle.js`
3. `lodash` 安装在 `node_modules` 里，在`index.js`中用`import`引用
4. `webpack` 也安装在 `node_modules`里，`./node_modules/.bin/webpack` 是一个可执行文件
5. `webpack`、`lodash` 的版本号都被写在 `package.json` 里

---

## 修改
### 引入 jQuery
如果我们要在页面中引入 `jQuery`，先安装：
```bash
# 确定你在 webpack-demo 目录
npm i -S jquery
```
以上命令相当于：
```bash
npm install --save jquery
```

然后 `jquery` 模块就被下载到了 `node_modules` 中。

然后我们继续在 `src./index.js` 中引入 `jquery`
```diff
 import _ from 'lodash'
+import j from 'jquery'

 function component () {
-  var element = document.createElement('div');
+  var element = j('<div></div>');

-  element.innerHTML = _.join(['Hello','webpack'], ' ');
+  element.html(_.join(['Hello','webpack'], ' '))

-  return element;
+  return element.get(0);
 }

 document.body.appendChild(component());
```

然后再次运行
```bash
./node_modules/.bin/webpack app/index.js dist/bundle.js
```

打开 `index.html`。如果你看到 "Hello webpack"，那就说明 `jquery` 也成功引入，只不过我们把它命名为 `j`，显然命名为 `$` 更符合习惯，你可以自己改一下试试！

## 改进

上面每次都要运行 `./node_modules/.bin/webpack app/index.js dist/bundle.js ` 实在是烦人，教程里给出了方法：
```bash
# 确保你在项目根目录 webpack-demo
# 新建一个 webpack.config.js 文件
touch webpack.config.js
```
然后编辑它：
```javascript
var path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```
1. `output` 出口设置，必须是绝对路径，因此在第一行引入 `path` 模块，方便路径的设置；
2. `entry` 入口设置，可以是相对路径；
3. `filename` 输出的文件名；

然后命令行运行：
```bash
./node_modules/.bin/webpack --config webpack.config.js
```

不过这句话依然很长，每次输入很麻烦，教程又教了一个办法：使用 `npm-scripts`

---

修改 `package.json`
```diff
   "scripts": {
     "test": "echo \"Error: no test specified\" && exit 1",
+    "build": "webpack"
   },
   "keywords": [],
```
然后命令行运行：
```bash
npm run build
```
说明运行 `npm run build` 就等于运行 `node_modules` 里的 `webpack` 可执行文件，这个可执行文件会找到项目根目录下的 `webpack.config.js` 并按照其中的设置执行对应的操作

最后再看一下文件目录：
```bash
webpack-demo
|- /src
  |- index.js
|- /dist
  |- bundle.js
|- index.html
|- webpack.config.js
|- /node_modules
|- package.json
```
（完）
