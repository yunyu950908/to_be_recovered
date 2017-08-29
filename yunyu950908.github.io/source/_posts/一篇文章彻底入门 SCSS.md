---
title: 一篇文章彻底入门 SCSS
date: 2017-08-21 00:36:03
tags:
  - SCSS
categories:
  - CSS
---
# SCSS 起飞指南
![Sass-Logo](https://ws1.sinaimg.cn/large/889b2f7fgy1fiq4cu6ug8j20lo0dgt95.jpg)

>写在前面：本文看起来比较长，其实是罗列了比较多的示例代码，如果你能坚持看完，对照学习，相信两个小时后你就能自己起飞愉快地去写scss了。

## （一）Sass 与SCSS的区别

### 1.1 什么是Sass

>Sass 是一种CSS的开发工具，提供了许多便利的写法，大大节省了设计者的时间，使得CSS的开发，变得简单和可维护。

### 1.2 Sass 与SCSS有什么区别

>Sass 和 SCSS 其实是同一种东西，我们平时都称之为 Sass ，两者之间不同之处有以下两点：

1. **文件扩展名不同：**
Sass 是以 `.sass` 后缀为扩展名
SCSS 是以 `.scss` 后缀为扩展名
2. **语法书写方式不同：**
Sass 是以**严格的缩进式语法规则**来书写，不带大括号 `{}` 和分号 `;`
SCSS 的语法书写和我们的 CSS 语法书写方式非常类似

**建议使用后缀名为 scss 的文件，以避免 sass 后缀名的严格格式要求报错。**

## （二）安装和使用

### 2.1 安装

>Sass 基于Ruby语言，但两者语法之间没有关系。使用Sass 无需先学习ruby，但是必须先安装Ruby，然后再安装Sass 。

 macbook自带ruby环境，直接打开终端运行 `gem` 命令安装`sass` 即可；
 windows需要先自行安装ruby，然后在 `CMD` 或其他命令行工具中运行安装命令；

---

[ruby官网](https://rubyinstaller.org/downloads/)

- 安装时请勾选`Add Ruby executables to your PATH`这个选项，添加环境变量，不然以后使用编译软件的时候会提示找不到ruby环境

![](https://ws1.sinaimg.cn/large/889b2f7fgy1fiq5fcodndj20ex07c79c.jpg)

---

- 正确安装完ruby依赖后，安装sass：

```bash
gem install sass
```

- 安装sass完成后查看版本测试安装有没有成功：

```bash
sass -v
# 安装成功会打印版本号
Sass 3.5.1 (Bleeding Edge)
```

- 如上已经安装成功。但因为国内网络（不可描述）的问题导致gem源间歇性中断，因此我们需要更换gem源。
- 使用淘宝的gem源 `https://ruby.taobao.org/`：

```bash
# 1.删除原gem源
gem sources --remove https://rubygems.org/

# 2.添加国内淘宝源
gem sources -a https://ruby.taobao.org/

# 3.打印是否替换成功
gem sources -l

# 4.更换成功后打印如下
*** CURRENT SOURCES ***
https://ruby.taobao.org/
```

### 2.2 使用

>**windows** 用户注意：
>编译 `scss` 文件中如果存在中文，可能出现类似于这样的报错：
```bash
`Syntax error: Invalid GBK character "\xE5"`
```
>请一定不要惊慌，找到类似于下面的目录：
```bash
C:\Ruby24-x64\lib\ruby\gems\2.4.0\gems\sass-3.5.1\lib\sass
```
>然后在该目录中找到 `engine.rb` ，编辑添加一行代码：
```ruby
Encoding.default_external = Encoding.find('utf-8')
```

- 编译sass

>sass 编译有很多种方式，如命令行编译模式、sublime插件SASS-Build、编译软件koala、前端自动化软件codekit、Grunt打造前端自动化工作流grunt-sass、Gulp打造前端自动化工作流gulp-ruby-sass等。

- 命令行编译;

```bash
# 1. 直接打印转化后的代码
sass test.scss

# 2. 单文件转换命令
sass input.scss output.css

# 3.1 单文件监听命令,实时转换
sass --watch input.scss:output.css

# 3.2 如果你有很多的sass文件，也可以监听整个目录：
sass --watch app/sass:public/stylesheets
```

- SASS提供四个编译风格的选项：

```bash
* nested：嵌套缩进的css代码，它是默认值。
* expanded：没有缩进的、扩展的css代码。
* compact：简洁格式的css代码。
* compressed：压缩后的css代码。
```
操作命令：
```bash
# 添加指令 --style [编译风格]
sass test.sass test.css --style compressed
```

- 四种编译排版演示:
```scss
//未编译样式
.box {
  width: 300px;
  height: 400px;
  &-title {
    height: 30px;
    line-height: 30px;
  }
}
```
1. `nested` 嵌套缩进的css代码
```css
/*编译过后样式*/
.box {
  width: 300px;
  height: 400px; }
  .box-title {
    height: 30px;
    line-height: 30px; }
```
2. `expanded` 没有缩进的、扩展的css代码
```css
/*编译过后样式*/
.box {
  width: 300px;
  height: 400px;
}
.box-title {
  height: 30px;
  line-height: 30px;
}
```
3. `compact` 简洁格式的css代码
```css
/*编译过后样式*/
.box { width: 300px; height: 400px; }
.box-title { height: 30px; line-height: 30px; }
```
4. `compressed` 压缩后的css代码
```css
/*编译过后样式*/
.box{width:300px;height:400px}.box-title{height:30px;line-height:30px}
```

## （三）基本用法
>建议先下载示例代码，然后跟着走一遍，结束之后你会大致掌握Sass的基本用法

本部分主要分为六块，目录中未提及的变量、注释等其他基础用法已包含在其中。

Sass的官方网站，提供了一个[在线转换器](https://www.sassmeister.com/)。你可以在那里，试运行下面的各种例子。

**注：**
- 以下所有代码块的第一行注释`/*SCSS*/` 和 `/*CSS*/` 是人为添加的！
- 以下所有编译风格默认 `nested`
- 如果命令行出现类似如下提示说明该方法即将弃用，有时会向下面那样提示你用其他方法代替：
```bash
DEPRECATION WARNING on line 77 of input/calculate.scss:
The operation `#123123 plus #040506` is deprecated and will be an error in future versions.
Consider using Sass's color functions instead.
```

### 3.1 嵌套规则

#### 1. 选择器嵌套
- 父子层级关系明显；
- 代码具有良好的可读性；

**示例：**
```scss
/*SCSS*/
#a {
  .a-1 {
    background: yellow;
    .child {
      font-size: 12px;
      .child-1 {
        color: red
      }
    }
  }
}
```

```css
/*CSS*/
#a .a-1 {
  background: yellow; }
  #a .a-1 .child {
    font-size: 12px; }
    #a .a-1 .child .child-1 {
      color: red; }
