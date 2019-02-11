const path = require("path")
const Koa = require("koa")
const KoaRouter = require("koa-router")
const KoaStaticServer = require("koa-static-server")
const app = new Koa()
const router = new KoaRouter()
/** SSR
 *  
 */
const SSr = require("../distSSRR/server.bundle").default
console.log(SSr)
// app.use((ctx)=>{
//   ctx.body = SSr(ctx)
// })


// 引入路由
const blogRouter = require("./server/route/blog")
const journalRouter = require("./server/route/journal")
const aboutRouter = require("./server/route/about")

// 装载路由
router.use("/api/blog", blogRouter.routes())
router.use("/api/journal", journalRouter.routes())
router.use("/api/about", aboutRouter.routes())
app.use(router.routes())

// 静态文件
app.use(KoaStaticServer({
  rootDir: path.resolve(__dirname, "./static"),
  rootPath: "/static"
}))
app.use(KoaStaticServer({
  rootDir: path.resolve(__dirname, "./dist"),
  rootPath: "/"
}))

app.listen(9000)