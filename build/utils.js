const path = require('path')
const config = require('../config')

exports.assetsPath = (__path) => {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
  ? config.build.assetsSubDirectory
  : config.dev.assetsSubDirectory


  return path.posix.join(assetsSubDirectory,__path)
}