```

#### 2. 引用父选择符： `&`
`&` 在编译时将被替换为父选择符，输出到 CSS 中

**示例：**
```scss
/*scss*/
.hello {
  .dropdown {
    display: none;
  }
  &:hover {
    .dropdown {
      display: block;
    }
  }
}
```

```css
/*css*/
.hello .dropdown {
  display: none; }
.hello:hover .dropdown {
  display: block; }
```

#### 3. 属性嵌套
某些属性具有可选参数的，类似于 `border` 、`font` 、`background` 这样的，可以让你少复制自己的代码，当然直接使用缩写更方便一些，但使用属性嵌套的方法可读性更佳不是吗？

**示例：**
```scss
/*scss*/
.funky {
  font: {
    family: fantasy;
    size: 30em;
    weight: bold;
  }
  border: {
    radius: 20px;
    color: red;
  }
}
```

```css
/*css*/
.funky {
  font-family: fantasy;
  font-size: 30em;
  font-weight: bold;
  border-radius: 20px;
  border-color: red; }
```

#### 4. 注释规则
`/*标准的CSS注释*/` 编译后依旧存在
`//单行注释` 编译后被删除
`/*!重要注释*/`
在`/*`后面加一个感叹号 `!` ，表示这是**重要注释**。即使是压缩模式编译，也会保留这行注释，通常可以用于声明版权信息。

