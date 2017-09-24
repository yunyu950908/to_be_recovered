---
title: 超简单的 shadowsocks + BBR 搭建教程
tags:
  - 梯子
  - 工具
categories:
  - 工具
date: 2017-09-25 00:50:10
---
# 超简单的 shadowsocks + BBR 搭建教程

>最近撸了一年份的服务器 :  8.75刀 `(*^▽^*)`
>这里是官网 ：[ VirMach VPS Hosting ](https://billing.virmach.com/aff.php?aff=2540)
>注意：**是 KVM 架构** 简直**便宜**到没朋友！！！正常 openVZ 包年价格至少是这个的两倍啊！！！
>openVZ 与 KVM 的区别请自行 google，下面教程开始。

本文所有马赛克都是博主的命名怪癖 和 IP 信息，不影响食用。

## 零、购买服务器

**写在前面：老美的服务器厂商大多都有个不成文的规定，购买服务器的时候不要挂代理。否则，你会被标记为欺诈，后期可能会有各种情况发生。所以，这种没有被墙的地方还是不要挂代理了。**

### 1、进入官网

进入到 [ virmach 官网 ](https://billing.virmach.com/aff.php?aff=2540)

### 2、查看产品列表

点 `vps` , 选择 `view all products`  查看所有产品

![@view all products | center ](https://ws1.sinaimg.cn/large/889b2f7fgy1fjv0se71o7j208107hglt.jpg)

### 3、选择服务器架构

然后进入所有产品页面后，选择 `KVM & SSD` 你阔以忽略后面的 `windows VPS` ，因为我们用不到 win QAQ

![@KVM & SSD | center](https://ws1.sinaimg.cn/large/889b2f7fgy1fjv0u0ufw1j20iy0h2ad7.jpg)

### 4、选择服务器配置

接下来右手边看到 `SSD 256` 同时下面有详细配置，256MB 运存，10G SSD，500G 月经量，1GBPS 带宽，完全够我们建 shadowsocks + BBR 挥霍，个人使用肯定有很多闲置资源，完全能托管你的个人网站。

>256MB RAM / 1 CORE / 10GB SSD / 500GB BW / 1GBPS KVM Virtualization, SolusVM

![](https://ws1.sinaimg.cn/large/889b2f7fgy1fjv0wyqakrj20mp06e3yz.jpg)

### 5、选择详细配置

进入填写订单界面，依次选择，包年 12.5 刀，为什么说是 8.75刀 呢？你随便谷歌一下就可以搜到至少 25% 优惠的优惠码，我搜到的一个 30% 的优惠码，所以打完折是 8.75 刀。

- 从上到下：
第一个选项：服务周期（包月，包季，包年）
第二个选项：服务器系统（推荐 ubuntu ，对新手比较友好）
第三个选项：推荐圣何塞（然而已经脱销，估计天朝 VPN 奸商买断了），或者其他西海岸的城市。

试过跟踪路由到美国西海岸附近的城市的机房，从天朝到目标服务器都会路由经过圣何塞中转，所以理论上圣何塞机房的服务器延迟最低，当然如果你只是用作搭建 ss 代理的话主要还是要考虑返程路由。

目前我 ( 联通 50M ) 用过 凤凰城 （平均延迟 < 200 ms，下载峰值 2 m/s，上传峰值 1.3 m/s），洛杉矶 （平均延迟 < 300 ms ，下载和上传跟凤凰城差不多），如果你买完后对路由路线不满意的话可以写邮件联系客服迁移城市，说明你不需要数据迁移，直接销毁旧主机然后开新主机，这样的话是免费的。

![@Deploy Service & Customize - SSD256 | center ](https://ws1.sinaimg.cn/large/889b2f7fgy1fjv13u79slj20tg0kutds.jpg)

### 6、付款

这就不多说了，根据自己需求填写。

**邮箱！！！一定！！！填写正确！！！**

**用 PayPal 付款的注意：**
1. PayPal 默认的货币转换相比你的信用卡转换每一刀会贵上几毛钱，可以在 PayPal 的付款设置（还是财务设置），资金来源 里面自行设置成发卡行付款。
2. PayPal 购买完成后取消掉自动续费，具体操作请 google 之~

付款之后会有邮件发送到你的邮箱进行验证

## 一、ssh 登录

### 1、查看信息

购买完成之后自行登录  [ virmach ](https://billing.virmach.com/aff.php?aff=2540)

然后你会看到你已经被分配了一台服务器，然后点击进入详情页

![@My Products & Services | center ](https://ws1.sinaimg.cn/large/889b2f7fgy1fjv1t6jgi4j20tt0ehq54.jpg)

下面是详情页，有你的服务器购买时间，到期时间，付款方式，名字，价格等，我们不管，直接下拉，找到你的 IP

![@Manage Product | center ](https://ws1.sinaimg.cn/large/889b2f7fgy1fjv1uolk5uj20tn0h00v2.jpg)

ok,  看到了没有，你服务器的 IP ，然后下面是的 root 用户密码，点击叹号显示明文。

然后下面还有你这个月的月经量，服务器的运存，硬盘等信息。

![@Server Details | center ](https://ws1.sinaimg.cn/large/889b2f7fgy1fjv1xwpttbj20kf0gct9a.jpg)、

### 2、登录到远程服务器

mac 用户直接用你的 terminal 就阔以了，windows 用户可以用 putty 或者 xshell 这类神器比较方便。

如果你用命令行登录的话登录格式是：`ssh root@服务器IP` 回车，然后然你输入服务器密码（密码会隐藏，不是你没有输入哦 =。= ）

### xshell 设置 ( 命令行的小伙伴跳过 )

工具初始化设置，以后登录直接点一下就可以，很方便。而且可以配置管理其他服务器，其他功能自行挖掘。

这里介绍 windows 的 [ xshell ](https://cn.bing.com/search?q=xshell)，这是一款免费的应用（之前闹过丑闻，介意的同学选择命令行 或者其他工具 )

![@xshell | center](https://ws1.sinaimg.cn/large/889b2f7fgy1fjv23yeamrj20ig0hljsk.jpg)

点击 `文件-->新建-->连接` ，
然后依次输入 `名称（随便填）--> 协议（默认ssh）--> 主机（你的服务器IP）-->端口号（默认22端口用来 ssh 连接）` ，
接着看左边的类别列表，`用户身份验证` , 依次输入 `方法 --> 用户名(root) --> 密码（直接复制粘贴过来）`
然后点 `确定` ，到这里访问服务器的用户账号密码端口协议都配置好了

![@用户身份验证 | center](https://ws1.sinaimg.cn/large/889b2f7fgy1fjv293vo4bj20g00dedgg.jpg)

### 登录

xshell 主界面，选择 `打开`

![@ 打开 | center ](https://ws1.sinaimg.cn/large/889b2f7fgy1fjv2fp76bcj2044038gli.jpg)

选中你配置好的那个登录信息，点击 `连接`

![@连接 | center](https://ws1.sinaimg.cn/large/889b2f7fgy1fjv2gki4hsj20fu09pjrq.jpg)

连接成功，然后大致长这样（遮掉的是命名怪癖与服务器IP）

![@连接成功 | center](https://ws1.sinaimg.cn/large/889b2f7fgy1fjv2jzda4jj20ig0hljso.jpg)

## 二、BBR

>ok，登录服务器成功后你可以选择先搭建 shadowsocks 或者 搭建BBR

加速工具很多，如锐速，BBR，kcptun . . . 等，

**个人**（不代表全部）使用效果，BBR 相对而言最好，

kcptun 相当于外面包一层 UDP ，然后设置多倍发包，月经量飞速流逝，

锐速（收费），据说官方破产了，盗版在这里 [serverspeeder锐速一键破解安装版 - github](https://github.com/91yun/serverspeeder)

### 安装 BBR

>脚本来源：秋水逸冰。不放心的小伙伴可以自行查看 bbr.sh 脚本内容。

使用 root 用户登录，运行以下命令：


```bash
wget --no-check-certificate https://github.com/teddysun/across/raw/master/bbr.sh
chmod +x bbr.sh
./bbr.sh
```

安装完成后，脚本会提示需要重启 VPS，输入 y 并回车后重启。

---

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

如果有其他问题，移步 [一键安装最新内核并开启 BBR 脚本](./一键安装最新内核并开启 BBR 脚本.md)

## 三、shadowsocks

>脚本来源：秋水逸冰。不放心的小伙伴可以自行查看 bbr.sh 脚本内容。

### 关于本脚本
1、一键安装 Shadowsocks-Python， ShadowsocksR， Shadowsocks-Go， Shadowsocks-libev 版（四选一）服务端；
2、各版本的启动脚本及配置文件名不再重合；
3、每次运行可安装一种版本；
4、支持以多次运行来安装多个版本，且各个版本可以共存（注意端口号需设成不同）；
5、若已安装多个版本，则卸载时也需多次运行（每次卸载一种）；
6、Shadowsocks-Python 和 ShadowsocksR 安装后不可同时启动（因为本质上都属 Python 版）。

友情提示：如果你有问题，请先阅读这篇 [《Shadowsocks Troubleshooting》](https://teddysun.com/399.html) 之后再询问。


### 默认配置
服务器端口：自己设定（如不设定，默认为 8989）
密码：自己设定（如不设定，默认为 teddysun.com）
加密方式：自己设定（如不设定，Python 和 libev 版默认为 aes-256-gcm，R 和 Go 版默认为 aes-256-cfb）
协议（protocol）：自己设定（如不设定，默认为 origin）（仅限 ShadowsocksR 版）
混淆（obfs）：自己设定（如不设定，默认为 plain）（仅限 ShadowsocksR 版）
备注：脚本默认创建单用户配置文件，如需配置多用户，请手动修改相应的配置文件后重启即可。

### 安装 shadowsocks

使用root用户登录，运行以下命令：

```bash
wget --no-check-certificate -O shadowsocks-all.sh https://raw.githubusercontent.com/teddysun/shadowsocks_install/master/shadowsocks-all.sh
chmod +x shadowsocks-all.sh
./shadowsocks-all.sh 2>&1 | tee shadowsocks-all.log
```

### 安装完成后，脚本提示如下

```bash
Congratulations, your_shadowsocks_version install completed!
Your Server IP        :your_server_ip
Your Server Port      :your_server_port
Your Password         :your_password
Your Encryption Method:your_encryption_method

Welcome to visit:https://teddysun.com/486.html
Enjoy it!
```

### 卸载方法

若已安装多个版本，则卸载时也需多次运行（每次卸载一种）

使用root用户登录，运行以下命令：

```bash
./shadowsocks-all.sh uninstall
```

### 启动脚本

启动脚本后面的参数含义，从左至右依次为：启动，停止，重启，查看状态。

Shadowsocks-Python 版：
/etc/init.d/shadowsocks-python start | stop | restart | status

ShadowsocksR 版：
/etc/init.d/shadowsocks-r start | stop | restart | status

Shadowsocks-Go 版：
/etc/init.d/shadowsocks-go start | stop | restart | status

Shadowsocks-libev 版：
/etc/init.d/shadowsocks-libev start | stop | restart | status

### 各版本默认配置文件

Shadowsocks-Python 版：
/etc/shadowsocks-python/config.json

ShadowsocksR 版：
/etc/shadowsocks-r/config.json

Shadowsocks-Go 版：
/etc/shadowsocks-go/config.json

Shadowsocks-libev 版：
/etc/shadowsocks-libev/config.json

### 多用户配置

修改 JSON 格式如下：
（按自己需求修改 端口，密码，加密方式）
```json
{
    "port_password":{
         "8989":"password0",
         "9001":"password1",
         "9002":"password2",
         "9003":"password3",
         "9004":"password4"
    },
    "method":"your_encryption_method",
    "timeout":600
}
```

## 其他

至此，教程结束。恭喜你拥有了你自己的梯子~ 其他闲置资源可以自行配置，比如搭建一个个人网站玩玩，或者做一个中间路由（手动滑稽）。

如有其他疑问， [ 点此发送邮件 ](mailto: 936787599@qq.com)

（完）