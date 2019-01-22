import React from "react"
import {Route,NavLink,Switch} from "react-router-dom"

import BlogAritcleList from "components/BlogAritcleList"
import BlogSort from "components/BlogSort"
import BlogAchieve from "components/BlogAchieve"

import "./index.stylus"
import BlogArticleList from "../../components/BlogAritcleList";

class Blog extends React.PureComponent{
  constructor(props){
    super(props)
    this.navMsg = [
      {
        tag:"全部",
        route:"/blog",
        icon:"all"
      },
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
    const isBlogAll = this.props.location.pathname === "/blog"
    console.log(isBlogAll)
    return (
      <React.Fragment>
        <header className="blogHeader">
          <nav className="nav">
          {
            this.navMsg.map((item,index) => {
              // 获取tag，route，icon
              const {tag,route,icon} = item
              return (
                <NavLink key={index} to={route} exact activeStyle={{
                  color:"#fff"
                }}>
                  {icon ? <i className={icon}/>:null}
                  {tag}
                </NavLink>)
            })
          }
          </nav>
          {
            isBlogAll?(
            <div className="avatar">
              <NavLink to="/"/>
            </div>):null
          }
        </header>
        <Switch>
          <Route path="/blog" component={BlogAritcleList} exact/>
          <Route path="/blog/sort" component={BlogSort} exact/>
          <Route path="/blog/achieve" component={BlogAchieve} exact/>
          <Route path="/blog/:type" component={BlogArticleList}/>
        </Switch>
      </React.Fragment>
    )
  }
}

export default Blog