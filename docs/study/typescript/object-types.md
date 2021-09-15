---
title: TypeScript的对象类型
date: '2021-08-19 13:57:15'
author: Rainbow
permalink: /study/typescript/object-types
categories:
  - 学习
tags:
  - TypeScript
---

在 `JavaScript` 中，通过多个属性组成一个 `object` 类型。在 `TypeScript` 也可以这么做。

通常的使用方法：

- 直接匿名定义

```ts
function printPersonInfo(p: { name: string, age: number }){
  console.log(`name: ${ p.name }`)
  console.log(`age: ${ p.age }`)
}
```

- 使用 `interface` 定义

```ts
interface Person{
    name: string
    age: number
}

function printPersonInfo(p: Person){
    console.log(`name: ${ p.name }`)
    console.log(`age: ${ p.age }`)
}
```

- 使用 `type` 定义

```ts
type Person = {
  name: string
  age: number
}

function printPersonInfo(p: Person){
  console.log(`name: ${ p.name }`)
  console.log(`age: ${ p.age }`)
}
```

## 属性修饰符

在 **对象类型** 中可以将属性设置为是否可选或是否可写入。

### 可选属性

在定义复杂对象时，常常需要某些属性是可选的，这时，在属性后面加上 `?` ，来代表该属性不是必须的。

```ts
interface PersonOptionalType {
  name: string
  age: number
  sex?: string
}

function printPersonInfo(p: PersonOptionalType){
  console.log(`name: ${ p.name }`)
  console.log(`age: ${ p.age }`)
  console.log(`sex: ${ p.sex }`)
}

printPersonInfo({ name: 'Bob'})
printPersonInfo({ name: 'Bob', age: 17})
printPersonInfo({ name: 'Bob', age: 17, sex: 'male'})
```

上述代码中，`age` 和 `sex` 是可选属性，可传可不传。

在开启 `strictNullChecks` 属性时，因为 `sex` 和 `age` 是可选的，所以 `sex` 会被识别成 `number | undefined` , `age` 会被识别成 `string | undefined` ，这时需要对 `undefined` 进行处理。

```ts{2,5}
function printPersonInfo(p: PersonOptionalType){
  const age = p.age ? p.age : 0
  console.log(age)

  const sex = p.sex ? p.sex : ''
  console.log(sex)
}
```
对于需要为 `undefined` 和 `null` 设置默认值的情况十分普通，所以 `JavaScript` 原生支持了为参数设置默认值。

```ts
function printPersonInfo({name, age = 0, sex = 'male'}: PersonOptionalType){
  console.log(name)
  console.log(age)
  console.log(sex)
}
```

:::warning
上述代码中参数使用了解构模式，在解构模式中，无法单独为属性设置类型。与 `JavaScript` 本身的 `object` 使用方式冲突。
:::

### 只读属性

可为 **对象类型** 设置 **只读** 。在需要设置只读属性的前面加上 `readonly` 即可。

```ts{9}
interface PersonReadOnlyType {
  readonly age: number
  name: string
}

function printPerson(p: PersonReadOnlyType){
  console.log(p.age)
  p.age = 30
  // Cannot assign to 'age' because it is a read-only property.
}
```

设置为 `readonly` 的属性，并不是不可改变，只是不能重写该属性。

```ts{9-13}
interface PersonReadOnlyType {
  name: string
  readonly other: { age: number, sex: string }
}

function printPerson(p: PersonReadOnlyType){
  p.other.age = 20

  p.other = {
    age: 20,
    sex: 'male'
  }
  // Cannot assign to 'other' because it is a read-only property. 
}
```

:::tip
`readonly` 的属性可通过类型别名来改变值

```ts
interface Person {
  name: string
  age: number
}

interface ReadOnlyPerson {
  readonly name: string
  readonly age: number
}

let writePerson: Person = {
  name: 'Bob',
  age: 10
}

let readonlyPerson: ReadOnlyPerson = writePerson

console.log(readonlyPerson.age) // 10
writePerson.age++
console.log(readonlyPerson.age) // 11
```
:::

## 索引签名

有时候，我们不清楚属性的具体类型，但我们知道具体的值，这时候，可以使用索引签名来描述属性类型：

