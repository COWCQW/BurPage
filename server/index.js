const path = require("path")
const Koa = require("koa")
const KoaRouter = require("koa-router")
const KoaStaticServer = require("koa-static-server")
const pug = require("pug")
const manifest = require("./dist/manifest.json")
const app = new Koa()
const router = new KoaRouter()
/** SSR
 *   服务端渲染
 */
const renderToString = require("../distSSR/server.bundle").default

app.use(async (ctx,next)=>{
  /**
   * 如果接口是api接口,或者是静态文件 
   * 则进过下一个中间件，不进行服务端渲染
   */
  if(ctx.url.includes("api") || ctx.url.includes("assets"))
    return next()
  const {renderString,state} = await renderToString(ctx)
  ctx.body = pug.renderFile(path.resolve(__dirname,"./index.template.pug"),{
    title:"BurPage",
    renderString,
    state,
    manifest:Object.values(manifest)
  })
})




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