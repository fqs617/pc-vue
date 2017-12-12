import merge from 'webpack-merge'
import FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin'
import webpack from 'webpack'
import BaseWebpackConfig from './webpack.config'
import Utils from './utils'
import Config from '../config/index'

Object.keys(BaseWebpackConfig.entry).forEach(name => {
  BaseWebpackConfig.entry[name] = ['./build/dev-client'].concat(BaseWebpackConfig.entry[name]);
})

export default merge(BaseWebpackConfig, {
  module: {
    rules: Utils.styleLoaders({ sourceMap: Config.dev.sourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  // devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': Config.dev.LOCAL_ENV
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new FriendlyErrorsPlugin()
  ]
})
