---
title: 5分钟简单上手TypeScript
date: '2021-08-17 10:06:06'
author: Rainbow
permalink: /study/typescript/started-in-5-minutes
categories:
  - 学习
tags:
  - TypeScript
---

[TypeScript](https://www.typescriptlang.org/) 是 `JavaScript` 的超集，所以具备 `JavaScript` 所有功能，并且额外提供独有的类型系统。

## 推理类型
`TypeScript` 支持 `JavaScript` 语法并且在大多数情况下可以自动生成类型。例如，在创建变量并将其分配给特定值时，`ypeScript` 将使用该值作为其类型。

```ts
const foo = 'Hello World' 
// 会推算出foo的类型为string，并自动生成类型
const foo: string

// 或者

const num = 123
// 推算出num的类型为number，并自动生成类型
const num: number
```
## 定义类型
`JavaScript` 可以使用多种设计模式。 但是，某些设计模式很难自动推断类型（例如，使用动态编程的模式）。 为了涵盖这些情况，`TypeScript` 支持 `JavaScript` 语言的扩展，它为您提供了告诉 `TypeScript` 类型应该是什么的地方。

例如，创建一个包含 `name: string` 和 `age: number` 两种类型的 `Object` 对象，可以这么写：

```js
const user = {
  name: 'Rainbow',
  age: 18
}
```

可以定义一个 `interface` 来规范类型

```ts
interface User{
  name: string
  age: number
}
```

使用 `: typeName` 的写法，将上述定义的 `interface` 作用于 `user` 使其具备类型推演。

```ts
const user: User = {
  name: 'Rainbow',
  age: 18
}
```

:::warning
若 `Object` 内的对象 与 `interface` 内定义的对象不匹配，`TypeScript` 会警告你：
```ts {8-9}
interface User{
  name: string
  age: number
}

const user: User = {
  username: 'Rainbow',
  //Type '{ username: string; id: number; }' is not assignable to type 'User'.
  //Object literal may only specify known properties, and 'username' does not exist in type 'User'.
  age: 18
}
```
:::

`JavaScrpt` 支持 `class` 和面向对象编程，所以 `TypeScript` 也支持，可以这么类使用 `interface`：

```ts
interface User{
  name: string
  age: number
}

class UserAccount{
  name: string
  age: number
  constructor(name: string, age: number){
    this.name = name
    this.age = age
  }
}

const user: User = new UserAccount('Rainbow', 20)
```

也可以将 `interface` 用于方法返回的值或者传入的参数

```ts
function getAdminUser(): User{
  //...
}

function delAdminUser(user: User){
  //...
}
```

`JavaScript` 拥有 `boolean` ， `bigint` ， `null` ， `number` , `string` ， `symbol` , `undefined` 几种类型，定义 `interface` 时，可使用上述类型，也补充了一些额外的类型。例如，`any`（允许任何类型），`unknow`（确保声明过该类型）， `never`（几乎不会使用）， `void`（一个方法无值返回或返回 `undefined` ）

`TypeScript` 有两种方式进行类型定义：`interface` 或者 `types`。使用 `interface` 需提前定义，`types` 在特定的类型值时使用。

## 构成类型

在 `Typescript` 中，可以组合简单类型来创建复杂类型。通常使用 `联合` 和 `泛型` 两种方式。

### 联合

使用联合，您可以声明一个类型可以是多种类型之一。例如：
```ts
type LockStates = 'locked' | 'unlocked'
type MyBool = true | false
```
联合也提供了一种处理不同类型的方法，例如：
```ts
function getLength(obj: string | string[]){
  // obj为string字符串，或者string数组
  return obj.length
}
```

可以使用 `typeof` 判断不同的类型

| 类型         | 判断方式                           |
| ----------- | --------------------------------- |
| string      | type of s === 'string'            |
| number      | type of n === 'number'            |
| boolean     | type of b === 'boolean'           |
| undefined   | type of undefined === 'undefined' |
| function    | type of f === 'function'          |
| array       | Array.isArray(a)                  |

根据传入不同类型的参数可进行不同的操作，例如
```ts
//处理数据，返回字符串数组
function wrapInArray(obj: string | string[]){
  if(typeof obj === 'string'){
    return [obj]
  }
  return obj
}
```

### 泛型

泛型为类型提供变量。 一个常见的例子是数组。 没有泛型的数组可以包含任何东西。 带有泛型的数组可以描述数组包含的值。

```ts
type StringArray = Array<string>
type NumberArray = Array<number>
type ObjectWidthNameArray = Array<{name: string}>
```
可以自定义泛型。

```ts {13}
interface CustomType<Type> {
  add: (obj: Type) => void
  get: () => Type
}

//这一行是告诉 TypeScript 有一个名为 `customType` 的常量，并且不用担心它来自哪里。
declare const customType: CustomType<string> 

// object的类型为string，
const object = customType.get();

customType.add(23) //会报错
// Argument of type 'number' is not assignable to parameter of type 'string'.
```

## 结构类型系统
`TypeScript` 的核心原则之一是类型检查侧重于值的形状。 这有时被称为“鸭子类型”或“结构类型”。

在结构类型系统中，如果两个对象具有相同的形状，则认为它们属于同一类型。

```ts{19-20}
interface Point{
  x: number
  y: number
}

function logPoint(p: Point){
  console.log(`${p.x}, ${p.y}`)
}

const point = { x: 1, y: 2 }
logPoint(point)

// point1内有Point类型内相同的内容，所以验证通过
const point1 = { x:1, y:3, z: 4 }
logPoint(point1)

const color = { hex: '#fff' }
logPoint(color) // 报错
// Argument of type '{ hex: string; }' is not assignable to parameter of type 'Point'.
// Type '{ hex: string; }' is missing the following properties from type 'Point': x, y
```
上述所说的东西，同样使用于 `class` 中。

:::tip
如果对象或类具有所有必需的属性，则无论实现细节如何，`TypeScript` 都会说它们匹配。
:::


