// webpack基本配置，生产环境和开发环境都使用
const path = require('path')
// webpack入口文件
const ENTRY_PATH = path.resolve(__dirname,'../src/index.js')

// webpack输出目录
const DIST_PATH = path.resolve(__dirname,'../dist')

module.exports = {
  entry:{
    app: ENTRY_PATH
  },
  
  output:{
    filename: 'js/bundle.js',
    path: DIST_PATH
  },
  module:{
    rules:[
      {
        test:/\.jsx?$/,
        use: 'babel-loader',
        include: [
          path.resolve(__dirname,'../src')
        ]
      }
    ]
  }
}

