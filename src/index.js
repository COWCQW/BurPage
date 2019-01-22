import React from "react"
import ReactDom from "react-dom"

import HomePage from "pages/HomePage"
import Blog from "pages/Blog"
import Journal from "pages/Journal"

import {BrowserRouter,Switch,Route} from "react-router-dom"
import "assets/stylus/reset.stylus"



ReactDom.render(
  <BrowserRouter>
    <Switch>
      {/* 只跳转到第一个匹配的路由*/}
      <Route path='/' exact component= {HomePage}/>
      <Route path='/blog' component= {Blog}/>
      <Route path='/journal' component= {Journal}/>
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
)