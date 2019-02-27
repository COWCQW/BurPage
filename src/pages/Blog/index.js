import React from "react"
import { Route, NavLink, Switch } from "react-router-dom"
import { connect } from "react-redux"

import BlogAritcleList from "components/BlogAritcleList"
import BlogSort from "components/BlogSort"
import BlogAchieve from "components/BlogAchieve"

import "./index.stylus"
import BlogArticleList from "components/BlogAritcleList"
import { fetchBloglist } from "store/redux.blog"

const mapDispatchToProps = (dispatch) => {
  return {
    fetchBloglist:() => {
      dispatch(fetchBloglist())
    }
  }
}

class Blog extends React.PureComponent {
  constructor(props) {
    super(props)
    this.navMsg = [
      {
        tag: "全部",
        route: "/blog",
        icon: "all"
      },
      {
        tag: "分类",
        route: "/blog/sort",
        icon: "sort"
      },
      {
        tag: "归档",
        route: "/blog/achieve",
        icon: "achieve"
      }
    ]
  }
  render() {
    const isBlogAll = this.props.location.pathname === "/blog"
    return (
      <React.Fragment>
        <header className="blogHeader">
          <nav className="nav">
            {this.navMsg.map((item, index) => {
              // 获取tag，route，icon
              const { tag, route, icon } = item
              return (
                <NavLink
                  key={index}
                  to={route}
                  exact
                  activeStyle={{
                    color: "#333"
                  }}
                >          
                  {icon ? <i className={icon} /> : null} {tag} 
                </NavLink>
              )
            })} 
          </nav> 
          {isBlogAll ? (
            <div className="avatar">
              <NavLink to="/" />
            </div>
          ) : null} 
        </header> 
        <Switch>
          <Route path="/blog" component={BlogAritcleList} exact />
          <Route path="/blog/sort" component={BlogSort} exact />
          <Route path="/blog/achieve" component={BlogAchieve} exact />
          <Route path="/blog/:type" component={BlogArticleList} /> 
        </Switch> 
      </React.Fragment>
    )
  }
  componentDidMount() {
    if(!this.props.blog.blogList.length)
      this.props.fetchBloglist()
  }
}

export default connect(
  (state)=>({blog:state.blog}),
  mapDispatchToProps
)(Blog)
