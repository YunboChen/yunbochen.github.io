---
title: interface 接口
date: 2021-12-06
author: Rainbow
categories:
  - [学习, typescript]
tags:
  - typescript
  - 基础
---

>`interface` 是一系列抽象方法的声明，是一些方法特征的集合，这些方法都应该是抽象的，需要由具体的类去实现，然后第三方就可以通过这组抽象方法调用，让具体的类执行具体的方法。

## 基本使用方法

使用方法如下：

```typescript
interface Person {
  name: string,
  sayHi(): string
}

const getPersonName = (person: Person): void => {
  console.log(person.name)
}

const person = {
  name: 'test1',
  seyHi: () => 'test1'
}

getPersonName(person)
console.log(person.seyHi)

```

 **接口** 中的某些参数可有可无，可在参数后面加上 `?` ，例如：

```typescript
interface Person {
  name: string,
  age?: number
}

const getPersonName = (person: Person): void => {
  console.log(person.name)
}

const person = {
  name: 'test1'
}
getPersonName(person)

const person1 = {
  name: 'test2',
  age: 20
}
getPersonName(person1)

```

**接口** 中有已知参数和未知参数，可以使用如下的方面来定义：

```typescript
interface Person {
  name: string,
  age?: number,
  [propName: string]: any
}

const getPersonName = (person: Person): void => {
  console.log(person.name)
}

const person = {
  name: 'test2',
  age: 20,
  sex: 'man'
}
getPersonName(person)
```

可为方法定义类型， 例如：

```typescript
interface SayHi {
  (word: string): string
}

const sayHi: SayHi = (word: string) => word
```



## 在类中使用

 使用方法：

```typescript
interface Person {
  name: string,
  sayHi(): string
}

class User implements Person{
  name = 'test'
  sayHi() {
    return `Hi! ${this.name}`
  } 
}
```



## 继承

继承指的是 **接口** 可通过其他接口来扩展，并且可以继承多个 **接口** 。关键词为 `extends` 。

单个接口继承，如下：

```typescript
interface Person {
  name: string,
  [propName: string]: any,
  sayHi(): string
}

interface Teacher extends Person{
  className: string,
  teach(): string
}

const teacher: Teacher = {
  name: '张三',
  className: '一班',
  sayHi() {
    return `Hi! ${this.name}`
  },
  teach(){
    return '数学'
  } 
}
```

多个接口继承，如下：

```typescript
interface Person {
  name: string,
  [propName: string]: any,
  sayHi(): string
}

interface Sex{
  sex: '男' | '女'
}

interface Teacher extends Person, Sex{
  className: string,
  teach(): string
}

const teacher: Teacher = {
  name: '张三',
  className: '一班',
  sex: '男',
  sayHi() {
    return `Hi! ${this.name}`
  },
  teach(){
    return '数学'
  } 
}
```

