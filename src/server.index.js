import React from "react"

import "isomorphic-fetch"
import { renderToString } from "react-dom/server"
import HomePage from "pages/HomePage"
import Blog from "pages/Blog"
import Journal from "pages/Journal"

import { StaticRouter, Switch, Route } from "react-router-dom"
import { Provider } from "react-redux"
import createStore from "store"

import {
  initBlog
} from "store/redux.blog"
import {
  initJournal
} from "store/redux.journal"


export default async (ctx, context) => {
  const store = createStore()
  if(ctx.url.includes("blog")){
    const data = await fetch("http://localhost:9000/api/blog/getBlogList").then(res =>
      res.json()
    ) 
    initBlog(data,store.dispatch)
  }else if(ctx.url.includes("journal")){
    const data = await fetch("http://localhost:9000/api/journal/getJournalList").then(res=>res.json())
    initJournal(data,store.dispatch)
  }
  const url = decodeURI(ctx.url)
  const app = (
    <Provider store={store}>
      <StaticRouter location={url}>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/blog" component={Blog} />
          <Route path="/journal" component={Journal} />
        </Switch>
      </StaticRouter>
    </Provider>
  )
  return {
    renderString:renderToString(app),
    state:store.getState()
  }
}
