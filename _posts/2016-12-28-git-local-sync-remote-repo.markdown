---
title: Git 本地與遠端倉庫同步
layout: post
date: 2016-12-28
published: true
comments: true
tag: [git, cheat sheet]
---
### 本地刪除已經不在遠端的分支
```bash
// 刪除 git 記錄的遠端分支
git fetch -p | --prune

// 刪除不在遠端的本地分支
git branch --merged | grep -v "\*" | xargs -n 1 git branch -d
```
