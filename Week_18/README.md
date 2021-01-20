学习笔记

# 发布系统

Oracle VM VirtualBox 下载地址： https://www.virtualbox.org/
Ubuntu 20.04.1 LTS (Focal Fossa) 下载地址：
官网： https://releases.ubuntu.com/20.04/
网盘： https://pan.baidu.com/s/1s8lga6YxuVcOdcAdhGQqoQ
提取码：b8yw

修改镜像地址：http://mirrors.aliyun.com/ubuntu

1. sudo apt install nodejs
2. node --version
3. sudo apt install npm
4. npm --version
5. 安装更新的包 sudo npm install -g n
6. sudo n latest 安装最新版
7. 重新设置 PATH="$PATH" node --version 显示最新版本

Express 服务器(https://www.expressjs.com.cn/starter/generator.html)

1. 创建文件夹承接项目`mkdir server`
2. npx express-generator
3. npm install
4. npm start (localhost:3000)

启动 ssh 服务（默认 22 端口）
service ssh start

# 线上服务

mac 传文件到服务器
从本机 8022 端口拷贝当前目录所有文件到oucily@127.0.0.1:/home/oucily/server
mkdir server
scp -P 8022 -r ./\* oucily@127.0.0.1:/home/oucily/server

# 发布服务

npm init

- 简单的 server

```
let http = require('http')

http
  .createServer(function (req, res) {
    console.log(req)
    res.end('Hello World')
  })
  .listen(8082)
```

node ./server

- 简单的发布

```
let http = require('http')

let request = http.request(
  {
    hostname: '127.0.0.1',
    port: 8082,
  },
  (response) => {
    console.log(response)
  }
)

request.end()
```

node ./publish

# node.js 里面的流

读
https://nodejs.org/dist/latest-v14.x/docs/api/stream.html#stream_class_stream_readable

```
let file = fs.createReadStream('./sample.html')

file.on('data', (chunk) => {
  console.log(chunk.toString())
  // 写数据
  request.write(chunk)
})
file.on('end', (chunk) => {
  console.log('read finished')
  request.end(chunk)
})
```

写
https://nodejs.org/dist/latest-v14.x/docs/api/stream.html#stream_class_stream_writable

```
let outFile = fs.createWriteStream('../server/public/index.html')

request.on('data', (chunk) => {
  console.log(chunk.toString())
  outFile.write(chunk)
})
request.on('end', (chunk) => {
  outFile.end()
  response.end('Success')
})
```

同时启动两个服务
npm start& 加上&不会阻塞

npm run start

NPM 包
Archiver：压缩（https://www.npmjs.com/package/archiver）流式处理
Unzipper：解压（https://www.npmjs.com/package/unzipper）输出流

pipe（https://nodejs.org/dist/latest-v14.x/docs/api/stream.html#stream_readable_pipe_destination_options）

- 将一个可读的流导入进一个可写的流里

获取状态
https://nodejs.org/dist/latest-v14.x/docs/api/fs.html#fs_class_fs_stats

// 多文件
npm install --save archiver
npm install --save unzipper

用 GitHub oAuth 鉴权登录（开发者：https://docs.github.com/en/developers/apps/identifying-and-authorizing-users-for-github-apps）

1. https://github.com/
2. settings --》 Developer settings --》 new Github App
3.
