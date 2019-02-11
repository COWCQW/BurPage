const WebpackAssetsManifest = require('webpack-assets-manifest')
const merge = require("webpack-merge")
const baseWebpackConfig = require("./webpack.base")

// 生成html模板文件
const HtmlWebpackPlugin = require("html-webpack-plugin")

// 清除dist文件夹
const CleanWebpackPlugin = require("clean-webpack-plugin")

// 将CSS文件抽离出来
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
// 开启gzip
const CompressionWebpackPlugin = require("compression-webpack-plugin")
// 开启bundle分析
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin

const config = require("../config")
const utils = require("./utils")



const prodWebpackConfig = merge(baseWebpackConfig,{
  // 生产环境
  entry:{
    
  },  
  mode: "production",
  module:{
    rules:[
      {
        // 处理图片
        test: /.*\.(gif|png|jpe?g|svg|webp)$/i,
        use: [
          {
            loader: "url-loader",
            options:{
              ...config.build.imageOptimization.transfromToDataURL.options,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: utils.assetsPath('img/[name].[hash:8].[ext]')
                }
              }
            }
          },
          // 图片压缩
          {
            loader: "image-webpack-loader",
            options: config.build.imageOptimization.imageMin
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            // 压缩css文件
            options:{
              minimize: true
            }
          },
          "postcss-loader"
        ]
      },
      {
        test: /\.s[c|a]ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            // 压缩css文件
            options:{
              minimize: true
            }
          },
          "postcss-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.styl(us)?/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            // 压缩css文件
            options:{
              minimize: true
            },
          },
          "postcss-loader",
          "stylus-loader"
        ]
      },
    ]
  },
  // 优化 
  optimization: {
    // 抽离框架公共JS代码
    splitChunks: {
      chunks:"all"   
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      // 默认输出文件夹和output一样
      filename: utils.assetsPath("css/[name].[contenthash:8].bundle.css"),
      // 异步模块的默认文件名
      chunkFilename: utils.assetsPath("css/async.[name].[contenthash:8].bundle.css")
    }),
    new HtmlWebpackPlugin({
      template: config.indexHTML,
      /**
       * get more details
       * https://github.com/jantimon/html-webpack-plugin#minification
       */
      inject: "body",
      minify: {
        // HTML压缩
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        minifyCSS: true, // 压缩 HTML 中出现的 CSS 代码
        minifyJS: true // 压缩 HTML 中出现的 JS 代码
      }
    }),
    new WebpackAssetsManifest(),
    new CleanWebpackPlugin([config.assetsRoot], { allowExternal: true }),
  ]
})


// 如果开启gzip
if(config.build.gzip.openGzip){
  prodWebpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      filename: "[path].gz[query]",
      algorithm: "gzip",
      test: new RegExp(
        "\\.(" +
        config.build.gzip.productionGzipExtensions.join("|") +
        ")$"
      ),
      threshold: 10240,
      minRatio: 0.8
    }))
}
// 添加bundle分析
if (config.build.bundleAnalyzerReport) {
  prodWebpackConfig.plugins.push(new BundleAnalyzerPlugin())
}




module.exports = prodWebpackConfig