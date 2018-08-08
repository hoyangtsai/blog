---
layout: post
date: 2018-07-04
title: 跨平台 proxy 代理工具
description: whistle 是一個用 nodejs 開發的跨平台 proxy 代理工具
published: true
comments: true
tag: [proxy, nodejs, mac, homebrew, nvm]
---

涉及前端開發後，所需必備的技能之一，網路代理。不論是文件代理還是網站代理，為了更真實模擬線上環境和 debug。

<!-- more -->

很多人會選擇 Windows 開發，除了使用習慣，另外一點應該是 Windows 上有個好用又免費的代理工具 Fiddler。

但如果是非 Windows 開發者，就必須自行尋找解決方案。

像 Mac 的開發者，我在網路上找到像，有人是用 VM 的方式，在 Windows 虛擬機上安裝 Fiddler，再透過共享的網路解決代理；或者像其他大部分的人，直接在 Mac 上安裝 Charles 代理工具解決。

或許 Charles 也是個不錯的代理工具，但相較於 Fiddler 最大的差別是 Charles 是一個付費的軟體，所以取得上可能沒像 Fiddler 容易。

於是往 nodejs 方向去找代理工具，找到像 nrpoxy、anyproxy 和 whistle

nodejs 代理工具相較於 Fiddler 最顯而易見的區別就是跨平台，所以不管是用 Windows、Mac 還是 Linux 的開發者都可以使用。

簡單比較上述列的 nodejs 代理工具

- nproxy 功能不滿足需求，而且已經很久沒更新了
- anyproxy 相較 whistle 沒有這麼多樣性的代理配置和友好的操作介面
- whistle 功能完整，proxy 規則可以群組、export / import 配置

結果當然是選擇 whistle

先介紹 whistle 的功能特點

- 配置 hosts
- 修改 http, https, websocket 請求
- 修改響應，替換本地假數據
- 請求轉發
- 注入 html, js, css
- debug 遠端頁面

whistle 採用類似系統 hosts 配置的方式，通過域名、路徑、正則表達式、通配符、通配路径等方式匹配。

```
pattern(匹配模型) operatorURI(操作URI)
```

## 快速入門

因為 whistle 運行於 nodejs 環境，必須先確認系統已安裝 nodejs

從安裝到操作使用，主要分為四個步驟：

1. 安裝最新版 nodejs
2. 安裝 whistle
3. 啟動 whistle
4. 設置代理

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
whistle 支持 `v.0.10.0` 以上版本的 Nodejs，但建議安裝最新版，以獲得更好的效能。
```
npm install -g whistle --registry=https://registry.npm.taobao.org
```

### 啟動 whistle

安裝 whistle 完成後，可以執行 `w2 help` 查看 whistle 相關命令說明

whistle 運行方式主要有兩種

1. `w2 run` 在終端機前景運行代理程序，可在同一個終端機視窗中同時按下 `ctrl + c` 停止程序。
2. `w2 start` 在系統背景運行代理程序，可在任何終端機視窗輸入 `w2 stop` 停止程序。


### 設置代理

設置代理有兩種方法

1. 瀏覽器/應用程式中設置，僅抓取瀏覽器中的網路請求
2. 系統偏好設定的網路中設置，所有電腦網路請求都會擷取

  - 在瀏覽器/應用程式設置代理

    **Firefox**

    > 偏好設定 -> 一般 -> 網路代理伺服器 -> 設定...  {% include post_image.html src="/images/whistle/firefox-proxy.jpg" alt="firefox-proxy" width="800" height="664" %}

    **Chrome**

    > 使用擴充工具，推薦安裝 <a href="https://chrome.google.com/webstore/detail/proxy-switchyomega/padekgcemlokbadohgkifijomclgjgif" target="_blank">Proxy SwitchyOmega</a>
    > {%include post_image.html src="/images/whistle/pso-new-proxy.png" alt="Proxy SwitchyOmega new proxy" width="800" height="470" %}
    > {%include post_image.html src="/images/whistle/pso-config-whistle.png" alt="Proxy SwitchyOmega config whistle" width="800" height="424" %} 
    > {%include post_image.html src="/images/whistle/pso-select-whistle.png" alt="Proxy SwitchyOmega select whistle" width="222" height="400" %}
    
    **微信開發者工具**

    > 頂部選單 -> 設置 -> 代理設置
    > {%include post_image.html src="/images/whistle/wx-devtool-config-proxy.png" alt="Weixin Developer Tool Config Proxy" width="800" height="649" %}


  - 系統偏好設定的網路

    > 在系統設定中網路的代理服務器，將網頁代理服務器（HTTP）和安全網頁代理服務器（HTTPS）的 ip 設置 whistle 代理服務器位址。
    > 如果啟動 whistle 時沒有修改 port 設置，默認為 127.0.0.1:8899
    > {% include post_image.html src="/images/whistle/system-network-proxy.png" alt="system-network-proxy" width="600" height="464" %}