```ts
interface StringArray {
  [index: number]: string
}

const myStr: StringArray = []

const secondVal = myStr[1]
// secondVal 为 string 类型
```

上面的代码中，定义了一个有索引签名的 `StringArray` 接口。这样可以利用索引返回 `String` 类型。

使用索引签名，属性类型必须与索引签名相同类型：

```ts{4}
interface StringArray {
  [index: string]: string
  name: string
  age: number
  // Property 'age' of type 'number' is not assignable to string index type 'string'.
}
```

但是，如果索引签名是属性类型的并集，则可以接受不同类型的属性：

```ts
interface StringArray {
  [index: string]: string | number
  name: string
  age: number
}
```

你可以将索引签名设置为 `readonly` ，来防止篡改索引签名的值：

```ts{8}
interface StringArray {
  readonly [index: number]: string
}

let myStr: StringArray = ['222', '111']

myStr[1] = '222'
// Index signature in type 'StringArray' only permits reading.
```

## 扩展类型

对基础的类型进行扩展的情况是十分常见，例如，首先定义一个 `BasicPerson` 的基础接口：

```ts
interface BasicPerson {
  name: string
  age: number
}
```

此时，需要一个 `Student` 的接口，它拥有 `BasicPerson` 的所有属性，并有额外的属性，可以这么做：

```ts
interface Student extends BasicPerson {
  classNum: string
}
```

这样 `Student` 的接口就具备了 `name` ，`age` 、`classNum` 三个属性。

上述代码中使用了一个名为 `extends` 关键词，这个关键词允许我们从别的接口内复制属性，并支持添加新的属性。这种方式大大减少了不同接口拥有重复属性的复杂度和代码量。

`interface` 支持扩展多个 `interface`：

```ts
interface FontSize {
  fontSize: number
}

interface FontFamily {
  fontFamily: string
}

interface Font extends FontSize, FontFamily{
  color: string
}

const font: Font = {
  fontSize: 12,
  fontFamily: '微软雅黑',
  color: '#fff'
}
```

## 交叉类型

`interface` 允许我们从别的接口复制属性并扩展形成一个新的类型，`type` 同样也支持我们这样做，只是使用方式不同。

```ts
type FontSize = {
    fontSize: number
}

type FontFamily = {
    fontFamily: string
}

type Font = {
    color: string
} & FontSize & FontFamily

const font: Font = {
    fontSize: 12,
    fontFamily: '微软雅黑',
    color: '#fff'
}
```

上述代码中 通过 `&` 符号，将 `FontSize` 和 `FontFamily` 两个类型交叉并形成一个新的类型。该类可行具备 `FontSize` 和 `FontFamily` 两个类型的所有属性。

:::tip
**扩展类型 vs 交叉类型**
两种类型实现的功能类似，区别在于 **处理冲突的方式不同** 。
:::


## 泛型

定义一个类型，这个类型内的属性可以是任何一个类型：

```ts
interface Box {
  content: any
}
```

现在，`Box.content` 的类型为 `any` ，这是可行的，但会产生无法预计的错误，一般不推荐。

我们也可以使用 `unknown` ，但我们需要进行预防性检查或者在容易出现的地方进行类型判断。

```ts
interface Box{
  content: unknown
}

let x: Box = {
  content: 'Hello World !'
}

if(typeof x.content === 'string'){
  console.log(x.content.toLowerCase())
}

console.log((x.content as string).toLowerCase())
```

另外一种安全的方式，定义不同的Box类型。

```ts
interface StringBox{
  content: string
}

interface NumberBox{
  content: number
}

interface BooleanBox{
  content: boolean 
}

function setContent(box: StringBox, str: string){
  // ...
}

function setContent(box: NumberBox, str: string){
  // ...
}

function setContent(box: BooleanBox, str: string){
  // ...
}

function setContent(box: { content: any }, str: any){
  box.content = str
}
```

上述代码除了传入数据的类型不同，其他都是相同的，会显得非常麻烦并且臃肿。

简化之前，了解一下泛型在对象类型如何使用，使用方法：

```ts
interface Box<Type> {
  content: Type
}

const stringBox: Box<string> = { content: '111' }
const numberBox: Box<number> = { content: 111 }
```

`<type>` 还能传入自定义的类型，比如：