**示例：**

```scss
/*scss*/
/*标准的CSS注释*/
//单行注释
/*!重要注释*/
```

```css
/*css*/
/*标准的CSS注释*/
/*!重要注释*/
```

### 3.2 计算规则

#### 1. 定义变量 `$var`
SCSS中所有的变量由一个 `$` 符号定义
```scss
/*scss*/
$width: 10px;
#main {
  width: $width;
}
```

```css
/*css*/
#main {
  width: 10px; }
```

#### 2. 插值: `#{}`
将 `#{里面的值}`当做字符串插入
```scss
/*scss*/
$name: foo;
$attr: border;
p.#{$name} {
  #{$attr}-color: blue;
  : "hello world #{$name}"
}
```

```css
/*css*/
p.foo {
  border-color: blue;
  : "hello world foo"; }
```
在文本字符串中，`#{}` 形式的表达式可以被用来在字符串中添加动态值，空值会被视作空字符串：
```scss
/*scss*/
p:before {
  : "I ate #{5 + 10} pies!";
}
$value: null;
p:before {
  : "I ate #{$value} pies!";
}
```

```css
/*css*/
p:before {
  : "I ate 15 pies!"; }

p:before {
  : "I ate  pies!"; }
```


#### 3. `+`、`-`、`*`、`/` 的运算
- 在SCSS中`+` 、`-` 、`*` 的运算方法与日常使用相同，需要单位的还请都带上你的单位；
- `/` 除法运算比较特殊，直接使用最后编译出来的结果可能并不是你日常所想的那样，其特殊性大致分为三种情况，下面的代码演示中已一一说明；
- 圆括号 `()` 可以改变运算顺序；

```scss
/*scss*/
/*加减法运算*/
p {
  width: 1px + 8px;
  height: 10px - 2px;
}
/*乘法运算*/
div {
  width: 3px * 5;
  height: 2px + 6px * 3;
}
```

```css
/*css*/
/*加减法运算*/
p {
  width: 9px;
  height: 8px; }

/*乘法运算*/
div {
  width: 15px;
  height: 20px; }
```

 **圆括号 `()` 变运算顺序：**
```scss
/*scss*/
p {
  width: (1em + 2em) * 3;
}
```

```css
/*css*/
p {
  width: 9em; }
```

 **除法运算比较特殊：**
在以下三种情况中，`/` 会被解释为除法运算。 覆盖了绝大多数真正使用除法运算的情况。 这些情况是：
- 如果数值或它的任意部分是存储在一个变量中或是函数的返回值。
- 如果数值被圆括号包围。
- 如果数值是另一个数学表达式的一部分

```scss
/*scss*/
/*除法运算*/
p {
  font: 10px/8px; // 纯 CSS，不是除法运算，兼容IE8的写法
  $width: 1000px;
  width: $width/2; // 使用了变量，是除法运算
  line-height: round(3.5)/2; // 使用了函数，是除法运算
  height: (500px/2); // 使用了圆括号，是除法运算
  margin-left: 5px + 8px/2px; // 使用了加（+）号，是除法运算
}
```

```css
/*css*/
p {
  font: 10px/8px;
  width: 500px;
  line-height: 2;
  height: 250px;
  margin-left: 9px; }
```
如果你希望在纯 CSS 中使用 `变量` 和 `/`， 你可以用 `#{}` 包住 `变量` 。 例如：
```scss
/*scss*/
p {
  $font-size: 12px;
  $line-height: 30px;
  font: #{$font-size}/#{$line-height};
}
```

