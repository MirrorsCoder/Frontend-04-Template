let http = require('http')
let https = require('https')
let fs = require('fs')
let unzipper = require('unzipper')
let querystring = require('querystring')

// 2.auth路由：接受code，用code+client_id+client_secret换token
function auth(request, response) {
  let query = querystring.parse(request.url.match(/^\/auth\?([\s\S]+)$/)[1])
  console.log(query) // code的值
  getToken(query.code, function (info) {
    console.log(info)
    // response.write(JSON.stringify(info))
    response.write(
      `<a href="http://localhost:8083/?access_token=${info.token}">publish</a>`
    )
    response.end()
  })
}
function getToken(code, callback) {
  let request = https.request(
    {
      hostname: 'github.com',
      path: `/login/oauth/access_token?code=${code}&client_id=Iv1.59ceb13b712c5c72&client_secret=f69b29e5a0fe1bebe5eda721b255ca669218a59b`,
      port: 443,
      method: 'POST',
    },
    function (response) {
      let body = ''
      console.log(response)
      response.on('data', (chunk) => {
        console.log(chunk.toString())
        body += chunk.toString()
      })
      response.on('end', (chunk) => {
        callback(querystring.parse(body))
      })
    }
  )
  request.end()
}

// 4.publish路由：用token获取用户信息，检查权限，接受发布
function publish(request, response) {
  let query = querystring.parse(request.url.match(/^\/publish\?([\s\S]+)$/)[1])
  if (query.token) {
  }
  getUser(query.token, (info) => {
    if (info.login === 'MirrorsCoder') {
      request.pipe(unzipper.Extract({ path: '../server/public/' }))
      request.on('end', function () {
        response.end('success!')
      })
    }
  })
}

function getUser(token, callback) {
  let request = https.request(
    {
      hostname: 'github.com',
      path: `/user`,
      port: 443,
      method: 'GET',
      headers: {
        Authorization: `token ${token}`,
        'User-Agent': 'innovate-oauth',
      },
    },
    function (response) {
      let body = ''
      console.log(response)
      response.on('data', (chunk) => {
        console.log(chunk.toString())
        body += chunk.toString()
      })
      response.on('end', (chunk) => {
        console.log(body)
        callback(JSON.parse(body))
      })
    }
  )
  request.end()
}

http
  .createServer(function (request, response) {
    if (request.url.match(/^\/auth\?/)) return auth(request, response)
    if (request.url.match(/^\/publish\?/)) return publish(request, response)

    console.log('request', request)

    // let outFile = fs.createWriteStream('../server/public/index.html')
    // let outFile = fs.createWriteStream('../server/public/tmp.zip')
    // request.pipe(outFile)

    // request.pipe(unzipper.Extract({ path: '../server/public/' }))

    // request.on('data', (chunk) => {
    //   console.log(chunk.toString())
    //   outFile.write(chunk)
    // })
    // request.on('end', (chunk) => {
    //   outFile.end()
    //   response.end('Success')
    // })
  })
  .listen(8082)
