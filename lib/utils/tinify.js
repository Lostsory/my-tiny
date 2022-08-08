const fs = require('fs')
const tinify = require("tinify");

const tinifyPng = (fileUrl, tinifyKey) => new Promise((resolve, reject) => {
  tinify.key = tinifyKey;
  try {
    const source = fs.readFileSync(fileUrl)
    
    tinify.fromBuffer(source).toBuffer(function(err, result) {
      if (err) {
        reject(err)
      } else {
        fs.writeFileSync(fileUrl, result)
        resolve()
      }
    });
  } catch (error) {
    console.log('errorerrorerror', error);
    reject(error)
  }
})

// 调用tinypng压缩图片
module.exports = {
  tinifyPng
}
