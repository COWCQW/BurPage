import React from "react"
import NavList from "components/NavList"
import {Route,Switch} from "react-router-dom"

import BlogAritcleList from "components/BlogAritcleList"
import BlogSort from "components/BlogSort"
import BlogAchieve from "components/BlogAchieve"

import "./index.stylus"

class Blog extends React.PureComponent{
  constructor(props){
    super(props)
    this.navMsg = [
      {
        tag:"分类",
        route: "/blog/sort",
        icon:"sort"
      },
      {
        tag:"归档",
        route: "/blog/achieve",
        icon : "achieve"
      }
    ]

  }
  render(){
    return (
      <React.Fragment>
        <header className="blogHeader">
          <NavList navMsg={this.navMsg} type="nav"/>
        </header>
          <Route path="/blog" component={BlogAritcleList} exact/>
          <Route path="/blog/sort" component={BlogSort} exact/>
          <Route path="/blog/achieve" component={BlogAchieve}/>
      </React.Fragment>
    )
  }
}

export default Blog