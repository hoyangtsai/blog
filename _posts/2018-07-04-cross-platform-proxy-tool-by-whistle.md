---
layout: post
date: 2018-07-04
title: 跨平台 proxy 代理 tunnel 工具
description: 安裝 whistle
published: false
comments: true
tag: [proxy, nodejs, mac, homebrew, nvm]
---

Charles, nproxy, anyproxy

今天要介紹的是 whistle

先說它的功能特點

- 配置 hosts
- 修改 http, https, websocket 請求
- 修改響應，替換本地假數據
- 請求轉發
- 注入 html, js, css
- debug 遠端頁面

whistle 採用類似系統 hosts 配置的方式，通過域名、路徑、正則表達式、通配符號、通配路径等方式匹配

```
pattern(匹配模型) operatorURI(操作通用資源識別符)
```

## 快速入門

因為 whistle 運行於 nodejs 環境，必須先確認系統已安裝 node 環境。

所以開始操作使用主要會有四步：

1. 安裝最新版 nodejs
2. 安裝 whistle
3. 啟動 whistle
4. 配置代理

### 安裝 Nodejs

Mac 系統建議用 <a href="https://brew.sh/" target="_blank">Homebrew</a> 安裝 nodejs
```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

brew install node
```
或者用 [nvm 安裝 nodejs](http://hoyangtsai.github.io/posts/2016/07/26/install-multiple-version-of-nodejs/)
```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash

nvm install node
```

### 安裝 whistle
```
npm install -g whistle --registry=https://registry.npm.taobao.org
```

### 啟動 whistle

安裝 whistle 完成後，可以執行 `w2 help` 查看 whistle 相關命令說明

whistle 運行方式主要有兩種

1. `w2 run` 在終端機前景運行代理程序，可在同一個終端機視窗中同時按下 `ctrl + c` 停止程序。
2. `w2 start` 在系統背景運行代理程序，可在任何終端機視窗輸入 `w2 stop` 停止程序。

### 配置代理

配置代理有兩種方法

1. 在瀏覽器設定中設置代理，僅抓取瀏覽器中的網路請求

Firefox
{% include post_image.html src="/images/whistle/firefox-proxy.jpg" alt="Firefox proxy" width="867" height="720" %}

Chrome (使用擴充工具)
推薦安裝 <a href="https://chrome.google.com/webstore/detail/proxy-switchyomega/padekgcemlokbadohgkifijomclgjgif" target="_blank">Proxy SwitchyOmega</a>

2. 在系統設定的網路中，設置全局代理

在系統設定中網路的代理服務器，將網頁代理服務器（HTTP）和安全網頁代理服務器（HTTPS）的 ip 設置 whistle 代理服務器位址，如果啟動 whistle 時沒有修改 port 設置，默認為 127.0.0.1:8899

{% include post_image.html src="/images/whistle/system-setting-network.png" alt="system proxy setting" width="854" height="720" %}

#### 設置 HTTPS

要擷取 HTTPS 請求，需要導入 whistle 生成的證書到系統中

先打開 whistle 工具選單的「HTTPS」視窗，勾選 "Capture HTTPS CONNECTs" 之後，點擊 QR Code 或 Download RootCA 下載 whistle https 憑證
{% include post_image.html src="/images/whistle/https-enable.png" alt="khttps enable" width="800" height="506" %}

打開鑰匙圈存取 (cmd + 空白鍵 spotlight 搜尋 keychain) -> 鑰匙圈存取 app 中搜尋 whistle -> 雙擊打開憑證，在信任的使用此憑證時，選擇"永遠信任" -> 關閉視窗，跳出輸入系統用戶密碼 -> 更新設定
{% include post_image.html src="/images/whistle/keychain-https.png" alt="keychain https" width="800" height="546" %}

最後驗證 whistle network 頁面看到 Protocol 一行有 HTTPS 的請求，確認配置成功。
{% include post_image.html src="/images/whistle/network-https.png" alt="network https" width="800" height="424" %}

#### 手機設置代理

一般 -> 關於手機 -> 憑證信任設定 -> whistle.xxxxxxx 設置開啟


### 代理 功能 配置方式

目前我開發經常遇到的情境有兩種

1. 修改請求位置
2. 修改響應，替換本地假數據

#### 修改請求位置

第一種和配置系統 hosts 很像，如果在 /etc/hosts 增加一行
```
cdn.example.com 127.0.0.1
```
在瀏覽器訪問 cdn.example.com 時就會改連到本地

之後再配置本地 web 服務器 (Apache, Nginx...) 的 virtual host，就可以模擬訪問線上環境了


但是 whistle 比配置系統 hosts 更加強大的是，如前面介紹的 pattern 支持正則表達式、通配符...等等


所以在 whistle rules 的地方配
```
*.example.com 127.0.0.1

# 說明
# abc.example.com             127.0.0.1
# xyz.example.com             127.0.0.1
# ...
# 任何字符&不限長度.example.com  127.0.0.1
```

更厲害的是，如果知道正則表達式的強大
```
/.*example.*\/(?!cgi)/i 127.0.0.1

# 說明
# abc.example.cn/user       127.0.0.1
# sub.abc.example.com/news  127.0.0.1
# xzy.example.hk/info       127.0.0.1
# qwe.example.com/cgi       忽略
```

#### 修改響應

期端開發經常會遇到

期間經常會遇到要先模擬後台接口返回數據

準備好與接口返回數據結構一樣的 json 文件 假數據

```
/example.*\/cgi\/(.*\.do)$/ resBody:///Users/david/path/to/project/cgi/$1 resType://json resCharset://utf8 statusCode://200

# 說明
# $1 含階層的路徑
# www.example.com/cgi/common/userinfo.do  $1 = common/userinfo.do
# www.example.com/cgi/news/list.do        $1 = news/list.do
```
甚至可模擬包含 id query get 請求
```
/example.*\/cgi\/(.*\.do)\?id=(.*)$/ resBody:///Users/tommy/path/to/project/cgi/$1/$2 resType://json resCharset://utf8 statusCode://200

# 說明
# $1 含階層的路徑; $2 id後面的關鍵字
# www.example.com/cgi/news/post.do?id=6  $1 = news/post.do; $2 = 6
```