```css
/*css*/
p {
  font: 12px/30px; }
```


### 3.3 @import@media@extend 指令
#### 1. 引入 `@import`
`@import "basic"`：查找当前目录下的 `basic.scss` 或者 `basic.sass` 引入到当前文件中
```scss
/*scss*/
@import "basic";
//basic.sass内容如下
//#a {
//  .a-1 {
//    background: yellow;
//    .child {
//      font-size: 12px;
//      .child-1 {
//        color: red
//      }
//    }
//  }
//}
```

```css
/*css*/
#a .a-1 {
  background: yellow; }
  #a .a-1 .child {
    font-size: 12px; }
    #a .a-1 .child .child-1 {
      color: red; }
```

直接 `@import test.css` 相当于原生CSS的 `@import` 引用
```scss
/*scss*/
@import "test.css";
```

```css
/*css*/
@import url(test.css);
```

#### 2. 嵌套 `@import`
有助于创建一个新的命名空间
```scss
/*scss*/
.example {
  @import "basic.scss";
}
//basic.sass内容如下
//#a {
//  .a-1 {
//    background: yellow;
//    .child {
//      font-size: 12px;
//      .child-1 {
//        color: red
//      }
//    }
/
```

```css
/*css*/
.example {}
  .example #a .a-1 {
    background: yellow; }
    .example #a .a-1 .child {
      font-size: 12px; }
      .example #a .a-1 .child .child-1 {
        color: red; }
```

#### 3. 媒体查询 `@media`
用法与原生CSS一样
```scss
/*scss*/
.father {
  .sidebar {
    width: 300px;
    @media screen and (orientation: landscape) {
      width: 500px;
      .hello {
        font-size: 20px
      }
    }
  }
}
```

```css
/*css*/
.father .sidebar {
  width: 300px; }
  @media screen and (orientation: landscape) {
    .father .sidebar {
      width: 500px; }
      .father .sidebar .hello {
        font-size: 20px; } }
```

#### 4. 继承 `@extend`
使用 `@extend` 可以让一个选择器继承另一个选择器

**4.1 继承单个选择器**
```scss
/*scss*/
.error {
  border: 1px #f00;
  &.intrusion {
    background-image: url("/image/hacked.png");
  }
  &:hover {
    color: #00b88d;
  }
}
.extendError {
  @extend .error;
}
```

```css
/*css*/
.error, .extendError, .seriousError, .criticalError {
  border: 1px #f00; }
  .error.intrusion, .intrusion.extendError, .intrusion.seriousError, .intrusion.criticalError {
    background-image: url("/image/hacked.png"); }
  .error:hover, .extendError:hover, .seriousError:hover, .criticalError:hover {
    color: #00b88d; }
```

**4.2 继承复合选择器**
```scss
/*scss*/
.div1.div2 {
  text-decoration: underline;
}
.div3:hover {
  text-decoration: overline;
}
.extend1 {
  @extend .div1.div2;
}
.extend2 {
  @extend .div3:hover
}
```

```css
/*css*/
.div1.div2, .extend1 {
  text-decoration: underline; }

.div3:hover, .extend2 {
  text-decoration: overline; }
```

**4.3 继承多个选择器**
```scss
/*scss*/
.error {
  border: 1px #f00;
  background-color: #fdd;
}

.attention {
  font-size: 3em;
  background-color: #ff0;
}

.seriousError {
  // ===>
  @extend .error;
  @extend .attention;
  border-width: 3px;
}

```

```css
/*css*/
.error, .seriousError {
  border: 1px #f00;
  background-color: #fdd; }

.attention, .seriousError {
  font-size: 3em;
  background-color: #ff0; }

.seriousError {
  border-width: 3px; }
```

