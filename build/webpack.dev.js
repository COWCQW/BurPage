const path = require("path")
const webpack = require("webpack")
const merge = require("webpack-merge")
const HtmlWebpackPlugin = require("html-webpack-plugin")

const baseWebpackConfig = require("./webpack.base")
const config = require("../config")



module.exports = merge(baseWebpackConfig,{
  mode: "development",
  output: {
    filename: "js/[name].[hash:8].js"
  },
  module:{
    rules:[
      {
        // 处理图片
        test: /.*\.(gif|png|jpe?g|svg|webp)$/i,
        use: [
          {
            loader: "file-loader",
            options: {}
          }
        ]
      },
      {
        test: /\.s[c|a]ss$/,
        use: [
          "style-loader",
          "css-loader",
          "postcss-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.styl(us)?$/,
        use: [
          "style-loader",
          "css-loader",
          "postcss-loader",
          "stylus-loader"
        ]
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader",
        ]
      }
    ]
  },  
  plugins:[
    new HtmlWebpackPlugin({
      template: config.indexHTML,
      inject:"body",
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: path.join(__dirname, "../public"),
    hot: true,
    host: config.dev.host,
    port: config.dev.port,
    open: config.dev.autoOpenBrowser,
    proxy: config.dev.proxyTable,
    historyApiFallback:config.dev.historyApiFallback
  }
})
