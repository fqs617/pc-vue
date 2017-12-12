import path from 'path';
import webpack from 'webpack';
import ora from 'ora';
import rm from 'rimraf';
import chalk from 'chalk';
import webpackConfig from './webpack.config.build';
import Config from '../config/index';

var spinner = ora(`${process.env.NODE_TYPE} build 开始...`);
spinner.start();

//先移除之前生成的文件
rm(Config.build.assetsRoot, err => {
  if (err) throw err
  webpack(webpackConfig, function(err, stats) {
    spinner.stop();
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n');

    console.log(chalk.cyan('  Build 完成.\n'));
    console.log(chalk.yellow('  Tip: 请在nginx 下访问 直接打开的方式不可以哦.\n'));
  })
})
