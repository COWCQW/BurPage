const ora = require("ora")
const chalk = require("chalk")
const webpack = require("webpack")
const prodWebpackConfig = require("./webpack.prod.client")
const prodWebpackServerConfig = require("./webpack.prod.server")
const isClient = process.argv[2] === "C"

const spinner = ora("打包开始...\n").start()

const fallBack = function (err, stats) {
  if (err) {
    spinner.fail("编译失败")
    console.log(err)
    return
  }
  spinner.succeed("编译已结束. \n")

  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + "\n\n")
  console.log(chalk.cyan("  编译成功！\n"))
  console.log(chalk.yellow(
    isClient?"客户端代码已经打包完成！":"服务端代码已经打包完成！"
  ))
}

webpack(isClient?prodWebpackConfig:prodWebpackServerConfig,fallBack)
