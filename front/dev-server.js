'use strict'

const config = require('./webpack.config')
const webpack = require('webpack')
const compiler = webpack(config)
const serve = require('koa-static')

const Koa = require('koa')
const app = new Koa()

const koaWebpack = require('koa-webpack');

(async function () {
  const middleware = await koaWebpack(
    {
      compiler: compiler,
      devMiddleware: {
        logLevel: 'error'
      }
    }
  )

  app.use(middleware)
  app.use(serve('./static'))

  const server = app.listen(3000)

  function close () {
    console.log('server goes down now...')
    server.close(function () {
      console.log('all requests finished')
      process.exit()
    })
    setTimeout(function () {
      server.emit('close')
    }, 5000)
  }

  server.on('clientError', (err, socket) => {
    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n')
  })

  server.on('error', (err) => {
    console.log(err)
    process.exit()
  })

  process
    .on('SIGHUP', close)
    .on('SIGTERM', close)
    .on('SIGINT', close)
})()
