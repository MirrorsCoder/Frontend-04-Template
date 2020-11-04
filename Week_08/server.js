const http = require('http')

http
  .createServer((req, res) => {
    let body = []
    req
      .on('error', (err) => {
        console.error(err)
      })
      .on('data', (chunk) => {
        body.push(chunk.toString())
      })
      .on('end', () => {
        // body = Buffer.concat(body).toString()
        console.log('body', body)
        res.writeHead(200, {
          'Content-Type': 'text/html',
        })
        res.end(`
          <html maaa=a>
          <head>
            <style>
              #container{
                width:500px;
                height:300px;
                display:flex;
                background-color:rgb(255,255,255);
              }
              #container #myid{
                width:200px;
                height:100px;
                background-color:rgb(255,0,0);
              }
              #container .c1{
                flex:1;
                background-color:rgb(0,255,0);
              }
            </style>
          </head>
          <body style="background:#000">
            <div id="container">
              <div id="myid" />
              <div class="c1" />
            </div>
          </body>
        `)
      })
  })
  .listen(8088)

console.log('server started')
