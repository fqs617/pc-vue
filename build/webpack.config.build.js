import webpack from 'webpack'
import path from 'path'
import Utils from './utils'
import Config from '../config/index'
import merge from 'webpack-merge'
import baseWebapckConfig from './webpack.config'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import OptimizeCSSPlugin from 'optimize-css-assets-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import SentryPlugin from 'webpack-sentry-plugin'
import LogConfig from '../config/log.config'

let webpackConfig = {
  module: {
    rules: Utils.styleLoaders({ sourceMap: Config.build.sourceMap })
  },
  devtool: Config.build.sourceMap ? '#source-map' : false,
  output: {
    path: Config.build.assetsRoot,
    publicPath: Config.build.assetsPublicPath,
    filename: Utils.assetsPath('js/[name].[chunkhash:8].js')
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': Config.build.LOCAL_ENV
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        // 删除所有的 `console` 语句
        // 还可以兼容ie浏览器
        drop_console: true,
        // 提取出出现多次但是没有定义成变量去引用的静态值
        reduce_vars: true,
        // 内嵌定义了但是只用到一次的变量
        collapse_vars: true
      },
      // 最紧凑的输出
      beautify: false,
      // 删除所有的注释
      comments: false,
      sourceMap: true
    }),
    new ExtractTextPlugin({
      filename: Utils.assetsPath('css/[name].[contenthash:7].css')
    }),
    new OptimizeCSSPlugin(),
    // copy custom static assets
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, '../static'),
      to: Config.build.assetsSubDirectory,
      ignore: ['.*']
    }])
  ]
}

if (Config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

if (process.env.NODE_TYPE === 'sentry') {
  webpackConfig.output.sourceMapFilename = Utils.assetsPath('js/[name].[chunkhash:8].js.map')
  webpackConfig.plugins.push(new SentryPlugin({
    baseSentryURL: 'http://zentao.bqmart.cn:8088/api/0/projects',
    organisation: LogConfig.org,
    project: LogConfig.project,
    apiKey: LogConfig.apiKey,
    exclude: /\.html$/,
    deleteAfterCompile: true,
    release: function() {
      return Config.build.LOCAL_ENV.VERSION
    }
  }))
}

export default merge(baseWebapckConfig, webpackConfig);
