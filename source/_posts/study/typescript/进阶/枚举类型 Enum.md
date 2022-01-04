---
title: 枚举类型 Enum
date: 2021-12-09
author: Rainbow
categories:
  - [学习, typescript]
tags:
  - typescript
  - 进阶
---

**枚举** 是一种组织相关值集合的方法。

```typescript
enum Status {
  OFFLINE,
  ONLINE,
  DELETE
}

function getResult(status: Number) {
  return status === Status.OFFLINE ? 'offline' : status === Status.ONLINE ? 'online' : 'delete'
}
getResult(0) // offline
getResult(1) // online
getResult(2) // delete
```

**枚举值** 默认从 `0` 开始依次加 `1`，也可以自己定义枚举值的值， 例如：

```typescript
enum Status {
  OFFLINE,
  ONLINE = 3,
  DELETE
}


function getResult(status: Number) {
  return status === Status.OFFLINE ? 'offline' : status === Status.ONLINE ? 'online' : 'delete'
}

getResult(0) // offline
getResult(3) // online
getResult(2) // delete
```

**枚举值** 对应的 **标题** 和 **值** 可以相关使用，例如：

```typescript
enum Status {
  OFFLINE,
  ONLINE,
  DELETE
}

Status.OFFLINE // 0
Status[0] // OFFLINE
```



