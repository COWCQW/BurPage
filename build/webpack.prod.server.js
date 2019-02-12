const path = require("path")
const CleanWebpackPlugin = require("clean-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
  target: 'node',
  mode: "production",
  entry: path.resolve(__dirname, '../src/server.index.js'), 
  output: {
    libraryTarget: 'commonjs2',
    filename: 'server.bundle.js',
    path: path.resolve(__dirname, "../distSSR")
  },
  resolve:{
    alias: {
      "pages": path.resolve(__dirname, "../src/pages"),
      "components": path.resolve(__dirname, "../src/components"),
      "assets": path.resolve(__dirname, "../src/assets"),
      "common": path.resolve(__dirname, "../src/common"),
      "store": path.resolve(__dirname, "../src/store")
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      // 默认输出文件夹和output一样
      filename: "css/[name].[contenthash:8].bundle.css",
      // 异步模块的默认文件名
    }),
    new CleanWebpackPlugin([path.resolve(__dirname, "../distSSR")], {
      allowExternal: true
    })
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: "babel-loader",
        include: [
          path.resolve(__dirname, "../src")
        ]
      },
      {
        test: /\.(ttf|eot|woff)$/,
        use: "file-loader"
      },
      {
        // 处理图片
        test: /.*\.(gif|png|jpe?g|svg|webp)$/i,
        use: [{
          loader: "url-loader",
          options: {
            limit: 8192,
            fallback: {
              loader: 'file-loader',
              options: {
                name: 'img/[name].[hash:8].[ext]'
              }
            }
          }
        }]
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            // 压缩css文件
            options: {
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
            options: {
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
            options: {
              minimize: true
            },
          },
          "postcss-loader",
          "stylus-loader"
        ]
      },
    ]
  },
}