#! /usr/bin/env node
const { Command, program } = require('commander');
const commands = require('./commands')
const packageInfo = require('../package.json')
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
  program.name('myTinyPng').usage('<command> [options]')
  program.version(packageInfo.version, '-v, --version', '输出当前版本号')
  program.helpOption('-h, --help', '获取帮助')
  program.addHelpCommand(false)
}

// 注册命令
const registerCommands = () => {
  commands.forEach(fn => {
    fn(program)
  })
}