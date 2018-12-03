const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')


module.exports = merge(baseWebpackConfig,{
  // 生产环境
  mode: 'production'
})