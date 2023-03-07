# My-tiny
[tinypng](https://tinypng.com/)配合git的一个命令行工具


## Usage with yorkie

### Installation
```
npm install my-tiny -S
```
### config your tinypng's APIKey:
#### 项目根目录新建.tiny文件，内容如下：
```
{
  "tinifyKey": [APIKey1, APIKey2],
  "ignore": [
    "dist"
  ]
}
```
可以设置多个, my-tiny会轮询使用所有配置的apikey

### Usage
```
"gitHooks": {
    "pre-commit": "tiny s"
},
```

## Usage with cli
### Installation
```
npm install -g my-tiny
```
### config your tinypng's APIKey:
```
 tiny c -key APIKey
```
### Usage
```
git add .
tiny s
git commit -m <msg>
```
## Related Projects

* [tinify](https://github.com/tinify/tinify-nodejs) Node.js client for the Tinify API, used for TinyPNG and TinyJPG. Tinify compresses your images intelligently. 


## Contribution

Your contributions and suggestions are heartily welcome.

<!-- ## License
MIT -->
