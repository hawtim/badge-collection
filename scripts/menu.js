// 生成目录块

const config = require('../src/config')
const menu = config.menu
function buildMenu() {
  let categoryText = `## 分类

`
  Object.keys(menu).forEach(item => {
    categoryText +=`- [${menu[item]}](#-${menu[item]}-)
`
  })
  return categoryText
}

module.exports = buildMenu

