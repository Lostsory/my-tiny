const fs = require('fs')
const path = require('path')

const handelKey = (key) => {
    
    var configUrl = path.resolve(__dirname, '../../.tiny')

    const tinifyConfig = JSON.parse(fs.readFileSync(configUrl))
    tinifyConfig.tinifyKey = key.split(',')
    
    fs.writeFileSync(configUrl, JSON.stringify(tinifyConfig, null, 2))
}

module.exports = (program) => {
    program.command('c')
    .description('tinyPng配置')
    .argument('<key>', 'string to split')
    .option('-key', "your tinyPng's appkey")
    .action(handelKey);
}
