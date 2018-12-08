import React from "react"
import NavList from "components/NavList"
import BlogSection from "components/BlogSection"
import {BrowserRouter,Route} from "react-router-dom"
import Recent from "components/Recent"
import "./index.stylus"
class Blog extends React.PureComponent{
  constructor(props){
    super(props)
    this.navMsg = [
      {
        tag:"最近",
        route: "/blog/recent",
        icon: "recent"
      },
      {
        tag:"分类",
        route: "sort",
        icon:"sort"
      },
      {
        tag:"标签",
        route: "tips",
        icon: "tips"
      },
      {
        tag:"归档",
        route: "file",
        icon : "file"
      }
    ]

  }
  render(){
    return (
      <React.Fragment>
        <header className="blogHeader">
          <NavList navMsg={this.navMsg} type="nav"/>
        </header>
        <BlogSection></BlogSection>
        {/* <Route path="/blog/recent" component={Recent}></Route> */}
        <footer></footer>
      </React.Fragment>
    )
  }
}

export default Blog