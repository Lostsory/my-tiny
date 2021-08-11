const path = require('path');
const fs = require('fs')
const {hash} = require('../utils')

const tinify = require("tinify");
const {tinifyKey} = require('../config')
const { exit } = require('process');

tinify.key = tinifyKey;

// 调用tinypng压缩图片
module.exports = (fileUrl) => new Promise((resolve, reject) => {
  try {
    const source = fs.readFileSync(fileUrl)
    const currentHash = hash(source)

    // 已压缩过的图片的哈希映射
    let cached = {}
    const isTinyCached = fs.existsSync(path.resolve(process.cwd(), "tiny.cached.json"));
    if (isTinyCached) {
      cached = JSON.parse(fs.readFileSync('tiny.cached.json'))
    }

    if (!cached[currentHash]) {
      tinify.fromBuffer(source).toBuffer(function(err, result) {
        if (err) throw err;
        fs.writeFileSync(fileUrl, result)
        // 写入缓存
        cached[hash(result)] = Date.now()
        fs.writeFileSync('tiny.cached.json', JSON.stringify(cached, null, 2))
        resolve()
      });
    } else {
      resolve()
    }
  } catch (error) {
    reject(error)
  }
})
