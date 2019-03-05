'use strict'

const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
// const HtmlWebpackPlugin = require('html-webpack-plugin')
// const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
const WebpackBar = require('webpackbar')

const resolve = (...dirs) => require('path').join(...[__dirname, ...dirs])

var config = {

  entry: {
    app: ['@/main.js']
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
        use: ['vue-style-loader', 'css-loader', 'sass-loader']
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
} else { // dev mode by default
  config.plugins.push(
    new webpack.DefinePlugin({
      'baseUrl': JSON.stringify('http://localhost')
    })
  )
}

module.exports = config