**4.4 连续继承**
```scss
/*scss*/
.error {
  border: 1px #f00;
  background-color: #fdd;
}

.seriousError {
  @extend .error;
  border-width: 3px;
}

.criticalError {
  @extend .seriousError;
  position: fixed;
  top: 10%;
  bottom: 10%;
  left: 10%;
  right: 10%;
}
```

```css
/*css*/
.error, .seriousError, .criticalError {
  border: 1px #f00;
  background-color: #fdd; }

.seriousError, .criticalError {
  border-width: 3px; }

.criticalError {
  position: fixed;
  top: 10%;
  bottom: 10%;
  left: 10%;
  right: 10%; }
```

### 3.4 mixin 指令
`@mixin` 可以预先定义样式的代码块；
`@include` 可以引入 `@mixin` 预定义的样式；
该指令类似于 `@extend` 的继承效果，区别是`@mixin`指令预定义的样式编译后会自动去除，可以有效避免使用非语义化的类名；
#### 1. `@mixin` 与 `@include`
**示例1：样式**
```scss
/*scss*/
@mixin large-text {
  font: {
    family: Arial;
    size: 20px;
    weight: bold;
  }
  color: #ff0000;
}

.page-title {
  @include large-text;
  padding: 4px;
  margin-top: 10px;
}
```

```css
/*css*/
.page-title {
  font-family: Arial;
  font-size: 20px;
  font-weight: bold;
  color: #ff0000;
  padding: 4px;
  margin-top: 10px; }
```
**示例2：选择器 + 样式**
```scss
/*scss*/
@mixin silly-links {
  a {
    color: blue;
    background-color: red;
  }
}

@include silly-links;
```

```css
/*css*/
a {
  color: blue;
  background-color: red; }
```
**示例3：复合使用**
```scss
/*scss*/
@mixin highlighted-background {
  background-color: #fc0;
}

@mixin header-text {
  font-size: 20px;
}

@mixin compound {
  @include highlighted-background;
  @include header-text;
}

.test {
  @include compound
}
```

```css
/*css*/
.test {
  background-color: #fc0;
  font-size: 20px; }
```
#### 2. 定义参数
**示例4：$arguments**
`@mixin` 可以定义参数，`@include`调用的时候传参；
```scss
/*scss*/
@mixin sexy-border($color, $width) {
  border: {
    color: $color;
    width: $width;
    style: dashed;
  }
}

p {
  @include sexy-border(blue, 10px);
}
```

```css
/*css*/
p {
  border-color: blue;
  border-width: 10px;
  border-style: dashed; }
```

#### 3. 指定参数的缺省值
```scss
/*scss*/
@mixin left($value: 10px) {
  float: left;
  margin-right: $value;
}

p {
  @include left;
}
```

```css
/*css*/
p {
  float: left;
  margin-right: 10px; }
```

#### 4. `$arg...`

**示例5：`$arg...`**
可以用 `$参数...` 表示所有传入的参数
```scss
/*scss*/
$b: box-shadow;
@mixin box-shadow($shadows...) {
  -moz-#{$b}: $shadows;
  -webkit-#{$b}: $shadows;
  #{$b}: $shadows;
}

.shadows {
  @include box-shadow(0px 4px 5px #666, 2px 6px 10px #999);
}
```

```css
/*css*/
.shadows {
  -moz-box-shadow: 0px 4px 5px #666, 2px 6px 10px #999;
  -webkit-box-shadow: 0px 4px 5px #666, 2px 6px 10px #999;
  box-shadow: 0px 4px 5px #666, 2px 6px 10px #999; }
```

### 3.5 条件语句、循环语句
#### 1. 条件语句
`@if...else...` 条件判断，判断结果为 `true` 时赋值样式

**示例1：**
```scss
/*scss*/
p {
  @if 1 + 1 == 2 {
    border: 1px solid;
  }
  @if true {
    background-image: url('');
  }
  @if 5 < 3 {
    border: 2px dotted;
  }
  @if null {
    border: 3px double;
  }
}
```

