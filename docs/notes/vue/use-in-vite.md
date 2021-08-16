---
title: Vite的基础使用方法
date: '2021-08-16 10:26:06'
author: Rainbow
permalink: /notes/vue/use-in-vite
categories:
  - 笔记
tags:
  - vue
  - vite
---
[`Vite`](https://github.com/vitejs/vite) 是由 [`Vue`](https://github.com/vuejs/vue) 的创造者 [`尤雨溪`](https://github.com/yyx990803) 编写的下一代脚手架工具。利用原生 ESM 构建项目，大大提升项目在开发阶段的构建速度，但生产环境仍需要进行打包。

:::warning
默认的构建目标浏览器是能 [在 script 标签上支持原生 ESM](https://caniuse.com/es6-module)和 [原生 ESM 动态导入](https://caniuse.com/es6-module-dynamic-import)。传统浏览器可以通过官方插件[@vitejs/plugin-legacy](https://github.com/vitejs/vite/tree/main/packages/plugin-legacy)支持 —— 查看 [Vite相关构建生产版本文档](https://cn.vitejs.dev/guide/build.html)获取更多细节。
:::

## 创建项目
在`CMD`中输入如下命令：
```bash
# 使用npm
npm init vite@latest

# 使用yarn
yarn create vite
```
然后按照提示操作即可！

你还可以通过附加的命令行选项直接指定项目名称和你想要使用的模板。例如，要构建一个 `Vite + Vue` 项目，运行:
```bash
# npm 6.x
npm init vite@latest my-vue-app --template vue

# npm 7+, 需要额外的双横线：
npm init vite@latest my-vue-app -- --template vue

# yarn
yarn create vite my-vue-app --template vue
```
更多相关信息，请查看 [Vite 官方文档](https://cn.vitejs.dev/guide/#scaffolding-your-first-vite-project)。

## Vite相关配置
在项目根目录创建 `vite.config.js` 文件，并在该文件中进行相关配置来达到支持 `PostCSS` 、`CSS预处理器` 等功能，基础的配置文件：
```js
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  // 配置选项
})
```
更多配置信息，请查看 [Vite 关于配置的文档](https://cn.vitejs.dev/config/#conditional-config)。

:::tip
若直接使用官方或社区提供的模板，则无需创建 `vite.config.js` 文件，模板本身就有该文件。
:::

### 引入CSS预处理器（以 Sass 为例）
`CMD` 进入项目根目录，并输入如下命令：
```bash
# .sass or .scss
# 由于不使用 webpack ，所以不需要安装sass-loader
npm install -D sass
```

`Vite` 会自动识别解析编译，若要使用全局参数还需在 `vite.config.js` 文件中进行配置：

```js
export default defineConfig({
  ...
  css: {
    preprocessorOptions: {
      scss: {
        additionalData:`@import "/src/styles/variable.scss";`,
      }
    }
  },
  ...
})
```
### 别名设置
使用 [`Vue CLI`](https://cli.vuejs.org/) 创建项目时，可以利用 [`webpack`](https://webpack.js.org/configuration/resolve/#resolvealias) 对某个路径设置别名，比如：通常 `@` 代表 `/src` 目录。在 `Vite` 中利用 `@rollup/plugin-alias`进行对某个路径进行别名配置，
例如：
```js
// vite.config.js
const path = require('path')
const resolve = (dir) => path.join(__dirname, dir)

export default defineConfig({
  ...
  resolve:{
    alias:{
      '@': resolve('src'),
      ...
    }
  },
  ...
})
```
更多配置信息，请查看 [Vite 关于配置的文档](https://cn.vitejs.dev/config/#resolve-alias)。

:::tip
**Vite详细配置请查看 [官方文档](https://cn.vitejs.dev/config/)。**
:::



