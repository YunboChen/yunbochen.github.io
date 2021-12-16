---
title: import 对应的模块化
date: 2021-12-10
author: Rainbow
categories:
  - 学习
tags:
  - typescript
---

## 声明文件 `*.d.ts`

> 声明文件 `*.d.ts` 用于描述 `Javascript` 模板内导出的接口类型信息。

通常情况下，我们可以通过 `tsconfig.json` 的相关配置，会在编译的时候自动生成 `*.d.ts` 文件。以下几种情况需要自己定义：

- 引入的第三方包没有声明类型文件

一般编辑器会提示缺少 `@types/xxxx` 的错误，需要自己去安装一下相应的插件包。

- 通过 `CDN` 引入的工具库

挂载一些全局的方法，如果在ts中，直接使用方法的话，会提示错误，此时需要引入全局的类型声明。

## 如何编写声明文件 `*.d.ts`

使用 `declare` 关键词来定义类型。

- 定义全局变量 `var` ：

  ```typescript
  declare var demo: (params: () => void) => void
  ```

- 定义全局函数 `function`：

  ```typescript
  declare function demo (params: () => void) : void
  ```

- 定义对象、类、命名空间 `namesapce` ：

  ```typescript
  declare namespace demo{
    namespace fn{
      class init{}
    }
  }
  
  // new demo.fn.init
  ```

- 定义模块 `module` ：

  ```typescript
  declare module demo {
    ...
  }
  ```
  {% noteblock warning yellow %}
  需要用到模块中的方法是，需要 `export` 。
  {% endnoteblock %}
