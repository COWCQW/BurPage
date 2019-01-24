const path = require("path")


// 定义配置
module.exports = {
  indexHTML: path.resolve(__dirname, "../public/index.html"),
  assetsRoot: path.resolve(__dirname, "../dist"),
  alias:{
    "pages":path.resolve(__dirname, "../src/pages"),
    "components":path.resolve(__dirname, "../src/components"),
    "assets": path.resolve(__dirname, "../src/assets")
  },
  dev: {
    assetsSubDirectory: "static",
    assetsPublicPath: "/",
    proxyTable: {
      '/api': {
        target: 'http://localhost:9999/',  //目标接口域名
        changeOrigin: true,  //是否跨域
        pathRewrite: {
          '^/api': '/'   //重写接口
        }
      }
    },
    host: "localhost",
    port: 8081, 
    autoOpenBrowser: true,
    historyApiFallback: true
  },
  build: {
    assetsSubDirectory: "static",
    assetsPublicPath: "/",
    //  --report 开启bundle 分析
    bundleAnalyzerReport: process.env.npm_config_report,
    // 图片优化
    imageOptimization:{
      // 图像压缩
      imageMin:{
        mozjpeg: { // 压缩 jpeg 的配置
          progressive: true,
          quality: 65
        },
        optipng: { // 使用 imagemin-optipng 压缩 png，enable: false 为关闭
          enabled: false,
        },
        pngquant: { // 使用 imagemin-pngquant 压缩 png
          quality: "65-90",
          speed: 4
        },
        gifsicle: { // 压缩 gif 的配置
          interlaced: false,
        },
        webp: { // 开启 webp，会把 jpg 和 png 图片压缩为 webp 格式
          quality: 75
        },
      },
      // 图片转base64
      transfromToDataURL:{
        options: {
          limit: 8192, // 单位是 Byte，当文件小于 8KB 时作为 DataURL 处理
        },
      }
    },
    gzip:{
      openGzip:true,
      // 哪些文件需要gzip
      productionGzipExtensions:["js","css"]
    }
  }
}