```css
/*css*/
p {
  border: 1px solid;
  background-image: url(""); }
```

**示例2：**
```scss
/*scss*/
$type: monster;
p {
  @if $type == ocean {
    color: blue;
  } @else if $type == matador {
    color: red;
  } @else if $type == monster {
    color: green;
  } @else {
    color: black;
  }
}
```

```css
/*css*/
p {
  color: green; }
```

#### 2. 循环语句
注意`form...through`与`from ... to`循环的范围

**2.1 `@for $var form...through...`**
**示例：from ... through**
```scss
/*scss*/
@for $i from 1 through 3 {
  .item-#{$i} {
    width: 2em * $i;
  }
}
```

```css
/*css*/
.item-1 {
  width: 2em; }

.item-2 {
  width: 4em; }

.item-3 {
  width: 6em; }
```

**2.2 `@for $var from...to...`**
**示例：from ... to**
```scss
/*scss*/
@for $i from 1 to 3 {
  .item-to-#{$i} {
    width: 2em * $i;
  }
}
```

```css
/*css*/
.item-to-1 {
  width: 2em; }

.item-to-2 {
  width: 4em; }
```

**2.3 `@each $var in ...`**
`@each` 为 `$var` 循环所有 `in` 后面列出的值
**示例：@each ... in ...**
```scss
/*scss*/
@each $animal in puma, sea-slug, egret, salamander {
  .#{$animal}-icon {
    background-image: url('/images/#{$animal}.png');
  }
}
```

```css
/*css*/
.puma-icon {
  background-image: url("/images/puma.png"); }

.sea-slug-icon {
  background-image: url("/images/sea-slug.png"); }

.egret-icon {
  background-image: url("/images/egret.png"); }

.salamander-icon {
  background-image: url("/images/salamander.png"); }
```

**2.4 `@while $var ...`**
**示例：`while`循环**
```scss
/*scss*/
$i: 6;
@while $i > 0 {
  .item-#{$i} {
    width: 2em * $i;
  }
  $i: $i - 2;
}
```

```css
/*css*/
.item-6 {
  width: 12em; }

.item-4 {
  width: 8em; }

.item-2 {
  width: 4em; }
```
**2.5 条件 + 循环**
**示例：**
```scss
/*scss*/
//@for 后面的第一个$i 相当于参数，第二个$i 直接将变量的值拿过来用
$i: 6;
@for $i from 1 through $i {
  .col-#{$i} {
    width: $i/6*100%
  }
}
```
**相当于：**
```scss
/*scss*/
$i: 6;
@for $j from 1 through $i {
  .col-#{$j} {
    width: $j/6*100%
  }
}
```

```css
/*css*/
.col-1 {
  width: 16.6666666667%; }

.col-2 {
  width: 33.3333333333%; }

.col-3 {
  width: 50%; }

.col-4 {
  width: 66.6666666667%; }

.col-5 {
  width: 83.3333333333%; }

.col-6 {
  width: 100%; }
```


### 3.6 自定义函数

```scss
/*scss*/
$grid-width: 40px;
$gutter-width: 10px;

@function test($a) {
  @return $a + 10;
}

@function grid-width($n) {
  $hello: 1px;
  @for $i from 1 through $n {
    $hello: $hello + $i;
  }
  @if $hello > 10 {
    $hello: 15px;
  }
  @return $hello + test(2);
}

#sidebar {
  width: grid-width(5);
}
```

```css
/*css*/
#sidebar {
  width: 27px; }
```
（教程结束）

## 复习
 如果你对着教程自己有在操作，那么你可以再抽时间过一遍阮一峰老师的[SASS用法指南](http://www.ruanyifeng.com/blog/2012/06/sass.html)，配合食用味道更佳哦~

（完）

---

## 参考
[SASS用法指南-阮一峰](http://www.ruanyifeng.com/blog/2012/06/sass.html)
[SASS中文文档-bootcss](http://sass.bootcss.com/)