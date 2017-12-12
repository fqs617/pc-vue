import webpack from 'webpack';
import ora from 'ora';
// https://github.com/shelljs/shelljs
import 'shelljs/global';
import express from 'express';
import opn from 'opn';
import webpackConfig from './webpack.config.dev';
import Config from '../config/index';
import path from 'path';
import proxyMiddleware from 'http-proxy-middleware';

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(Config.dev.LOCAL_ENV.NODE_ENV);
}

let spinner = ora('dev 服务开始启动...')
spinner.start();

const app = express();

// 清楚默认文件
// let assetsPath = Config.dev.dist;
// rm('-rf', assetsPath)
// mkdir('-p', assetsPath)
// cp('-R', 'static/*', assetsPath)

let compiler = webpack(webpackConfig);

let devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
});

let hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
});
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function(compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function(data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  });
});

let proxyTable = Config.dev.proxyTable;

// proxy api requests
Object.keys(proxyTable).forEach(function(context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
});

// 重点
app.use(require('connect-history-api-fallback')());

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

app.use('/', express.static(Config.dev.assetsRoot));

//端口号
let port = process.env.PORT || Config.dev.port;
let uri = 'http://localhost:' + port

devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
})

export default app.listen(port, err => {
  if (err) {
    console.log(err)
    return
  }
  spinner.stop();
  if (Config.dev.isOpenBrowser) {
    opn(uri)
  }
});
