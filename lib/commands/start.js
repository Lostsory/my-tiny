const path = require('path')
const ora = require('ora');
const tinifyPng = require('../utils/tinify')
const execGit = require('../utils/execGit')

// 获取暂存区的文件
const getStatusFiles = async() => {
  try {
    const lines = await execGit(
      ['diff', '--staged', '--diff-filter=ACMR', '--name-only', '-z'],
    )
    return lines ? lines.replace(/\u0000$/, '').split('\u0000') : []
  } catch {
    return []
  }
}

const handel = async() => {
  const spinner = ora('tinypng start...').start();
  let files = await getStatusFiles()
  files = files.filter(v => /(.jpg|.png|.jpeg)$/.test(v))
  if (!files.length) {
    return spinner.fail(`The picture was not found in your git stage`)
  } 
  let succeeTimes = 0
  let errorTimes = 0
  await Promise.all(files.map((file) => {
    return tinifyPng(file).then(() => {
      succeeTimes++
      spinner.text = `succeed: ${succeeTimes}，failed: ${errorTimes}, total: ${files.length}`
    }, () => {
      errorTimes++
      spinner.text = `succeed: ${succeeTimes}，failed: ${errorTimes}, total: ${files.length}`
    })
  }))
  await execGit(['add', '.'])
  spinner.succeed(`Done! succeed: ${succeeTimes}, failed: ${errorTimes}`)
}

module.exports = (program) => {
  program.command('s')
  .description('开始图片压缩')
  .action(handel);
}
