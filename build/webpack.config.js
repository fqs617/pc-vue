import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import CommonsChunkPlugin from 'webpack/lib/optimize/CommonsChunkPlugin'
import autoprefixer from 'autoprefixer'
import px2rem from 'postcss-px2rem'
import Config from '../config/index'
import Utils from './utils'
import merge from 'webpack-merge'
import StatsPlugin from 'stats-webpack-plugin'
import HtmlWebpackInlineSourcePlugin from 'html-webpack-inline-source-plugin'
const NODE_ENV = process.env.NODE_ENV

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

// 浏览器自动加前缀 配置
let autoProfixerConfig = {browsers: ['last 2 versions', 'Android >= 4.0', 'iOS >= 6']}
// 自动转 rem 配置 @see https://www.npmjs.com/package/postcss-px2rem  https://www.npmjs.com/package/px2rem
// 设计图的总宽度是以750px为标准，则填写75；如果是375px，则填写37.5；以此类推
let px2remConfig = { remUnit: 37.5 }
// cssnano({safe:true, zindex: false})
let postcssOptions = [autoprefixer(autoProfixerConfig), px2rem(px2remConfig)];
let wepackConfig = {
  entry: {},
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.vue', '.json', '.scss'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      '~': resolve('packages'),
      '*': resolve('/'),
      'scss': resolve('scss'),
      'http': resolve('src/base/http.base'),
      'plugins': resolve('plugins'),
      'assets': resolve('src/assets'),
      'vue-router': 'vue-router/dist/vue-router.common.js',
      'vue-resource': 'vue-resource/dist/vue-resource.common.js',
      'vuex': resolve('node_modules/vuex'),
      'swiper': resolve('node_modules/swiper'),
      'web-storage-cache': 'web-storage-cache/src/web-storage-cache.js',
      'arale-cookie': 'arale-cookie/index.js'
    }
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        context: __dirname,
        postcss: postcssOptions
      }
    })
  ],
  module: {
    // 不解析
    noParse: /node_modules\/(swiper|web-storage-cache\.js)/
  }
}

// 输出 status.json http://webpack.github.io/analyse
if (NODE_ENV !== 'development') {
  wepackConfig.profile = true
  wepackConfig.plugins.push(
    new StatsPlugin('../status/stats.json', {
      chunkModules: true
    })
  )
}
// 输出
wepackConfig.output = {
  path: Config.dev.assetsRoot,
  filename: '[name].js',
  publicPath: Config.dev.assetsPublicPath
}

// loaders 配置
let rules = [{
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('test'), resolve('packages'), resolve('plugins')],
  options: {
    formatter: require('eslint-friendly-formatter')
  }
}, {
  test: /\.vue$/,
  loader: 'vue-loader',
  include: [resolve('src'), resolve('test'), resolve('node_modules/mint-ui'), resolve('packages'), resolve('plugins')],
  options: {
    loaders: Utils.cssLoaders({ sourceMap: NODE_ENV === 'development' ? Config.dev.sourceMap : Config.build.sourceMap }),
    postcss: postcssOptions
  }
},
{
  test: /\.js$/,
  loader: 'babel-loader?cacheDirectory',
  include: [resolve('src'), resolve('test'), resolve('node_modules/mint-ui'), resolve('packages'), resolve('plugins')]
},
{
  test: /\.json$/,
  loader: 'json-loader'
},
{
  test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
  loader: 'url-loader',
  query: {
    limit: NODE_ENV === 'production' ? 5000 : 10000,
    name: Utils.assetsPath('img/[name].[hash:7].[ext]')
  }
},
{
  test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
  loader: 'url-loader',
  query: {
    limit: NODE_ENV === 'production' ? 5000 : 10000,
    name: Utils.assetsPath('fonts/[name].[hash:7].[ext]')
  }

}]

// 模块配置
wepackConfig.module = {
  rules: rules
}

// 入口
// 在多页面的情况下 获取 src 下的多个模板文件 来生成入口文件 注意 单个入口模板html 必须强制对应 单个入口js 文件
let viewPageFile = path.join(__dirname, '../src')
let viewpages = Utils.getFilePath(viewPageFile, 'html')
const NodeModules = path.join(__dirname, '../node_modules')
// 提取通用模块  参考 vue-cli
wepackConfig.plugins.push(new CommonsChunkPlugin({
  name: 'vendor',
  minChunks: (module) => {
    return (
      module.resource &&
      /\.js$/.test(module.resource) &&
      module.resource.indexOf(NodeModules) === 0
    )
  }
}))

wepackConfig.plugins.push(new CommonsChunkPlugin({
  name: 'manifest',
  chunks: ['vendor']
}))

Object.keys(viewpages).forEach(key => {
  // src下 的html 文件 来决定有几个入口
  let name = key.split('.')[0]
  // 入口 模块 因为 入口的在 src 下 所以 此处写
  wepackConfig.entry[name] = [`./src/${name}.js`]

  let htmlConfig = {
    filename: key,
    template: viewpages[key],
    inject: true,
    chunks: ['vendor', 'manifest', name]
  }

  if (NODE_ENV === 'production') {
    // .(js|css)$
    htmlConfig.inlineSource = 'manifest'
  }

  // html 配置
  let htmlPlugin = new HtmlWebpackPlugin(NODE_ENV === 'development' ? htmlConfig : merge(htmlConfig, {
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
    },
    // necessary to consistently work with multiple chunks via CommonsChunkPlugin
    chunksSortMode: 'dependency'
  }))

  wepackConfig.plugins.push(htmlPlugin);
})

if (NODE_ENV === 'production') {
 // 在html 插件 manifest
  wepackConfig.plugins.push(new HtmlWebpackInlineSourcePlugin())
}

export default wepackConfig
