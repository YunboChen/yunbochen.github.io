---
title: Git 提交规范
date: 2021-07-05 14:17:52
author: Rainbow
description: Git 常用的提交规范
categories:
  - 笔记
tags:
  - git
---

{% noteblock idea %}
`Git` 是现在市面上最流行的版本控制工具，书写良好的 `commit message` 能大大提高代码维护的效率。但是在日常开发中由于缺少对于 `commit message` 的约束，导致填写内容随意、质量参差不齐，可读性低亦难以维护。在项目中引入 `commit message` 规范已是迫在眉睫。
{% endnoteblock %}

## 用什么规范
现在比较流行的 `commit message` 规范方案是 `约定式提交规范（Conventional Commits）`，这个方案受到了 `Angular提交准则` 的启发。在提交信息中描述新特性、bug 修复和破坏性变更，基本的 `message` 格式大致如下：

```bash message 规范
<类型>[可选的作用域]: <描述>

[可选的正文]

[可选的脚注]
```

## 安装相关插件

### 安装 commitizen & cz-conventional-changelog

- `commitizen` : 一个可代替 `git commit` 的工具，使用该工具系统将提示您在提交时填写所有必需的提交字段。不需要再等到稍后git提交钩子函数来检测提交内容从而拒绝您的提交请求。

{% link commitizen 文档 :: https://github.com/commitizen/cz-cli %}

- `cz-conventional-changelog` : 一个提供 [`conventional-changelog`](https://github.com/conventional-changelog/conventional-changelog) 标准（约定式提交标准）的适配器。

{% link cz-conventional-changelog 文档 :: https://github.com/commitizen/cz-conventional-changelog %}
  
1. 全局安装


```bash 全局安装
npm install -g commitizen cz-conventional-changelog
echo '{ "path": "cz-conventional-changelog" }' > ~/.czrc
```
安装完毕后，可直接使用 `git cz` 来取代 `git commit`。

{% noteblock %}
全局模式下，需要 `~/.czrc` 配置文件, 为 `commitizen` 指定 `Adapter` 。
{% endnoteblock %}

2. 项目内安装

命令行输入：

```bash 安装插件
npm install commitizen cz-conventional-changelog -D
```
在 `package.json` 添加如下配置：
```json package.json文件
# package.json内添加
{
  ...
  "scripts": {
    ...
    "commit": "git-cz",
    ...
  },
  "config": {
    "commitizen": {
      "path": "node_modules/cz-conventional-changelog"
    }
  },
  ...
}
```

### 安装 commitlint & husky

- `commitlint` : 负责用于对 `commit message` 进行格式校验。

{% link commitlint 文档 :: https://github.com/conventional-changelog/commitlint %}

- `husky` : 提供更易使用的 `hook`。

{% link husky 文档 :: https://github.com/typicode/husky %}

```bash 安装插件并配置
# 安装commitlint
npm install @commitlint/config-conventional @commitlint/cli -D

# 添加配置文件commitlint.config.js
echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js

# 安装husky
npm install husky -D

# package.json内添加
{
  ...
  "scripts": {
    ...
    "prepare": "husky install",
    ...
  },
  ...
}

# 激活husky hook
npm run prepare

# 添加hook
npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'
```
## 规范说明

`commit message` 规则说明

### type
`type` 为必填项，用于指定 `commit` 的类型，约定了 `feat`、`fix` 两个主要 `type`，以及 `docs` 、`style` 、`build` 、`refactor` 、`revert` 五个特殊 `type`，其余 `type` 一般不使用使用。

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

### scope
`scope` 用于描述改动的范围，格式为项目名/模块名。建议 `commit` 多个模块是，按模块分批次 `commit` ，这样做易于维护及跟踪。***暂时不必填，后期会修改为必填。***

### body
`body` 填写详细描述，主要描述改动之前的情况及修改动机，对于小的修改不作要求，但是重大需求、更新等必须添加 `body` 来作说明。

### break changes
`break changes` 指明是否产生了破坏性修改，涉及 `break changes` 的改动必须指明该项，类似版本升级、接口参数减少、接口删除、迁移等。

