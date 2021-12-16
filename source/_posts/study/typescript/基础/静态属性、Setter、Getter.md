---
title: 静态属性、Setter、Getter
date: 2021-12-07
author: Rainbow
categories:
  - 学习
tags:
  - typescript
---

## 静态属性、Setter、Getter

**类** 中的某个属性定义为 `private` 访问类型时，外部无法访问，这时我们需要通过 `setter` 和 `getter` 处理这些私有的属性使其能被外部访问，一般私有属性以 `_` 开头。例如：

```typescript
class Person{
  constructor(private _name: string){}
  get name(){
    return this._name + 'name'
  }
  set name(name: string){
    const realName = name + 'name'
    this._name = realName
  }
}

const person = new Person('test')
console.log(person.name) // testname
```



## 实战：单例模式的类

**单例模式** 指只允许存在一个实例，不能 `new` 多个实例，所以首先需要将 `constructor` 私有化：

```typescript
class Demo{
  private constructor() {}
}

const demo = new Demo() // 报错，constructor为私有的，无法 new
```

 `constructor` 私有化后，外部需要访问就需要使用 `static` 关键词向外部暴露一个 `getInstance` 方法：

```typescript
class Demo{
  private constructor() {}
  static getInstance(){
    return new Demo()
  }
}
```

上述代码，依然不是 **单例模式** ，仍可通过 `Demo.getInstance()` 创建多个实例，所以我们需要再使用 `static` 定义一个 

私有静态属性 `instance` 来判断是否创建过实例，例如：

```typescript
class Demo{
  private static instance: Demo
  private constructor() {}
  static getInstance(){
    if(!this.instance){
      this.instance = new Demo()
    }
    return this.instance
  }
}
```

这样一个简单的 **单例模式** 的类就创建好了。