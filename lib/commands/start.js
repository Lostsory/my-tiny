const fs = require('fs')
const path = require('path')
const ora = require('ora');
const tinify = require('tinify');
const ignore = require('ignore')
const {tinifyPng} = require('../utils/tinify')
const execGit = require('../utils/execGit')

const defaultConfigUrl = path.resolve(process.cwd(), '.tiny')

let tinifyConfig = null

if (fs.existsSync(defaultConfigUrl)) {
  tinifyConfig = JSON.parse(fs.readFileSync(defaultConfigUrl))
} else {
  tinifyConfig = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../.tiny')))
}

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

// 忽略文件/夹处理
const ig = ignore().add(tinifyConfig.ignore)

const handel = async() => {
  const spinner = ora('tinypng start...').start();
  const tinifyKey = tinifyConfig.tinifyKey
  if (!(Array.isArray(tinifyKey) && tinifyKey.length > 0)) {
    // throw new Error('')
    return spinner.fail(`项目根目录新建.tiny配置文件或者全局执行tiny --config key tinifyKey去设置您的tinypng’key`)
  }
 
  let files = await getStatusFiles()
  files = ig.filter(files).filter(v => /(.jpg|.png|.jpeg)$/.test(v))
  if (!files.length) {
    return spinner.fail(`The picture was not found in your git stage`)
  }

  let curIndex = 0
  const maxLen = tinifyKey.length - 1
  let succeeTimes = 0
  let errorTimes = 0
  const tiny = async (list) => {
    const arr = []
    let res = []
    try {
      res = await Promise.allSettled(list.map((file) => {
        return tinifyPng(file, tinifyKey[curIndex]).then(() => {
          succeeTimes++
          spinner.text = `succeed: ${succeeTimes}, total: ${files.length}`
        }, (err) => {
          arr.push(file)
          return Promise.reject(err)
        })
      }))
    } catch (error) {
      throw error
    }
    curIndex++
    if (arr.length > 0 && curIndex <= maxLen) {
      await tiny(arr)
    } else {
      errorTimes = res.filter(v => v.status === 'rejected').length
    }
  }
  await tiny(files)
  await execGit(['add', '.'])
  spinner.succeed(`Done! succeed: ${succeeTimes}, failed: ${errorTimes}`)
}


module.exports = (program) => {
  program.command('s')
  .description('To compress images')
  .action(handel);
}
