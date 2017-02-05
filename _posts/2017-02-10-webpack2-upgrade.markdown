---
layout: post
date: 2017-02-10
title: 從 Webpack 1 遷移到 Webpack 2
description: Webpack 2 升級指南
comments: true
category: featured
published: false
tags: [webpack, react, webpack2]
---

取自於 webpack 官方文件

## webpack 1 和 wepback 2 差別
* 原生支援 ES6 import, export 和 System.import
* Tree Shaking for ES6
 - tree shaking 是一個 ES2015+ 移除不必要代碼的算法
 - Tree shaking 最終 bundles 只有你引入的模塊到腳本中，任何模塊不會被引入，不會再最終 javascript build which means 可以讓 bundle 比之前再更小，據說可以減少 28% webpack 項目大小
* Needs Promise polyfill in old browsers (only if you’re using code splitting)
* chunk error handling 片段錯誤控制
* Many plugins now take options objects instead of multiple parameters. 很多插件現在可以用 取代多個參數
* config can be a function and –env 配置可以是一個 function 和 -env
* Removed deprecated argument configs (except with one argument shortcut if possible)
* loaders now match resourcePath instead of resource with query
* webpack config can return a Promise
* -p 參數現在設置 NODE_ENV="production"
* uglifyjs 插件不再最小化其他 assets
* 現在有 LoaderOptionsPlugin
* webpackfile.js 現在也支援
* 新增 HashedModuleIdsPlugin




最近使用 React 整理工作的 UI 設計規範

發現 React 版本更動很多，很多去年學的今年又要從來一次

從 webpack 開始說起

```javascript
var path = require('path');

module.exports = {
  entry: "./src/js/App.js",
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel?presets[]=react,presets[]=es2015'
      },
      { test: /\.scss$/, loader: 'style!css!sass?root=./src' },
      { test: /\.(png|jpg|gif)$/, loader: 'url?limit=8192&name=img/[name]-[hash:6].[ext]' }, 
      { test: /\.(png|jpg|gif)$/, loader: 'file?name=img/img-[hash:6].[ext]' }
    ]
  },
  resolve: {
    root: path.resolve(__dirname, './src/'),
    modulesDirectories: ['node_modules'],
    alias: {
      css: 'css',
      img: 'img'
    },
    extensions: ['', '.js', '.jsx', '.scss']
  }
};
```
### entry 入口點
``` 
{
  entry: "./src/js/App.js",
}
```

多個入口點

```javascript
{
  entry: {
    app: './src/app.js',
    search: './src/search.js'
  }
}
```

### output 輸出
path 必須要是絕對路徑，這裡用 nodejs path 模組直接組出當前路徑 + 輸出資料夾名稱
filename 就是輸出的 js 檔案名稱
```
{
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  }
}

### module 模組
模組就是整個 config 最重要的部份，關係到要 watch 哪些檔案類型、用到哪些 loader
test 是處理的檔案類型
exclude 是除外的檔案或資料夾
loader 是用哪個 loader 處理該檔案類型，問號後面通常帶的是 query 參數，能帶哪些參數通常 loader 的文件都會說明
```javascript
{
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel?presets[]=react,presets[]=es2015'
      },
      { test: /\.scss$/, loader: 'style!css!sass?root=./src' },
      { test: /\.(png|jpg|gif)$/, loader: 'url?limit=8192&name=img/[name]-[hash:6].[ext]' }, 
      { test: /\.(png|jpg|gif)$/, loader: 'file?name=img/img-[hash:6].[ext]' }
    ]
  }
}
```

### resolve 處理
resolve 是一個很有趣的設定，可以減少在A檔案引入其他檔案時的路徑名稱
root 設定根目錄
modulesDirectories 可以用來直接對應到模組的目錄
alias 代名，由設定的 root 往下查找的資料夾或檔案
extensions 是處理的附檔名，預設是 ['', '.js', '.jsx'] ，如果有用 sass-loader 在這多加 `.scss` 檔案類型，這樣在引入檔案的時候就不需要再聲明檔案類型

像 `import 'css/com/_button'` 指的是 _button

```javascript
{
  resolve: {
    root: path.resolve(__dirname, './src/'),
    modulesDirectories: ['node_modules'],
    alias: {
      css: 'css',
      img: 'img'
    },
    extensions: ['', '.js', '.jsx', '.scss']
  }
}
```
