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
        { 
          text:'Git',
          link:'/tag/git/',
        },
        { 
          text:'Node.js',
          link:'/tag/node/',
        },
        {
          text:'Vue',
          link:'/tag/vue/',
        }
      ] 
    },
    { 
      text:'学习', 
      items:[
        { 
          text:'TypeScript',
          link:'/tag/typescript/',
        },
      ] 
    }
  ],
}