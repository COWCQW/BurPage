const mongoose = require('mongoose')
const initDB = require("./init")
initDB.InitBlogDB()
// 数据库连接
mongoose.connect('mongodb://localhost/BUrPage')

