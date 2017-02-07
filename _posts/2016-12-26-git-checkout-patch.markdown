---
title: Git 合併其他分支單一檔案
layout: post
date: 2016-12-26
published: true
comments: true
tag:[git, cheat sheet]
---

```bash
git checkout <target_brach>
git checkout -p | --patch <source_branch> <file>
```
<!-- more -->

y - stage this hunk 變更此區塊 <br>
n - do not stage this hunk 不變更此區塊 <br>
q - quit; do not stage this hunk nor any of the remaining ones 離開；不變更此區塊和後面剩餘部分 <br>
a - stage this hunk and all later hunks in the file 變更此區塊和這個檔案後面所有區塊 <br>
d - do not stage this hunk nor any of the later hunks in the file 不變更此區塊和後面剩餘部分 <br>
g - select a hunk to go to 選擇去某一區塊 <br>
/ - search for a hunk matching the given regex 用正則表達示搜尋某一區塊 <br>
j - leave this hunk undecided, see next undecided hunk <br>
J - leave this hunk undecided, see next hunk <br>
k - leave this hunk undecided, see previous undecided hunk <br>
K - leave this hunk undecided, see previous hunk <br>
s - split the current hunk into smaller hunks <br>
e - manually edit the current hunk <br>
? - print help <br>
