const fs = require('fs')
const path = require('path')

const tinifyConfig = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../.tiny')))

module.exports = {
  packageInfo: require('../../package.json'),
  tinifyKey: tinifyConfig.tinifyKey
}