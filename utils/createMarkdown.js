// 命令行颜色插件
const chalk = require('chalk')

// 读取node进程参数
const argvs = require('minimist')(process.argv.slice(2))

//询问式命令
const  { prompt } = require('enquirer')

// node自带方法
const fs = require('fs')
const path = require('path')

// 解析front matter
const matter = require('gray-matter')

// dayjs
const dayjs = require('dayjs')

// 当前工作目录
const cwd = process.cwd()


const createMarkdown = async () =>{
  //生成目标文件 
  const target = argvs._[0]
  const targetArray = target.split('/').filter(o => o)

  //splice之后targetArray代表生成文件目录
  const tempFileName = targetArray.splice(targetArray.length -1 , 1)
  
  // markdown的文件名
  const fileName = tempFileName[0].indexOf('.md') > -1 ? tempFileName[0].split('.')[0] : tempFileName[0]

  // 判断文件目录开头是否为docs
  if(targetArray[0] === 'docs'){
    const { renderDocFlag } = await prompt({
      type: 'confirm',
      name: 'renderDocFlag',
      initial: 'N',
      message: 'markdown文件默认在docs目录下生成，是否在docs目录下生成一个新的docs目录'
    })
    if(!renderDocFlag){
      targetArray.splice(0, 1)
    }
  }

  // 目标文件夹
  const targetDir = ['docs',...targetArray].join('/') 

  //目标文件夹绝对路径
  const root = path.join(cwd, targetDir)

  // 判断目标文件夹是否存在
  if(!fs.existsSync(root)){
    // 创建目标文件夹
    fs.mkdirSync(root, { recursive: true })
  }
  // 判断目标文件是否存在
  const createFilePath = path.join(root, `${fileName}.md`)
  if(fs.existsSync(createFilePath)){
    const { delFileFlag } = await prompt({
      type: 'confirm',
      name: 'delFileFlag',
      initial: 'Y',
      message: `${fileName}.md文件已存在，是否删除该文件`
    })
    if(delFileFlag){
      fs.unlinkSync(createFilePath)
    }else{
      return false
    }
  }
   //生成markdown front matter的一些配置
  const response = await prompt([
    {
      type: 'input',
      name: 'title',
      message: '请输入标题'
    },
    {
      type: 'input',
      name: 'permalink',
      message: '请输入永久链接（默认：/${文件所在目录}/${创建文件的时间戳}）'
    },
    {
      type: 'list',
      name: 'categories',
      message: '请输入分类(以,分割)'
    },
    {
      type: 'list',
      name: 'tags',
      message: '请输入标签(以,分割)'
    }
  ]);

  const { title, permalink, categories, tags } = response

  const templateMarkDownContent = fs.readFileSync(path.join(__dirname, `template.md`), 'utf-8')
  const matterData = matter(templateMarkDownContent)

  matterData.data.title = title || fileName
  matterData.data.date = dayjs().format('YYYY-MM-DD HH:mm:ss')
  matterData.data.author = JSON.parse(fs.readFileSync(path.join(cwd, 'package.json'),'utf-8')).author
  matterData.data.permalink = permalink || `/${targetArray.join('/')}/${dayjs().valueOf()}`
  matterData.data.categories = categories && categories.length ? categories : null
  matterData.data.tags = tags && tags.length ? tags : null 
  fs.writeFileSync(createFilePath, matter.stringify(matterData))  

  console.log(chalk.green(`\nMarkDown创建成功`))
  console.log(`文件名：        ${chalk.yellow(fileName)}`)
  console.log(`文件所在目录：   ${chalk.yellow(root)}`)
}

createMarkdown().catch(e => {
  console.log(chalk.red(e))
})


