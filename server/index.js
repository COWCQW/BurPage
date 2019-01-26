const path = require("path")
const Koa = require("koa")
const KoaRouter = require("koa-router")
const KoaStaticServer = require("koa-static-server")
const app = new Koa()
const router = new KoaRouter()

// 引入路由
const blogRouter = require("./server/route/blog")
const journalRouter = require("./server/route/journal")
const aboutRouter = require("./server/route/about")
// 装载路由
router.use("/blog", blogRouter.routes())
router.use("/journal", journalRouter.routes())
router.use("/about", aboutRouter.routes())
app.use(router.routes())

// 静态文件
app.use(KoaStaticServer({
  rootDir: path.resolve(__dirname, "./static"),
  rootPath: "/static"
}))

app.listen(9999)