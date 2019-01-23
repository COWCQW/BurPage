const mongoose = require("mongoose")

// blog
const blogModel = require("./blogModel")
for(let m in blogModel)
  mongoose.model(m,new mongoose.Schema(blogModel[m]))

module.exports = {
  getBlogModel(m){
    return mongoose.model(m)
  }
}