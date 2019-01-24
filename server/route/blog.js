const path = require("path")
const fs = require("fs")
const util = require("util")
const KoaRouter = require("koa-router")
const marked = require("marked")
const pug = require("pug")

// 数据库
const model = require("../db")
const blogArticleModel = model.getBlogModel("BlogArticle")

const readFile = util.promisify(fs.readFile)
const blogRouter = new KoaRouter()


// 展示博客文章
const blogArticle = async ctx => {
  // 通过url判断是哪个种类下的哪个文件
  let dir  = decodeURI(ctx.request.url.slice(5)) 
  const articlePath = path.resolve(__dirname,"../source/blog"+dir)
  
  const fileContent = await readFile(articlePath)
  let contentReg = /^-{3,}[\s\S]+-{3,}([\s\S]+)$/
  const content = contentReg.exec(fileContent)[1]
  const markDown = marked(content)
  ctx.body = pug.renderFile(path.resolve(__dirname,"../template/blog.pug"),{
    markDown
  })

}

const blogList = async ctx => {
  await blogArticleModel.find({},{_id:0,__v:0},(err,doc) => {
    ctx.body = doc
  })
}


blogRouter.get("/getBlogList",blogList)
blogRouter.get("/:type/:article",blogArticle)


module.exports = blogRouter