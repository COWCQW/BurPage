import React from "react"
import { connect } from "react-redux"

import NavList from "common/NavList"
import "./index.stylus"

const mapStateToProps = state => ({
  blog: state.blog
})

class BlogSort extends React.PureComponent {
  constructor(props) {
    super(props)
  }
  render() {
    const blogListSortByType = this.props.blog.blogListSortByType
    const navMsg = []
    for (let i in blogListSortByType) {
      navMsg.push({
        tag: i,
        route: `/blog/${i}`
      })
    }
    return (
      <section className="blogSort">
        <NavList navMsg={navMsg} type="sort">
        </NavList>
      </section>
    )
  }
}

export default connect(mapStateToProps)(BlogSort)
