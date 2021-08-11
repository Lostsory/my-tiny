#! /usr/bin/env node
const program = require('commander')
const {packageInfo} = require('./config')
const commands = require('./commands')

module.exports = class Tiny {
  constructor() {
    setupDefaultCommands()
    registerCommands()
  }
  run (argv) {
    program.parse(argv)
  }
}

// 设置默认命令
const setupDefaultCommands = () => {
  program.version(packageInfo.version, '-v, --version', '输出当前版本号')
  program.helpOption('-h, --help', '获取帮助')
  program.addHelpCommand(false)
}

// 注册命令
const registerCommands = () => {
  commands.forEach(v => {
    const {name, desc, handel} = v
    program
    .command(name)
    .description(desc)
    .action(handel)
  })
}