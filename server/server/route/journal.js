const KoaRouter = require("koa-router")
const path = require("path")
const fs = require("fs")
const util = require("util")
const marked = require("marked")
const pug = require("pug")
const model = require("../db")

const readFile = util.promisify(fs.readFile)
const journalRouter = new KoaRouter()
const JournalArticleSortByDateModel = model.getJournalModel("JournalArticleSortByDate")

const journalList = async ctx => {
  const journals = await JournalArticleSortByDateModel.find({}, {
    _id: 0,
    __v: 0
  })
  ctx.body = journals
}

const journalArticle = async ctx => {
  // 通过url判断是哪个种类下的哪个文件
  let dir = decodeURI(ctx.request.url.slice(8))
  console.log(dir)
  const articlePath = path.resolve(__dirname, "../../source/journal" + dir)

  const fileContent = await readFile(articlePath)
  let contentReg = /^-{3,}[\s\S]+-{3,}([\s\S]+)$/
  const content = contentReg.exec(fileContent)[1]
  const markDown = marked(content)
  ctx.body = pug.renderFile(path.resolve(__dirname, "../template/journal/journal.pug"), {
    markDown
  })
}
journalRouter.get("/getJournalList", journalList).get("/:year/:article", journalArticle)

module.exports = journalRouter