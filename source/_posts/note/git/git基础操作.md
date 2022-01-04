---
title: Git 基础操作
date: 2021-06-29 16:27:33
author: Rainbow
description: Git 的一些基础操作及配置说明
categories:
  - [笔记, git]
tags:
  - git
---

{% noteblock idea %}

虽然 `SourceTree` 、`TortoiseGit` 等GUI软件能非常直观便捷的操作 `Git` 仓库，但掌握 `Git` 相关基础操作还是必须的。

{% endnoteblock %}

## 前期准备（MacOS）

### 生成SSH密钥并设置

输入如下命令来生成 `ssh key`：

```bash 生成ssh key
ssh-keygen -t rsa -C "xxxxx@xxxxx.com"  
# Generating public/private rsa key pair...
```

{% noteblock warning yellow %}
这里的 `xxxxx@xxxxx.com` 只是生成的 `ssh key` 的名称，并不约束或要求具体命名为某个邮箱。现网的大部分教程均讲解的使用邮箱生成，其一开始的初衷仅仅是为了便于辨识所以使用了邮箱。
{% endnoteblock %}

按照提示完成三次回车，即可生成 `ssh key` 。通过查看 `~/.ssh/id_rsa.pub` 文件内容，获取到你的 `public key`

```bash 复制id_rsa.pub
cat ~/.ssh/id_rsa.pub
# ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC6eNtGpNGwstc....
```

将上述的 `ssh key` 配置到 [`Github`](https://github.com/) 或者 [`码云`](https://gitee.com/)

### 多个ssh key

{% link 配置多个ssh key :: https://gitee.com/help/articles/4229#article-header %}



## Git基础操作

### 仓库基本管理

**初始化一个 `Git` 仓库**

```bash 初始化仓库
$ cd 文件夹目录
$ git init
```

**将修改的内容提交到本地 `Git` 暂存区**

```bash 提交到本地的暂存区
$ git add '文件'
# 或者
$ git add . 或 git add -A (提交当前所有改动)
```

**将暂存区的内容提交到本地 `Git` 仓库**

```bash 提交到本地仓库
$ git commit -m '消息'
```

:pushpin: `-m` 后面为提交的备注信息。

**将本地 `Git` 仓库的信息推送到远程仓库**

```bash 推送到远程仓库
$ git push git地址

# 若本地已关联了远程仓库
$ git push 仓库别名 分支
```

**将远程仓库同步到本地仓库**

```bash 拉取远程仓库
$ git pull git地址

# 若本地已关联了远程仓库
$ git pull 仓库别名 分支
```
### 远程仓库管理

**修改仓库名**

一般来讲，默认情况下，在执行 `clone` 或者其他操作时，仓库名都是 `origin` 果说我们想给他改改名字，比如我不喜欢 `origin` 这个名字，想改为 `test` 那么就要在仓库目录下执行命令:

```bash 修改远程仓库在本地的别名
# 修改远程仓库名字为了test。
$ git remote rename origin test
```


**关联仓库**

不执行 `clone` 操作时，想将本地库与远程库管理，可以执行

```bash 关联远程仓库
$ git remote add 仓库别名 仓库地址
```
{% noteblock %}
:pushpin:
1. `origin` 是你的仓库的别名可以随便改，但请务必不要与已有的仓库别名冲突 
2. 仓库地址一般来讲支持 `http/https/ssh/git` 协议，其他协议地址请勿添加
{% endnoteblock  %}

**查看当前仓库对应的远程仓库地址**

```bash 查看远程仓库地址
git remote -v
```

这条命令能显示你当前仓库中已经添加了的仓库名和对应的仓库地址，通常来讲，会有两条一模一样的记录，分别是 `fetch` 和 `push` ，其中 `fetch` 是用来从远程同步，`push` 是用来推送到远程。

**修改仓库对应的远程仓库地址**

```bash 修改别名的远程仓库地址
git remote set-url origin 仓库地址
```

### 仓库分支操作

**查看分支**

```bash 查看分支
$ git branch ( -r |-a )

```
{% noteblock %}
:pushpin:
1. 末尾没有任何尾缀为查看本地所有分支
2. 末尾有 `-r` 为查看远分所有支
3. 末尾有 `-a` 为查看远程和本地所有分支
{% endnoteblock  %}

**新建分支，并依然停留在当前分支**

```bash 新建分支，并依然停留在当前分支
$ git branch 分支名字
```

**新建一个分支，并切换到该分支**

```bash 新建一个分支，并切换到该分支
$ git checkout -b 分支名字
```

**新建一个分支，指向指定commit**

```bash 新建一个分支，指向指定commit
$ git branch 分支名字 commit记录
```

**本地新建一个分支，并推送到远程**

```bash 本地新建一个分支，并推送到远程
$ git checkout -b 分支名字 
$ git push 仓库名 分支名字:分支名字 #远程没有该分支会自动创建
```

**切换到指定分支，并更新工作区**

```bash 切换到指定分支，并更新工作区
$ git checkout 分支名字
```

**合并指定分支到当前分支区**

```bash 合并指定分支到当前分支区
$ git merge 分支名字
```

**删除分支**

```bash 删除分支
$ git branch -d 分支名字
```
**删除远程分支**

```bash 删除远程分支
$ git push origin --delete 分支名字
# 或者
$ git branch -dr [仓库名/分支名字]
```
### 提交规范

#### 主要 type

|  类型      |  说明  |
| :----     | :----  |
|  feat     |  新增一个功能 |
|  fix      |  修复一个Bug |

#### 特殊 type

|  类型      |  说明  |
| :----     | :----  |
|  docs     |  文档变更 |
|  style    |  代码格式（不影响功能，例如空格、分号等格式修正) |
|  build    |  变更项目构建或外部依赖（例如scopes: webpack、gulp、npm等 |
|  refactor |  代码重构 |
|  revert   |  代码回退 |

#### 一般不使用 type

|  类型      |  说明  |
| :----     | :----  |
|  perf     |  改善性能 |
|  test     |  测试 |
|  ci       |  更改持续集成软件的配置文件和package中的scripts命令，例如scopes: Travis, Circle等 |
|  chore    |  变更构建流程或辅助工具 |

### 其他

{% link 更多 Git 操作 :: https://gitee.com/all-about-git %}



## 常见问题
1. 合并分支报无相关历史

```bash 合并分支报无相关历史
git merge 分支名 --allow-unrelated-historie
```

2. `github` 于 `2020年10月1日` 起，默认分支为main，而本地创建默认分支仍未master，怎么推送

```bash 推送到远程仓库某个分支
git push origin matser:main
```
