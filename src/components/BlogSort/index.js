import React from "react"
import NavList from "../NavList"
import "./index.stylus"

class BlogSort extends React.PureComponent{
  constructor(props){
    super(props)
  }
  render(){
    const navMsg = [{
      tag:"js面试",
      route:"/blog/js面试"
    },
    {
      tag:"js面试",
      route:"/blog/js面试"
    },
    {
      tag:"js面试",
      route:"/blog/js面试"
    }
  ]
    return (
    <section className="blogSort">
      <NavList navMsg={navMsg} type="sort"></NavList>
    </section>)
  }
}

export default BlogSort