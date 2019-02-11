// webpack基本配置，生产环境和开发环境都使用
const path = require("path")

// webpack入口文件
const ENTRY_PATH = path.resolve(__dirname,"../src/client.index.js")

const config = require("../config")
const utils = require("./utils")

// 是否是开发环境
const isDev = process.env.NODE_ENV === "development"



const baseWebpackConfig = {
  entry:{
    app: ENTRY_PATH
  },
  output:{
    /**不使用 chunkhash 原因：
     * 当css文件发生改变，js文件的chunkhash也发生改变
     * 
     */
    filename: utils.assetsPath("js/[name].[contenthash:8].bundle.js"),
    path: config.assetsRoot,
    publicPath: isDev? config.dev.assetsPublicPath: config.build.assetsPublicPath
  },
  resolve:{
    alias:config.alias
  },
  module:{
    rules:[
      {
        test:/\.jsx?$/,
        use: "babel-loader",
        include: [
          path.resolve(__dirname,"../src")
        ]
      },
      {
        test: /\.(ttf|eot|woff)$/,
        use: "file-loader"
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