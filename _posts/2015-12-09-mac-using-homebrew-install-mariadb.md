---
layout: post
title: Mac 用 Homebrew 安裝 MariaDB
categories: []
tags: []
published: True
permalink: /mac-using-homebrew-install-mariadb
---
最近我在檢查 Mac Mini 的 server 工作是否正常的時候<br>
發現 MySQL 資料庫又掛了...不是流量太大或電腦有問題，而是 MySQL 無法啟動<br>
試著打 `mysql.server start` 時，終端機印出<br>
`ERROR! The server quit without updating PID file (/usr/local/mysql/data/...pid)`<br>
網路搜尋到的方法都無法解決<br>
像是 `ps -aux | grep 'mysql'` 列出 mysql 程序把它砍掉<br>
或是刪除 rm /usr/local/mysql/data/*.err<br>
都無法啟動 MySQL<br>

Mac OS 從 10.9 Mavericks、10.10 Yosemite 到 10.11 El Capitan<br>
MySQL 隨著改版更新<br>
但是安裝檔也不再附 MySQL 控制面板的安裝程式<br>
MySQL GUI Tools 也沒有持續維護<br>
導致使用上越來越不方便<br>
相容性也越來越差<br>
於是決定把整個 MySQL 砍掉重練<br>
完整移除腳本如下<br>
{% highlight bash %}
sudo rm /usr/local/mysql
sudo rm -rf /usr/local/mysql*
sudo rm -rf /Library/StartupItems/MySQLCOM
sudo rm -rf /Library/PreferencePanes/My*
rm -rf ~/Library/PreferencePanes/My*
sudo rm -rf /Library/Receipts/mysql*
sudo rm -rf /Library/Receipts/MySQL*
sudo rm -rf /private/var/db/receipts/*mysql*
{% endhighlight %}

改用 Homebrew 來安裝資料庫<br>
使用 Homebrew 安裝函式庫的好處就是不用再做麻煩的環境設定，像是 `export PATH=$PATH:${new_path}` 之類的<br>
因為在 `brew install [library]` 的時候 <br>
Homebrew 就會從 /usr/local/Cellar/[library] 的指令庫底下，做個 symbolic 鏈結到 /usr/local/bin/ <br>
函式庫相關的指令就可以直接使用<br>
未來也只要透過 `brew upgrade` 就可以更新函式庫了<br>

## 開始安裝 MariaDB
之前用過 `brew install mysql` 安裝 MySQL 資料庫，嘗試很久安裝一直失敗後來就放棄了。<br>

這次我改安裝 MariaDB，順便做了一下調查...<br>

MariaDB 可以說是 MySQL 的表兄弟，它是由 MySQL 的開發元老 Widenius 分支出來開發的專案<br>
参考官方的聲明 `MariaDB is a binary drop in replacement for MySQL.`<br>
所以主要考慮的點在：<br>
<ul>
<li>資料和表格定義檔 (.frm) 是二進制相容。</li>
<li>所有客戶端 APIs、協定和架構的一致性。</li>
<li>所有檔案名稱、二進制檔、路徑、port、sockets ... 等應該會一樣。</li>
<li>所有 MySQL 連接器 (PHP, Perl, Python, Java, .NET, MyODBC, Ruby, MySQL C connector 等) 與 MariaDB 運行不會改變。</li>
<li>mysql-client 套件也在 MariaDB server 中運行。</li>
<li>共享的客戶端函式庫和 MySQL 客戶端函式庫是二進制相容。</li>
</ul>
還包含一些 MySQL 沒有的特點，像是 Aria 儲存引擎可以有更快的複雜查詢、多種效能的優化 ... 等等。<br>
更重要的是，MariaDB 有完整的[官方文件](https://mariadb.com/kb/en/mariadb/)<br>
使用 Homebrew 安裝，也有[詳細的說明](https://mariadb.com/kb/en/mariadb/building-mariadb-on-mac-os-x-using-homebrew/)<br>
所以這裡直接提出幾個安裝重點<br>
<ol>
<li>
更新 Homebrew 函式庫<br>
{% highlight bash %}
brew update
{% endhighlight %}
</li>
<li>
安裝 MariaDB <br>
{% highlight bash %}
brew install mariadb
{% endhighlight %}
</li>
<li>
安裝資料庫 <br>
{% highlight bash %}
unset TMPDIR
mysql_install_db
{% endhighlight %}
</li>
<li>
啟動資料庫 (操作指令和使用 MySQL 一樣) <br>
{% highlight bash %}
mysql.server start
{% endhighlight %}
</li>
<li>
設定 root 登入密碼和其他 configuration 完成安裝 <br>
{% highlight bash %}
mysql_secure_installation
{% endhighlight %}
</li>
</ol>

如果想在電腦登入時自動啟動 MariaDB <br>
可以做個 symbolic 鏈結到 ~/Library/LaunchAgents/ 指令如下 <br>
{% highlight bash %}
ln -s /usr/local/Cellar/mariadb/10.1.9/homebrew.mxcl.mariadb.plist ~/Library/LaunchAgents/
launchctl load -w homebrew.mxcl.mariadb.plist
{% endhighlight %}

## 參考資料
[MariaDB versus MySQL - Compatibility](https://mariadb.com/kb/en/mariadb/mariadb-vs-mysql-compatibility/)<br>
[MariaDB vs. MySQL: What’s The Difference?](http://www.interworx.com/community/mariadb-vs-mysql-whats-the-difference/)<br>
[Installing MariaDB 10.0.10 on Mac OS X with Homebrew](https://mariadb.com/blog/installing-mariadb-10010-mac-os-x-homebrew)<br>
[Building MariaDB on Mac OS X Using Homebrew](https://mariadb.com/kb/en/mariadb/building-mariadb-on-mac-os-x-using-homebrew/)
