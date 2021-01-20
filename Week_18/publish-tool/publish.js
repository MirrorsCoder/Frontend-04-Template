let http = require('http')
let fs = require('fs')
let archiver = require('archiver')
let querystring = require('querystring')

// fs.stat('./sample.html', (err, stats) => {
//   let request = http.request(
//     {
//       hostname: '127.0.0.1',
//       // port: 8082,
//       port: 8882,
//       method: 'POST',
//       headers: {
//         // 流式传输类型  深入了解http的RFC标准
//         'Content-Type': 'application/octet-stream',
//         'Content-Length': stats.size,
//       },
//     },
//     (response) => {
//       console.log(response)
//     }
//   )

//   // 替换下方注释内容
//   file.pipe(request)
//   file.on('end', () => request.end())
// })

// file.on('data', (chunk) => {
//   console.log(chunk.toString())
//   // 写数据
//   request.write(chunk)
// })
// file.on('end', (chunk) => {
//   console.log('read finished')
//   request.end(chunk)
// })

// 1.打开 https://github.com/login/oauth/authorize
let child_process = require('child_process')
child_process.exec(
  `open https://github.com/login/oauth/authorize?client_id=Iv1.59ceb13b712c5c72`
)
// 3.创建server，接受token，后点击发布
http
  .createServer(function (request, response) {
    let query = querystring.parse(request.url.match(/^\/\?([\s\S]+)$/)[1])
    publish(query.token)
  })
  .listen(8083)

function publish(token) {}

let request = http.request(
  {
    hostname: '127.0.0.1',
    // port: 8082,
    port: 8882,
    method: 'POST',
    path: '/publish?token=' + token,
    headers: {
      // 流式传输类型  深入了解http的RFC标准
      'Content-Type': 'application/octet-stream',
    },
  },
  (response) => {
    console.log(response)
  }
)

let file = fs.createReadStream('./sample.html')

const archive = archiver('zip', {
  zlib: { level: 9 }, // Sets the compression level.
})
archive.directory('./sample/', false)
archive.finalize()
// 压缩到文件
// archive.pipe(fs.createWriteStream('tmp.zip'))

archive.pipe(request)
