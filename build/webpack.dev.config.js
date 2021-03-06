let baseConfig = require('./webpack.base.config')
let merge = require('webpack-merge')
let webpack = require('webpack')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let config = require('../config')
let path = require('path')
let FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
module.exports = merge(baseConfig, {
  output: {
    filename: '[name].js'
  },
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: true,
    hot: true,
    host: process.env.HOST || config.dev.host,
    port: process.env.PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay ? {
      warnings: false,
      errors: true
    } : false,
    publicPath: config.dev.publicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll
    }
  },
  devtool: '#cheap-module-eval-source-map',
  module: {
    rules: [{
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }, {
      test: /\.less$/,
      loader: 'style-loader!css-loader!less-loader'
    }, {
      test: /\.scss$/,
      loader: 'style-loader!css-loader!sass-loader'
    }]
  },
  plugins: [
    // 热替换插件
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../index.html'),
      filename: 'index.html',
      inject: true
    }),
    new FriendlyErrorsPlugin()
  ]
})
