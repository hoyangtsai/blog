---
layout: post
date: 2018-07-04
title: 跨平台 proxy 代理 tunnel 工具
description: 安裝 whistle
published: false
comments: true
tag: [proxy, nodejs, mac, homebrew]
---

nproxy, anyproxy, whistle

今天要介紹的就是 whistle

先說它的功能特點
- 配置 hosts
- 修改 http, https, websocket 請求
- 修改響應，替換本地 mock 數據文件
- 請求轉發
- 注入 html, js, css
- debug 遠端頁面

whistle 採用類似系統 hosts 配置的方式，通過域名、路徑、正則表達式、通配符號、通配路径等方式匹配

```
pattern(匹配模式) operatorURI(操作uri)
```

### 快速入門

因為 whistle 運行於 nodejs 環境，必須先確認系統已有 node 環境。<br>
所以開始操作使用主要會有四步：

1. 安裝最新版 nodejs
2. 安裝 whistle
3. 啟動 whistle
4. 配置代理

#### 安裝 nodejs
Mac 系統建議用 <a href="https://brew.sh/" target="_blank">Homebrew</a> 安裝 nodejs
```
brew install node
```
或者用 [nvm 安裝 nodejs](http://hoyangtsai.github.io/posts/2016/07/26/install-multiple-version-of-nodejs/)
```
nvm install node
```

#### 安裝 whistle
```
npm install -g whistle --registry=https://registry.npm.taobao.org
```

#### 啟動 whistle

安裝 whistle 完成後，可以執行 `w2 help` 查看 whistle 相關命令說明

whistle 運行方式主要有兩種

1. `w2 run` 在終端機前景運行代理程序，可以在同一個終端機視窗中同時按下 `ctrl + c` 停止程序。
2. `w2 start` 在系統背景運行代理程序，可以在任何終端機視窗輸入 `w2 stop` 停止程序。

#### 配置代理

配置代理主要也有兩種方法

1. 在瀏覽器的設定中設置代理位址

Firefox

Chrome (使用擴充工具)
推薦安裝 <a href="https://chrome.google.com/webstore/detail/proxy-switchyomega/padekgcemlokbadohgkifijomclgjgif" target="_blank">Proxy SwitchyOmega</a>
之後再 介紹一個更進階的作法，發表一篇介紹這個擴充工具

2. 在系統網路中，設定全局代理




通常在本地開發過程中，服務器會配置一個 virtual host

意思就是當在瀏覽器訪問 www.example.com 的時候，是連接到本地的服務器 (127.0.0.1)

這裡就提到第一個種功能，配置 hosts

一般的作法會修改 /etc/hosts 文件

在文件中加入一行
```
www.example.com 127.0.0.1
```

此時當瀏覽器偵測到訪問 www.example.com 就會跳轉到 127.0.0.1



