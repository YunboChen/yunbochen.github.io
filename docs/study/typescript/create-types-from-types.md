---
title: 如何根据旧的类型创建新的类型
date: '2021-08-20 15:03:50'
author: Rainbow
permalink: /study/typescript/create-types-from-types
categories:
  - 学习
tags:
  - TypeScript
---

:::tip
`TypeScript` 的类型系统非常强大，除了可以单独创建类型，还可以从旧类型创建新类型。最常用的就是 `泛型` 。
:::

组合各种类型运算符（例如：`?` 、`...` ）可以让复杂操作和值的表达更简单并且维护性强。主要通过以下几种方式：

- [泛型](#泛型) - 带参数的类型
- [Keyof 类型运算符](#keyof-类型运算符) - 使用 `keyof` 运算符创建类型
- [Typeof 类型运算符](#typeof-类型运算符) - 使用 `typeof` 运算符创建类型
- [索引访问类型](#索引访问类型) - 使用 `Type['a']` 的方式访问类型的自己
- [条件类型](#条件类型) - 通过条件创建不同的类型
- [映射类型](#映射类型) - 通过映射类的属性来创新新的类型
- [模板字面类型](#模板字面类型) - 通过字面量更改属性的映射类型


## 泛型

`泛型` 在 `Java` 、`C#` 中运用十分广泛，也十分有效。在 `TypeScript` 中，同样将这一重要语法引入。

### 初识泛型

没有接触过后端语言的人，一般对 `泛型` 并不了解，所以，通过一个例子来简单介绍一下泛型：

```ts
function logMsg(msg: number){
  return logMsg
}
```

`logMsg` 是一个直接返回值的方法，上面定义的 `msg` 参数只能传入 **数字** ，但实际这个方法传入的值有时候希望不单单是 `数字` ，这时候 `泛型` 就会非常好用。

```ts
function logMsg<Type>(msg: Type){
  return logMsg
}
const logStr = logMsg<string>('111')
const logNum = logMsg<number>(111)
const logBoolean = logMsg<boolean>(true)
```
可以看到与一开始的方法相比，多了个 `<Type>` 这个就相当于一个参数，在使用时，传入类型，那这个方法所需要就是传入的类型。

### 泛型变量

上一节中 `logMsg<Type>` 的 `Type` 就是 **泛型变量** ，当类型作为参数传入后，`TypeScript` 则会强制使用传入的类型。未传时，可暂时将 `Type` 作为任何类型。

假设需要获取上一节的 `logMsg<Type>` 方法中 `msg` 的长度，会发生什么呢

```ts{3}
function logMsg<Type>(msg: Type){
  console.log(msg.length)
  // Property 'length' does not exist on type 'Type'.
  return logMsg
}
```

会发现报 `Property 'length' does not exist on type 'Type'` 。因为对于泛型来说，`Type` 相当于任何类型，使用者可以传入数字，而数字是没有 
`.length` 这个方法的。

所以我们需要处理的是 `Type数组` 而不是直接操作 `Type`。因为我们处理的是数组，所以 `.length` 是可用。我们可以像创建其他类型的数组一样创建 `Type数组` 。

```ts
function logMsg<Type>(msg: Type[]){
  console.log(msg.length)
  return logMsg
}
```

### 泛型类型

上一节我们知道了泛型的基本用法，那我们可以通过 `type` 或 `interface` 创建属于自己的泛型类型（例如：`Array<type>` ）。

泛型函数的类型和非泛型函数一样，需要先列出类型参数，类似于函数声明：

```ts
function logMsg<Type>(msg: Type): Type{
  return msg
}
const myLogMsg: <Type>(msg: Type) => Type = logMsg
```

泛型类型参数不一定非要使用 `Type`， 只需类型变量的数量和类型变量的使用方式一致即可：

```ts
function logMsg<Type>(msg: Type): Type{
  return msg
}
const myLogMsg: <Input>(msg: Input) => Input = logMsg
```

也可以使用对象字面量类型的函数签名：

```ts
function logMsg<Type>(msg: Type): Type{
  return msg
}
const myLogMsg: { <Type>(msg: Type): Type } = logMsg
```

从上述的代码得到启发，我们可以利用 `interface` 来创建属于自己的泛型类型

```ts
interface MsgFn{
  <Type>(msg: Type): Type
}

function logMsg<Type>(msg: Type): Type{
  return msg
}

const myLogMsg: MsgFn = logMsg
```

上述代码中，`<Type>` 只针对 `msg` ，而不是所有属性，需要将 `<Type>` 移到 `MsgFn` 处，才可对所有属性起作用：

```ts
interface MsgFn<Type>{
  (msg: Type): Type
}

function logMsg<Type>(msg: Type): Type{
  return msg
}

const myLogMsg: MsgFn<number> = logMsg
```

### 泛型类

除了可以创建 `type` 、`interface` ，还能创建 `类` 、`模块` ，但不可创建通用枚举类型和命名空间。

**泛型类** 类似于 `type` 、`interface` 。

```ts
class GenericClass<Type>{
  msg: Type
  log: (newVal: Type) => Type
}

const genericClassNumber = new GenericClass<number>()

genericClassNumber.msg = 111

genericClassNumber.log = function(val){
  return val
}
```

上面的类型为 `number` , 也可以为 `string` 类型：

```ts
const genericClassNumber = new GenericClass<stirng>()

genericClassNumber.msg = '111'

genericClassNumber.log = function(val){
  return val
}
```

就像 `type` 、`interface` ，需要将 `<Type>` 放在类本身，才能使得所有的属性都可访问到。

### 泛型约束

在使用了泛型之后，似乎我们可以处理任何类型或调用方法，但实际情况下，某个方法或属性是某些类型才有的，这样容易出现问题。为解决这一问题，就需要 `泛型约束` 。一开始介绍 `泛型` 的例子中，我们碰到 `Property 'length' does not exist on type 'Type'` 的错误，这时候我们可以加个 `泛型约束` ，来避免这个
问题。

```ts{9-14}
interface MsgConstraints{
  length: number
}

function logMsg<Type extends MsgConstraints>(msg: Type): Type{
  console.log(msg.length) // 因为我们加入了 MsgConstraints 这个约束，所以不必担心没有这个属性
  return msg
}

// 例如
logMsg(2) // Argument of type 'number' is not assignable to parameter of type 'MsgConstraints'.

// 语法检查就会报错，需要加入length这个属性
logMsg({ length: 1, value: 2 })
```

### 在泛型约束使用泛型参数

可以声明受另一个类型约束的类型参数。例如，我们从一个给定名称的对象中取一个属性，这时我们需要保证不会出现不存在的属性，因此我们需要在两种类型中添加一个约束：

```ts{9}
function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key){
  return obj[key]
}

const x = { a: 1, b: 2, c: 3 }

getProperty(x, 'a')
getProperty(x, 'd') 
// Argument of type '""' is not assignable to parameter of type '"a" | "b" | "c"'.
```

### 在泛型中使用类

在 `TypeScript` 中使用泛型创建工厂时，需要通过它们的构造函数来引用类类型，例如：

```ts
function create<Type>(c: { new(): Type }){
  return new c()
}
```

更为复杂的例子：

```ts
class BeeKeeper {
  hasMask: boolean = true;
}
 
class ZooKeeper {
  nametag: string = "Mikle";
}
 
class Animal {
  numLegs: number = 4;
}
 
class Bee extends Animal {
  keeper: BeeKeeper = new BeeKeeper();
}
 
class Lion extends Animal {
  keeper: ZooKeeper = new ZooKeeper();
}
 
function createInstance<A extends Animal>(c: new () => A): A {
  return new c();
}

createInstance(Lion).keeper.nametag;
```

上述代码中，使用原型属性来推断和约束构造函数和类类型的实例端之间的关系。

## Keyof 类型运算符

`keyof` 运算符采用对象类型并生成其键的字符串或数字文字联合：

```ts
type Point = { x: number, y:number }

type P = keyof Point
// p 为x | y
```

如果类型具有字符串或数字索引签名，则 `keyof` 将返回这些类型：

```ts
type ArrayList = { [n: number]: number }

type Arr = keyof ArrayList
// Arr 代表 key， 类型为 number
```

## Typeof 类型运算符

`JavaScript` 已经拥有了 `typeof` 的运算符，用于判断类型：

```ts
console.log(typeof 'Hello World')
```

而在 `TypeScript` 中，`typeof` 代表引用之前声明的类型或变量：

```ts
const param = 'hello world'

let t: typeof param
// t: 'hello world'
```

对于基本类型来说，并不是很有用，但是结合其他类型运算符，您可以使用 `typeof` 方便地表达许多模式。例如，`ReturnType<T>` 接受一个函数类型并返回类型：

```ts
type Preset = (x: unknown) => boolean

type k = ReturnType<Preset>
//k: boolean
```

但如果 `ReturnType` 传入的是一个函数呢，会发生错误：

```ts{6}
function f(){
  return { x: 1, y: 2, z: 3 }
}

type k = ReturnType<f>
// 'f' refers to a value, but is being used as a type here. Did you mean 'typeof f'?
```

这时就需要使用 `typeof` 来引用那个 `f` 函数：

```ts
type k = ReturnType<typeof f>
```

:::tip
`TypeScript` 限制了 `typeof` 的表达式类型。使用 `typeof 方法名` 时，无法传入参数：

```ts{2}
let shouldContinue: typeof msgbox("Are you sure you want to continue?");
// ',' expected.
```
:::

## 索引访问类型

可以使用索引，来声明一个新的类型：

```ts
type Person =  { name: string, age: number, sex: 'male' | 'female'}

type Age = Person['age']
```

索引访问类型本身是一种类型，可以同时使用 `联合` 、`keyof` 等：

```ts
type Person = { age: number; name: string; alive: boolean };

type PersonUnions = Person['age' | 'alive']

type PersonKeyof = Person[keyof Person]

type Name = 'age' | 'name' 
type PersonName = Person[Name]
```

如果索引类型不存在，会报错：

```ts{2}
type PersonNum = Person['alie']
// Property 'alie' does not exist on type 'Person'.
```

使用任意类型进行索引的另一个示例是使用 `number` 来获取数组元素的类型。 我们可以将其与 `typeof` 结合使用，以方便地捕获数组字面量的元素类型：

```ts
const personArray = [
  { name: 'Alice', age: 20 },
  { name: 'Bob', age: 18 },
  { name: 'Eva', age: 22 },
]

type Person = typeof personArray[number]
type Age = typeof personArray[number]['age']
type Age2 = Person['age']
```

使用索引类型时，无法直接使用 `const` 定义的索引：

```ts{6}
type Person = { age: number; name: string; alive: boolean };

const key = 'age'

type Age = Person[key]
// Type 'any' cannot be used as an index type.
```

但索引可以使用 `类型别名`：
```ts
type Person = { age: number; name: string; alive: boolean };

type key = 'age'

type Age = Person[key]
```

## 条件类型

程序可以根据特定的条件输出或作出不同的内容，`TypeScript` 也可以通过条件判断来输出不同的类型，这有助于描述输入和输出类型之间的关系。

```ts {10,13}
interface Animal {
  live(): void
}

interface Dog extends Animal{
  woof(): void
}

type test1 = Dog extends Animal ? number : string
// test1: number

type test2 = RegExp extends Animal ? number : string
// test1: string
```

类似于 `三元表达式（条件 ? 满足条件 : 不满足条件）` ：

```ts
SomeType extends OtherType ? TrueType : FalseType
```

## 映射类型

## 模板字面类型

