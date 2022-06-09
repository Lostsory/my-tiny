const fs = require('fs')
const tinify = require("tinify");
const {tinifyKey} = require('../config')

tinify.key = tinifyKey;

// 调用tinypng压缩图片
module.exports = (fileUrl) => new Promise((resolve, reject) => {
  if (!tinifyKey) {
    return reject('please tiny --config key tinifyKey')
  }
  try {
    const source = fs.readFileSync(fileUrl)
    
    tinify.fromBuffer(source).toBuffer(function(err, result) {
      if (err) throw err;
      fs.writeFileSync(fileUrl, result)
      resolve()
    });
  } catch (error) {
    reject(error)
  }
})
