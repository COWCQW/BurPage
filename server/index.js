const Koa = require("koa")
const KoaRouter = require("koa-router")
// 加载数据库
// require("./db")


const app = new Koa()
const router = new KoaRouter()

// 引入路由
const blogRouter = require("./route/blog.js")

// 装载路由
router.use("/blog",blogRouter.routes())

app.use(router.routes())


app.listen(9999)