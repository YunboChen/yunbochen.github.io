---
title: TypeScript 日常使用类型
date: '2021-08-18 09:34:28'
author: Rainbow
permalink: /study/typescript/everyday-types
categories:
  - 学习
tags:
  - TypeScript
---

:::tip
`TypeScript` 除了基础的类型，也可通过多个简单的类型组合成复杂类型，详见[官方文档](https://www.typescriptlang.org/)。
:::

## 最基础的类型：`string` 、`number` 、`boolean`

`JavaScript` 有三个非常常用的类型：`string` 、`number` 、`boolean` ，在 `TypeScript` 同样拥有这三个类型，并且名称相同。

- `string` 代表字符串，例如：`'Hello World!'`。
- `number` 代表数字，`整数` 或者 `小数` 都是 `number` 类型， 例如：`1` 、`1.1`。
- `boolean` 代表布尔型，该类型只有 `true` 和 `false` 两个值。

:::tip
`String` 、`Number` 、`Boolean` 三个以大写字母开头的类型也存在，但一般只用于内置的特殊类型。通常使用 `string` 、`number` 、`boolean` 三个类型。
:::

## 数组

类似于 `[1, 2, 3]` 这样的都是由数字组成的数组，可以写成 `number[]` ，与 `Array<number>` 基本没有区别。

:::warning
`[number]` 不是数组的类型，这是一个元组类型。

```ts{4-5}
type TupleType = [number]

const arr: TupleType = [1, 2] 
//Type '[number, number]' is not assignable to type 'TupleType'.
//Source has 2 element(s) but target allows only 1.
```
:::

## any

`TypeScript` 有一个特殊的类型 `any` ，当你不想有任何的类型检测报错时可使用该类型。
当值是 `any` 的类型，可以对值进行任何操作或者对其赋任何类型的值都是正确的。

```ts
let obj: any = { x: 0 }
obj.foo()
obj()
obj.bar = 100
...
//都不会出现类型检测错误
```
当 `TypeScript` 无法判断出当前类型，会默认认为 `any` 类型，若要避免这样的情况，可在编译器配置 [noImplicitAny ](https://www.typescriptlang.org/tsconfig#noImplicitAny) 属性来禁用该默认行为。

## 变量

在使用 `const` 、`let` 、`var` 定义变量，可在变量后声明该变量类型。

```ts
let a: string = '11'
const b: number = 12
const c: boolean = true
```

在绝大多数的情况下，不需要这么声明变量类型。 `TypeScript` 可根据值自动推算出当前变量类型。

```ts
let a = '111'
// 会自动推算出变量 a 的类型为string
```

## 方法

- 声明传入参数的类型。

```ts{7}
function greet(name: string){
  console.log(`Hello, ${name} !`)
}

// 当传入不正确的类型时，会报错
greet(42)
// Argument of type 'number' is not assignable to parameter of type 'string'.
```

- 声明返回值的类型

```ts{4}
function returnNum(): number{
  return '111'
}
// Type 'string' is not assignable to type 'number'.
```

- 匿名函数

匿名函数与声明函数有一点点不同。`TypeScript` 会根据匿名函数所在的上下环境自动推算出类型。例如：

```ts{6,11}
const names = ['Alice', 'Bob', 'Eva']

names.forEach(function(ele) {
  console.log(ele.toUppercase())
})
// Property 'toUppercase' does not exist on type 'string'. Did you mean 'toUpperCase'?

names.forEach(ele => {
  console.log(ele.toUppercase())
})
// Property 'toUppercase' does not exist on type 'string'. Did you mean 'toUpperCase'?
```

根据上下环境， 推算出 `ele` 为 `string` 类型并进行相关检测。

## 对象

定义对象类型要声明包含的属性和类型。
例如在方法中需要传入一个对象，可这么写：

```ts
// 对象内可用 , 或者 ；来分割属性
function logPoint(pt: { x: number, y: number }){
  console.log(`x: ${ pt.x }, y: ${ pt.y }`)
}
logPoint({ x: 2, y: 1 })
```

:::tip
**方法内传入可选参数**
使用 `?` 定义可选传入参数的类型，例如

```ts
function optionalParam(obj: { first: string, last?: string }){
  // ...
}

optionalParam({ first: 'one' })
optionalParam({ first: 'one', last: 'two' })
//两者编译都成功
```

若方法内有对可选参数进行操作，需要判断可选参数为 `undefined` 的情况，例如：

```ts{5,9-13}
function optionalParam(obj: { first: string, last?: string }){
  console.log(obj.last.toUpperCase())
}
optionalParam({ first: 'one' })
// Object is possibly 'undefined'.

//需进行处理
function optionalParam(obj: { first: string, last?: string }){
  console.log(obj?.last?.toUpperCase())
  // 或者
  if(obj.last){
    console.log(obj.last.toUpperCase());
  }
}
optionalParam({ first: 'one' })
// 编译通过
```
:::

## 联合类型

`TypeScript` 支持将几种简单的类型组合成一个新的类型。例如，在方法中传入的参数可以 `number` 或者 `string` 。

```ts{13}
function printParam(param: string | number){
  console.log(param)
}

// 参数传入字符串
printParam('111')

// 参数传入数字
printParam(111)

// 参数传入其他类型，会报错
printParam(true)
// Argument of type 'boolean' is not assignable to parameter of type 'string | number'.
```

### 使用联合类型

**联合类型** 可以由多个不同的类型组成，若要使用某个类型的内置方式，需要进行类型判断。

```ts{4-5,9}
function printParam(param: string | number){
  console.log(param.toUpperCase())
}
// Property 'toUpperCase' does not exist on type 'string | number'.
// Property 'toUpperCase' does not exist on type 'number'.

// toUpperCase 为string类型的方法，number类型没有，需要进行类型处理
function printParam(param: string | number){
  typeof param === 'string' ? console.log(param.toUpperCase()) : console.log(param)
}
```
## 类型别名

`联合类型` 和 `对象类型` 在日常使用的频率很高。有时，需要在不同的地方使用相同的 `联合类型` 和 `对象类型` 。所以，我们可以设置 `类型别名` 来减少重复声明。

### type
  
`type` 的使用方法：

```ts
type Point = {
  x: number
  y: number
}

function logPoint(pt: Point){
  console.log(`x: ${ pt.x }`);
  console.log(`y: ${ pt.y }`);
}

logPoint({ x: 1, y: 3  })

// 同样也能为 `联合类型` 设置别名。
type StrType = number | string
function returnStrType(str: StrType){
  return str
}
```

:::tip
为相同的类型设置不同的类型别名，看起来类型不同，但是对于 `TypeScript` 来说是一致的。
```ts
type CustomType = string

function formatterStr(str: string): CustomType{
  return str
}

let str = formatterStr('222')

str = '6666'
// 编译通过，对于 TypeScript 来说 CustomType 和 string 两者等价
```
:::

### interface
  
`interface` 是另一种定义类型别名的方式（只能定义对象类型的类型别名），使用方法：

```ts
interface Point {
  x: number
  y: number
}

function logPoint(pt: Point){
  console.log(`x: ${ pt.x }`);
  console.log(`y: ${ pt.y }`);
}

logPoint({ x: 1, y: 3  })
```
### type 和 interface 的区别

1. 定义类型范围
   
`type` 可定义基础类型、联合类型、对象类型、交叉类型，而 `interface` 只能定义 对象类型。

```ts
// 基础类型
type StrType = string

// 联合类型
type UnionType = string | number

// 对象类型
type ObjectType = {
  a: number,
  b: string
}

interface ObjectType {
  a: number
  b: string
}

```
2. 扩展性

`interface` 可以通过 `extends` 、`implements` ，从而扩展多个接口或类。`type` 没有扩展功能。

```ts
interface User {
    name: string
    age: number
}

// 或者extends type

type User = {
    name: string,
    age: number
}

interface Person extends User{
    sex: string
}

function logPerson(p: Person){
    return p
}

logPerson({name: 'Bob', age: 20, sex: 'male'})
```

`type` 可以使用交叉类型 `&`，让成员类型合并。

```ts
type User = {
    name: string,
    age: number
}

type Person = {
    sex: string
} & User 

function logPerson(p: Person){
    return p
}

logPerson({name: 'Bob', age: 20, sex: 'male'})
```

3. 合并声明
   
两个别名相同的 `interface` 会自动合并，而 `type` 不行。

```ts{21}
// 声明相同的 interface
interface User {
    name: string
}

interface User {
    age: number
}

const user: User = { name: 'Bob', age: 20 }

// 声明相同的 type
type User = {
    name: string
}

type User =  {
    age: number
}

//Duplicate identifier 'User'.
```

## 类型断言
用来手动指定一个值的类型。用法：
```ts
<类型> 值
// 或者
值 as 类型
```
:::tip
通常建议使用 `as` 的方式，在 `jsx` 中支持这种方式。 
:::

有时候，你比 `TypeScript` 更清楚知道某些无法推算的类型，这个时候就会需要用到 **类型断言** 。例如：

```ts {4-5}
function logStrLength(str: number | string){
  console.log(str.length)
}
// Property 'length' does not exist on type 'string | number'.
// Property 'length' does not exist on type 'number'.
```

上述代码中，`length` 是 `string` 类型拥有的，`number` 不具备。使用 **联合类型** ， 必须是所有属性都拥有的方法或熟悉。需要使用 **类型断言** 来进行判断。例如：

```ts
function logStrLength(str: number | string){
  if((str as string).length){
    console.log((str as string).length)
  }else{
    console.log(str.toString().length)
  }
}
```
无法在 `联合类型` 中不存在的类型断言，例如

```ts{4-6}
function logStrLength(str: number | string){
  console.log(str as boolean)
}
// Conversion of type 'string | number' to type 'boolean' may be a mistake because neither type sufficiently overlaps with the other. 
//If this was intentional, convert the expression to 'unknown' first.
//Type 'number' is not comparable to type 'boolean'.
```


:::tip
**类型断言** 在编译时会去除，在 **类型断言**  错误时，不会报 `null` 或异常。
:::

## 字面量类型

### 字符串字面量类型

字符串字面量类型其实就是字符串常量，与字符串类型不同的是它是具体的值：

```ts{4}
type LiteralType = 'literal'

const str1: LiteralType = 'type'
// Type '"type"' is not assignable to type '"literal"'.

const str2: LiteralType = 'literal'
```
还能使用 **联合类型** 定义多个值的字符串常量：

```ts
type LiteralType = 'literal' | 'type'

const str1: LiteralType = 'type'

const str2: LiteralType = 'literal'
```

### 数字字面量类型

与 **字符串字面量类型** 用法相似：

```ts{8}
type LiteralType = 1 | 2

const num1: LiteralType = 1

const num2: LiteralType = 2

const num3: LiteralType = 3
// Type '3' is not assignable to type 'LiteralType'.
```

### 方法中使用字面量类型

```ts{11}
function handleRequest(url: string, method: 'GET' | 'POST'){
  // ...
}

const req = {
  url: 'http://www.baidu.com',
  method: 'GET'
}

handleRequest(req.url, req.method)
// Argument of type 'string' is not assignable to parameter of type '"GET" | "POST"'.
```

上述代码中，`method` 定义了字面量变量，但 `req.method` 自动识别为 `string` 类型，所以报错。
1. 利用 **类型断言** ：

```ts
handleRequest(req.url, req.method as 'GET')
```

2. 定义类型别名：

```ts
interface Req {
  url: string,
  method: 'GET' | 'POST'
}

const req: Req = {
  url: 'http://www.baidu.com',
  method: 'GET'
}
```

3. 使用 `const 断言` ，代表该值的类型不应被扩展：

```ts
const req = {
  url: 'http://www.baidu.com',
  method: 'GET'
} as const

handleRequest(req.url, req.method)
```

## `null` 和 `undefined`

`JavaScript` 有两个原始值用于表示值不存在或未定义：`null` 和 `undefined` 。

`TypeScript` 拥有名称一样的两个类型，是否有用跟 `strictNullChecks` 的配置有关。  

- strictNullChecks: `off`

关闭 `null` 和 `undefined` 的检查，不会对空值进行相关检查，有时程序报错往往是由于空值导致的。

- strictNullChecks: `on`

开启 `null` 和 `undefined` 的检查，需要对空值进行处理。

```ts
function logStr(str: string |  null){
  if(str !== null){
    console.log(str)
  }else{
    // ...
  }
}
```

**非空断言** 是一种特殊的语法，可以在没有做任何对于 `null` 和 `undefined` 特殊处理的情况下，剔除 `null` 和 `undefined` 的检查。
使用方法为在变量后使用 `!` 符号：

```ts
function fixedX(x?: number | null) {
  console.log(x!.toFixed());
}
```

:::warning
**非空断言** 为 **断言** 的一种，同样也会在编译后删除。
:::

## 枚举
**枚举** 是 `TypeScript` 额外添加的功能， 可定义一个值，该值包含多个常量。`JavaScript` 原生不支持该功能，所以只在运行时有用，一般不推荐使用。
具体请查看[文档](https://www.typescriptlang.org/docs/handbook/enums.html)。

## 不太常见的基础类型

随着 `JavaScript` 不断优化和补充，加入了之前没有的基础类型。

### bigint

在 `ES2020` 版本中，加入了 `BigInt` 大数字类型：

```ts
const bigIntHandle: bigint = BigInt(100)

const bigIntNum: bigint = 100n
```

### symbol

利用 `Symbol()` 函数创建的一个全局索引：

```ts{8-9}
const firstName = Symbol("name");
const secondName = Symbol("name");
 
if (firstName === secondName) {
  // 
}

 // This condition will always return 'false' 
 // since the types 'typeof firstName' and 'typeof secondName' have no overlap.
```