```ts
interface Box<Type> {
  content: Type
}

interface CustomType {
  test: string
}

const customBox: Box<CustomType> = { content: { test: '11' } }
```

大致明白泛型在对象类型的用法之后，开始简化上面的方法：

```ts
interface Box<Type> {
  content: Type
}

function setContent<Type>(box: Box<Type>, content: Type){
  box.content = content
}

setContent({content: ''}, '111')
setContent({content: 0}, 222)
```

`Box` 是用 `interface` 定义，同样也能使用 `type` 定义：

```ts
type Box<Type> = {
  content: Type
}
```

`type` 也可以定义通用的辅助类型：

```ts
type OrNull<Type> = Type | null

type OneOrMany<Type> = Type | Type[]

type OneOrManyOrNull<Type> = OneOrMany<OrNull<Type>>

type StringOneOrManyorNull = OneOrManyOrNull<string>
```

## 数组类型

```ts
type OneOrMany<Type> = Type | Type[]
```

代码中 `Type[]` 就是数组类型，是 `Array<Type>` 的简写。

数组类型 本身就是一种 **泛型**：

```ts
interface Array<Type> {
  length: number
  pop(): Type | undefined
  push(...items: Type[]): number
  ...
}
```

当前 `JavaScript` 中有许多泛型，比如： `Map<K, V>` 、`Set<T>` 、`Promise<T>` 。

**数据类型只读**

`ReadonlyArray` 类型是一个特殊的数组类型，并且不可改变；

```ts{8-7}
function doSomeThing(val: ReadonlyArray<string>){
  const copy = val

  console.log(val[0])

  val.push('111')
  // Property 'push' does not exist on type 'readonly string[]'.
}
```

和 `Array` 不同，`ReadonlyArray` 没有构造函数的方法：

```ts{2}
new ReadonlyArray(11, 22, 33)  
// 'ReadonlyArray' only refers to a type, but is being used as a value here.

const arr: ReadonlyArray<number> = [11, 22, 333]
```

`Array<Type>` 可以简写成 `Type<>` ，`ReadonlyArray` 也可以简写成 `readonly Type[]` ：

```ts
const arr: readonly number[] = [11, 22, 333]
```

:::tip
和 `readonly` 不同，`ReadonlyArray` 和 `Array` 无法双向赋值。

```ts{6-7}
let readonlyArr: readonly number[] = []
let arr: number[] = []

readonlyArr = arr
arr = readonlyArr
// The type 'readonly number[]' is 'readonly' 
// and cannot be assigned to the mutable type 'number[]'.
```
:::

## 元祖

**元祖** 是一种特殊的 **数组类型**，和普通的数组类型区别在于，元祖知道含有数组的元素个数及每个元素的类型。

```ts{9-10,13}
type StringNumberArr = [string, number]

const arr: StringNumberArr = ['1', 2]

// StringNumberArr 这个数组类型，长度为2，第一个元素类型 string ，第二个元素类型为 number 
// 若长度不对或者元素类型不对都会报错

const arr: StringNumberArr = ['1', 2, 3]
// Type '[string, number, number]' is not assignable to type 'StringNumberArr'.
//Source has 3 element(s) but target allows only 2.

const arr: StringNumberArr = ['1', '1']
// Type 'string' is not assignable to type 'number'.
```

**元祖** 能使用可选属性符号 `?`：

```ts
type PointArr = [number, number, number?]

function logPoint(p: PointArr) {
  console.log(p.length)
}

logPoint([1,2]) // 2
logPoint([1,2,3])// 3
```

也可以使用 `...` ：

```ts
type Point2dArr = [number, number]

type Point3dArr = [...Point2dArr, number?]

function logPoint(p: Point3dArr) {
  console.log(p.length)
}

logPoint([1,2]) // 2
logPoint([1,2,3]) // 3
```

**元祖** 搭配 `...` 符号可以有许多有意思的写法：

```ts
function readButtonInput(...args: [string, number, ...boolean[]]) {
  const [name, version, ...input] = args;
  console.log(name, version, input)
}
```

就相当于

```ts
function readButtonInput(number: string, verson: number, ...input: boolean[]) {
  console.log(name, version, input)
}
```

:::tip
元祖 同样拥有 `readonly` , 使用方法与别的类型的 `readonly` 相似。
:::



