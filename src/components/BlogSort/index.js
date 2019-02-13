import React from "react"
import {NavLink} from "react-router-dom"
import { connect } from "react-redux"

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
        <ul className="sort">
          <NavList
            navMsg={navMsg}
          />
        </ul>
      </section>
    )
  }
}
const NavList = (props) => {
  return (
    <React.Fragment>
      {
        props.navMsg.map((item)=>{
          const { tag, route} = item
          return (
            <li>
              <NavLink to={route} key={tag}>{tag}</NavLink>
            </li>)
        })
      }
    </React.Fragment>
  )
}

export default connect(mapStateToProps)(BlogSort)
