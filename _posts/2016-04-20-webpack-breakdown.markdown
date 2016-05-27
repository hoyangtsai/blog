---
layout: post
title: Mac 用 Homebrew 安裝 MariaDB
tags: [nodejs, webpack, react]
published: false
permalink: /posts/webpack-breakdown/
---

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
因為我最的是 single page application 所以我的入口點只有一個

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
