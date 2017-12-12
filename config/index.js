import path from 'path';
import {version} from '../package.json';
const IS_SENTRY = process.env.NODE_TYPE === 'sentry';
const DIST = path.resolve(__dirname, '../.dist');
const BUILD_DIST = path.resolve(__dirname, '../dist');
export default {
  dev: {
    //生成的目录
    assetsRoot: DIST,
    assetsSubPath: 'static',
    assetsPublicPath: '/',
    port: 80,
    sourceMap: true,
    LOCAL_ENV: { NODE_ENV: '"development"', VERSION: `'${version}'` },
    proxyTable: {},
    //是否总是打开浏览器
    isOpenBrowser: false
  },
  build: {
    assetsRoot: BUILD_DIST,
    assetsSubDirectory: 'static',
    //assetsPublicPath: 'http://img.bqmart.cn/',
    assetsPublicPath: '/',
    sourceMap: IS_SENTRY,
    LOCAL_ENV: { NODE_ENV: '"production"', VERSION: `'${version}'` },
    bundleAnalyzerReport: false
  }
};
