# Rainbow's Blog
[![](https://img.shields.io/badge/vuepress-v1.8.2-brightgreen)]([linkUrl](https://github.com/vuejs/vuepress))

基于[`vuepress`](https://github.com/vuejs/vuepress)编写的blog

## 使用
```bash
git@github.com:YunboChen/Yunbo.github.io.git
npm i
npm run prepare

// dev
npm run dovs:dev

// build
npm run docs:build
```

## 自动生成markdown文件
`/utils/template.md`为front matter模板用于自动生成含有front matter的markdown文件

```bash
npm run create /${文件目录}/${文件名}（文件目录/docs不应包含在内）
```

## 提交代码
```bash
git add .
npm run commit
```
## 提交规范
``` bash
feat：新增功能
fix：bug 修复
docs：文档更新
style：不影响程序逻辑的代码修改(修改空白字符，格式缩进，补全缺失的分号等，没有改变代码逻辑)
refactor：重构代码(既没有新增功能，也没有修复 bug)
perf：性能, 体验优化
test：新增测试用例或是更新现有测试
build：主要目的是修改项目构建系统(例如 glup，webpack，rollup 的配置等)的提交
ci：主要目的是修改项目继续集成流程(例如 Travis，Jenkins，GitLab CI，Circle等)的提交
chore：不属于以上类型的其他类型，比如构建流程, 依赖管理
revert：回滚某个更早之前的提交
```


