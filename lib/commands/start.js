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
  if (!files.length) return

  for (let i = 0; i < files.length; i++) {
    spinner.text = `第${i + 1}张图片开始压缩，共计${files.length}张`
    await tinifyPng(files[i])
  }
  await execGit(['add', '.'])
  spinner.stop()
}

module.exports = {
  name: 'start',
  desc: '开始图片压缩',
  handel
}
