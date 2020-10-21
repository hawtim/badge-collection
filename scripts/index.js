const fs = require('fs')
const config = require('../src/config')
const category = require('../src/category')

const shieldURL = config.shieldURL
const menu = config.menu

// 生成目录块
function buildMenu() {
  let categoryText = `## 分类

`
  Object.keys(menu).forEach(item => {
    const text = menu[item].split(' ')[1]
    categoryText +=`- [${menu[item]}](#-${text})
`
  })
  return categoryText
}
// 生成表格
function buildTableWithObject(obj) {
  let string = `
Badge | Uri
------------ | -------------
`
  Object.keys(obj).forEach(item => {
    string += `<img src="${shieldURL}${obj[item]}" /> | \`![${item}](${shieldURL}${obj[item]})\`
`
  })
  return string
}


function buildMarkdown() {
  let content = buildMenu()
  Object.keys(category).forEach(item => {
    if (item === 'skills') {
      return
    }
    content += `
## ${menu[item]}
`
    const result = buildTableWithObject(category[item])
    content += result
  })
  fs.readFile(__dirname + '/../src/template/index.md', function (err, data) {
    if (err) {
      console.log(console.error(err))
      return
    }
    let text = data.toString()
    text = text.replace('<!-- {{ insert place }} -->', content)
    fs.writeFile(__dirname + '/../src/temp.md', text, 'utf8', function (err) {
      if (err) {
        console.log(console.error(err))
        return
      }
    })
  })
}

buildMarkdown()


