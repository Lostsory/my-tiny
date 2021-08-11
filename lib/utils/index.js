const fs = require('fs')
// const ora = require('ora')
// const chalk = require('chalk')
const crypto = require('crypto')
const { configPath } = require('../config')

module.exports = {
  // 检查配置文件是否存在
  checkTinyConfigExists: () => {
    return fs.existsSync(configPath)
  },
  hash: (data, algorithm = 'md5') => {
    let hash = crypto.createHash(algorithm)
    hash.update(data)
    return hash.digest('hex')
  }
  // 日志信息
  // log: (message) => {
  //   console.log(message)
  // },
  // // 成功信息
  // succeed: (...message) => {
  //   ora().succeed(chalk.greenBright.bold(message))
  // },
  // // 提示信息
  // info: (...message) => {
  //   ora().info(chalk.blueBright.bold(message))
  // },
  // // 错误信息
  // error: (...message) => {
  //   ora().fail(chalk.redBright.bold(message))
  // },
  // // 下划线重点信息
  // underline: (message) => {
  //   return chalk.underline.blueBright.bold(message)
  // }
}