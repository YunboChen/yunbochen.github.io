const themeConfig = require('./themeConfig')

module.exports = {
  base:'/',
  title: "Rainbow's Blog",
  description: "Welcome Rainbow's Blog",
  theme: 'reco',
  themeConfig,
  markdown: {
    lineNumbers: true, // 代码行号
  },
}