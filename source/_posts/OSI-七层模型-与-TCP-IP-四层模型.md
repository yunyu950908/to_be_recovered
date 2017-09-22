---
title: OSI 七层模型 与 TCP/IP 四层模型
tags:
  - OSI 七层模型
  - TCP/IP 四层模型
  - HTTP
categories:
  - HTTP
date: 2017-09-22 05:00:13
---
# OSI 七层模型 与 TCP/IP 四层模型

## 1、OSI 七层模型
>OSI 模型 ( Open System Interconnection model )  是一个开放性的通信系统互连参考模型，他是一个定义得非常好的协议规范。OSI模型有7层结构，每层都可以有几个子层。

OSI 的7层从上到下分别是 ：
- 7 应用层
- 6 表示层
- 5 会话层
- 4 传输层
- 3 网络层
- 2 数据链路层
- 1 物理层

其中 高层（即7、6、5、4层）定义了应用程序的功能，下面3层（即3、2、1层）主要面向通过网络的端到端的数据流。

![@ OSI 七层模型 | center](http://oux9sg1nc.bkt.clouddn.com/17-9-22/49739910.jpg)

### 各层功能

- **应用层**
**规定数据的传输协议**
与其它计算机进行通讯的一个应用，它是对应应用程序的通信服务的。
示例：TELNET，HTTP，FTP，NFS，SMTP等。

---

- **表示层**
解决不同系统之间的通信
这一层的主要功能是定义数据格式及加密。
示例：加密，ASCII等。

---

- **会话层**
**建立一个连接**
它定义了如何开始、控制和结束一个会话。包括对多个双向消息的控制和管理，以便在只完成连续消息的一部分时可以通知应用，从而使表示层看到的数据是连续的，在某些情况下，如果表示层收到了所有的数据，则用数据代表表示层。
示例：RPC，SQL等。

---

- **传输层**
**确定端口与端口间的通信协议**
这层的功能包括是否选择差错恢复协议还是无差错恢复协议，及在同一主机上对不同应用的数据流的输入进行复用，还包括对收到的顺序不对的数据包的重新排序功能。
示例：TCP，UDP，SPX。

---

- **网络层**
**确定客户端与服务端的位置**
这层对端到端的包传输进行定义，它定义了能够标识所有结点的逻辑地址，还定义了路由实现的方式和学习的方式。为了适应最大传输单元长度小于包长度的传输介质，网络层还定义了如何将一个包分解成更小的包的分段方法。
示例：IP，IPX等。

---

- **数据链路层**
**确定了网络数据包的形式**
它定义了在单个链路上如何传输数据。这些协议与被讨论的各种介质有关。
示例：ATM，FDDI等。

---

- **物理层**
**所有硬件设施**
OSI 的物理层规范是有关传输介质的，这些规范通常也参考了其他组织制定的标准。连接头、帧、帧的使用、电流、编码及光调制等都属于各种物理层规范中的内容。物理层常用多个规范完成对所有细节的定义。
示例：Rj45，802.3等。

---


## 2、TCP/IP 四层模型

>OSI 七层模型与《图解HTTP》一书中第一章介绍的 TCP/IP 四层模型可以相互对照了解

TCP/IP 四层模型 从上到下依次是
- 应用层
- 传输层
- 网络层（又称网间层，网络互连层）
- 网络接口层（又称链路层）


![@TCP/IP 四层模型 | center](https://ws1.sinaimg.cn/large/889b2f7fgy1fjrru5z4dqj20k607h75k.jpg)


### 各层功能

- **应用层**
**确定了向用户提供应用服务时的通信活动**
应用层对应于 OSI 七层参考模型的应用层和表达层；
TFTP，HTTP，SNMP，FTP，SMTP，DNS，Telnet 等

---

- **传输层**
**确定计算机间数据传输的协议类型**
传输层对应于 OSI 七层参考模型的传输层,它提供两种端到端的通信服务。其中 TCP 协议(Transmission Control Protocol)提供可靠的数据流运输服务,UDP 协议(Use Datagram Protocol)提供不可靠的用户数据报服务。
TCP: 三次握手、四次挥手;
UDP: 只负责发包

---

- **网络层**
**确定传输双方的位置，处理流动的数据包**
网络层包含 IP 协议、RIP 协议(Routing Information Protocol,路由信息协议),负责数据的包装、寻址和路由。同时还包含网间控制报文协议(Internet Control Message Protocol,ICMP)用来提供网络诊断信息；

---

- **网络接口层**
**处理网络连接的硬件部分**
网络接口层包括用于协作IP数据在已有网络介质上传输的协议。它定义像地址解析协议(Address Resolution Protocol,ARP)这样的协议,提供 TCP/IP 协议族的数据结构和实际物理硬件之间的接口。

---

## 3、OSI 七层模型 与 TCP/IP 四层模型的对应关系

<table style="vertical-align: middle;margin:0 auto;">
<tr>
    <th>OSI 七层网络模型</th>
    <th>TCP/IP 四层模型</th>
    <th>对应网络协议</th>
</tr>
<tr>
    <td>应用层（Application）</td>
    <td rowspan="3" style="vertical-align: middle;text-align: center;">应用层</td>
    <td>TFTP, FTP, NFS, WAIS</td>
</tr>
<tr>
    <td>表示层（Presentation）</td>
    <td>Telnet, Rlogin, SNMP, Gopher</td>
</tr>
<tr>
    <td>会话层（Session）</td>
    <td>SMTP, DNS</td>
</tr>
<tr>
    <td>传输层（Transport）</td>
    <td style="vertical-align: middle;text-align: center;">传输层</td>
    <td>TCP, UDP</td>
</tr>
<tr>
    <td>网络层（Network）</td>
    <td style="vertical-align: middle;text-align: center;">网络层</td>
    <td>IP, ICMP, ARP, RARP, AKP, UUCP</td>
</tr>
<tr>
    <td>数据链路层（Data Link）</td>
    <td rowspan="2" style="vertical-align: middle;text-align: center;">网络接口</td>
    <td>FDDI, Ethernet, Arpanet, PDN, SLIP, PPP</td>
</tr>
<tr>
    <td>物理层（Physical）</td>
    <td>IEEE 802.1A, IEEE 802.2到IEEE 802.11</td>
</tr>
</table>

---

最后， OSI 是一种理论下的模型，而 TCP/IP 已被广泛使用，成为网络互联事实上的标准。

## 参考资料

1. [《图解HTTP》第一章](https://book.douban.com/subject/25863515/)
2. [开放系统互连参考模型](https://baike.baidu.com/item/%E5%BC%80%E6%94%BE%E7%B3%BB%E7%BB%9F%E4%BA%92%E8%BF%9E%E5%8F%82%E8%80%83%E6%A8%A1%E5%9E%8B/8851889?fr=aladdin&fromid=9763441&fromtitle=OSI%E4%B8%83%E5%B1%82%E6%A8%A1%E5%9E%8B)
3. [简书：深入浅出－网络七层模型&&网络数据包](http://www.jianshu.com/p/4b9d43c0571a)
4. [知乎：如何生动形象、切中要点地讲解 OSI 七层模型和两主机传输过程?](https://www.zhihu.com/question/24002080/answer/31817536)


（完）