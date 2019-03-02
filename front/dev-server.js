'use strict'

const http   = require('http')
const config = require('./webpack.config')
const compiler = require('webpack')(config)
const express = require('express')
const app = express()

const dev = require('webpack-dev-middleware')(compiler, {logLevel: 'error'})
const hot = require('webpack-hot-middleware')(compiler, {log: false})

app.use(express.static('./static'))
app.use(dev)
app.use(hot)

const server = http.Server(app)

server.on('clientError', (err, socket) => {
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
})

server.listen(3000)

function close () {
  console.log('server goes down now...')
  server.close(function () {
    console.log('all requests finished')
    process.exit()
  });
  setTimeout(function(){
    server.emit('close')
  }, 5000)
}

process
  .on('SIGHUP', close)
  .on('SIGTERM', close)
  .on('SIGINT', close)
