import React from "react"
import ReactDom from "react-dom"

import HomePage from "pages/HomePage"
import Blog from "pages/Blog"
import Journal from "pages/Journal"

import { BrowserRouter, Switch, Route } from "react-router-dom"
import { Provider } from "react-redux"
import store from "store"
import "assets/stylus/reset.stylus"

ReactDom.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/blog" component={Blog} />
        <Route path="/journal" component={Journal} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
)
