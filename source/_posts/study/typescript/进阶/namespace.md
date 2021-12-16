---
title: 命名空间 namespace
date: 2021-12-10
author: Rainbow
categories:
  - 学习
tags:
  - typescript
---

**命名空间** 可以很好的解决重名的问题。

**命名空间** 定义了标识符的可见范围，一个标识符可在多个名字空间中定义，它在不同名字空间中的含义是互不相干的。这样，在一个新的名字空间中可定义任何标识符，它们不会与任何已有的标识符发生冲突，因为已有的定义都处于其他名字空间中。

关键词 `namespace` ，基础用法：

```typescript
namespace demo{
  ....
}
```

使用了 **命名空间** 之后，无法像之前一样直接就可调用 **命名空间** 内的函数、类型，需要在相应的地方加上 `export` ，才可使用。例如：

```typescript
namespace demo {
  interface DemoType{
    name: string,
    age: number
  }
  demoFnc(): void
  class DemoClass{}
}

const demoType = demo.DemoType
demo.demoFnc()
new demo.demo()
```

使用下面的方式引入别的 **命名空间** ，编辑器就能提供语法提示。

```typescript
/// <reference path = "xxx.ts" />
```

将代码抽离变成不同模块的 **命名空间** 时，可修改 `tsconfig.josn` 内 `outFile` 配置项，编译成一个文件。

{% noteblock warning yellow %}
需要将  `tsconfig.josn` 内 `module` 改为 `amd` 。
{% endnoteblock %}


