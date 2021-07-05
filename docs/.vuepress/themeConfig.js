module.exports = {
  author:'Rainbow',
  type: 'blog',
  logo: '/head.png',
  authorAvatar: '/head.png',
  subSidebar:'auto',
  nav:[
    { text: '首页', link: '/' },
    { 
      text:'笔记', 
      items:[
        { text:'git相关笔记',
          items:[
            {
              text:'Git基础操作',
              link:'/notes/git/git' 
            },
            {
              text:'Git提交规范',
              link:'/notes/git/git-commit-standard' 
            }
          ]
        }
      ] 
    }
  ]
}