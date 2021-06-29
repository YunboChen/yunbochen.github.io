---
title: Git操作
date: '2021-06-29 16:27:33'
author: Rainbow
permalink: /notes/git
categories:
  - 笔记
tags:
  - git
---

:::tip
虽然`SourceTree`、`TortoiseGit`等GUI软件能非常直观便捷的操作`Git`仓库，但掌握`Git`相关基础操作还是必须的。
:::

## 前期准备（MacOS）
### 生成SSH密钥并设置
输入如下命令来生成`ssh key`：
```bash
ssh-keygen -t rsa -C "xxxxx@xxxxx.com"  
# Generating public/private rsa key pair...
```
**❗️❗️❗️ 注意：这里的`xxxxx@xxxxx.com`只是生成的`ssh key`的名称，并不约束或要求具体命名为某个邮箱。现网的大部分教程均讲解的使用邮箱生成，其一开始的初衷仅仅是为了便于辨识所以使用了邮箱。**

按照提示完成三次回车，即可生成`ssh key`。通过查看`~/.ssh/id_rsa.pub`文件内容，获取到你的`public key`
```bash
cat ~/.ssh/id_rsa.pub
# ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC6eNtGpNGwstc....
```
将上述的`ssh key`配置到[`Github`](https://github.com/)或者[`码云`](https://gitee.com/)

### 配置多个ssh key
[点击查看](https://gitee.com/help/articles/4229#article-header0)



## Git基础操作
### 仓库基本管理

**初始化一个`Git`仓库**

```bash
$ cd 文件夹目录
$ git init
```

**将修改的内容提交到本地`Git`暂存区**

```bash
$ git add '文件'
# 或者
$ git add . 或 git add -A (提交当前所有改动)
```

**将暂存区的内容提交到本地`Git`仓库**

```bash
$ git commit -m '消息'
```

:pushpin: 提示: `-m` 后面为提交的备注信息。

**将本地`Git`仓库的信息推送到远程仓库**

```bash
$ git push git地址

# 若本地已关联了远程仓库
$ git push 仓库别名 分支
```

**将远程仓库同步到本地仓库**

```bash
$ git pull git地址

//若本地已关联了远程仓库
$ git pull 仓库别名 分支
```
### 远程仓库管理

**修改仓库名**

一般来讲，默认情况下，在执行`clone`或者其他操作时，仓库名都是`origin`果说我们想给他改改名字，比如我不喜欢`origin`这个名字，想改为`test`那么就要在仓库目录下执行命令:

```bash
# 修改远程仓库名字为了test。
$ git remote rename origin test
```


**关联仓库**

不执行`clone`操作时，想将本地库与远程库管理，可以执行

```bash
$ git remote add 仓库别名 仓库地址
```
:pushpin: 提示: 

1. `origin`是你的仓库的别名可以随便改，但请务必不要与已有的仓库别名冲突 
2. 仓库地址一般来讲支持`http/https/ssh/git`协议，其他协议地址请勿添加

**查看当前仓库对应的远程仓库地址**

```bash
git remote -v
```

这条命令能显示你当前仓库中已经添加了的仓库名和对应的仓库地址，通常来讲，会有两条一模一样的记录，分别是`fetch`和`push`，其中`fetch`是用来从远程同步，`push`是用来推送到远程。

**修改仓库对应的远程仓库地址**

```bash
git remote set-url origin 仓库地址
```

### 仓库分支操作

**查看分支**

```bash
$ git branch ( -r |-a )

```

:pushpin: 提示: 

1. 末尾没有任何尾缀为查看本地所有分支
2. 末尾有`-r`为查看远分所有支
3. 末尾有`-a`为查看远程和本地所有分支

**新建分支，并依然停留在当前分支**

```bash
$ git branch 分支名字
```

**新建一个分支，并切换到该分支**

```bash
$ git checkout -b 分支名字
```

**新建一个分支，指向指定commit**

```bash
$ git branch 分支名字 commit记录
```

**本地新建一个分支，并推送到远程**

```bash
$ git checkout -b 分支名字 
$ git push 仓库名 分支名字:分支名字 //远程没有该分支会自动创建
```

**切换到指定分支，并更新工作区**

```bash
$ git checkout 分支名字
```

**合并指定分支到当前分支区**

```bash
$ git merge 分支名字
```

**删除分支**

```bash
$ git branch -d 分支名字
```
**删除远程分支**

```bash
$ git push origin --delete 分支名字
# 或者
$ git branch -dr [仓库名/分支名字]
```
### 提交规范
``` bash
# 主要type
feat:     增加新功能
fix:      修复bug

# 特殊type
docs:     只改动了文档相关的内容
style:    不影响代码含义的改动，例如去掉空格、改变缩进、增删分号
build:    构造工具的或者外部依赖的改动，例如webpack，npm
refactor: 代码重构时使用
revert:   执行git revert打印的message

# 暂不使用type
test:     添加测试或者修改现有测试
perf:     提高性能的改动
ci:       与CI（持续集成服务）有关的改动
chore:    不修改src或者test的其余修改，例如构建过程或辅助工具的变动

```

### 其他
其他`Git`操作或具体操作，请查看[`码云`](https://gitee.com)的[**相关帮助文档**](https://gitee.com/all-about-git)



## Q&A
1. 合并分支报无相关历史
```bash
git merge 分支名 --allow-unrelated-historie
```
2. `github`于`2020年10月1日`起，默认分支为main，而本地创建默认分支仍未master，怎么推送
```bash
git push origin matser:main
```