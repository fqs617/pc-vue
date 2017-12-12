/**
 * 前端日志收集
 */

import Vue from 'vue'
import Raven from 'raven-js'
import RavenVue from 'raven-js/plugins/vue'

// https://docs.sentry.io/clients/javascript/config/
// 开发环境 使用saar-dev  线上坏境使用 saar
const config = bq.isProduction
? '线上配置'
: '开发配置'
Raven.config(config, {
  environment: bq.env,
  release: `'${bq.version}'`,
  tags: {version: bq.version}
})
    .addPlugin(RavenVue, Vue)
    .install()
