---
title: 一键安装最新内核并开启 BBR 脚本
tags:
  - BBR
  - 工具
categories:
  - 工具
date: 2017-09-25 00:56:33
---
# 一键安装最新内核并开启 BBR 脚本

> 转自：秋水逸冰 » 一键安装最新内核并开启 BBR 脚本

![@ Google BBR | center ](http://oux9sg1nc.bkt.clouddn.com/17-9-24/85116344.jpg)

最近，Google 开源了其 TCP BBR 拥塞控制算法，并提交到了 Linux 内核，最新的 4.11 版内核已经用上了该算法。根据以往的传统，Google 总是先在自家的生产环境上线运用后，才会将代码开源，此次也不例外。
根据实地测试，在部署了最新版内核并开启了 TCP BBR 的机器上，网速甚至可以提升好几个数量级。
于是我根据目前三大发行版的最新内核，开发了一键安装最新内核并开启 TCP BBR 脚本。

## 本脚本适用环境

系统支持：CentOS 6+，Debian 7+，Ubuntu 12+
虚拟技术：OpenVZ 以外的，比如 KVM、Xen、VMware 等
内存要求：≥128M
**日期　　：2017 年 05 月 15 日**

## 关于本脚本

1、本脚本已在 Vultr 上的 VPS 全部测试通过。
2、当脚本检测到 VPS 的虚拟方式为 OpenVZ 时，会提示错误，并自动退出安装。
3、脚本运行完重启发现开不了机的，打开 VPS 后台控制面板的 VNC, 开机卡在 grub 引导, 手动选择内核即可。
4、由于是使用最新版系统内核，最好请勿在生产环境安装，以免产生不可预测之后果。

## 使用方法

使用 root 用户登录，运行以下命令：

( 不放心的小伙伴可以自行查看 bbr.sh 脚本内容 )

```bash
wget --no-check-certificate https://github.com/teddysun/across/raw/master/bbr.sh
chmod +x bbr.sh
./bbr.sh
```

安装完成后，脚本会提示需要重启 VPS，输入 y 并回车后重启。
重启完成后，进入 VPS，验证一下是否成功安装最新内核并开启 TCP BBR，输入以下命令：

```bash
uname -r
```

查看内核版本，含有 4.12 就表示 OK 了

---

```bash
sysctl net.ipv4.tcp_available_congestion_control
```
返回值一般为：
net.ipv4.tcp_available_congestion_control = bbr cubic reno

---

```bash
sysctl net.ipv4.tcp_congestion_control
```
返回值一般为：
net.ipv4.tcp_congestion_control = bbr

---

```bash
sysctl net.core.default_qdisc
```
返回值一般为：
net.core.default_qdisc = fq

---

```bash
lsmod | grep bbr
```
返回值有 tcp_bbr 模块即说明bbr已启动。

**（食用[ VirMach VPS Hosting ](https://billing.virmach.com/aff.php?aff=2540) ubuntu 的小伙伴到这里基本就可以了，不需要再继续往下看了。 ）**

## 内核升级方法
如果是 CentOS 系统，执行如下命令即可升级内核：
```bash
yum --enablerepo=elrepo-kernel -y install kernel-ml kernel-ml-devel
```

CentOS 6 的话，执行命令：
```bash
sed -i 's/^default=.*/default=0/g' /boot/grub/grub.conf
```

CentOS 7 的话，执行命令：
```bash
grub2-set-default 0
```

如果是 Debian/Ubuntu 系统，则需要手动下载最新版内核来安装升级。
去这里下载最新版的内核 deb 安装包。
如果系统是 64 位，则下载 amd64 的 linux-image 中含有 generic 这个 deb 包；
如果系统是 32 位，则下载 i386 的 linux-image 中含有 generic 这个 deb 包；
安装的命令如下（以最新版的 64 位 4.12.4 举例而已，请替换为下载好的 deb 包）：

```bash
dpkg -i linux-image-4.12.4-041204-generic_4.12.4-041204.201707271932_amd64.deb
```

安装完成后，再执行命令：
```bash
/usr/sbin/update-grub
```

最后，重启 VPS 即可。

## 特别说明

如果你使用的是 Google Cloud Platform （GCP）更换内核，有时会遇到重启后，整个磁盘变为只读的情况。只需执行以下命令即可恢复：

```bash
mount -o remount rw /
```

## 更新日志：

2017 年 05 月 15 日：
1、脚本并没有更新，因为代码会自动获取最新版内核来安装。这里只是更新了下文章里的内核版本（Linux 内核版本号开挂了）
2017 年 02 月 22 日：
1、更新自动获取最新版 4.10 内核 。
2017 年 01 月 20 日：
1、新增自动获取并下载安装最新版内核的功能。
2017 年 01 月 13 日：
1、更新内核到 4.9.3。
2017 年 01 月 09 日：
1、更新内核到 4.9.1。

## 参考链接：

https://github.com/google/bbr/blob/master/Documentation/bbr-quick-start.md
http://elrepo.org/tiki/tiki-index.php
http://kernel.ubuntu.com/~kernel-ppa/mainline/

