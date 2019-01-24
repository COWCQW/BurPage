const fs = require("fs")
const path = require("path")

// 模型获取,进行数据存储
const model = require("../model")
const getBlogModel = model.getBlogModel 
const BlogArticleModel = getBlogModel("BlogArticle")
const BlogArticleSortByTypeModel = getBlogModel("BlogArticleSortByType")
const BlogArticleSortByDateModel = getBlogModel("BlogArticleSortByDate")

const InitBlogDB = () => {
  const blogDir = path.resolve(__dirname, "../../source/blog")
  const types = fs.readdirSync(blogDir)
  // 全部文章
  const articleList = types.reduce((list,type) => {
    // 文章类型目录
    const typeDir = path.resolve(blogDir, type)
    const articlesName = fs.readdirSync(typeDir)
    const articles = articlesName.map((articleName)=>{
      const articleDir = path.resolve(typeDir, articleName)
      const articleContent = fs.readFileSync(articleDir)
      // 根据文章内容提取文章信息
      // 正则提取文章信息
      // 文章头部提取
      let headReg = /^-{3,}([\S\s]+)-{3,}/
      let coverReg = /cover\s?:\s?["'](\S+)["']/
      let dateReg = /date\s?:\s?["'](\S+)["']/
      let summaryReg = /summary\s?:\s?["'](\S+)["']/
      let head = headReg.exec(articleContent) && headReg.exec(articleContent)[1]
      let date = dateReg.exec(head) && dateReg.exec(head)[1]
        let cover = coverReg.exec(head) && coverReg.exec(head)[1]
        let summary = summaryReg.exec(head) && summaryReg.exec(head)[1]
      
      return {
        title:articleName.slice(0,-3),
        type,
        date,
        cover:path.resolve("/static",cover),
        summary
      }
    })
    list.push(...articles)
    return list
  }, [])
  // 文章按照分类进行排序
  let articleListSortByType = []
  // 文章按照时间进行分类
  let articleListSortByDate = []
  articleList.forEach((article)=>{
    let year = article.date && article.date.slice(0,5)
    let type = article.type
    let curDate = articleListSortByDate.find((item)=>item.year === year)
    let curType = articleListSortByType.find((item)=>item.type === type)
    curDate?curDate.articles.push(article):articleListSortByDate.push({
      year,
      articles:[
        article
      ]
    })
    curType?curType.articles.push(article):articleListSortByType.push({
      type,
      articles:[
        article
      ]
    })
  })


  // 数据库存储
  BlogArticleModel.insertMany(articleList,(err,doc)=>{

  })
  BlogArticleSortByTypeModel.insertMany(articleListSortByType,(err,doc)=>{

  })
  BlogArticleSortByDateModel.insertMany(articleListSortByDate,(err,doc)=>{
  })

}

module.exports = {
  InitBlogDB
}