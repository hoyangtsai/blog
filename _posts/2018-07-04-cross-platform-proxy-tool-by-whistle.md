---
layout: post
date: 2018-07-04
title: Google Cloud 安裝 ShadowsocksR
description: 試用 Google Cloud 安裝 ShadowsocksR 翻牆上網
published: false
comments: true
tag: [proxy, nodejs, mac]
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


whistle 採用類似系統 hosts 配置的方式，通過域名、路徑、正則表達式、wildcard 通配符號、通配路径等方式匹配
