const fs = require('fs')
const config = require('../src/config')
const category = require('../src/category')

const shieldURL = config.shieldURL
const menu = config.menu
const tableHeader = `
Badge | Uri
------------ | -------------
`

const args = process.argv.splice(2)
// 命令行传入的 style 参数
const [style] = args
// 生成目录块
function buildMenu() {
  let categoryText = `## 分类

`
  Object.keys(menu).forEach(item => {
    const text = menu[item].split(' ')[1]
    categoryText += `- [${menu[item]}](#-${text})
`
  })
  return categoryText
}
// 生成表格
function buildTableWithObject(obj) {
  let string = tableHeader
  Object.keys(obj).forEach(item => {
    const src = `${shieldURL}${obj[item]}${style ? '&style=' + style : ''}`
    string += `<img src="${src}"/> | \`![${item}](${src})\`
`
  })
  return string
}
// 首字母大写
function fistLetterUpper(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
// 如果该分类下是数组。例如 skills
function buildTableWithArray(arr) {
  let text = ``
  arr.forEach(item => {
    text += `### ${item.name}

`
    text += buildTableWithObject(item.badges)
  })
  return text
}

function buildMarkdown() {
  let content = buildMenu()
  Object.keys(category).forEach(item => {
    content += `
## ${menu[item]}
`
    if (item === 'skills') {
      content += buildTableWithArray(category[item])
    } else {
      content += buildTableWithObject(category[item])
    }
  })
  fs.readFile(__dirname + '/../src/template.md', (err, data) => {
    if (err) {
      console.log(err)
      return
    }
    const text = data.toString().replace('<!-- {{ insert place }} -->', content)
    const filename = style
      ? style
          .split('-')
          .map(_ => fistLetterUpper(_))
          .join('')
      : 'README'
    fs.writeFile(__dirname + `/../${filename}.md`, text, 'utf8', err => {
      if (err) {
        console.log(err)
        return
      }
    })
  })
}

buildMarkdown()
