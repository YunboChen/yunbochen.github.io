---
title: tsconfig.json 配置说明
date: 2021-12-08
author: Rainbow
categories:
  - 学习
tags:
  - typescript
---

> `tsconfig.json` 是 `TypeScript` 编译器的配置文件，会根据该文件的配置进行对应的编译和检查。

## 文件选项配置

- `files` ：表示编译需要编译的单个文件列表，例如：

  ```json
  {
    "files": [
      "src/demo.ts",
      "src/demo2.ts"
    ],
  }
  ```

  若 `src` 文件中有 `demo1.ts` 、`demo2.ts` 、`demo3.ts` 三个文件，由于 `tsconfig.json` 文件进行了上面的配置，所以运行 `tsc` 时，只会编译 `demo1.ts` 、`demo2.ts` 这两个文件。

- `include` ：表示编译需要编译的文件或目录，例如：

  ```json
  {
    "include": [
      "src/demo2", //编译 src 目录下的 demo2 文件夹中的所有文件
    ],
  }
  ```

  还能使用正则匹配来配置通用的文件夹路径，例如：

  ```json
  {
    "include": [
      "src", //编译 src 目录下所有文件夹中的所有文件
      "src/*", //编译 src 目录下所有一级文件夹中的所有文件
      "src/*/*", //编译 src 目录下所有二级文件夹中的所有文件
      ... //其他正则路径
    ],
  }
  ```

- `exclude` ：表示编译器需要排除的文件或文件夹（默认排除 `node_modules` 文件夹），例如：

  ```json
  {
    "exclude": [
      "src/demo2", //不编译 src 目录下的 demo2 文件夹中的所有文件
    ],
  }
  ```

  同 `include` 一样，支持正则匹配路径。

- `extends` ：引入其他配置文件，继承配置，例如：

  ```json
  {
    // 把基础配置抽离成tsconfig.base.json文件，然后引入
    "extends": "./tsconfig.base.json"
  }
  ```

## 编译选项配置 `compilerOptions`

编译器根据该节点下的配置进行对应的编译

> 只举例常用的配置，其他配置详见文档。
> {% link 配置文件 :: https://www.typescriptlang.org/tsconfig#compilerOptions %}

- `target`： 编译之后 `.js 文件` 的语言版本

  ```typescript
  // demo.ts
  const demo: string = '1'
  
  // 编译之后的 demo.js
  // target: "es2015"
  const demo = '1';
  
  // target: "es5"
  var demo = '1';
  
  ```

- `lib` ：`TypeScript` 需要引用的库，即声明文件。

- `module` ：编译之后  `.js 文件` 的代码标准

  - **`CommonJS`**
  - **`UMD`**
  - **`AMD`**
  - **`System`**
  - **`ESNext`**
  - **`ES2020`**
  - **`ES2015/ES6`**
  - ...

- `outDir` ：编译生成的文件夹

- `allowJs` : 是否允许编译器编译 `JS` 、`JSX` 文件

  - **`true`** 允许
  - **`false`** 不允许

- `checkJs` ：是否允许在 `JS` 文件中报错，通常与 `allowJs` 一起使用。

  - **`true`** 允许

    > 需设置 allowJs: true

  - **`false`** 不允许

- `strict` ：是否使用严格模式

  - **`true`** 使用严格模式，所有类型检查的设置都校验。
  - **`false`** 不使用严格模式，可根据自己的使用习惯或实际情况配置类型检查。
  
  {% noteblock warning yellow %}
  初学者或还没熟练使用 `TypeScript` 的，建议使用严格模式。
  {% endnoteblock %}

- `noImplicitAny` ：是否允许隐式 `any` 类型

  - **`true`** 不允许隐式 `any` 类型
  - **`false`** 允许隐式 `any` 类型

  ```typescript
  // noImplicitAny: false
  function  demo(params) {
    console.log(params.a)
  }
  // 不会报错
  
  // noImplicitAny: true
  function  demo(params) {
    console.log(params.a)
  }
  // 会报参数 params 隐式具有“any”类型的错误
  ```

- `strictNullChecks` ：是否允许把 `null` 、`undefined` 赋值给其他类型的变量

  - **`true`** 不允许把 `null` 、`undefined` 赋值给其他类型的变量
  - **`false`** 允许把 `null` 、`undefined` 赋值给其他类型的变量

  ```typescript
  interface Demo{
    a: string
    b?: number
  }
  
  function  printDemo(demo: Demo): void {
    console.log(demo.b.toString())
    // strictNullChecks: true 会报 对象可能为“未定义”。
  }
  ```

- `strictFunctionTypes` ：是否允许函数参数双向协变

  - **`true`** 不允许函数参数双向协变
  - **`false`** 允许函数参数双向协变

  ```typescript
  function demo (param: string): void{
    console.log(param)
  }
  
  type stringOrNumberFn = ( param: string | number ) => void
  
  const fnc: stringOrNumberFn = demo
  // strictFunctionTypes: true 
  //不能将类型“(param: string) => void”分配给类型“stringOrNumberFn”。
  //  参数“param”和“param” 的类型不兼容。
  //    不能将类型“string | number”分配给类型“string”。
  //      不能将类型“number”分配给类型“string”。
  ```

- `strictBindCallApply` ：是否对 `bind` 、`call` 、`apply` 严格检查

  - **`true`** 对 `bind` 、`call` 、`apply` 严格检查
  - **`false`** 对 `bind` 、`call` 、`apply` 不严格检查

  ```typescript
  function demo (param: string): number{
    return parseInt(param)
  }
  
  const fnc = demo.call(this, false)
  // strictBindCallApply: true 会报类型“boolean”的参数不能赋给类型“string”的参数。
  // strictBindCallApply: false 不报错，返回类型为 any 
  ```

- `strictPropertyInitialization` ：类的实例属性是否必须初始化

  - **`true`** 必须实例化

    > 必须配置 `strictNullChecks: true` 才能设置设置该项为 `true`

  - **`false`** 不必实例化

  ```typescript
  class Demo{
    a = 1
    b: string
    c: boolean
    
    constructor() {
      this.b = '1'
    }
  }
  // strictPropertyInitialization: true
  // 报属性 c 没有初始化表达式，且未在构造函数中明确赋值的错误
  ```

- `noUnusedLocals` ：检查是否有未用到的变量

  > 只提示不报错

  - **`true`** 检查
  - **`false`** 不检查

  ```typescript
  function demo(): void {
    const a = 1;
    const b = 2
    console.log(a)
  }
  
  // noUnusedLocals: true
  // 提示变量 b 未使用
  ```

- `noUnusedParameters` ：检查是有未使用的函数参数

  > 只提示不报错

  - **`true`** 检查
  - **`false`** 不检查

  ```typescript
  function demo(a: number, b: number): void {
    console.log(a)
  }
  
  // noUnusedParameters: true
  // 提示参数 b 未使用
  ```

## 工程引用配置  `references`

指定工程引用依赖
{% link 相关文档 :: https://www.typescriptlang.org/docs/handbook/project-references.html %}

