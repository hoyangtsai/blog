---
layout: post
date: 2020-04-18
title: Tomcat 環境設置
description: JAVA 開發與 Tomcat 服務器配置
published: false
comments: true
tags: [tomcat, java, setup]
---

## 安裝 JAVA SDK

需要安裝開發版，系統附的只是 Runtime 版本

```
yum install java-1.8.0-openjdk-devel
```

執行 `java -version` 檢查版本

順帶一提，如果安裝多個 JAVA 版本，可以用下面命令切換 JAVA 版本

```
alternatives --config java
```

## 新增環境變量

默認 java 安裝路徑在 `/usr/lib/jvm/java-1.8.0`

在 `~/.bashrc` 或 `~/.bash_profile` 新增以下內容

```bash
JAVA_HOME=/usr/lib/jvm/java-1.8.0
JRE_HOME=$JAVA_HOME/jre
CLASSPATH=.:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar:$JRE_HOME/lib
PATH=$JAVA_HOME/bin:$JRE_HOME/bin:$PATH
export JAVA_HOME JRE_HOME CLASSHOME PATH
```

更新文件

```bash
source ~/.bashrc
```

## 檢查 tomcat 配置

到 tomcat 目錄的 bin 路徑下，使用 `./configtest.sh` 檢查配置，前幾行應該看起來像下面配置

```
[root@VM_centos /etc/tomcat/bin]# ./configtest.sh
Using CATALINA_BASE:   /etc/tomcat
Using CATALINA_HOME:   /etc/tomcat
Using CATALINA_TMPDIR: /etc/tomcat/temp
Using JRE_HOME:        /usr/lib/jvm/java-1.8.0/jre
Using CLASSPATH:       /etc/tomcat/bin/bootstrap.jar:/etc/tomcat/bin/tomcat-juli.jar
...
```

## 安裝 Maven

```
yum install maven
```

用本地開發 setting.xml 替換 `/etc/maven/settings.xml`

開發機器不需要 proxy 設定，註解或移除 proxy 區塊

## 生成 target 文件

安裝依賴 jar 並編譯項目

```
mvn clean pacakge -U
```

執行完成後把 target 目錄下的 fortune 文件夾和 fortune.war 複製到 tomcat/webapps 下


## 啟動服務

到 tomcat/bin 目錄下執行 `./catalina run` 檢查第一次執行是否有報錯

之後可以執行 `./catalina start` 在背景啟動服務

瀏覽器訪問 http://ip:port/fortune/index.html， 如果可以訪問表示服務啟動成功

## For non-root user

### Add tomcat serivce

```
[Unit]
Description=Apache Tomcat Web Application Container
After=syslog.target network.target

[Service]
Type=forking

Environment=JAVA_HOME=/usr/lib/jvm/java-1.8.0-openjdk-1.8.0.71-2.b15.el7_2.x86_64/jre
Environment=CATALINA_PID=/etc/tomcat/temp/tomcat.pid
Environment=CATALINA_HOME=/etc/tomcat
Environment=CATALINA_BASE=/etc/tomcat
Environment='CATALINA_OPTS=-Xms512M -Xmx1024M -server -XX:+UseParallelGC'
Environment='JAVA_OPTS=-Djava.awt.headless=true -Djava.security.egd=file:/dev/./urandom'

ExecStart=/etc/tomcat/bin/startup.sh
ExecStop=/bin/kill -15 $MAINPID

User=tomcat
Group=tomcat

[Install]
WantedBy=multi-user.target
```

### Reload systemd

```bash
systemctl daemon-reload
```

### Add tomcat group and user

```
sudo groupadd tomcat
sudo mkdir /opt/tomcat
sudo useradd -s /bin/nologin -g tomcat -d /opt/tomcat tomcat
```


### Setup proper permission

```
cd /opt/tomcat
sudo chgrp -R tomcat conf
sudo chmod g+rwx conf
sudo chmod g+r conf/*
sudo chown -R tomcat logs/ temp/ webapps/ work/

sudo chgrp -R tomcat bin
sudo chgrp -R tomcat lib
sudo chmod g+rwx bin
sudo chmod g+r bin/*
```

## References

https://linuxize.com/post/install-java-on-centos-7/

https://codertw.com/%E7%A8%8B%E5%BC%8F%E8%AA%9E%E8%A8%80/98057/

For non-root user

https://www.vultr.com/docs/how-to-install-apache-tomcat-8-on-centos-7#Step_8__Start_and_test_Apache_Tomcat

https://blog.gtwang.org/linux/centos-linux-7-install-apache-tomcat-9-tutorial/
