const config = require('../src/config')
const shieldURL = config.shieldURL

const tableText = `
Badge | Uri
------------ | -------------
`

function buildTableWithObject(obj) {
  let string = tableText
  Object.keys(obj).forEach(item => {
    string += `<img src="${shieldURL}${obj[item]}" /> | \`![${item}](${shieldURL}${obj[item]})\`
`
  })
  return string
}




module.exports = buildTableWithObject