#### 設置 HTTPS

  要擷取 HTTPS 請求，需要導入 whistle 生成的證書到系統中

  先打開 whistle 工具選單的「HTTPS」視窗，勾選 "Capture HTTPS CONNECTs" 之後，點擊 QR Code 或 Download RootCA 下載 whistle 憑證
  {% include post_image.html src="/images/whistle/enable-https.png" alt="enable https" width="800" height="466" %}

  打開鑰匙圈存取 (spotlight 搜尋 keychain) -> 搜尋 whistle -> 雙擊打開憑證，在信任的使用此憑證時，選擇"永遠信任" -> 關閉視窗，跳出輸入系統用戶密碼 -> 更新設定
  {% include post_image.html src="/images/whistle/keychain-cert.png" alt="keychain cert" width="800" height="547" %}

  最後驗證 whistle network 頁面看到 Protocol 一行有 HTTPS 的請求，確認配置成功。
  {% include post_image.html src="/images/whistle/network-https.png" alt="network https" width="800" height="424" %}

#### 設置手機代理

設置手機代理之前，必須先確認電腦有兩個網路端口。

一是負責網路輸入、二是負責網路輸出 (wifi 熱點)，慶幸的是 Mac 系統內建的 Internet 共享是可以拿 wifi 當熱點的，所以只需確認網路輸入源，是來自有線網路 (乙太網路) 或 usb 網路接收器。

- 電腦網路 wifi 分享

  > 先把電腦網路設置透過 wifi 共享
  > {% include post_image.html src="/images/whistle/system-sharing-internet.jpg" alt="system-sharing-internet" width="600" height="464" %}
  > {% include post_image.html src="/images/whistle/system-sharing-internet-config.jpg" alt="system-sharing-internet-config" width="600" height="464" %}

- 手機網路設定代理

  > 手機連上電腦的 wifi 熱點，設置代理
  > {% include post_image.html src="/images/whistle/ios-network.png" alt="ios-network" width="375" height="189" %}

  > 確認路由器伺服器 ip，點擊設定代理伺服器
  > {% include post_image.html src="/images/whistle/ios-network-config.png" alt="ios-network-config" width="375" height="812" %}
  > 選擇手動，填入伺服器 ip 和 port
  > {% include post_image.html src="/images/whistle/ios-network-proxy.png" alt="ios-network-proxy" width="375" height="812" %}

  > 用 Safari 訪問 [http://rootca.pro/](http://rootca.pro/)，下載 whistle 憑證並安裝
  > {% include post_image.html src="/images/whistle/ios-cert-download.png" alt="ios-cert-download" width="375" height="172" %}
  > {% include post_image.html src="/images/whistle/ios-cert-install.png" alt="ios-cert-install" width="375" height="812" %}

  > 可以從一般 -> 描述檔與裝置管理 -> whistle.xxxxxxx，確認是否為<span style="color:#5cc959;">已驗證</span>
  > {% include post_image.html src="/images/whistle/ios-cert.png" alt="ios-cert" width="375" height="812" %}

- 設置信任憑證

  > 憑證設為信任，微信才可以訪問 https 頁面

  > 從一般 -> 關於手機 -> 憑證信任設定 -> whistle.xxxxxxx，設定開啟
  > {% include post_image.html src="/images/whistle/ios-cert-trust.png" alt="ios-cert-trust" width="375" height="812" %}

### 代理配置方式

目前開發經常遇到的情境有兩種

1. 修改請求位置
2. 修改響應，替換本地假數據

  - 修改請求位置

    第一種和配置系統 hosts 很像，如果在 /etc/hosts 增加一行
    ```
    cdn.example.com 127.0.0.1
    ```
    在瀏覽器訪問 cdn.example.com 時就會改連到本地

    之後再配置本地 web server (Apache, Nginx...) 的 virtual host，就可以模擬訪問線上環境了

    但是 whistle 比配置系統 hosts 更加強大的是，如前面介紹的 pattern 支持正則表達式、通配符...等等

    在 whistle rules 的地方配置  {% include post_image.html src="/images/whistle/whistle-rules.png" alt="whistle rules" width="800" height="454" %}

    ```
    *.example.com 127.0.0.1

    # 說明
    # abc.example.com             127.0.0.1
    # xyz123.example.com          127.0.0.1
    # 任何字符&不限長度.example.com  127.0.0.1
    ```

    更厲害的是，下面這個例子就可以知道正則表達式的強大

    ```
    /.*example.*\/(?!cgi)/i 127.0.0.1

    # 說明
    # abc123.example.cn/user    127.0.0.1
    # sub.abc.example.com/news  127.0.0.1
    # xzy.example.hk/info       127.0.0.1
    # qwe.example.com/cgi       忽略
    ```

  - 修改響應，替換本地假數據

    開發期間經常會遇到，後台先給接口文檔，但實際接口還無法調用的情況

    這時候就必須先用 json 假數據文件模擬後台接口響應

    ```
    /example.*\/cgi\/(.*\.do)$/ resBody:///Users/david/path/to/project/cgi/$1 resType://json resCharset://utf8 statusCode://200

    # 說明
    # $1 含層級的路徑
    # www.example.com/cgi/common/userinfo.do  $1 = common/userinfo.do
    # www.example.com/cgi/news/list.do        $1 = news/list.do
    ```

    也可以模擬含 id query 的 get 請求
    ```
    /example.*\/cgi\/(.*\.do)\?id=(.*)$/ resBody:///Users/tommy/path/to/project/cgi/$1/$2 resType://json resCharset://utf8 statusCode://200

    # 說明
    # $1 含層級的路徑; $2 id後面的關鍵字
    # www.example.com/cgi/news/post.do?id=6  $1 = news/post.do; $2 = 6
    ```

後續有其他使用情境再更新

如果這篇文章有幫助到你，也歡迎請我一杯珍奶～
{%include paypal_donate.html %}