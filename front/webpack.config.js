'use strict'

const packageInfo = require('./package.json')
const webpack = require('webpack')
const path = require('path')

const VueLoaderPlugin = require('vue-loader/lib/plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const WebpackBar = require('webpackbar')

// const PrerenderSPAPlugin = require('prerender-spa-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
// const HtmlWebpackPlugin = require('html-webpack-plugin')
// const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')

const resolve = (...dirs) => path.join(...[__dirname, ...dirs])

const createNotifierCallback = () => {
  const notifier = require('node-notifier')

  return (severity, errors) => {
    // if (severity !== 'error') return
    const error = errors[0]
    const wpError = error.webpackError.error

    // console.log('-----------------------------')
    // console.log(Object.keys(wpError))
    const fileName = wpError.filename || wpError.file
    const line = wpError.line || 'unknown'

    const message = fileName
      ? path.relative(__dirname, fileName) + ' (' + line + ')'
      : error.message.split('\n').filter(row => row.length > 10).join('\n')

    notifier.notify({
      // title: packageInfo.name,
      title: error.name,
      icon: resolve('/static/images/logo.png'),
      message: message
    })
  }
}

var config = {
  name: packageInfo.name,
  entry: {
    app: ['@/main.js', '@/assets/styles/base-global.scss']
  },

  output: {
    path: resolve('dst'),
    filename: '[name].js',
    publicPath: '/'
  },

  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': resolve('src'),
      'vue$': 'vue/dist/vue.common.js',
      'vue-router$': 'vue-router/dist/vue-router.common.js'
    }
  },

  stats: {
    children: false
  },

  module: {
    rules: [
      {
        test: /\.pug$/,
        loader: 'pug-plain-loader'
      },
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            // presets: ['env'],
            presets: [
              [
                '@vue/app',
                {
                  'useBuiltIns': 'entry'
                }
              ]
            ]
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              data: `@import "@/assets/styles/base.scss"; @import "@/assets/styles/variables.scss";`
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpg|gif|svg|woff|woff2|eot|ttf)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 160000,
            name: '[name].[ext]?[hash]'
          }
        }
      }
    ]
  },

  mode: 'development',
  devtool: 'cheap-eval-source-map',

  plugins: [
   /* new HtmlWebpackPlugin({
      inject: true,
      favicon: resolve('src/assets', 'favicon.ico'),
      template: resolve('src/assets', 'index.html')
    }),*/
    new VueLoaderPlugin(),
    new WebpackBar({ minimal: false })
    // new HardSourceWebpackPlugin()
  ],

  optimization: {
    splitChunks: {
      // chunks: 'all',
      cacheGroups: {
        vendors: {
          test: /node_modules/,
          priority: -10,
          name: 'vendors',
          chunks: 'initial'
        }
      }
    }
  }
}

if (process.env.NODE_ENV === 'production') {
  config.mode = 'production'
  config.devtool = 'source-map'
  // if (process.env.npm_config_report) config.plugins.push(new BundleAnalyzerPlugin({analyzerMode: 'static'}))
/*
  config.plugins.push(
    new PrerenderSPAPlugin({
      // Required - The path to the webpack-outputted app to prerender.
      staticDir: resolve('dst'),
      // Required - Routes to render.
      routes: [ '/', '/about', '/works', '/contact' ],
    })
  )
*/
} else { // dev mode by default
  config.plugins.push(
    new webpack.DefinePlugin({
      'baseUrl': JSON.stringify('http://localhost')
    })
  )

  config.plugins.push(
    new FriendlyErrorsPlugin({
      /*compilationSuccessInfo: {
        messages: [`Your application is running here:`]
      },*/
      onErrors: createNotifierCallback()
    })
  )
}

module.exports = config
