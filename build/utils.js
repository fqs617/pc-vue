import path from 'path';
import fs from 'fs';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import Config from '../config/index';

let NODE_ENV = process.env.NODE_ENV;

export default {
  /**
   *
   * 参考来自 vue-cli
   * @param {any} options
   * @desc http://vue-loader.vuejs.org/en/configurations/extract-css.html
   * @returns
   */
  cssLoaders(options) {
    let cssLoader = {
      loader: 'css-loader',
      options: {
        //如果是压缩环境则压缩 代码 CSSNano Options
        minimize: false,
        sourceMap: options.sourceMap
      }
    }
    function generateLoaders(loader, loaderOptions) {
      let loaders = [cssLoader];
      if (loader) {
        loaders.push({
          loader: loader + '-loader',
          options: Object.assign({}, loaderOptions, {
            sourceMap: options.sourceMap
          })
        });
      }
      if (NODE_ENV === 'production') {
        return ExtractTextPlugin.extract({
          use: loaders,
          fallback: 'vue-style-loader'
        })
      } else {
        return ['vue-style-loader'].concat(loaders)
      }
    }

    return {
      css: generateLoaders(),
      sass: generateLoaders('sass', { indentedSyntax: true }),
      scss: generateLoaders('sass')
    }
  },

  styleLoaders(options) {
    let output = [];
    let loaders = this.cssLoaders(options);
    for (let extension in loaders) {
      let loader = loaders[extension];
      // vue-style-loader 替换成  style-loader
      loader.splice(NODE_ENV === 'production' ? 1 : 0, 1, 'style-loader');
      if (extension === 'css') {
        loader.push('postcss-loader');
      } else {
        // postcss-loader 必须在 sass-loader 之前
        loader.splice(NODE_ENV === 'production' ? 3 : 2, 0, 'postcss-loader');
      }
      if (NODE_ENV === 'production') {
        output.push({
          test: new RegExp('\\.' + extension + '$'),
          loader: loader
        });
      } else {
        output.push({
          test: new RegExp('\\.' + extension + '$'),
          use: loader
        });
      }
    }
    return output;
  },
  assetsPath(_path) {
    let assetsSubPath = NODE_ENV === 'production' ?
      Config.build.assetsSubDirectory :
      Config.dev.assetsSubPath;
    return path.posix.join(assetsSubPath, _path)
  },
  /**
   *
   * 传入指定路径获取 指定路径下的 文件列表
   * @param {any} fileSrc 文件路径
   * @param {any} rule 指定规则 如 js or  html
   * @returns 返回获取的  文件列表
   */
  getFilePath(fileSrc = __dirname, rule = 'js') {
    let paths = {};
    fs.readdirSync(fileSrc)
      .filter(file => (file.indexOf('.') != 0) && (file.split('.').slice(-1)[0] === rule))
      .forEach(file => {
        paths[file] = path.join(fileSrc, file);
      });
    return paths;
  }
};
