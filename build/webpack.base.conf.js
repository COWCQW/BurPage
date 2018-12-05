// webpack基本配置，生产环境和开发环境都使用
const path = require("path")
// webpack入口文件
const ENTRY_PATH = path.resolve(__dirname,"../src/index.js")

const config = require("../config")
const utils = require("./utils")

// 是否是开发环境
const isDev = process.env.NODE_ENV === "development"



const baseWebpackConfig = {
  entry:{
    app: ENTRY_PATH,
    // 将框架单独打包成js文件
    framework:["react","react-dom"]
  },
  
  output:{
    filename: utils.assetsPath("js/[name].[chunkhash:8].js"),
    path: config.assetsRoot,
    publicPath: isDev? config.dev.assetsPublicPath: config.build.assetsPublicPath
  },
  module:{
    rules:[
      {
        test:/\.jsx?$/,
        use: "babel-loader",
        include: [
          path.resolve(__dirname,"../src")
        ]
      }
    ]
  }
}

if(config.eslintOpen){
  baseWebpackConfig.module.rules.push(
    {
      test: /\.js[x]?$/,
      enforce: "pre",
      use: [{
        loader: "eslint-loader", 
        options: { fix: true }
      }],
      include: path.resolve(__dirname, "../src"),
      exclude: /node_modules/
    }
  )}

module.exports = baseWebpackConfig
