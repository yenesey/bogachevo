'use strict'

const config = require('./webpack.config')
const webpack = require('webpack')
const serve = require('koa-static')
const Koa = require('koa')
const app = new Koa()
const koaWebpack = require('koa-webpack')

koaWebpack({
  compiler: webpack(config),
  devMiddleware: {
    logLevel: 'error'
  }
}).then(dev => app.use(dev))

/**
 * history api support
 * rememeber! production server need the same way config (mod_rewrite etc.)
 */

app.use((ctx, next) => {
  let { url, headers: { accept }, method } = ctx
  if (
    method === 'GET' &&
    url && accept &&
    (accept.indexOf('text/html') !== -1 || accept.indexOf('*/*') !== -1) &&
    url.indexOf('.') === -1
  ) {
    ctx.url = '/index.html'
  }
  return next()
})

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
  if (err && socket.writable) socket.end('HTTP/1.1 400 Bad Request\r\n\r\n')
})
server.on('error', (err) => {
  console.log(err)
  process.exit()
})

process.on('SIGHUP', close).on('SIGTERM', close).on('SIGINT', close)
