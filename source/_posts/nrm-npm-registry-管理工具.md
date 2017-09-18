---
title: nrm ---- npm registry 管理工具
tags:
  - nrm
  - npm
categories:
  - npm
date: 2017-09-18 21:51:38
---

## 一、什么是 nrm

一个 npm registry 管理工具。

## 二、nrm 干嘛用

可以快速切换至其他 npm 源下载你需要的包

## 三、为什么要用

1. 当前源不稳定，安装某些包时经常卡住不动
2. npm 官方源上不去了（国内互联网不可描述的原因）
3. 你不会手动切换 npm 其他源，或者你不知道还有哪些源

## 四、如何使用

1. install
```bash
npm install -g nrm
```

2. show registry list
```bash
nrm ls

* npm ---- https://registry.npmjs.org/
  cnpm --- http://r.cnpmjs.org/
  taobao - https://registry.npm.taobao.org/
  nj ----- https://registry.nodejitsu.com/
  rednpm - http://registry.mirror.cqupt.edu.cn/
  npmMirror  https://skimdb.npmjs.com/registry/
  edunpm - http://registry.enpmjs.org/
```

3. change target registry
```bash
# switch registry to cnpm
nrm use cnpm

    Registry has been set to: http://r.cnpmjs.org/
```

4. show help
```bash
nrm help

# here to show all of the nrm cmmands
```

## 五、注意事项

当你使用其他源的时候，你无法使用 npm 的 publish 命令发布你的 npm 包，需要切换回官方源。

## 参考资料

[ nrm -- NPM registry manager - Github ](https://github.com/Pana/nrm)

